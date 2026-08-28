export interface CardInput {
  numero: string;
  titular: string;
  validade: string;
  cvv: string;
  bandeira: string;
}

export class InvalidCardError extends Error {
  readonly code = "INVALID_CARD";
  readonly field: string;

  constructor(field: string, message: string) {
    super(message);
    this.name = "InvalidCardError";
    this.field = field;
  }
}

/** Bandeiras aceitas pela API E-Commerce Cielo, na grafia exata que ela espera. */
const BRANDS: Record<string, string> = {
  visa: "Visa",
  master: "Master",
  mastercard: "Master",
  amex: "Amex",
  elo: "Elo",
  aura: "Aura",
  jcb: "JCB",
  diners: "Diners",
  discover: "Discover",
  hipercard: "Hipercard",
};

function passesLuhn(digits: string): boolean {
  let sum = 0;
  let double = false;

  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let value = Number(digits[index]);
    if (double) {
      value *= 2;
      if (value > 9) value -= 9;
    }
    sum += value;
    double = !double;
  }

  return sum % 10 === 0;
}

function normalizeExpiration(raw: string): string {
  const match = /^(\d{2})\/(\d{2}|\d{4})$/.exec(String(raw ?? "").trim());
  if (!match) {
    throw new InvalidCardError("validade", "Informe a validade no formato MM/AAAA.");
  }

  const month = Number(match[1]);
  const yearPart = match[2] ?? "";
  const year = yearPart.length === 2 ? 2000 + Number(yearPart) : Number(yearPart);

  if (month < 1 || month > 12) {
    throw new InvalidCardError("validade", "Mes de validade invalido.");
  }

  // Ultimo instante do mes de validade: o cartao vale ate o fim dele.
  const expiresAt = new Date(Date.UTC(year, month, 1) - 1);
  if (expiresAt.getTime() < Date.now()) {
    throw new InvalidCardError("validade", "Cartao vencido.");
  }

  return `${String(month).padStart(2, "0")}/${year}`;
}

export class CardCredentials {
  readonly holder: string;
  readonly expirationDate: string;
  readonly brand: string;
  readonly lastDigits: string;

  #number: string;
  #cvv: string;

  private constructor(fields: {
    holder: string;
    expirationDate: string;
    brand: string;
    number: string;
    cvv: string;
  }) {
    this.holder = fields.holder;
    this.expirationDate = fields.expirationDate;
    this.brand = fields.brand;
    this.lastDigits = fields.number.slice(-4);
    this.#number = fields.number;
    this.#cvv = fields.cvv;
  }

  static parse(input: CardInput): CardCredentials {
    const number = String(input.numero ?? "").replace(/\D/g, "");
    if (number.length < 13 || number.length > 19 || !passesLuhn(number)) {
      throw new InvalidCardError("numero", "Numero de cartao invalido.");
    }

    const cvv = String(input.cvv ?? "").replace(/\D/g, "");
    if (cvv.length < 3 || cvv.length > 4) {
      throw new InvalidCardError("cvv", "Codigo de seguranca invalido.");
    }

    const holder = String(input.titular ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z ]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (holder.length < 3) {
      throw new InvalidCardError("titular", "Informe o nome impresso no cartao.");
    }

    const brand = BRANDS[String(input.bandeira ?? "").trim().toLowerCase()];
    if (!brand) {
      throw new InvalidCardError("bandeira", "Bandeira de cartao nao suportada.");
    }

    return new CardCredentials({
      holder,
      expirationDate: normalizeExpiration(input.validade),
      brand,
      number,
      cvv,
    });
  }

  /** Unico acesso ao PAN e ao CVV. O nome existe para gritar em code review. */
  reveal(): { number: string; cvv: string } {
    return { number: this.#number, cvv: this.#cvv };
  }

  toJSON(): object {
    return {
      brand: this.brand,
      holder: this.holder,
      lastDigits: this.lastDigits,
      expirationDate: this.expirationDate,
      number: "[REDACTED]",
      cvv: "[REDACTED]",
    };
  }

  toString(): string {
    return `CardCredentials(${this.brand} ****${this.lastDigits})`;
  }
}
