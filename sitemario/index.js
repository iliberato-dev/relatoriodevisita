document.addEventListener('DOMContentLoaded', () => {
  // Lógica para numeração de páginas
  const pageContainers = document.querySelectorAll('.report-header, section, footer');
  let pageNum = 1;

  pageContainers.forEach(container => {
      const pageNumberDiv = container.querySelector('.page-number');
      if (pageNumberDiv) {
          pageNumberDiv.textContent = pageNum;
          pageNum++;
      }
  });

  // Lógica para manipulação de imagens (baseada no seu código)
  // Remove o uso de imageGallery, pois não está presente no HTML fornecido anteriormente
  const changeImageButtons = document.querySelectorAll('.change-image-button');

  changeImageButtons.forEach(button => {
      button.addEventListener('click', () => {
          const targetId = button.dataset.target;
          const inputElement = document.querySelector(`input[data-target="${targetId}"]`);
          if (inputElement) { // Verifica se o inputElement existe
              inputElement.click(); // Dispara a seleção de arquivo
          }
      });
  });

  document.body.addEventListener('change', (event) => {
      const inputElement = event.target;
      if (inputElement.tagName === 'INPUT' && inputElement.type === 'file' && inputElement.dataset.target && inputElement.files && inputElement.files[0]) {
          const targetImageId = inputElement.dataset.target;
          const imgElement = document.getElementById(targetImageId);
          const file = inputElement.files[0];
          const reader = new FileReader();

          reader.onload = (e) => {
              if (imgElement) { // Verifica se o imgElement existe
                  imgElement.src = e.target.result;
              }
          }
          reader.readAsDataURL(file);
      }
  });

  // Lógica para tornar elementos contenteditable (se ainda desejar)
  document.querySelectorAll('[contenteditable="true"]').forEach(element => {
      element.addEventListener('focus', function() {
          // Opcional: Adicionar classe para destacar o elemento em edição
          // this.classList.add('editing');
      });
      element.addEventListener('blur', function() {
          // Opcional: Remover classe de destaque
          // this.classList.remove('editing');
      });
  });
});

// Funções de impressão e envio de e-mail (baseadas no seu código)
function printToPDF() {
  window.print();
}

function sendEmail() {
  // Esta é uma simplificação e tem limitações!
  // Para uma solução mais robusta, você precisaria de um backend.
  const subject = encodeURIComponent("Relatório AVCB");
  const body = encodeURIComponent("Por favor, encontre o relatório em anexo.");
  const mailtoLink = `mailto:isaque.cedesp@gmail.com?subject=${subject}&body=${body}`; // Substitua com seu e-mail (ou deixe em branco)
  window.location.href = mailtoLink;
}

document.addEventListener('DOMContentLoaded', function() {
  const printButton = document.getElementById('printButton');
  const modal = document.getElementById('printAlertModal');
  const closeButton = document.querySelector('.close-button');
  const modalPrintButton = document.querySelector('.modal-print-button');

  // --- Funções para controlar a Modal ---
  function openModal() {
      modal.style.display = 'flex'; // Abre a modal
  }

  function closeModal() {
      modal.style.display = 'none'; // Fecha a modal
  }

  // --- Event Listeners ---

  // 1. Abre a modal quando o botão "Gerar PDF / Imprimir" é clicado
  if (printButton) {
      printButton.addEventListener('click', openModal);
  }

  // 2. Tenta abrir a modal antes de qualquer tentativa de impressão (incluindo Ctrl+P)
  // ATENÇÃO: O comportamento pode variar entre navegadores. Teste!
  window.addEventListener('beforeprint', function() {
      // Se a modal já não estiver visível, mostre-a.
      // Isso evita que ela reapareça se o usuário já a tiver aberto pelo botão.
      if (modal.style.display !== 'flex') {
          openModal();
          // É CRÍTICO *não* chamar window.print() aqui diretamente,
          // pois o fluxo de impressão já foi iniciado.
          // O usuário deve fechar a modal manualmente ou clicar no botão "Entendi".
      }
  });

  // 3. Fecha a modal quando o botão de fechar (x) é clicado
  if (closeButton) {
      closeButton.addEventListener('click', closeModal);
  }

  // 4. Fecha a modal e inicia a impressão quando o botão "Entendi, Gerar Impressão" é clicado
  if (modalPrintButton) {
      modalPrintButton.addEventListener('click', function() {
          closeModal(); // Esconde a modal imediatamente
          // Adicione um pequeno atraso para dar tempo ao navegador de renderizar
          // o fechamento da modal antes de abrir o diálogo de impressão.
          setTimeout(function() {
              window.print();
          }, 100); // 100 milissegundos de atraso
      });
  }

  // 5. Fecha a modal se o usuário clicar fora do conteúdo da modal
  window.addEventListener('click', function(event) {
      if (event.target == modal) {
          closeModal();
      }
  });
});
