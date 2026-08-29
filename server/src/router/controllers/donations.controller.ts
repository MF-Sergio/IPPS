import type { IncomingMessage, ServerResponse } from "node:http";
import type {
  CreateDonationInput,
  CreateDonationOutput,
} from "../../application/create-donation.usecase.ts";
import type { DonationStatusView } from "../../application/get-donation-status.usecase.ts";
import type { AppConfig } from "../../infrastructure/config/app.config.ts";
import { parseCreateDonationRequest } from "../dto/create-donation.request.ts";
import { toDonationResponse, toStatusResponse } from "../dto/donation.response.ts";
import { HttpError, readJsonBody, sendJson } from "../http-context.ts";
import { isTrustedBrowserRequest } from "../middleware/cors.ts";

export type CreateDonationExecutor = (input: CreateDonationInput) => Promise<CreateDonationOutput>;
export type GetStatusExecutor = (id: string) => Promise<DonationStatusView>;

export interface DonationsControllerDeps {
  config: AppConfig;
  createDonation: CreateDonationExecutor;
  getDonationStatus: GetStatusExecutor;
  enforceRateLimit: (req: IncomingMessage) => void;
}

export function createDonationsController(deps: DonationsControllerDeps) {
  return {
    async create(req: IncomingMessage, res: ServerResponse): Promise<void> {
      if (!isTrustedBrowserRequest(req, deps.config)) {
        throw new HttpError(403, "Origem nao autorizada.", "ORIGIN_NOT_ALLOWED");
      }

      deps.enforceRateLimit(req);

      const body = await readJsonBody(req, deps.config.maxBodyBytes);
      const input = parseCreateDonationRequest(body);
      const { donation, payment } = await deps.createDonation(input);

      sendJson(res, 201, toDonationResponse(donation, payment), { "Cache-Control": "no-store" });
    },

    async status(req: IncomingMessage, res: ServerResponse, donationId: string): Promise<void> {
      if (!isTrustedBrowserRequest(req, deps.config)) {
        throw new HttpError(403, "Origem nao autorizada.", "ORIGIN_NOT_ALLOWED");
      }

      // O id vira MerchantOrderId numa consulta a Cielo, que so aceita
      // alfanumerico — validar aqui evita montar URL invalida.
      if (!/^[A-Za-z0-9]{1,36}$/.test(donationId)) {
        throw new HttpError(400, "Identificador de doacao invalido.", "INVALID_DONATION_ID");
      }

      const view = await deps.getDonationStatus(donationId);
      sendJson(res, 200, toStatusResponse(view), { "Cache-Control": "no-store" });
    },
  };
}
