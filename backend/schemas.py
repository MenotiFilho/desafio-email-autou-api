from pydantic import BaseModel
from typing import Optional

class EmailAnalysisResponse(BaseModel):
    classificacao: str
    motivo: str
    assunto: Optional[str] = None
    resposta: Optional[str] = None

class ErrorResponse(BaseModel):
    erro: str
