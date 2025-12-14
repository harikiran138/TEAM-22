from pydantic import BaseModel, Field
from typing import List, Optional, Dict
from datetime import datetime

class QuestionMetadata(BaseModel):
    question_id: str
    concepts: List[str]
    difficulty: float = Field(..., ge=0.0, le=1.0)
    discrimination: float = 1.0  # How well it differentiates high/low ability
    guessing: float = 0.0  # Probability of guessing correctly
    blooms_level: str
    format: str = "mcq"

class Question(BaseModel):
    id: str
    content: str
    options: List[str]  # For MCQ
    correct_answer: str
    explanation: Optional[str] = None
    metadata: QuestionMetadata

class StudentResponse(BaseModel):
    question_id: str
    selected_answer: str
    is_correct: bool
    time_taken_seconds: float
    confidence: Optional[float] = None

class MasteryState(BaseModel):
    student_id: str
    # Map concept_name -> probability [0.0, 1.0]
    concept_mastery: Dict[str, float] = {}
    last_updated: datetime = Field(default_factory=datetime.now)
