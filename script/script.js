const mostrarSMPD = function () {
    const btnSMPD = document.querySelector(".mostrar-smpd");
    const secaoSMPD = document.querySelector(".secao-smpd");

    btnSMPD.addEventListener("click", () => {
        secaoSMPD.classList.toggle("mostrar");
    });
}

// Função para adicionar/remover classe no header ao rolar a página
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

// Função para observar mudanças no menu de navegação e ajustar o estilo do header
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

// Função para configurar a timeline "Nossa História"
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

        timelineButtons.forEach(button => {
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
            });
        });

        // Ativar o primeiro ano por padrão
        timelineButtons[0].click();

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? timelineButtons.length - 1 : currentIndex - 1;
            timelineButtons[currentIndex].click();
        });
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex === timelineButtons.length - 1) ? 0 : currentIndex + 1;
            timelineButtons[currentIndex].click();
        });


    });

    mostrarSMPD();