const fileInput = document.getElementById("emailFile");
const clearFileBtn = document.getElementById("clearFileBtn");

// Mostra o ✖ quando tiver arquivo
fileInput.addEventListener("change", () => {
  if (fileInput.value) {
    clearFileBtn.classList.remove("d-none");
  } else {
    clearFileBtn.classList.add("d-none");
  }
});

// Ao clicar no ✖, limpa
clearFileBtn.addEventListener("click", () => {
  fileInput.value = "";
  clearFileBtn.classList.add("d-none");
});


// Função auxiliar para criar alertas temporários
function showAlert(message, type = "success") {
  const alertPlaceholder = document.createElement("div");
  alertPlaceholder.classList.add("animated-alert");
  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
  document.body.appendChild(alertPlaceholder);

  // força reflow para ativar a transição
  requestAnimationFrame(() => {
    alertPlaceholder.classList.add("show");
  });

  // Desaparece após 3 segundos
  setTimeout(() => {
    alertPlaceholder.classList.remove("show");
    alertPlaceholder.classList.add("hide");
    // Remove do DOM após animação
    alertPlaceholder.addEventListener("transitionend", () => {
      alertPlaceholder.remove();
    });
  }, 3000);
}

// Captura o envio do formulário
document.getElementById("emailForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = document.getElementById("emailText").value.trim();
  const fileInput = document.getElementById("emailFile");
  const file = fileInput.files[0];

  const resultSection = document.getElementById("resultSection");

  // Validação: precisa de texto ou arquivo
  if (!text && !file) {
    showAlert("O campo de texto precisa estar preenchido ou insira um arquivo .txt ou .pdf para avaliação.", "warning");
    return;
  }

  // Validação: extensão de arquivo
  if (file) {
    const validExtensions = [".txt", ".pdf"];
    const fileExt = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (!validExtensions.includes(fileExt)) {
      showAlert("Apenas arquivos .txt ou .pdf são aceitos.", "warning");
      fileInput.value = ""; // limpa arquivo inválido
      return;
    }
  }

  // Mostra loader
  resultSection.classList.remove("d-none");
  resultSection.innerHTML = `
    <div class="d-flex align-items-center">
      <strong>Processando email...</strong>
      <div class="spinner-border ms-3" role="status" aria-hidden="true"></div>
    </div>
  `;

  try {
    const formData = new FormData();
    if (text) formData.append("text", text);
    if (file) formData.append("file", file);


    const API_URL = process.env.REACT_APP_API_URL; // pega da variável de ambiente

    const response = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    // Formata quebras de linha
    const formattedReply = data.suggested_reply.replace(/\n/g, "<br>");

    // Atualiza a interface com os resultados
    resultSection.innerHTML = `
      <h2>Resultado</h2>
      <p><strong>Categoria:</strong> <span id="category">${data.category}</span></p>
      <p><strong>Resposta sugerida:</strong></p>
      <div id="suggestedReply" class="reply-box p-3 rounded">${formattedReply}</div>
      <button id="copyBtn" class="btn mt-3">Copiar resposta</button>
    `;

    // Estilo visual leve
    resultSection.style.borderColor = "#2563eb";
    resultSection.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";

    // Evento do botão de copiar
    document.getElementById("copyBtn").addEventListener("click", () => {
      const reply = document.getElementById("suggestedReply").innerText;
      navigator.clipboard.writeText(reply);
      showAlert("Resposta copiada com sucesso!", "success");
    });

  } catch (error) {
    showAlert("Erro ao processar email. Verifique se o backend está rodando.", "danger");
    console.error(error);
  }
});
