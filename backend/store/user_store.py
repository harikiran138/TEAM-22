from datetime import datetime
from typing import Optional
import uuid
from .database import db
from app.core.security import get_password_hash, verify_password

class UserStore:
    """
    MongoDB store for Users.
    """
    def __init__(self):
        self.db = db.get_db()
        if self.db is not None:
            self.users_collection = self.db["users"]
            # Create index on email
            self.users_collection.create_index("email", unique=True)
        else:
            self.users_collection = None

    def verify_password(self, plain_password, hashed_password):
        return verify_password(plain_password, hashed_password)

    def get_password_hash(self, password):
        return get_password_hash(password)

    def create_user(self, email: str, password: str, full_name: str, role: str = "student") -> dict:
        if not self.users_collection:
            raise Exception("Database not connected")
            
        hashed_password = self.get_password_hash(password)
        user = {
            "id": str(uuid.uuid4()),
            "email": email,
            "hashed_password": hashed_password,
            "full_name": full_name,
            "role": role,
            "created_at": datetime.now().isoformat()
        }
        try:
            self.users_collection.insert_one(user)
            user.pop("_id", None)
            user.pop("hashed_password", None)
            return user
        except Exception as e:
            # Handle duplicate email likely
            if "duplicate key error" in str(e):
                raise Exception("Email already registered")
            raise e

    def get_user_by_email(self, email: str) -> Optional[dict]:
        if not self.users_collection:
            return None
        doc = self.users_collection.find_one({"email": email})
        if doc:
            doc.pop("_id", None)
            return doc
        return None

    def get_user_by_id(self, user_id: str) -> Optional[dict]:
        if not self.users_collection:
            return None
        doc = self.users_collection.find_one({"id": user_id})
        if doc:
            doc.pop("_id", None)
            return doc
        return None
