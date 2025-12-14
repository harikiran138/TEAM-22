import sys
import os
import shutil

# Add backend to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

# Ensure we have a clean DB for test
TEST_DB_PATH = "./backend/db/chroma_test"
if os.path.exists(TEST_DB_PATH):
    shutil.rmtree(TEST_DB_PATH)

from ai_engine.rag import RAGEngine

# Mock the persistence path in the class for testing
# We'll just instantiate it and let it use the default path but ideally we'd config it
# For now, we will test the functionality. 

def test_rag_pipeline():
    print("Initializing RAG Engine...")
    # Monkey patch the client for testing to use Ephemeral
    import chromadb
    original_client = chromadb.PersistentClient
    chromadb.PersistentClient = lambda path: chromadb.EphemeralClient()
    
    rag = RAGEngine(collection_name="test_collection")
    
    # Restore
    chromadb.PersistentClient = original_client
    
    text = """
    Lumina AI is an advanced learning platform.
    It uses RAG to provide context-aware tutoring.
    The Pathway Agent optimizes learning trajectories.
    Handwriting analysis allows digitization of notes.
    """
    
    print("Testing Ingestion...")
    rag.ingest_text(text, {"source": "test_doc"})
    
    print("Testing Query (Vector Search + Re-Ranking)...")
    QUERY = "What does the Pathway Agent do?"
    results = rag.query(QUERY, n_results=1)
    
    print(f"Query: {QUERY}")
    print(f"Result: {results[0]}")
    
    assert len(results) > 0
    assert "Pathway Agent" in results[0]
    print("RAG Pipeline Verification Passed!")

if __name__ == "__main__":
    test_rag_pipeline()
