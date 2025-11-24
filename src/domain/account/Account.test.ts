import { describe, expect, it } from "vitest"
import { Account } from "./Account"
import { USD } from "../currency/Currency"
import { isFail, isOk } from "../../shared/result"

describe("Account Entity", () => {
  it("should create a valid account", () => {
    const result = Account.create({
      id: "1",
      name: "My Savings",
      initialBalance: 5000,
      currency: USD,
    })

    expect(isOk(result)).toBe(true)

    if (isOk(result)) {
      expect(result.value.balance.amount).toBe(5000)
      expect(result.value.balance.currency).toBe(USD)
    }
  })

  it("should fail if name is too long", () => {
    const longName = "a".repeat(101)

    const result = Account.create({
      id: "1",
      name: longName,
      initialBalance: 5000,
      currency: USD,
    })

    expect(isFail(result)).toBe(true)
    if (isFail(result)) {
      expect(result.error).toBe("Name must be less than 100 characters")
    }
  })

  it("should fail if initial balance is invalid (integration test)", () => {
    const result = Account.create({
      id: "1",
      name: "Test",
      initialBalance: 10.5,
      currency: USD,
    })

    expect(isFail(result)).toBe(true)
    if (isFail(result)) {
      expect(result.error).toContain("integer")
    }
  })
})
