import { describe, expect, it } from "vitest"
import { Money } from "./Money"
import { USD } from "../currency/Currency"
import { isFail, isOk } from "../../shared/result"

describe("Money Value Objects", () => {
  it("should create a valid money instance", () => {
    const result = Money.create(100, USD)

    expect(isOk(result)).toBe(true)

    if (isOk(result)) {
      expect(result.value.amount).toBe(100)
      expect(result.value.currency).toBe(USD)
    }
  })

  it("should fail of amount is not an integer", () => {
    const result = Money.create(100.5, USD)

    expect(isFail(result)).toBe(true)
  })

  it("should add two money instances of the same value", () => {
    const m1 = Money.create(100, USD)
    const m2 = Money.create(200, USD)

    if (isOk(m1) && isOk(m2)) {
      const sumResult = m1.value.add(m2.value)

      expect(isOk(sumResult)).toBe(true)

      if (isOk(sumResult)) {
        expect(sumResult.value.amount).toBe(300)
        expect(sumResult.value.currency).toBe(USD)
      }
    } else {
      throw new Error("Setup failed")
    }
  })
})
