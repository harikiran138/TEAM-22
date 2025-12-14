from fastapi import APIRouter, HTTPException, Form
from typing import List, Optional
from store.assignment_store import AssignmentStore
from pydantic import BaseModel

router = APIRouter()
store = AssignmentStore()

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

@router.get("/list")
async def list_assignments(course_id: Optional[str] = None):
    """
    List assignment definitions.
    """
    return store.list_assignments(course_id)
