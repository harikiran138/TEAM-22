from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import ai, handwriting_simple as handwriting, assignments

app = FastAPI(title="Lumina Backend API")

from fastapi.staticfiles import StaticFiles
import os

os.makedirs("data/uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="data/uploads"), name="uploads")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(ai.router, prefix="/api", tags=["AI"])
app.include_router(handwriting.router, prefix="/api/handwriting", tags=["Handwriting"])
app.include_router(assignments.router, prefix="/api/assignments", tags=["Assignments"])

from routers import courses
app.include_router(courses.router, prefix="/api/courses", tags=["Courses"])

from routers import auth
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Lumina API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
