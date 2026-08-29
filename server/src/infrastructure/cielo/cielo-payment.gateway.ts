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
      return parsePaymentResult(response, input.donation, input.expiresAt);
    },

    async getPaymentById(paymentId: string): Promise<PaymentSnapshot> {
      const response = await client.get<unknown>(config.queryBaseUrl, `/1/sales/${paymentId}`);
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
        `/1/sales/${paymentId}/capture${query}`,
      );
      return this.getPaymentById(paymentId);
    },

    async voidPayment(paymentId: string, amount?: Money): Promise<PaymentSnapshot> {
      const query = amount ? `?amount=${amount.cents}` : "";
      await client.put<unknown>(
        config.transactionBaseUrl,
        `/1/sales/${paymentId}/void${query}`,
      );
      return this.getPaymentById(paymentId);
    },
  };
}
