export function buildPaymentMethods(metodoPagamento) {
  if (metodoPagamento === "pix") {
    return {
      installments: 1,
      excluded_payment_types: [
        { id: "credit_card" },
        { id: "debit_card" },
        { id: "ticket" },
      ],
    };
  }

  if (metodoPagamento === "boleto") {
    return {
      installments: 1,
      excluded_payment_types: [
        { id: "credit_card" },
        { id: "debit_card" },
        { id: "bank_transfer" },
      ],
    };
  }

  return {
    installments: 1,
    excluded_payment_types: [{ id: "ticket" }, { id: "bank_transfer" }],
  };
}
