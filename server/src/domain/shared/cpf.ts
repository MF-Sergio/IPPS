export class InvalidCpfError extends Error {
  readonly code = "INVALID_CPF";

  constructor(message: string) {
    super(message);
    this.name = "InvalidCpfError";
  }
}

function checkDigit(digits: string, length: number): number {
  let sum = 0;
  for (let index = 0; index < length; index += 1) {
    sum += Number(digits[index]) * (length + 1 - index);
  }
  const remainder = (sum * 10) % 11;
  return remainder === 10 ? 0 : remainder;
}

export class Cpf {
  readonly digits: string;

  private constructor(digits: string) {
    this.digits = digits;
  }

  static parse(raw: string): Cpf {
    const digits = String(raw ?? "").replace(/\D/g, "");

    if (digits.length !== 11) {
      throw new InvalidCpfError("Informe um CPF com 11 digitos.");
    }
    if (/^(\d)\1{10}$/.test(digits)) {
      throw new InvalidCpfError("Informe um CPF valido.");
    }
    if (checkDigit(digits, 9) !== Number(digits[9])) {
      throw new InvalidCpfError("Informe um CPF valido.");
    }
    if (checkDigit(digits, 10) !== Number(digits[10])) {
      throw new InvalidCpfError("Informe um CPF valido.");
    }

    return new Cpf(digits);
  }

  get identityType(): "CPF" {
    return "CPF";
  }
}
