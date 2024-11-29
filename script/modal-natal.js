document.addEventListener("DOMContentLoaded", () => {
    const modal = new bootstrap.Modal(document.getElementById("natalModal"));
    const modalShown = sessionStorage.getItem("natalModalShown");
    const openModalButton = document.getElementById("openModalButton");


    openModalButton.addEventListener('click', () => {
      modal.show();
    });
})