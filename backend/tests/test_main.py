from fastapi.testclient import TestClient
from unittest.mock import patch
import os

from main import app
from tests.mocks import MOCK_PRODUTIVO, MOCK_IMPRODUTIVO

client = TestClient(app)

def test_read_root():
    """Testa se a API está online"""
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "online", "message": "AutoMail API rodando 🚀"}

@patch("controllers.email_controller.process_email")
def test_analyze_text_produtivo(mock_process_email):
    """
    Testa o envio de texto simples e verifica se o retorno é o esperado (MOCK).
    Não consome a API real.
    """
    mock_process_email.return_value = MOCK_PRODUTIVO
    
    with patch.dict(os.environ, {"GEMINI_API_KEY": "TEST_ENV_KEY"}):
        response = client.post(
            "/analyze",
            data={"text": "Gostaria de saber onde está meu pedido."}
        )
    
    assert response.status_code == 200
    assert response.json()["classificacao"] == "Produtivo"
    assert "pedido" in response.json()["motivo"]

@patch("controllers.email_controller.process_email")
def test_analyze_file_improdutivo(mock_process_email):
    """
    Testa envio de arquivo .txt (simulado)
    """
    mock_process_email.return_value = MOCK_IMPRODUTIVO
    
    files = {'file': ('email.txt', b'Muito obrigado!', 'text/plain')}
    
    with patch.dict(os.environ, {"GEMINI_API_KEY": "TEST_ENV_KEY"}):
        response = client.post(
            "/analyze",
            files=files
        )
    
    assert response.status_code == 200
    assert response.json()["classificacao"] == "Improdutivo"
