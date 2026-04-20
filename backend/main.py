from dotenv import load_dotenv
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from openai import OpenAI
from google import genai

load_dotenv()

# clientes
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
gemini_client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat(data: dict):

    message = data.get("message")
    provider = data.get("provider", "gpt")

    try:

        # ---------- GPT ----------
        if provider == "gpt":

            response = openai_client.chat.completions.create(
                model="gpt-4.1-mini",
                messages=[{"role": "user", "content": message}]
            )

            reply = response.choices[0].message.content

        # ---------- GEMINI ----------
        elif provider == "gemini":

            response = gemini_client.models.generate_content(
                model="gemini-1.5-flash",
                contents=message
            )

            reply = response.text

        else:
            raise HTTPException(400, "Provider inválido")

        return {"response": reply}

    except Exception as e:
        print("ERRO REAL >>>", repr(e))
        error_msg = str(e).lower()
        if "429" in error_msg or "resource_exhausted" in error_msg or "quota" in error_msg:
            raise HTTPException(status_code=429, detail="A cota do modelo gratuito foi excedida. Aguarde um momento e tente novamente.")
        if "401" in error_msg or "invalid_api_key" in error_msg or "incorrect api key" in error_msg:
            raise HTTPException(status_code=401, detail="Chave de API (OpenAI/Gemini) ausente ou incorreta. Verifique seu arquivo .env!")
        raise HTTPException(status_code=500, detail="Erro interno no servidor ao contactar a IA.")