# utils.py
import os
from dotenv import load_dotenv
import pdfplumber
import openai

load_dotenv() 
openai.api_key = os.getenv("OPENAI_API_KEY")

def extract_text_from_pdf(file_bytes: bytes) -> str:
    text = ""
    with pdfplumber.open(file_bytes) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text.strip()


def classify_email(email_text: str) -> tuple[str, str]:
    """
    Classifica o email como 'Produtivo' ou 'Improdutivo' e gera resposta sugerida.
    Compatível com openai>=1.0.0
    """
    prompt = f"""
Classifique o seguinte email como 'Produtivo' ou 'Improdutivo'.
Responda apenas com a categoria na primeira linha.
Depois, escreva uma resposta sugerida adequada.

Email:
\"\"\"{email_text}\"\"\"

Categorias de Classificação:
- Produtivo: Emails que requerem ação ou resposta específica (ex.: solicitações de suporte, dúvidas sobre o sistema, tarefas pendentes).
- Improdutivo: Emails que não necessitam de ação imediata (ex.: agradecimentos, felicitações, mensagens informais).
"""

    response = openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )

    content = response.choices[0].message.content.strip()
    lines = content.splitlines()
    category = lines[0].strip() if lines else "Produtivo"
    suggested_reply = "\n".join(lines[1:]).strip() if len(lines) > 1 else "Obrigado pelo contato."

    return category, suggested_reply
