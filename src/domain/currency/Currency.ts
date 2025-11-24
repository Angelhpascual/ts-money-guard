export interface Currency {
  readonly code: string
  readonly symbol: string
  readonly exponent: number
}

export const USD: Currency = {
  code: "USD",
  symbol: "$",
  exponent: 2,
}

export const EUR: Currency = {
  code: "EUR",
  symbol: "€",
  exponent: 2,
}

export const Currencies: Record<string, Currency> = {
  USD,
  EUR,
}
