# MyGPT

Este projeto é uma aplicação de chat interativa que integra modelos avançados de Inteligência Artificial: **OpenAI (GPT-4)** e **Google Gemini**. O objetivo é fornecer uma interface de comunicação com essas IAs por meio de um backend unificado que faz a ponte entre a interface do usuário e as APIs dos provedores.

O projeto está dividido em três componentes principais:
1. **Backend (Python com FastAPI)**: Gerencia a integração com a OpenAI (`gpt-4.1-mini`) e Google Gemini (`gemini-2.0-flash`).
2. **Interface Rápida (Estática HTML)**: Um dashboard construído com HTML e TailwindCSS (`static/Interface.html`) para testar o backend de maneira imediata.
3. **Frontend (Angular)**: Uma aplicação estruturada em Angular (`frontend/angular-app`) configurada para funcionar futuramente com o projeto.

---

## Estrutura de Pastas

```text
MyGPT/
│
├── backend/            # Servidor da aplicação (API)
│   └── main.py         # Arquivo principal do FastAPI com a integração de LLM
│
├── frontend/           # Aplicação frontend rica 
│   └── angular-app/    # Base de código do Angular
│
└── static/             # Interface Vanilla de teste
    └── Interface.html  # Dashboard principal e estilos
```

---

## Como Executar o Projeto

### 1. Preparando o Backend (Python)

1. Abra o terminal e navegue para a pasta do backend:
   ```bash
   cd backend
   ```

2. Recomenda-se criar um ambiente virtual (opcional):
   ```bash
   python -m venv venv
   venv\Scripts\activate   # No Windows
   ```

3. Instale as dependências requeridas pelo `main.py`:
   ```bash
   pip install fastapi uvicorn openai google-genai python-dotenv
   ```

4. Crie um arquivo chamado `.env` dentro da pasta `backend` e configure suas chaves de API. O arquivo deve ter este formato:
   ```env
   OPENAI_API_KEY=coloque_sua_chave_openai_aqui
   GEMINI_API_KEY=coloque_sua_chave_gemini_aqui
   ```

5. Inicie o servidor Backend:
   ```bash
   uvicorn main:app --reload
   ```
   > O servidor estará rodando em `http://127.0.0.1:8000` e possui as permissões de CORS configuradas.

---

### 2. Executando o Frontend

Você possui dois métodos de ver este projeto:

#### Método A: Usando o arquivo estático HTML (Simples e Rápido)
Acesse a pasta `static` e apenas abra o arquivo `Interface.html` em qualquer navegador web duplo-clique no arquivo). A página está programada em JavaScript puro para buscar respostas da API rodando em `127.0.0.1:8000`.

#### Método B: Usando a aplicação base do Angular
Caso queira compilar a aplicação Angular:
1. Abra um terminal e entre na subpasta:
   ```bash
   cd frontend/angular-app
   ```
2. Instale as dependências usando Node.js:
   ```bash
   npm install
   ```
3. Rode o servidor de desenvolvimento:
   ```bash
   npm start
   ```
   > Acessando `http://localhost:4200` no seu navegador, a aplicação será exibida. O backend (FastAPI) já possui regra permissiva de CORS validada para esta URL.

---

## 🛠️ Observações Técnicas

- O endpoint da API do backend está acessível como: `POST http://127.0.0.1:8000/chat`.
- O payload em `JSON` aceito é:
  ```json
  {
      "message": "Qual é a capital do Brasil?",
      "provider": "gpt" 
  }
  ```
  *(O `provider` pode mudar entre `"gpt"` ou `"gemini"`. Se não for enviado, o padrão é `"gpt"`)*.
