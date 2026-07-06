export function sanitizeText(value, maxLength) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function isValidEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

export function splitName(nome) {
  const [firstName, ...rest] = nome.split(" ");
  return {
    firstName: firstName || "Doador",
    lastName: rest.join(" ").slice(0, 80),
  };
}

export function paymentMethodLabel(metodoPagamento) {
  const labels = {
    pix: "Pix",
    cartao: "cartão",
    boleto: "boleto",
  };

  return labels[metodoPagamento] || "Mercado Pago";
}

export function normalizeStatementDescriptor(value) {
  return sanitizeText(value, 16)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/gi, "")
    .trim()
    .toUpperCase()
    .slice(0, 16);
}
