import type { LoggerPort } from "../../domain/ports/logger.port.ts";
import type {
  CreatePaymentInput,
  PaymentGatewayPort,
  PaymentResult,
  PaymentSnapshot,
} from "../../domain/ports/payment-gateway.port.ts";
import type { Money } from "../../domain/shared/money.ts";
import type { CieloConfig } from "../config/app.config.ts";
import type { CieloClient } from "./cielo.client.ts";
import { tokenizeCard } from "./cielo-card.tokenizer.ts";
import { CieloHttpError } from "./cielo.errors.ts";
import { buildSaleRequest, parsePaymentResult, parsePaymentSnapshot } from "./cielo.mapper.ts";

export interface CieloGatewayDeps {
  config: CieloConfig;
  client: CieloClient;
  logger: LoggerPort;
}

export function createCieloGateway(deps: CieloGatewayDeps): PaymentGatewayPort {
  const { config, client } = deps;

  return {
    async createPayment(input: CreatePaymentInput): Promise<PaymentResult> {
      const cardToken =
        input.donation.method === "cartao" && input.card
          ? await tokenizeCard(client, config, input.card)
          : null;

      const body = buildSaleRequest(input.donation, {
        config,
        cardToken,
        card: input.card,
        now: new Date(),
      });

      const response = await client.post<unknown>(config.transactionBaseUrl, "/1/sales/", body);

      try {
        return parsePaymentResult(response, input.donation, input.expiresAt);
      } catch (error) {
        // Diagnostico seguro para respostas de homologacao incompletas: registra
        // somente a estrutura da resposta, nunca o QR Code ou dados sensiveis.
        if (input.donation.method === "pix" && error instanceof Error) {
          const payment = readPaymentKeys(response);
          deps.logger.error("Resposta Pix da Cielo sem campos esperados", {
            paymentKeys: payment.keys,
            paymentIdPresent: payment.paymentIdPresent,
            statusPresent: payment.statusPresent,
            status: payment.status,
            type: payment.type,
            provider: payment.provider,
            returnCode: payment.returnCode,
            returnMessage: payment.returnMessage,
          });
        }
        throw error;
      }
    },

    async getPaymentById(paymentId: string): Promise<PaymentSnapshot> {
      // `paymentId` pode vir de fora (webhook da Cielo, sem assinatura) — o
      // controller ja valida o formato, mas codificar aqui tambem garante que
      // nenhum caractere de path/query escape para a URL montada.
      const response = await client.get<unknown>(
        config.queryBaseUrl,
        `/1/sales/${encodeURIComponent(paymentId)}`,
      );
      return parsePaymentSnapshot(response);
    },

    async findPaymentByOrderId(orderId: string): Promise<PaymentSnapshot | null> {
      let found: { Payment?: Array<{ PaymentId?: string }> };
      try {
        found = await client.get(
          config.queryBaseUrl,
          `/1/sales?merchantOrderId=${encodeURIComponent(orderId)}`,
        );
      } catch (error) {
        if (error instanceof CieloHttpError && error.status === 404) return null;
        throw error;
      }

      // A consulta por pedido devolve so os ids; o detalhe vem da consulta
      // por PaymentId. Pegamos o mais recente, que e o ultimo da lista.
      const paymentId = found?.Payment?.at(-1)?.PaymentId;
      if (!paymentId) return null;

      return this.getPaymentById(paymentId);
    },

    // A resposta de captura e de cancelamento da Cielo traz Status, Tid e
    // ReturnCode, mas NAO traz PaymentId nem MerchantOrderId — entao ela nao
    // da para montar um PaymentSnapshot. Depois do PUT, reconsultamos.
    async capturePayment(paymentId: string, amount?: Money): Promise<PaymentSnapshot> {
      const query = amount ? `?amount=${amount.cents}` : "";
      await client.put<unknown>(
        config.transactionBaseUrl,
        `/1/sales/${encodeURIComponent(paymentId)}/capture${query}`,
      );
      return this.getPaymentById(paymentId);
    },

    async voidPayment(paymentId: string, amount?: Money): Promise<PaymentSnapshot> {
      const query = amount ? `?amount=${amount.cents}` : "";
      await client.put<unknown>(
        config.transactionBaseUrl,
        `/1/sales/${encodeURIComponent(paymentId)}/void${query}`,
      );
      return this.getPaymentById(paymentId);
    },
  };
}

function readPaymentKeys(value: unknown): {
  keys: string[];
  paymentIdPresent: boolean;
  statusPresent: boolean;
  status: string | number | null;
  type: string | null;
  provider: string | null;
  returnCode: string | number | null;
  returnMessage: string | null;
} {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {
      keys: [], paymentIdPresent: false, statusPresent: false,
      status: null, type: null, provider: null, returnCode: null, returnMessage: null,
    };
  }

  const payment = (value as Record<string, unknown>)["Payment"];
  if (!payment || typeof payment !== "object" || Array.isArray(payment)) {
    return {
      keys: [], paymentIdPresent: false, statusPresent: false,
      status: null, type: null, provider: null, returnCode: null, returnMessage: null,
    };
  }

  const paymentRecord = payment as Record<string, unknown>;
  return {
    keys: Object.keys(paymentRecord),
    paymentIdPresent: Boolean(paymentRecord["PaymentId"]),
    statusPresent: paymentRecord["Status"] !== undefined,
    status: readSafeScalar(paymentRecord["Status"]),
    type: readSafeString(paymentRecord["Type"]),
    provider: readSafeString(paymentRecord["Provider"]),
    returnCode: readSafeScalar(paymentRecord["ReturnCode"]),
    returnMessage: readSafeString(paymentRecord["ReturnMessage"]),
  };
}

function readSafeScalar(value: unknown): string | number | null {
  return typeof value === "string" || typeof value === "number" ? value : null;
}

function readSafeString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}
