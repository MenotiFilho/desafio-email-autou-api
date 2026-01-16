from pypdf import PdfReader
from io import BytesIO

async def extract_text_from_file(file_content: bytes, filename: str) -> str:
    """
    Extrai texto de bytes (PDF ou TXT).
    """
    text = ""
    try:
        if filename.lower().endswith('.pdf'):
            pdf_file = BytesIO(file_content)
            reader = PdfReader(pdf_file)
            for page in reader.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        elif filename.lower().endswith('.txt'):
            text = file_content.decode("utf-8")
            
        return text.strip()
        
    except Exception as e:
        print(f"Erro ao ler arquivo {filename}: {e}")
        return ""