import { isTrustedBrowserRequest } from "../middleware/cors.mjs";
import { enforceRateLimit } from "../middleware/rateLimit.mjs";
import { validateDonationPayload } from "../services/donation.service.mjs";
import { createMercadoPagoPreference } from "../services/mercadoPago.service.mjs";
import { httpError, sendJson } from "../utils/http.mjs";
import { readJsonBody } from "../utils/request.mjs";

export async function handleCreateDonationPreference(req, res) {
  if (!isTrustedBrowserRequest(req)) {
    throw httpError(403, "Origem não autorizada.", "ORIGIN_NOT_ALLOWED");
  }

  enforceRateLimit(req);

  const payload = await readJsonBody(req);
  const donation = validateDonationPayload(payload);
  const preference = await createMercadoPagoPreference(donation);

  sendJson(
    res,
    201,
    {
      preferenceId: preference.preferenceId,
      checkoutUrl: preference.checkoutUrl,
      externalReference: preference.externalReference,
    },
    { "Cache-Control": "no-store" },
  );
}
