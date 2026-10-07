export type DonationId = string & { readonly __brand: "DonationId" };

export function asDonationId(value: string): DonationId {
  return value as DonationId;
}
