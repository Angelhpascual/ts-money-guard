import { fail, isFail, ok, Result } from "../../shared/result"
import { Currency } from "../currency/Currency"
import { Money } from "../Money/Money"

export interface AccountProps {
  id: string
  name: string
  initialBalance: number
  currency: Currency
}

export class Account {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly balance: Money
  ) {}

  public static create(props: AccountProps): Result<Account, string> {
    if (props.name.length > 100) {
      return fail("Name must be less than 100 characters")
    }

    const moneyResult = Money.create(props.initialBalance, props.currency)
    if (isFail(moneyResult)) {
      return fail(moneyResult.error)
    }

    return ok(new Account(props.id, props.name, moneyResult.value))
  }
}
