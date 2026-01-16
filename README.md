# Desafio Técnico AutoU - Classificador de Emails Inteligente 📧

Este repositório contém a solução desenvolvida por mim para o **Desafio de Estágio em Desenvolvimento da AutoU**.

O objetivo do projeto é demonstrar competências em desenvolvimento Fullstack, integração com Inteligência Artificial e boas práticas de arquitetura de software, resolvendo o problema proposto de automatizar a triagem de emails corporativos.

## 🎯 Objetivo do Desafio

Desenvolver uma aplicação web que utilize IA para:
1.  **Classificar** emails em "Produtivo" ou "Improdutivo".
2.  **Sugerir respostas** automáticas baseadas na classificação.

## 🛠️ Tecnologias Escolhidas

### Frontend
*   **React 19 + Vite**
*   **TailwindCSS**
*   **Componentização**

### Backend
*   **FastAPI (Python)**
*   **Google Gemini (Via API)**

---

## 🚀 Como Rodar o Projeto

Instruções para executar a aplicação em seu ambiente local.

### Pré-requisitos
*   Node.js (v18 ou superior)
*   Python (v3.10 ou superior)
*   API Key do Google Gemini

### 1. Backend

```bash
# Entre na pasta
cd backend

# Crie o ambiente virtual (Recomendado)
python -m venv venv
# Ative: source venv/bin/activate (Linux/Mac) ou .\venv\Scripts\activate (Windows)

# Instale as dependências
pip install -r requirements.txt

# Configure a API Key
# Crie um arquivo .env na pasta backend com o conteúdo:
# GEMINI_API_KEY=sua_chave_aqui

# Rode o servidor
uvicorn main:app --reload
```

### 2. Frontend

```bash
# Entre na pasta
cd frontend

# Instale as dependências
npm install

# Rode a aplicação
npm run dev
```
Acesse em: `http://localhost:5173`