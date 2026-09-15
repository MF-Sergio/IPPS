import { getPostgresPool } from "../database/postgres.ts";
import { Donation } from "../../domain/donation/donation.entity.ts";
import type { Donor, DonationSnapshot } from "../../domain/donation/donation.entity.ts";
import type {
  DonationRepositoryPort,
  DonationStatusChangeSource,
} from "../../domain/ports/donation-repository.port.ts";
import { Cpf } from "../../domain/shared/cpf.ts";
import { Email } from "../../domain/shared/email.ts";
import { Address } from "../../domain/shared/address.ts";

interface DonationRow {
  id: string;
  amount_cents: number;
  donor_name: string;
  donor_email: string;
  donor_cpf: string;
  method: DonationSnapshot["method"];
  status: DonationSnapshot["status"];
  payment_id: string | null;
  privacy_terms_version: string;
  created_at: Date;
  updated_at: Date;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
}

export class PostgresDonationRepository implements DonationRepositoryPort {

  async save(
    donation: Donation,
    source: DonationStatusChangeSource = "create",
  ): Promise<void> {
    const client = await getPostgresPool().connect();

    try {
      // Estado, endereco e trilha de auditoria precisam ser atomicos.
      await client.query("BEGIN");
      const snapshot = donation.toSnapshot();
      const previous = await client.query<{ status: DonationSnapshot["status"] }>(
        "SELECT status FROM donations WHERE id = $1 FOR UPDATE",
        [snapshot.id],
      );

      await client.query(
        `INSERT INTO donations (
           id, amount_cents, donor_name, donor_email, donor_cpf, method,
           status, payment_id, privacy_terms_version, created_at, updated_at
         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
         ON CONFLICT (id) DO UPDATE SET
           amount_cents = EXCLUDED.amount_cents,
           donor_name = EXCLUDED.donor_name,
           donor_email = EXCLUDED.donor_email,
           donor_cpf = EXCLUDED.donor_cpf,
           method = EXCLUDED.method,
           status = EXCLUDED.status,
           payment_id = EXCLUDED.payment_id,
           privacy_terms_version = EXCLUDED.privacy_terms_version,
           created_at = EXCLUDED.created_at,
           updated_at = EXCLUDED.updated_at`,
        [
          snapshot.id,
          snapshot.amountCents,
          snapshot.donorName,
          snapshot.donorEmail,
          snapshot.donorCpf,
          snapshot.method,
          snapshot.status,
          snapshot.paymentId,
          snapshot.privacyTermsVersion,
          snapshot.createdAt,
          snapshot.updatedAt,
        ],
      );

      await client.query("DELETE FROM donation_addresses WHERE donation_id = $1", [snapshot.id]);
      if (donation.donor.address) {
        await client.query(
          `INSERT INTO donation_addresses (
             donation_id, street, number, complement, district, city, state, zip_code, country
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [snapshot.id, ...addressValues(donation.donor.address)],
        );
      }

      const previousStatus = previous.rows[0]?.status;
      if (previousStatus !== snapshot.status) {
        await client.query(
          `INSERT INTO donation_status_history (
             donation_id, from_status, to_status, source, changed_at
           ) VALUES ($1, $2, $3, $4, $5)`,
          [snapshot.id, previousStatus ?? null, snapshot.status, source, snapshot.updatedAt],
        );
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<Donation | null> {
    return this.find("d.id = $1", [id]);
  }

  async findByPaymentId(paymentId: string): Promise<Donation | null> {
    return this.find("d.payment_id = $1", [paymentId]);
  }

  private async find(where: string, values: string[]): Promise<Donation | null> {
    const result = await getPostgresPool().query<DonationRow>(
      `SELECT d.*, a.street, a.number, a.complement, a.district,
              a.city, a.state, a.zip_code, a.country
         FROM donations d
         LEFT JOIN donation_addresses a ON a.donation_id = d.id
        WHERE ${where}
        LIMIT 1`,
      values,
    );

    const row = result.rows[0];
    return row ? restoreDonation(row) : null;
  }
}

function addressValues(address: Address): string[] {
  return [
    address.street,
    address.number,
    address.complement,
    address.district,
    address.city,
    address.state,
    address.zipCode,
    address.country,
  ];
}

function restoreDonation(row: DonationRow): Donation {
  const address = row.street == null ? null : Address.parse({
    logradouro: row.street,
    numero: row.number ?? "",
    complemento: row.complement ?? "",
    bairro: row.district ?? "",
    cidade: row.city ?? "",
    uf: row.state ?? "",
    cep: row.zip_code ?? "",
  });

  const donor: Donor = {
    name: row.donor_name,
    email: Email.parse(row.donor_email),
    cpf: Cpf.parse(row.donor_cpf),
    address,
  };

  return Donation.restore({
    id: row.id,
    amountCents: row.amount_cents,
    donorName: row.donor_name,
    donorEmail: row.donor_email,
    donorCpf: row.donor_cpf,
    method: row.method,
    status: row.status,
    paymentId: row.payment_id,
    privacyTermsVersion: row.privacy_terms_version,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
  }, donor);
}