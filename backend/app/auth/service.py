from datetime import datetime, timedelta, timezone

import psycopg
import redis.asyncio as redis

from jose import jwt
from passlib.context import CryptContext

from app.config import settings


pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


# -------------------------
# PostgreSQL
# -------------------------

def get_database_urls():

    url = settings.DATABASE_URL

    urls = [url]

    if "localhost" in url:
        urls.append(
            url.replace("localhost", "postgres")
        )

    elif "@postgres:" in url:
        urls.append(
            url.replace("@postgres:", "@localhost:")
        )

    return urls


def get_db_connection():

    last_error = None

    for url in get_database_urls():

        try:
            return psycopg.connect(url)

        except Exception as e:
            last_error = e

    raise last_error


# -------------------------
# Redis
# -------------------------

async def get_redis():

    url = settings.REDIS_URL

    urls = [url]

    if "localhost" in url:
        urls.append(
            url.replace("localhost", "redis")
        )

    elif "redis://" in url and "@redis:" not in url:
        urls.append(
            url.replace("://redis:", "://localhost:")
        )

    last_error = None

    for url in urls:

        client = redis.from_url(
            url,
            decode_responses=True
        )

        try:
            await client.ping()
            return client

        except Exception as e:
            last_error = e
            await client.aclose()

    raise last_error


# -------------------------
# DB 초기화
# -------------------------

async def init_db():

    with get_db_connection() as conn:

        with conn.cursor() as cursor:

            cursor.execute(
                """
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )

        conn.commit()


# -------------------------
# Password
# -------------------------

def hash_password(password: str) -> str:

    return pwd_context.hash(password)


def verify_password(
    password: str,
    hashed_password: str
) -> bool:

    return pwd_context.verify(
        password,
        hashed_password
    )


# -------------------------
# 회원가입
# -------------------------

async def signup(
    email: str,
    password: str
):

    with get_db_connection() as conn:

        with conn.cursor() as cursor:

            cursor.execute(
                "SELECT id FROM users WHERE email = %s",
                (email,)
            )

            if cursor.fetchone():
                return None

            hashed_password = hash_password(password)

            cursor.execute(
                """
                INSERT INTO users (
                    email,
                    password
                )
                VALUES (%s, %s)
                RETURNING id
                """,
                (
                    email,
                    hashed_password
                )
            )

            user_id = cursor.fetchone()[0]

        conn.commit()

    return user_id


# -------------------------
# 로그인
# -------------------------

async def login(
    email: str,
    password: str
):

    with get_db_connection() as conn:

        with conn.cursor() as cursor:

            cursor.execute(
                """
                SELECT id, password
                FROM users
                WHERE email = %s
                """,
                (email,)
            )

            user = cursor.fetchone()

    if not user:
        return None

    user_id, hashed_password = user

    if not verify_password(
        password,
        hashed_password
    ):
        return None

    expire = (
        datetime.now(timezone.utc)
        + timedelta(hours=1)
    )

    token = jwt.encode(
        {
            "user_id": user_id,
            "email": email,
            "exp": expire
        },
        settings.JWT_SECRET_KEY,
        algorithm="HS256"
    )

    redis_client = await get_redis()

    await redis_client.setex(
        f"user:{user_id}",
        3600,
        token
    )

    await redis_client.aclose()

    return token