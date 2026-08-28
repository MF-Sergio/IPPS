export class InvalidEmailError extends Error {
  readonly code = "INVALID_EMAIL";

  constructor(message: string) {
    super(message);
    this.name = "InvalidEmailError";
  }
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export class Email {
  readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static parse(raw: string): Email {
    const value = String(raw ?? "").trim().toLowerCase();

    if (value.length > 254 || !EMAIL_PATTERN.test(value)) {
      throw new InvalidEmailError("Informe um e-mail valido.");
    }

    return new Email(value);
  }
}
