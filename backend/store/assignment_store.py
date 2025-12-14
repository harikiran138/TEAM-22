from datetime import datetime
from typing import List, Optional
import uuid

class AssignmentStore:
    """
    In-memory store for Assignment Metadata.
    """
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(AssignmentStore, cls).__new__(cls)
            cls._instance.assignments = []
        return cls._instance

    def create_assignment(self, title: str, course_id: str, description: str, due_date: str, created_by: str) -> dict:
        assignment = {
            "id": str(uuid.uuid4()),
            "title": title,
            "course_id": course_id,
            "description": description,
            "due_date": due_date, # ISO Format
            "created_by": created_by,
            "created_at": datetime.now().isoformat()
        }
        self.assignments.append(assignment)
        return assignment

    def list_assignments(self, course_id: Optional[str] = None) -> List[dict]:
        if course_id:
            return [a for a in self.assignments if a["course_id"] == course_id]
        return self.assignments

    def get_assignment(self, assignment_id: str) -> Optional[dict]:
        for a in self.assignments:
            if a["id"] == assignment_id:
                return a
        return None
