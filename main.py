from dotenv import load_dotenv
import os
from openai import OpenAI

# Carrega variáveis de ambiente
load_dotenv()

# Inicializa cliente OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def main():
    print("=== Chat com GPT (Terminal) ===")
    print("Digite 'sair' para encerrar.\n")

    while True:
        prompt = input("Você: ")

        if prompt.lower() == "sair":
            print("Encerrando...")
            break

        try:
            response = client.chat.completions.create(
                model="gpt-5.1-mini",
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            resposta = response.choices[0].message.content
            print("\nGPT:", resposta, "\n")

        except Exception as e:
            print("Erro ao consultar o GPT:", e)

if __name__ == "__main__":
    main()
