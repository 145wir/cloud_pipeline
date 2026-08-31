from fastapi import APIRouter, File, UploadFile, HTTPException

from app.imageRag.schema import ImageRagResponse
from app.imageRag.service import analyze_image


router = APIRouter(
    prefix="/image-rag",
    tags=["Image RAG"]
)


@router.post(
    "/",
    response_model=ImageRagResponse
)
async def image_rag(
    file: UploadFile = File(...)
):
    """
    이미지 업로드 → OpenAI Vision 분석
    """

    if not file.content_type:
        raise HTTPException(
            status_code=400,
            detail="파일 형식을 확인할 수 없습니다."
        )

    if not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="이미지 파일만 업로드할 수 있습니다."
        )

    image_bytes = await file.read()

    if not image_bytes:
        raise HTTPException(
            status_code=400,
            detail="빈 이미지 파일입니다."
        )

    result = await analyze_image(
        image_bytes=image_bytes,
        content_type=file.content_type
    )

    return ImageRagResponse(
        result=result
    )