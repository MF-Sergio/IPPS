window.onscroll = function () {
    const header = document.getElementById("header");
    if (window.scrollY > 75) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector('#header');
    const targetElement = document.querySelector('.collapse');
    const navlink = document.querySelectorAll('.nav-link');
    const dropdownitem = document.querySelectorAll('.dropdown-item');

    // Função para verificar se a classe 'show' está presente e pintar o cabeçalho de preto
    function checkClass() {
        if (window.innerWidth <= 775 && targetElement.classList.contains('show')) {
            header.style.backgroundColor = '#FFF3D9';
            navlink.forEach(item => {
                item.style.color = "#8AA895"
            });
            dropdownitem.forEach(item => {
                item.style.color = "#8AA895"
            });
        } else {
            header.style.backgroundColor = ''; // Volta ao estado original
            navlink.forEach(item => {
                item.style.color = ""
            });
            dropdownitem.forEach(item => {
                item.style.color = ""
            });
        }
    }

    // Configuração do MutationObserver
    const observer = new MutationObserver(checkClass);

    // Observa mudanças nos atributos do elemento alvo (incluindo a adição/remocão de classes)
    observer.observe(targetElement, { attributes: true, attributeFilter: ['class'] });

    // Checa inicialmente caso a classe já esteja aplicada
    checkClass();

    window.addEventListener('resize', checkClass);
});

// Botões da timeline Nossa História
document.addEventListener("DOMContentLoaded", function () {
    const timelineButtons = document.querySelectorAll(".timeline-btn");
    const timelineItems = document.querySelectorAll(".timeline-item");
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentIndex = 0;

    timelineButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove a classe 'active' de todos os botões
            timelineButtons.forEach(btn => btn.classList.remove("active"));
            // Adiciona 'active' ao botão clicado
            button.classList.add("active");

            // Exibe o conteúdo correspondente
            const year = button.getAttribute("data-year");
            timelineItems.forEach(item => {
                item.classList.remove("active");
                if (item.id === `year-${year}`) {
                    item.classList.add("active");
                }
            });
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