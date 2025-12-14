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
            cls._instance.submissions = []
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

    def submit_assignment(self, assignment_id: str, student_id: str, file_url: str) -> dict:
        submission = {
            "id": str(uuid.uuid4()),
            "assignment_id": assignment_id,
            "student_id": student_id,
            "file_url": file_url,
            "submitted_at": datetime.now().isoformat(),
            "grade": None,
            "feedback": None
        }
        self.submissions.append(submission)
        return submission

    def get_submissions(self, assignment_id: str) -> List[dict]:
        return [s for s in self.submissions if s["assignment_id"] == assignment_id]

    def list_assignments(self, course_id: Optional[str] = None) -> List[dict]:
        if course_id:
            return [a for a in self.assignments if a["course_id"] == course_id]
        return self.assignments

    def get_assignment(self, assignment_id: str) -> Optional[dict]:
        for a in self.assignments:
            if a["id"] == assignment_id:
                return a
        return None
