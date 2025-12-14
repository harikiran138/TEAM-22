from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Optional
import shutil
import os
import uuid
from datetime import datetime

router = APIRouter()

UPLOAD_DIR = "data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...), 
    type: str = Form(...), # 'assignment' or 'note'
    user_id: str = Form("guest"),
    course_id: str = Form("default"),
    assignment_id: Optional[str] = Form(None)
):
    """
    Upload an assignment or note - SIMPLIFIED VERSION WITH MOCK SUPPORT
    """
    try:
        # 1. Save File
        file_id = str(uuid.uuid4())
        ext = file.filename.split(".")[-1] if file.filename else "jpg"
        file_path = os.path.join(UPLOAD_DIR, f"{file_id}.{ext}")
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # 2. Mock OCR - simplified for now
        extracted_text = f"""This is a sample digitized text from your handwritten note.

[MOCK MODE Active - Install ML dependencies for real OCR]

Filename: {file.filename}
Upload Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}

Sample handwritten content:
- Introduction to the topic
- Key concepts and definitions  
- Important formulas or equations
- Summary and conclusions

Note: To enable real handwriting recognition, install the required ML models."""
        
        # 3. Prepare response
        doc_data = {
            "id": file_id,
            "course_id": course_id,
            "type": type,
            "image_path": file_path,
            "digital_text": extracted_text,
            "timestamp": datetime.now().isoformat(),
            "assignment_id": assignment_id,
            "mock_mode": True
        }
        
        if type == "note":
            # Mock AI analysis
            doc_data["ai_analysis"] = """**AI Summary & Improvements** [MOCK MODE]

**Summary:**
Your handwritten notes cover key concepts in an organized manner.

**Suggested Improvements:**
1. Add clear section headings
2. Use bullet points for better readability  
3. Include examples for complex concepts
4. Create a summary section at the end

**Next Steps:**
- Review and reorganize notes
- Add visual aids if applicable
- Connect concepts to previous lessons

Install AI dependencies for personalized analysis."""
            
        return {"status": "success", "data": doc_data}
        
    except Exception as e:
        print(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")

@router.get("/health")
def health():
    return {"status": "healthy", "mode": "mock"}
