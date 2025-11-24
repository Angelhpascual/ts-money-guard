import { Result } from "../../shared/result"
import { Currency } from "../currency/Currency"

export interface ExchangeRateService {
  getExchangeRate(from: Currency, to: Currency): Promise<Result<number, string>>
}
