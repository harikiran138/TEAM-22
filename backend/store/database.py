from pymongo import MongoClient
import os
from app.core.config import settings

class Database:
    client: MongoClient = None
    db = None

    def connect(self):
        # Fallback to local if not in settings, though settings has a default.
        # Note: settings.DATABASE_URL in config.py is a postgres url string by default, 
        # so we should check if we should use that or a hardcoded one for now given requirements.txt has pymongo.
        # For this task, I'll use a standard local mongo url or env var.
        mongo_url = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
        self.client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
        self.db = self.client["lumina_db"]
        print("Connected to MongoDB")

    def get_db(self):
        if self.db is None:
            self.connect()
        return self.db

db = Database()
