from fastapi import FastAPI

from app.imageRag.web import router as image_rag_router
from app.auth.web import router as auth_router
from app.auth.service import init_db


app = FastAPI()


@app.on_event("startup")
async def startup():
    await init_db()


app.include_router(image_rag_router)
app.include_router(auth_router)