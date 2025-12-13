from fastapi import FastAPI
from routers import ai

app = FastAPI(title="Lumina Backend API")

app.include_router(ai.router, prefix="/api", tags=["AI"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Lumina API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
