import type { DonationStatus, PaymentMethod } from "../../domain/donation/donation-status.ts";

/**
 * Traduz o Status transacional da Cielo para o status do IPPS.
 *
 * Depende do metodo por causa do codigo 1 (Authorized): em cartao ele significa
 * dinheiro reservado, aguardando captura; em boleto significa apenas que o
 * boleto foi emitido, sem nenhum dinheiro envolvido.
 */
export function mapCieloStatus(code: number, method: PaymentMethod): DonationStatus {
  switch (code) {
    case 0:
    case 12:
    case 20:
      return "pendente";
    case 1:
      return method === "boleto" ? "pendente" : "autorizada";
    case 2:
      return "confirmada";
    case 3:
      return "negada";
    case 10:
    case 11:
      return "cancelada";
    case 13:
      return "falhou";
    default:
      return "falhou";
  }
}
