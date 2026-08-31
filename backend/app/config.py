from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


BASE_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):

    OPENAI_API_KEY: str

    DATABASE_URL: str = (
        "postgresql://postgres:1234@localhost:5432/cloud_pipeline"
    )

    REDIS_URL: str = (
        "redis://localhost:6379/0"
    )

    JWT_SECRET_KEY: str = "change-this-secret-key"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()