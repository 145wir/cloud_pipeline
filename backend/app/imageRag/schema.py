from pydantic import BaseModel


class ImageRagResponse(BaseModel):
    result: str