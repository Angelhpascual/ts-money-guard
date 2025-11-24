import { fail, ok, Result } from "../../shared/result"
import { Currency } from "../currency/Currency"

export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: Currency
  ) {}

  public static create(
    amount: number,
    currency: Currency
  ): Result<Money, string> {
    if (!Number.isInteger(amount)) {
      return fail("Amount must be an integer (cents)")
    }
    return ok(new Money(amount, currency))
  }

  public add(other: Money): Result<Money, string> {
    if (other.currency.code !== this.currency.code) {
      return fail(`Cannot add ${other.currency.code} to ${this.currency.code}`)
    }

    return ok(new Money(this.amount + other.amount, this.currency))
  }
}
