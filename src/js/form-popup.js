document.addEventListener("DOMContentLoaded", () => {
            const saberMaisBtns = document.querySelectorAll(".servico-card a");
            const formOverlay = document.getElementById("form-overlay");
            const formContainer = document.getElementById("form-container");
            const closeBtn = document.getElementById("close-form");
            const servicoInput = document.getElementById("servicoInput");
            const hiddenServico = document.getElementById("servicoSelecionado");

            // Funções para bloquear/desbloquear scroll
            function lockBodyScroll() {
                document.body.style.overflow = 'hidden';
            }
            function unlockBodyScroll() {
                document.body.style.overflow = '';
            }

            // Abrir formulário
            saberMaisBtns.forEach(btn => {
                btn.addEventListener("click", (e) => {
                    e.preventDefault();
                    const card = btn.closest(".servico-card");
                    const titulo = card.querySelector("h4").textContent.trim();

                    servicoInput.value = titulo;
                    hiddenServico.value = titulo;

                    formOverlay.classList.remove("hidden");
                    lockBodyScroll(); // Bloqueia o scroll
                    setTimeout(() => {
                        formContainer.classList.add("show");
                    }, 50); // Pequeno delay para garantir que a transição CSS ocorra
                });
            });

            // Função para fechar o formulário
            function closeForm() {
                formContainer.classList.remove("show");
                setTimeout(() => {
                    formOverlay.classList.add("hidden");
                    unlockBodyScroll(); // Desbloqueia o scroll
                }, 500); // Deve corresponder à duração da transição de opacidade/transformação
            }

            // Fechar formulário pelo botão
            closeBtn.addEventListener("click", closeForm);

            // Fechar clicando fora
            formOverlay.addEventListener("click", (e) => {
                if (e.target === formOverlay) {
                    closeForm();
                }
            });

            // Fechar com a tecla ESC
            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && !formOverlay.classList.contains("hidden")) {
                    closeForm();
                }
            });

            // (Opcional) Simulação de envio
            const form = document.getElementById("solicitacao-form");
            form?.addEventListener("submit", (e) => {
                e.preventDefault();
                const submitBtn = form.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';

                setTimeout(() => {
                    submitBtn.textContent = 'Enviado ✓';
                    submitBtn.style.backgroundColor = '#10B981'; // Verde sucesso
                    setTimeout(() => {
                        closeForm();
                        // Resetar botão após fechar
                        setTimeout(() => {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Enviar Solicitação';
                            submitBtn.style.backgroundColor = ''; // Volta ao gradiente
                        }, 500);
                    }, 1200);
                }, 1000);
            });
        });