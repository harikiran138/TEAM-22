from typing import List, Optional
import uuid
from .database import db

class CourseStore:
    """
    MongoDB store for Courses.
    """
    def __init__(self):
        self.db = db.get_db()
        self.courses_collection = self.db["courses"]

    def create_course(self, name: str, code: str, description: str, teacher_id: str) -> dict:
        course = {
            "id": str(uuid.uuid4()),
            "name": name,
            "code": code,
            "description": description,
            "teacher_id": teacher_id,
        }
        self.courses_collection.insert_one(course)
        course.pop("_id", None)
        return course

    def list_courses(self) -> List[dict]:
        cursor = self.courses_collection.find({})
        courses = []
        for doc in cursor:
            doc.pop("_id", None)
            courses.append(doc)
        return courses

    def get_course_by_code(self, code: str) -> Optional[dict]:
        doc = self.courses_collection.find_one({"code": code})
        if doc:
            doc.pop("_id", None)
            return doc
        return None
