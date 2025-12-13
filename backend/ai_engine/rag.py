import chromadb
import requests
import uuid
from typing import List, Dict, Any, Optional

class RAGEngine:
    def __init__(self, collection_name: str = "course_content"):
        # Use persistent storage in the 'db' directory
        self.client = chromadb.PersistentClient(path="./backend/db/chroma")
        self.collection = self.client.get_or_create_collection(name=collection_name)
        self.ollama_host = "http://localhost:11434"

    def get_embedding(self, text: str) -> List[float]:
        try:
            response = requests.post(
                f"{self.ollama_host}/api/embeddings",
                json={"model": "llama3", "prompt": text}
            )
            response.raise_for_status()
            return response.json()["embedding"]
        except Exception as e:
            print(f"Embedding Error: {e}")
            return []

    def ingest_text(self, text: str, metadata: Dict[str, Any] = None):
        if not text.strip():
            return
            
        # Simple chunking by paragraph for now
        chunks = [c.strip() for c in text.split('\n\n') if c.strip()]
        
        ids = [str(uuid.uuid4()) for _ in chunks]
        embeddings = [self.get_embedding(chunk) for chunk in chunks]
        
        # Filter out failed embeddings
        valid_data = [(i, c, e) for i, c, e in zip(ids, chunks, embeddings) if e]
        
        if not valid_data:
            return

        self.collection.add(
            ids=[x[0] for x in valid_data],
            documents=[x[1] for x in valid_data],
            embeddings=[x[2] for x in valid_data],
            metadatas=[metadata or {} for _ in valid_data]
        )
        print(f"Ingested {len(valid_data)} chunks.")

    def query(self, query_text: str, n_results: int = 3) -> List[str]:
        query_embedding = self.get_embedding(query_text)
        if not query_embedding:
            return []
            
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )
        
        # Flatten results
        documents = results['documents'][0] if results['documents'] else []
        return documents

# Singleton
rag_engine = RAGEngine()
