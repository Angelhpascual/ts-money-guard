import { Result, isFail, fail, ok } from "../../shared/result"
import { Money } from "../Money/Money"
import { Currency } from "../currency/Currency"

type TransactionTypes = "INCOME" | "EXPENSE"

export interface TransactionProps {
  id: string
  amount: number
  currency: Currency
  type: TransactionTypes
  date: Date
  note: string
}

export class Transaction {
  private constructor(
    public readonly id: string,
    public readonly amount: Money,
    public readonly type: TransactionTypes,
    public readonly date: Date,
    public readonly note: string
  ) {}

  public static create(props: TransactionProps): Result<Transaction, string> {
    if (props.note.length > 100) {
      return fail("Note must be less than 100 characters")
    }

    const moneyResult = Money.create(props.amount, props.currency)

    if (isFail(moneyResult)) {
      return fail(moneyResult.error)
    }

    if (moneyResult.value.amount <= 0) {
      return fail("Amount must be greater than 0")
    }

    return ok(
      new Transaction(
        props.id,
        moneyResult.value,
        props.type,
        props.date,
        props.note
      )
    )
  }
}
