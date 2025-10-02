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
```

### 2.Instale as dependências

```bash
cd backend/
pip install -r requirements.txt
```

### 3. Configure sua chave da OpenAI
Crie um arquivo .env na raiz do projeto:
```bash
OPENAI_API_KEY=sk-xxxxxxx
```

### 4. Rode o servidor FastAPI

```bash
cd backend/
cd app/
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

# Exemplos para Testes

Na pasta `docs/` há dois arquivos de exemplo:  
- `teste.txt` → teste para **improdutivo**  
- `text-2.pdf` → teste para **produtivo**

#### Exemplo em texto

**Produtivo**
```text
Assunto: Confirmação de reunião
Corpo:
Bom dia,

Podemos confirmar a reunião de alinhamento para sexta-feira às 15h? Preciso ajustar a agenda dos envolvidos.

Obrigado,
Marcelo Dias
```

**Improdutivo**
```text
Assunto: Boas festas!
Corpo:
Oi, pessoal,

Desejo a todos um feliz Natal e um próspero Ano Novo! Que 2026 seja incrível para todos nós!

Abraços,
Luciana Ferreira
```





