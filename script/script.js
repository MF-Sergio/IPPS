const mostrarSMPD = function () {
    const btnSMPD = document.querySelector(".mostrar-smpd");
    const secaoSMPD = document.querySelector(".secao-smpd");

    btnSMPD.addEventListener("click", () => {
        secaoSMPD.classList.toggle("mostrar");
    });
}

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

document.addEventListener("DOMContentLoaded", () => {
    const botoes = document.querySelectorAll(".carrossel__botoes h3");
    const itens = document.querySelectorAll(".carrossel__item");

    let itemAtual = document.querySelector(".carrossel__item.ativo");

    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const proximoItem = document.getElementById(botao.dataset.target);

            if (proximoItem === itemAtual) return; // Se já está ativo, não faz nada

            // Remove a classe 'ativo' dos botões
            botoes.forEach(b => b.classList.remove("ativo"));
            botao.classList.add("ativo");

            // Anima a saída do item atual
            itemAtual.classList.add("saindo");

            setTimeout(() => {
                // Remove a classe 'ativo' e 'saindo' do item atual
                itemAtual.classList.remove("ativo", "saindo");

                // Ativa o próximo item
                proximoItem.classList.add("ativo");
                itemAtual = proximoItem;
            }, 300);
        });
    });
});

mostrarSMPD();