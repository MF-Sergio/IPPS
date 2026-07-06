import { handleCreateDonationPreference } from "../../server/api/donations.controller.mjs";
import { withVercelApi } from "../../server/vercel/withVercelApi.mjs";

export default withVercelApi(handleCreateDonationPreference);
