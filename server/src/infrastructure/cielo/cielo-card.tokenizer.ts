import type { CardCredentials } from "../../domain/shared/card-credentials.ts";
import type { CieloConfig } from "../config/app.config.ts";
import type { CieloClient } from "./cielo.client.ts";
import { CieloResponseError } from "./cielo.mapper.ts";

/**
 * Unica funcao do sistema que envia o PAN para fora. Trocar o numero do cartao
 * por um CardToken aqui e o que mantem o PAN fora do repositorio e dos logs.
 */
export async function tokenizeCard(
  client: CieloClient,
  config: CieloConfig,
  card: CardCredentials,
): Promise<string> {
  const response = await client.post<{ CardToken?: string }>(
    config.transactionBaseUrl,
    "/1/card/",
    {
      CustomerName: card.holder,
      CardNumber: card.reveal().number,
      Holder: card.holder,
      ExpirationDate: card.expirationDate,
      Brand: card.brand,
    },
  );

  const token = response?.CardToken;
  if (!token) {
    throw new CieloResponseError("Cielo nao devolveu CardToken.");
  }

  return token;
}
