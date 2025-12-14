from fastapi import FastAPI
from routers import ai, handwriting

app = FastAPI(title="Lumina Backend API")

app.include_router(ai.router, prefix="/api", tags=["AI"])
app.include_router(handwriting.router, prefix="/api/handwriting", tags=["Handwriting"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Lumina API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
