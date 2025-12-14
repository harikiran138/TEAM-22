from datetime import datetime
from typing import List, Optional
import uuid
from .database import db

class AssignmentStore:
    """
    MongoDB store for Assignment Metadata.
    """
    def __init__(self):
        self.db = db.get_db()
        self.assignments_collection = self.db["assignments"]
        self.submissions_collection = self.db["submissions"]

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
        self.assignments_collection.insert_one(assignment)
        # Remove internal _id for response
        assignment.pop("_id", None)
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
        self.submissions_collection.insert_one(submission)
        submission.pop("_id", None)
        return submission

    def get_submissions(self, assignment_id: str) -> List[dict]:
        cursor = self.submissions_collection.find({"assignment_id": assignment_id})
        submissions = []
        for doc in cursor:
            doc.pop("_id", None)
            submissions.append(doc)
        return submissions

    def list_assignments(self, course_id: Optional[str] = None) -> List[dict]:
        query = {}
        if course_id:
            query["course_id"] = course_id
        
        cursor = self.assignments_collection.find(query)
        assignments = []
        for doc in cursor:
            doc.pop("_id", None)
            assignments.append(doc)
        return assignments

    def get_assignment(self, assignment_id: str) -> Optional[dict]:
        doc = self.assignments_collection.find_one({"id": assignment_id})
        if doc:
            doc.pop("_id", None)
            return doc
        return None
