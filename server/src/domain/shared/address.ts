export interface AddressInput {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export class InvalidAddressError extends Error {
  readonly code = "INVALID_ADDRESS";
  readonly field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = "InvalidAddressError";
    this.field = field;
  }
}

const UF_LIST = new Set([
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
]);

/** A Cielo aceita apenas A-Z maiusculo, digitos, espaco, hifen e apostrofo. */
export function toCieloText(value: string): string {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z0-9 \-']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function required(field: string, value: string): string {
  const normalized = toCieloText(value);
  if (!normalized) {
    throw new InvalidAddressError(field, `Informe ${field}.`);
  }
  return normalized;
}

function bounded(field: string, value: string, maxLength: number): string {
  if (value.length > maxLength) {
    throw new InvalidAddressError(field, `${field} deve ter no maximo ${maxLength} caracteres.`);
  }
  return value;
}

export class Address {
  readonly street: string;
  readonly number: string;
  readonly complement: string;
  readonly district: string;
  readonly city: string;
  readonly state: string;
  readonly zipCode: string;
  readonly country = "BRA";

  private constructor(fields: Omit<Address, "country">) {
    this.street = fields.street;
    this.number = fields.number;
    this.complement = fields.complement;
    this.district = fields.district;
    this.city = fields.city;
    this.state = fields.state;
    this.zipCode = fields.zipCode;
  }

  static parse(input: AddressInput): Address {
    const street = bounded("logradouro", required("logradouro", input.logradouro), 60);
    const number = bounded("numero", required("numero", input.numero), 10);
    const complement = bounded("complemento", toCieloText(input.complemento), 30);
    const district = bounded("bairro", required("bairro", input.bairro), 30);
    const city = bounded("cidade", required("cidade", input.cidade), 60);
    const state = toCieloText(input.uf);
    const zipCode = String(input.cep ?? "").replace(/\D/g, "");

    if (!UF_LIST.has(state)) {
      throw new InvalidAddressError("uf", "Informe uma UF valida.");
    }
    if (zipCode.length !== 8) {
      throw new InvalidAddressError("cep", "Informe um CEP com 8 digitos.");
    }

    return new Address({ street, number, complement, district, city, state, zipCode });
  }
}
