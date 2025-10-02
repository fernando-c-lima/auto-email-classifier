from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from .utils import classify_email, extract_text_from_pdf
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/predict")
async def predict(text: str = Form(None), file: UploadFile = File(None)):
    if file:
        contents = await file.read()
        if file.filename.endswith(".pdf"):
            text_content = extract_text_from_pdf(io.BytesIO(contents))
        else:
            text_content = contents.decode("utf-8", errors="ignore")
    else:
        text_content = text or ""

    category, suggested_reply = classify_email(text_content)

    return {"category": category, "suggested_reply": suggested_reply}
