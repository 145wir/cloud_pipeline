from fastapi import APIRouter, HTTPException

from app.auth.schema import (
    SignupRequest,
    LoginRequest,
    AuthResponse
)

from app.auth.service import (
    signup,
    login
)


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


@router.post(
    "/signup",
    response_model=AuthResponse
)
async def signup_api(
    request: SignupRequest
):
    user_id = await signup(
        email=request.email,
        password=request.password
    )

    if user_id is None:
        raise HTTPException(
            status_code=409,
            detail="이미 가입된 이메일입니다."
        )

    return AuthResponse(
        message="회원가입이 완료되었습니다."
    )


@router.post(
    "/login",
    response_model=AuthResponse
)
async def login_api(
    request: LoginRequest
):
    token = await login(
        email=request.email,
        password=request.password
    )

    if token is None:
        raise HTTPException(
            status_code=401,
            detail="이메일 또는 비밀번호가 올바르지 않습니다."
        )

    return AuthResponse(
        message="로그인 성공",
        access_token=token
    )