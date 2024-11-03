window.onscroll = function() {
    const header = document.getElementById("header");
    if (window.scrollY > 75) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }
};

document.addEventListener("DOMContentLoaded", function() {
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
