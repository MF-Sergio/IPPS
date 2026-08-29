import type { DonationStatusView } from "../../application/get-donation-status.usecase.ts";
import type { Donation } from "../../domain/donation/donation.entity.ts";
import type { PaymentResult } from "../../domain/ports/payment-gateway.port.ts";

/**
 * O `paymentId` da Cielo nao entra na resposta de proposito: o navegador so
 * precisa do nosso `id`, que ja e suficiente para consultar status.
 */
export function toDonationResponse(donation: Donation, payment: PaymentResult): object {
  const base = {
    id: donation.id,
    status: donation.status,
    valor: donation.amount.reais,
    metodoPagamento: donation.method,
  };

  if (payment.method === "pix") {
    return {
      ...base,
      pix: {
        qrCodeBase64: payment.qrCodeBase64,
        qrCodeString: payment.qrCodeString,
        expiraEm: payment.expiresAt.toISOString(),
      },
    };
  }

  if (payment.method === "boleto") {
    return {
      ...base,
      boleto: {
        url: payment.url,
        linhaDigitavel: payment.digitableLine,
        codigoBarras: payment.barCode,
        vencimento: payment.dueDate.toISOString().slice(0, 10),
      },
    };
  }

  return {
    ...base,
    cartao: { bandeira: payment.brand, ultimosDigitos: payment.lastDigits },
  };
}

export function toStatusResponse(view: DonationStatusView): Record<string, unknown> {
  return {
    id: view.id,
    status: view.status,
    atualizadoEm: view.updatedAt.toISOString(),
  };
}
