from typing import Dict, Optional
import uuid
import asyncio
from app.assessment.models.session import AssessmentSession
from app.assessment.models.schemas import MasteryState
from app.database.manager import db

class SessionManager:
    """
    Manages active assessment sessions using MongoDB.
    """
    def __init__(self):
        pass # Stateless now

    async def create_session(self, student_id: str) -> AssessmentSession:
        session_id = str(uuid.uuid4())
        session = AssessmentSession(
            session_id=session_id,
            student_id=student_id,
            mastery_state=MasteryState(student_id=student_id)
        )
        # Store in DB
        await db.get_collection("assessment_sessions").insert_one(session.dict())
        return session

    async def get_session(self, session_id: str) -> Optional[AssessmentSession]:
        data = await db.get_collection("assessment_sessions").find_one({"session_id": session_id})
        if data:
            return AssessmentSession(**data)
        return None
    
    async def save_session(self, session: AssessmentSession):
        await db.get_collection("assessment_sessions").replace_one(
            {"session_id": session.session_id},
            session.dict()
        )

