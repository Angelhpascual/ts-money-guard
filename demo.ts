import { EUR, USD } from "./src/domain/currency/Currency"
import { MockExchangeRateService } from "./src/domain/exchange/MockExchangeRateService"
import { isFail } from "./src/shared/result"

async function main() {
  console.log("🚀 Iniciando Demo de Cambio de Divisas...")

  const service = new MockExchangeRateService()

  console.log("⏳ Consultando al banco (simulado)...")

  const rateResult = await service.getExchangeRate(USD, EUR)

  if (isFail(rateResult)) {
    console.log("❌ Error conectando con el banco", rateResult.error)
    return
  }

  const rate = rateResult.value

  console.log(`✅ Tasa de cambio obtenida: 1 USD = , ${rate} EUR`)
}

main()
