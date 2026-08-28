import type { ClockPort } from "../../src/domain/ports/clock.port.ts";

export class FakeClock implements ClockPort {
  #current: Date;
  #counter = 0;

  constructor(start: Date) {
    this.#current = new Date(start.getTime());
  }

  now(): Date {
    return new Date(this.#current.getTime());
  }

  newId(): string {
    this.#counter += 1;
    return `IPPS${String(this.#counter).padStart(32, "0")}`;
  }

  advanceMinutes(minutes: number): void {
    this.#current = new Date(this.#current.getTime() + minutes * 60_000);
  }
}
