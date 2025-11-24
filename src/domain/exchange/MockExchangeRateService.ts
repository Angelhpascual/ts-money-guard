import { fail, ok } from "../../shared/result"
import { Currency, EUR, USD } from "../currency/Currency"
import { ExchangeRateService } from "./ExchangeRateService"

export class MockExchangeRateService implements ExchangeRateService {
  async getExchangeRate(from: Currency, to: Currency) {
    await new Promise((resolve) => setTimeout(resolve, 100))

    if (from.code === USD.code && to.code === EUR.code) {
      return ok(0.85)
    }

    if (from.code === EUR.code && to.code === USD.code) {
      return ok(1.18)
    }

    if (from.code === to.code) {
      return ok(1)
    }

    return fail(`Exchange rate not found ${from.code} -> ${to.code}`)
  }
}
