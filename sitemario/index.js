document.addEventListener("DOMContentLoaded", function () {
  // --- Lógica para salvar/carregar TEXTO e IMAGENS ---

  // Prefixo para as chaves no localStorage
  const STORAGE_PREFIX_TEXT = "report_content_text_";
  const STORAGE_PREFIX_IMAGE = "report_content_image_";

  // 1. Identificar e preparar elementos editáveis de TEXTO
  const editableTextElements = document.querySelectorAll(
    '[contenteditable="true"]'
  );
  editableTextElements.forEach((element, index) => {
    const key = element.id || `data-persist-text-${index}`;
    element.dataset.persistId = key; // Armazena a chave no data-attribute
  });

  // 2. Carregar TEXTO ao carregar a página
  editableTextElements.forEach((element) => {
    const key = element.dataset.persistId;
    const savedContent = localStorage.getItem(STORAGE_PREFIX_TEXT + key);
    if (savedContent !== null) {
      element.innerHTML = savedContent;
    }
  });

  // 3. Salvar TEXTO em tempo real (evento 'input')
  editableTextElements.forEach((element) => {
    element.addEventListener("input", function () {
      const key = this.dataset.persistId;
      localStorage.setItem(STORAGE_PREFIX_TEXT + key, this.innerHTML);
    });
  });

  // --- Lógica para salvar/carregar IMAGENS ---

  // Selecionar todos os inputs de arquivo para troca de imagem
  const imageInputElements = document.querySelectorAll(
    'input[type="file"][data-target]'
  );

  // Selecionar todos os elementos <img> que podem ter suas fontes trocadas
  const imageElements = document.querySelectorAll("img[id]");

  // 4. Carregar IMAGENS ao carregar a página
  imageElements.forEach((img) => {
    const imageId = img.id;
    const savedImageData = localStorage.getItem(STORAGE_PREFIX_IMAGE + imageId);
    if (savedImageData) {
      img.src = savedImageData; // Define a imagem com a Data URL salva
    }
  });

  // 5. Salvar IMAGENS quando um novo arquivo é selecionado
  imageInputElements.forEach((input) => {
    input.addEventListener("change", function (event) {
      const targetImageId = this.dataset.target; // Pega o ID da imagem alvo do atributo data-target
      const targetImage = document.getElementById(targetImageId);

      if (event.target.files && event.target.files[0] && targetImage) {
        const reader = new FileReader();
        reader.onload = function (e) {
          targetImage.src = e.target.result; // Atualiza a imagem na página
          // Salva a imagem como Data URL no localStorage
          localStorage.setItem(
            STORAGE_PREFIX_IMAGE + targetImageId,
            e.target.result
          );
        };
        reader.readAsDataURL(event.target.files[0]); // Lê o arquivo como Data URL
      }
    });
  });

  // 6. Ativar o input de arquivo quando o botão 'Trocar Imagem' é clicado
  const changeImageButtons = document.querySelectorAll(".change-image-button");
  changeImageButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetImageId = this.dataset.target;
      // Encontra o input de arquivo que tem o mesmo data-target
      const fileInput = document.querySelector(
        `input[type="file"][data-target="${targetImageId}"]`
      );
      if (fileInput) {
        fileInput.click(); // Simula um clique no input de arquivo, abrindo a janela de seleção
      }
    });
  });

  // --- Lógica do Modal de Alerta e Impressão (Mantida e ajustada) ---

  // Referências aos elementos da modal
  const printToPDFButton = document.getElementById("printToPDFButton"); // Alterado para ID
  const sendEmailButton = document.getElementById("sendEmailButton"); // Alterado para ID
  const modal = document.getElementById("printAlertModal");
  const closeButton = document.querySelector(".close-button");
  const modalPrintButton = document.querySelector(".modal-print-button");

  function openModal() {
    modal.style.display = "flex";
    // Mostra o botão só quando abrir o modal
    const modalPrintButton = document.querySelector(".modal-print-button");
    if (modalPrintButton) modalPrintButton.style.display = "inline-block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  // Abre a modal quando o botão "Gerar PDF" é clicado
  if (printToPDFButton) {
    printToPDFButton.addEventListener("click", openModal);
  }

  // Tenta abrir a modal antes de qualquer tentativa de impressão (incluindo Ctrl+P)
  window.addEventListener("beforeprint", function () {
    if (modal.style.display !== "flex") {
      openModal();
    }
  });

  // Fecha a modal quando o botão de fechar (x) é clicado
  if (closeButton) {
    closeButton.addEventListener("click", closeModal);
  }

  // Fecha a modal e inicia a impressão quando o botão "Entendi, Gerar Impressão" é clicado
  if (modalPrintButton) {
    modalPrintButton.addEventListener("click", function () {
      closeModal();
      // Pequeno atraso para o navegador processar o fechamento do modal antes de abrir o diálogo de impressão
      setTimeout(function () {
        window.print();
      }, 100);
    });
  }

  // Fecha a modal se o usuário clicar fora do conteúdo da modal
  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      closeModal();
    }
  });

  // Adicionado lógica para o botão "Enviar Email" (se necessário)
  if (sendEmailButton) {
    sendEmailButton.addEventListener("click", function () {
      alert("Funcionalidade de Enviar Email ainda não implementada.");
      // Aqui você pode adicionar lógica para coletar o conteúdo e enviá-lo
    });
  }

  // Função printToPDF original se ainda for necessária para chamadas diretas
  window.printToPDF = function () {
    // Agora, este botão primeiro abre o modal
    openModal();
  };

  // Função sendEmail original se ainda for necessária para chamadas diretas
  window.sendEmail = function () {
    if (sendEmailButton) {
      sendEmailButton.click(); // Simula o clique no botão para disparar o alerta
    } else {
      alert("Funcionalidade de Enviar Email ainda não implementada.");
    }
  };

  // Função para numerar as páginas
  function numerarPaginas() {
    const pageNumbers = document.querySelectorAll(".page-number");
    pageNumbers.forEach((div, index) => {
      div.textContent = (index + 1).toString().padStart(2, "0");
    });
  }

  // Chama a função quando a página carrega
  numerarPaginas();

  // Chama a função novamente se houver alterações no DOM
  const observer = new MutationObserver(numerarPaginas);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
