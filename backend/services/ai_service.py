import google.generativeai as genai
import json

def process_email(email_content: str, api_key: str):
    """
    Envia o conteúdo para o Gemini e retorna um dicionário (dict) Python.
    """
    try:
        genai.configure(api_key=api_key)
        
        generation_config = {
            "temperature": 0.0,
            "top_p": 1,
            "max_output_tokens": 8192,
            "response_mime_type": "application/json",
        }

        system_instruction = """
        Você é um Auditor de Emails Corporativos.
        
        [NOTA DE ARQUITETURA]
        O desafio sugere pré-processamento de NLP (stemming/stopwords).
        Optamos por NÃO fazer isso pois LLMs (Gemini/GPT) performam melhor
        com contexto completo. A remoção de stopwords pode prejudicar a
        interpretação de tom e intenção em emails informais.
        
        REGRAS DE CLASSIFICAÇÃO:
        1. 'Produtivo': Requer ação, suporte, dúvidas, análise de erros ou envio de documentos.
        2. 'Improdutivo': Apenas agradecimentos, social, spam ou encerramento de conversa.
        
        OUTPUT OBRIGATÓRIO (JSON):
        {
            "classificacao": "Produtivo" ou "Improdutivo",
            "motivo": "Explicação técnica breve e direta",
            "assunto": "Sugestão de Assunto formal para a resposta",
            "resposta": "Corpo do email de resposta (sem saudação/assinatura, apenas o texto)"
        }
        """

        model = genai.GenerativeModel(
            model_name="gemini-2.5-flash-lite",
            generation_config=generation_config,
            system_instruction=system_instruction
        )
        
        # Exemplos para calibrar a IA
        history_examples = [
            {
                "role": "user",
                "parts": ["Analise: Muito obrigado pelo atendimento!"]
            },
            {
                "role": "model",
                "parts": [json.dumps({
                    "classificacao": "Improdutivo",
                    "motivo": "Agradecimento sem nova solicitação.",
                    "assunto": "RE: Atendimento",
                    "resposta": "Ficamos à disposição. Tenha um ótimo dia!"
                })]
            },
            {
                "role": "user",
                "parts": ["Analise: Segue o comprovante em anexo."]
            },
            {
                "role": "model",
                "parts": [json.dumps({
                    "classificacao": "Produtivo",
                    "motivo": "Envio de documento pendente.",
                    "assunto": "Confirmação de Recebimento",
                    "resposta": "Comprovante recebido. Vamos dar andamento ao processo."
                })]
            }
        ]

        chat = model.start_chat(history=history_examples)
        response = chat.send_message(f"Analise este email:\n\n{email_content}")
        
        return json.loads(response.text)

    except Exception as e:
        return {"erro": f"Erro na API Gemini: {str(e)}"}