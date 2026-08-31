import base64

from openai import OpenAI

from app.config import settings


client = OpenAI(api_key=settings.OPENAI_API_KEY)


async def analyze_image(image_bytes: bytes, content_type: str) -> str:
    """
    업로드된 이미지를 OpenAI Vision에 전달하고 분석 결과를 반환
    """

    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    response = client.responses.create(
        model="gpt-4.1-mini",
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_text",
                        "text": (
                            "이 이미지를 분석해주세요. "
                            "이미지에 무엇이 있는지 구체적으로 설명하고 "
                            "가능하다면 음식의 종류와 특징을 알려주세요."
                        ),
                    },
                    {
                        "type": "input_image",
                        "image_url": (
                            f"data:{content_type};base64,{base64_image}"
                        ),
                    },
                ],
            }
        ],
    )

    return response.output_text