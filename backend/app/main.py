from fastapi import FastAPI

from app.imageRag.web import router as image_rag_router


app = FastAPI()


app.include_router(image_rag_router)


@app.get("/")
def root():
    return {
        "message": "Image RAG API"
    }