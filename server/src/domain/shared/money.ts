export class InvalidMoneyError extends Error {
  readonly code = "INVALID_MONEY";

  constructor(message: string) {
    super(message);
    this.name = "InvalidMoneyError";
  }
}

export class Money {
  readonly cents: number;

  private constructor(cents: number) {
    this.cents = cents;
  }

  static fromCents(cents: number): Money {
    if (!Number.isInteger(cents)) {
      throw new InvalidMoneyError("Centavos devem ser um numero inteiro.");
    }
    if (cents <= 0) {
      throw new InvalidMoneyError("O valor deve ser maior que zero.");
    }
    return new Money(cents);
  }

  static fromReais(reais: number): Money {
    if (!Number.isFinite(reais)) {
      throw new InvalidMoneyError("Informe um valor numerico.");
    }
    // Arredonda em centesimos antes de multiplicar: evita que 1.1 + 2.2
    // (3.3000000000000003 em ponto flutuante) vire 330.00000000000006.
    const cents = Math.round(Number(reais.toFixed(4)) * 100);
    return Money.fromCents(cents);
  }

  get reais(): number {
    return this.cents / 100;
  }

  isLessThan(other: Money): boolean {
    return this.cents < other.cents;
  }

  isGreaterThan(other: Money): boolean {
    return this.cents > other.cents;
  }
}
