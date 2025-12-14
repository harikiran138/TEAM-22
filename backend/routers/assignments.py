from fastapi import APIRouter, HTTPException, Form, File, UploadFile
from typing import List, Optional
from store.assignment_store import AssignmentStore
from pydantic import BaseModel
import shutil
import os
import uuid

router = APIRouter()
store = AssignmentStore()

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class AssignmentCreate(BaseModel):
    title: str
    course_id: str
    description: str
    due_date: str # ISO
    created_by: str = "teacher"

@router.post("/create")
async def create_assignment(
    title: str = Form(...),
    course_id: str = Form(...),
    description: str = Form(...),
    due_date: str = Form(...),
    created_by: str = Form("teacher")
):
    """
    Create a new assignment definition.
    """
    try:
        assignment = store.create_assignment(title, course_id, description, due_date, created_by)
        return {"status": "success", "assignment": assignment}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/submit")
async def submit_assignment(
    assignment_id: str = Form(...),
    student_id: str = Form(...),
    file: UploadFile = File(...)
):
    """
    Submit an assignment.
    """
    try:
        # Save the file
        file_ext = file.filename.split(".")[-1]
        file_name = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(UPLOAD_DIR, file_name)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Create submission record
        submission = store.submit_assignment(assignment_id, student_id, file_path)
        return {"status": "success", "submission": submission}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/list")
async def list_assignments(course_id: Optional[str] = None):
    """
    List assignment definitions with submission counts.
    """
    assignments = store.list_assignments(course_id)
    # Add submission count to each assignment
    results = []
    for a in assignments:
        submissions = store.get_submissions(a["id"])
        a_copy = a.copy()
        a_copy["submission_count"] = len(submissions)
        results.append(a_copy)
    return results

@router.get("/{assignment_id}/submissions")
async def get_assignment_submissions(assignment_id: str):
    """
    Get all submissions for a specific assignment.
    """
    return store.get_submissions(assignment_id)
