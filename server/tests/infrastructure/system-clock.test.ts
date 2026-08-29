import { test } from "node:test";
import assert from "node:assert/strict";
import { SystemClock } from "../../src/infrastructure/system.clock.ts";

test("gera id valido como MerchantOrderId da Cielo", () => {
  const id = new SystemClock().newId();
  assert.equal(id.length, 36);
  assert.match(id, /^IPPS[0-9a-f]{32}$/);
  assert.match(id, /^[A-Za-z0-9]+$/);
});

test("ids nao se repetem", () => {
  const clock = new SystemClock();
  const ids = new Set(Array.from({ length: 500 }, () => clock.newId()));
  assert.equal(ids.size, 500);
});
