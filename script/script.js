// =====================
// Header e Navegação
// =====================

// Mostra/oculta a seção SMPD
function setupSMPD() {
    const btnSMPD = document.querySelector(".mostrar-smpd");
    const secaoSMPD = document.querySelector(".secao-smpd");

    if (btnSMPD && secaoSMPD) {
        btnSMPD.addEventListener("click", () => {
            secaoSMPD.classList.toggle("mostrar");
        });
    }
}

// Adiciona/remover classe no header ao rolar a página
function setupHeaderScroll() {
    const header = document.getElementById("header");

    if (header) {
        window.onscroll = function () {
            if (window.scrollY > 100) {
                header.classList.add("header-scrolled");
            } else {
                header.classList.remove("header-scrolled");
            }
        };
    }
}

// Observa mudanças no menu de navegação e ajusta o estilo do header
function setupNavbarObserver() {
    const header = document.querySelector('#header');
    const targetElement = document.querySelector('.collapse');
    const navlink = document.querySelectorAll('.nav-link');
    const dropdownitem = document.querySelectorAll('.dropdown-item');

    if (header && targetElement) {
        function checkClass() {
            if (window.innerWidth <= 775 && targetElement.classList.contains('show')) {
                header.style.backgroundColor = '#FFF3D9';
                dropdownitem.forEach(item => item.style.color = "#8AA895");
            } else {
                header.style.backgroundColor = '';
                navlink.forEach(item => item.style.color = "");
                dropdownitem.forEach(item => item.style.color = "");
            }
        }

        const observer = new MutationObserver(checkClass);
        observer.observe(targetElement, { attributes: true, attributeFilter: ['class'] });
        checkClass();
        window.addEventListener('resize', checkClass);
    }
}

// =====================
// Timeline "Nossa História"
// =====================

function setupTimeline() {
    const timelineButtons = document.querySelectorAll(".timeline-btn");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    if (timelineButtons.length > 0 && timelineItems.length > 0) {
        function activateTimelineItem(year) {
            timelineItems.forEach(item => {
                item.classList.remove("active");
                if (item.id === `year-${year}`) {
                    item.classList.add("active");
                }
            });
        }

        timelineButtons.forEach((button, idx) => {
            button.addEventListener("click", () => {
                timelineButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");

                const year = button.getAttribute("data-year");
                activateTimelineItem(year);

                const group = button.getAttribute("data-group");
                const timelineContent = document.querySelector('.timeline-content');
                if (timelineContent) {
                    timelineContent.classList.remove('grupo-1', 'grupo-2', 'grupo-3', 'grupo-4');
                    timelineContent.classList.add(group);
                }
                currentIndex = idx;
            });
        });

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', () => {
                currentIndex = (currentIndex === 0) ? timelineButtons.length - 1 : currentIndex - 1;
                timelineButtons[currentIndex].click();
            });

            nextButton.addEventListener('click', () => {
                currentIndex = (currentIndex === timelineButtons.length - 1) ? 0 : currentIndex + 1;
                timelineButtons[currentIndex].click();
            });
        }

        // Ativar o primeiro ano por padrão
        timelineButtons[0].click();
    }
}

// =====================
// Carrossel
// =====================

function setupCarousel() {
    const botoes = document.querySelectorAll(".carrossel__botoes h3");
    const itens = document.querySelectorAll(".carrossel__item");

    if (botoes.length > 0 && itens.length > 0) {
        let itemAtual = document.querySelector(".carrossel__item.ativo");

        botoes.forEach(botao => {
            botao.addEventListener("click", () => {
                const proximoItem = document.getElementById(botao.dataset.target);

                if (proximoItem === itemAtual) return;

                botoes.forEach(b => b.classList.remove("ativo"));
                botao.classList.add("ativo");

                itemAtual.classList.add("saindo");

                setTimeout(() => {
                    itemAtual.classList.remove("ativo", "saindo");
                    proximoItem.classList.add("ativo");
                    itemAtual = proximoItem;
                }, 300);
            });
        });
    }
}

// =====================
// Projetos
// =====================

function setupProjetos() {
    const titulosProjetos = document.querySelectorAll(".titulo-projeto");
    const projetos = document.querySelectorAll(".projeto-container");
    const containerProjetos = document.querySelector(".container-projetos");

    if (titulosProjetos.length > 0 && projetos.length > 0 && containerProjetos) {
        function ajustarAlturaProjetos() {
            const larguraTela = window.innerWidth;
            let alturaProjeto = larguraTela <= 425 ? "820px" : larguraTela <= 1024 ? "1024px" : "600px";

            titulosProjetos.forEach(titulo => {
                titulo.addEventListener("mouseenter", () => {
                    const target = titulo.getAttribute("data-target");

                    projetos.forEach(projeto => projeto.classList.remove("ativo"));
                    const projetoAtivo = document.getElementById(target);

                    if (projetoAtivo) {
                        projetoAtivo.classList.add("ativo");
                        containerProjetos.style.height = alturaProjeto;
                    } else {
                        containerProjetos.style.height = "0";
                    }
                });
            });

            projetos.forEach(projeto => projeto.classList.remove("ativo"));
        }

        ajustarAlturaProjetos();
        window.addEventListener("resize", ajustarAlturaProjetos);
    }
}

// =====================
// Inicialização
// =====================

document.addEventListener("DOMContentLoaded", function () {
    setupSMPD();
    setupHeaderScroll();
    setupNavbarObserver();
    setupTimeline();
    setupCarousel();
    setupProjetos();
});