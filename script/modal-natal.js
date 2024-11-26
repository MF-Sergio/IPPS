document.addEventListener("DOMContentLoaded", () => {
    const modal = new bootstrap.Modal(document.getElementById("natalModal"));
    const modalShown = sessionStorage.getItem("natalModalShown");
    const openModalButton = document.getElementById("openModalButton");

    if (!modalShown) {
      setTimeout(() => {
        modal.show();
        sessionStorage.setItem("natalModalShown", "true");
      }, 1000)
    }

    openModalButton.addEventListener('click', () => {
      modal.show();
    });
})