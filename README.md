# 📧 Email Classifier & PDF Extractor

Aplicação **full stack** que utiliza **FastAPI** no backend e uma interface web simples no frontend para:

- 📂 Classificar e-mails em **Produtivo** ou **Improdutivo**
- 🤖 Gerar respostas automáticas sugeridas via **OpenAI API**
- 📑 Suportar upload de texto direto ou de arquivos `.txt` e `.pdf`

---

## 🚀 Tecnologias Utilizadas

- **Backend**
  - [FastAPI](https://fastapi.tiangolo.com/) — API backend
  - [Uvicorn](https://www.uvicorn.org/) — Servidor ASGI
  - [pdfplumber](https://github.com/jsvine/pdfplumber) — Extração de texto de PDFs
  - [OpenAI API](https://platform.openai.com/) — Classificação e geração de respostas
  - [python-dotenv](https://pypi.org/project/python-dotenv/) — Gerenciamento de variáveis de ambiente

- **Frontend**
  - HTML, CSS e JavaScript
  - [Bootstrap 5](https://getbootstrap.com/) — Estilização responsiva
  - [Phosphor Icons](https://phosphoricons.com/) — Ícones


## ⚙️ Configuração do Backend

### 1. Clone o repositório
```bash
git clone https://github.com/fernando-c-lima/auto-email-classifier.git
cd backend/
cd app/
```

### 2.Instale as dependências

```bash
pip install -r requirements.txt
```

### 3. Configure sua chave da OpenAI
Crie um arquivo .env dentro da pasta backend/:
```bash
OPENAI_API_KEY=sk-xxxxxxx
```

### 4. Rode o servidor FastAPI

```bash
uvicorn main:app --reload
```

A API estará disponível em:
```bash
http://localhost:8000
```


# 💻 Execução do Frontend

#### 1. Entre na pasta frontend/

#### 2. Abra o arquivo index.html no navegador (duplo clique ou use extensão como Live Server no VS Code)

#### 3. Preencha o campo de texto ou faça upload de um .txt ou .pdf

#### 4. Clique em Processar e veja a classificação + resposta sugerida






