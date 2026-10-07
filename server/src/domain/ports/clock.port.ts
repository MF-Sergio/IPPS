export interface ClockPort {
  now(): Date;
  /** Id alfanumerico de 36 caracteres — vira o MerchantOrderId na Cielo. */
  newId(): string;
}
