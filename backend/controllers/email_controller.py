from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from schemas import EmailAnalysisResponse, ErrorResponse
from services.file_service import extract_text_from_file
from services.ai_service import process_email
import os

router = APIRouter()

@router.post("/analyze", response_model=EmailAnalysisResponse, responses={400: {"model": ErrorResponse}})
async def analyze_email(
    file: UploadFile = File(None), 
    text: str = Form(None)
):
    """
    Recebe um arquivo OU texto.
    Lê a API KEY do ambiente.
    Retorna a análise da IA validada pelo Schema.
    """
    final_api_key = os.getenv("GEMINI_API_KEY")
    
    if not final_api_key:
        raise HTTPException(status_code=400, detail="API Key não configurada no servidor (.env).")

    content_to_process = ""

    if file:
        content = await file.read()
        content_to_process = await extract_text_from_file(content, file.filename)
    elif text:
        content_to_process = text
    else:
        raise HTTPException(status_code=400, detail="Envie um arquivo ou texto.")

    if not content_to_process:
        raise HTTPException(status_code=400, detail="Conteúdo vazio ou ilegível.")

    try:
        result = process_email(content_to_process, final_api_key)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
