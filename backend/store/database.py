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
        if hasattr(settings, "MONGODB_URI") and settings.MONGODB_URI:
            mongo_url = settings.MONGODB_URI
        else:
            # Fallback (though settings should have it now)
            mongo_url = os.getenv("MONGODB_URI")
            
        if not mongo_url:
            print("Warning: MONGODB_URI not found in settings or environment, falling back to localhost")
            mongo_url = "mongodb://localhost:27017"
            
        try:
            self.client = MongoClient(mongo_url, serverSelectionTimeoutMS=5000)
            self.db = self.client["lumina_db"]
            # Test connection
            self.client.server_info()
            print(f"Connected to MongoDB at {mongo_url.split('@')[-1] if '@' in mongo_url else 'localhost'}")
        except Exception as e:
            print(f"Failed to connect to MongoDB: {e}")
            self.db = None
        print("Connected to MongoDB")

    def get_db(self):
        if self.db is None:
            self.connect()
        return self.db

db = Database()
