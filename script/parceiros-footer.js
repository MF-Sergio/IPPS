document.addEventListener("DOMContentLoaded", function () {
    const minPerSlide = 3; 
    const items = document.querySelectorAll(".carousel .carousel-item");

    items.forEach((el) => {
        let next = el.nextElementSibling;
        for (let i = 1; i < minPerSlide; i++) {
            if (!next) {
                next = items[0];
            }
            let cloneChild = next.cloneNode(true);
            el.appendChild(cloneChild.children[0]);
            next = next.nextElementSibling;
        }
    });
});
