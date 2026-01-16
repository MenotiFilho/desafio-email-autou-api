from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controllers import email_controller
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="AutoMail API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registra as rotas do novo Controller
app.include_router(email_controller.router)

@app.get("/")
def read_root():
    return {"status": "online", "message": "AutoMail API rodando 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)