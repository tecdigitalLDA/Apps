/**
 * ========================================================
 * LÓGICA DO CARROSSEL - src/js/slides.js
 * ========================================================
 *
 * Este script controla a interatividade do carrossel de serviços.
 *
 * Funcionalidades:
 * 1.  **Inicialização**: Define o estado inicial, com o segundo item ativo
 * para que o efeito de escala seja visível imediatamente.
 * 2.  **Criação de Indicadores**: Gera os "dots" de navegação dinamicamente
 * com base no número de cartões existentes.
 * 3.  **Navegação por Clique**: Permite navegar ao clicar nos indicadores
 * ou nos próprios cartões laterais (inativos).
 * 4.  **Arrastar para Navegar (Drag/Swipe)**: Permite que o utilizador
 * arraste o carrossel com o rato ou com o toque (em dispositivos móveis).
 * 5.  **Atualização Centralizada**: A função `updateCarousel` é o coração
 * do sistema, responsável por:
 * - Centralizar o cartão ativo no ecrã.
 * - Aplicar as classes CSS '.ativo' para o efeito de zoom e opacidade.
 * - Sincronizar o indicador ativo.
 * 6.  **Responsividade**: O carrossel recalcula a sua posição central
 * automaticamente quando o tamanho da janela do navegador muda.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. SELEÇÃO DOS ELEMENTOS ---
  const viewport = document.querySelector('.carousel-viewport');
  const track = document.getElementById('carousel-track');
  const cards = document.querySelectorAll('.servico-card');
  const indicatorsContainer = document.getElementById('indicadores');

  if (!track || !cards.length) {
    console.error("Elementos do carrossel não encontrados. Verifique os IDs e classes no HTML.");
    return;
  }

  // --- 2. VARIÁVEIS DE ESTADO ---
  let currentIndex = 1; // Começa no segundo item para mostrar o efeito
  let isDragging = false;
  let startPos = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let animationID = 0;

  // --- 3. INICIALIZAÇÃO ---
  function initializeCarousel() {
    createIndicators();
    updateCarousel();
    attachEventListeners();
  }

  // --- 4. FUNÇÕES PRINCIPAIS ---

  /**
   * Atualiza a UI do carrossel para refletir o estado atual (currentIndex).
   * Move o 'track', aplica classes 'ativo' e atualiza os indicadores.
   */
  function updateCarousel() {
    // Calcula a posição para centralizar o cartão ativo
    const activeCard = cards[currentIndex];
    const cardWidth = activeCard.offsetWidth;
    const viewportWidth = viewport.offsetWidth;
    const offset = (viewportWidth / 2) - (cardWidth / 2) - activeCard.offsetLeft;

    track.style.transform = `translateX(${offset}px)`;
    currentTranslate = offset; // Atualiza a posição de translação

    // Atualiza as classes '.ativo' para os cartões
    cards.forEach((card, index) => {
      card.classList.toggle('ativo', index === currentIndex);
    });

    // Atualiza as classes '.ativo' para os indicadores
    const dots = indicatorsContainer.children;
    if (dots.length) {
       Array.from(dots).forEach((dot, index) => {
        dot.classList.toggle('ativo', index === currentIndex);
      });
    }
  }

  /**
   * Navega para um slide específico.
   * @param {number} index - O índice do cartão para o qual navegar.
   */
  function goToCard(index) {
    // Garante que o índice está dentro dos limites
    currentIndex = Math.max(0, Math.min(index, cards.length - 1));
    updateCarousel();
  }

  /**
   * Cria os indicadores (dots) com base no número de cartões.
   */
  function createIndicators() {
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
      // A estilização base já está no carousel.css
      dot.addEventListener('click', () => goToCard(index));
      indicatorsContainer.appendChild(dot);
    });
  }


  // --- 5. MANIPULADORES DE EVENTOS (EVENT HANDLERS) ---

  function attachEventListeners() {
    // Navegação ao clicar nos cartões
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (index !== currentIndex) {
          goToCard(index);
        }
      });
    });

    // Eventos de arrastar (rato e toque)
    viewport.addEventListener('mousedown', dragStart);
    viewport.addEventListener('touchstart', dragStart, { passive: true });

    viewport.addEventListener('mouseup', dragEnd);
    viewport.addEventListener('mouseleave', dragEnd);
    viewport.addEventListener('touchend', dragEnd);

    viewport.addEventListener('mousemove', dragging);
    viewport.addEventListener('touchmove', dragging, { passive: true });
    
    // Responsividade
    window.addEventListener('resize', updateCarousel);
  }

  function dragStart(event) {
    isDragging = true;
    startPos = getPositionX(event);
    animationID = requestAnimationFrame(animation);
    
    // Desativa a transição suave durante o arraste para um movimento mais direto
    track.style.transition = 'none';
  }

  function dragging(event) {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      // A translação atual é a diferença da posição, somada à posição anterior do track
      currentTranslate = prevTranslate + currentPosition - startPos;
    }
  }

  function dragEnd() {
    if (!isDragging) return; // Evita execuções múltiplas
    isDragging = false;
    cancelAnimationFrame(animationID);

    // Calcula qual cartão está mais próximo do centro após o arraste
    const movedBy = currentTranslate - prevTranslate;
    if (movedBy < -100 && currentIndex < cards.length - 1) {
      currentIndex += 1;
    }
    if (movedBy > 100 && currentIndex > 0) {
      currentIndex -= 1;
    }

    // Reativa a transição e "snaps" para o cartão correto
    track.style.transition = 'transform 0.5s ease';
    goToCard(currentIndex);
    
    // Guarda a posição final para o próximo arraste
    prevTranslate = currentTranslate;
  }
  
  // Função de animação para um arraste mais suave
  function animation() {
    track.style.transform = `translateX(${currentTranslate}px)`;
    if (isDragging) requestAnimationFrame(animation);
  }

  // Função auxiliar para obter a posição X correta para rato e toque
  function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
  }

  // --- Inicia todo o processo ---
  initializeCarousel();
});