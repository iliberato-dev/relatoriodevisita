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