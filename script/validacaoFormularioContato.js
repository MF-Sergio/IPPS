document
  .getElementById("contato-formulario")
  .addEventListener("submit", function (event) {
    var nomeInput = document.getElementById("fnome").value.trim();
    var emailInput = document.getElementById("fmail").value.trim();
    var telefoneInput = document.getElementById("ftel").value.trim();
    var mensagemInput = document.getElementById("fmensagem").value.trim();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex pattern

    if (nomeInput === "") {
      alert("Please enter your name.");
      event.preventDefault();
    } else if (!emailPattern.test(emailInput)) {
      alert("Please enter a valid email address.");
      event.preventDefault();
    } else if (telefoneInput === "") {
      alert("Please enter your message.");
      event.preventDefault();
    } else if (mensagemInput === "") {
      alert("Please enter your message.");
      event.preventDefault();
    }
  });
