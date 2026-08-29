import type { Donation } from "../../domain/donation/donation.entity.ts";
import type { PaymentMethod } from "../../domain/donation/donation-status.ts";
import type { PaymentResult, PaymentSnapshot } from "../../domain/ports/payment-gateway.port.ts";
import type { CardCredentials } from "../../domain/shared/card-credentials.ts";
import type { CieloConfig } from "../config/app.config.ts";
import { mapCieloStatus } from "./cielo-status.map.ts";

export class CieloResponseError extends Error {
  readonly code = "CIELO_INVALID_RESPONSE";

  constructor(message: string) {
    super(message);
    this.name = "CieloResponseError";
  }
}

export interface BuildSaleOptions {
  config: CieloConfig;
  cardToken: string | null;
  card: CardCredentials | null;
  now: Date;
}

const CIELO_TYPE: Record<PaymentMethod, string> = {
  pix: "Pix",
  cartao: "CreditCard",
  boleto: "Boleto",
};

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function readRecord(value: unknown, key: string): Record<string, unknown> {
  const parent = value as Record<string, unknown> | null;
  const child = parent?.[key];
  if (!child || typeof child !== "object") {
    throw new CieloResponseError(`Resposta da Cielo sem o campo ${key}.`);
  }
  return child as Record<string, unknown>;
}

export function buildSaleRequest(donation: Donation, options: BuildSaleOptions): object {
  const { config, cardToken, card, now } = options;

  const customer: Record<string, unknown> = {
    Name: donation.donor.name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z \-']/g, "")
      .trim(),
    Identity: donation.donor.cpf.digits,
    IdentityType: donation.donor.cpf.identityType,
    Email: donation.donor.email.value,
  };

  const payment: Record<string, unknown> = {
    Type: CIELO_TYPE[donation.method],
    Amount: donation.amount.cents,
  };

  if (donation.method === "cartao") {
    if (!cardToken || !card) {
      throw new CieloResponseError("Pagamento com cartao exige token e credenciais.");
    }
    payment["Installments"] = 1;
    payment["Capture"] = true;
    payment["SoftDescriptor"] = config.softDescriptor;
    payment["CreditCard"] = {
      CardToken: cardToken,
      SecurityCode: card.reveal().cvv,
      Brand: card.brand,
    };
  }

  if (donation.method === "boleto") {
    const address = donation.donor.address;
    if (!address) {
      throw new CieloResponseError("Boleto exige endereco do doador.");
    }

    customer["Address"] = {
      Street: address.street,
      Number: address.number,
      Complement: address.complement,
      District: address.district,
      City: address.city,
      State: address.state,
      ZipCode: address.zipCode,
      Country: address.country,
    };

    const dueDate = new Date(now.getTime() + config.boleto.expirationDays * 86_400_000);
    payment["Provider"] = config.boleto.provider;
    payment["Assignor"] = config.boleto.assignor;
    payment["Identification"] = config.boleto.identification;
    payment["Instructions"] = config.boleto.instructions;
    payment["ExpirationDate"] = toIsoDate(dueDate);
  }

  return { MerchantOrderId: donation.id, Customer: customer, Payment: payment };
}

export function parsePaymentResult(
  raw: unknown,
  donation: Donation,
  expiresAt: Date,
): PaymentResult {
  const payment = readRecord(raw, "Payment");
  const paymentId = String(payment["PaymentId"] ?? "");
  const statusCode = Number(payment["Status"]);

  if (!paymentId || !Number.isFinite(statusCode)) {
    throw new CieloResponseError("Resposta da Cielo sem PaymentId ou Status.");
  }

  const status = mapCieloStatus(statusCode, donation.method);

  if (donation.method === "pix") {
    // A documentacao da Cielo usa duas grafias para o mesmo campo.
    const qrCodeBase64 = String(
      payment["QrCodeBase64Image"] ?? payment["QrcodeBase64Image"] ?? "",
    );
    const qrCodeString = String(payment["QrCodeString"] ?? "");

    if (!qrCodeBase64 || !qrCodeString) {
      throw new CieloResponseError("Resposta de Pix sem QR Code.");
    }

    return { method: "pix", paymentId, status, qrCodeBase64, qrCodeString, expiresAt };
  }

  if (donation.method === "boleto") {
    const url = String(payment["Url"] ?? "");
    const digitableLine = String(payment["DigitableLine"] ?? "");
    const barCode = String(payment["BarCodeNumber"] ?? "");

    if (!url || !digitableLine) {
      throw new CieloResponseError("Resposta de boleto sem URL ou linha digitavel.");
    }

    return {
      method: "boleto", paymentId, status, url, digitableLine, barCode,
      dueDate: new Date(String(payment["ExpirationDate"] ?? toIsoDate(expiresAt))),
    };
  }

  const creditCard = (payment["CreditCard"] ?? {}) as Record<string, unknown>;
  const maskedNumber = String(creditCard["CardNumber"] ?? "");

  return {
    method: "cartao",
    paymentId,
    status,
    brand: String(creditCard["Brand"] ?? ""),
    lastDigits: maskedNumber.slice(-4),
    authorizationCode: payment["AuthorizationCode"]
      ? String(payment["AuthorizationCode"])
      : null,
  };
}

const METHOD_FROM_CIELO: Record<string, PaymentMethod> = {
  pix: "pix",
  creditcard: "cartao",
  debitcard: "cartao",
  boleto: "boleto",
};

export function parsePaymentSnapshot(raw: unknown): PaymentSnapshot {
  const payment = readRecord(raw, "Payment");
  const paymentId = String(payment["PaymentId"] ?? "");
  const statusCode = Number(payment["Status"]);

  if (!paymentId || !Number.isFinite(statusCode)) {
    throw new CieloResponseError("Resposta da Cielo sem PaymentId ou Status.");
  }

  const method =
    METHOD_FROM_CIELO[String(payment["Type"] ?? "").toLowerCase()] ?? "pix";
  const orderId = String((raw as Record<string, unknown>)["MerchantOrderId"] ?? "");

  return {
    paymentId,
    orderId,
    status: mapCieloStatus(statusCode, method),
    method,
    rawStatusCode: statusCode,
  };
}
