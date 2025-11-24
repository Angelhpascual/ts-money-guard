# 🛡️ ts-money-guard

Una librería financiera robusta escrita en **TypeScript** aplicando principios de **Domain-Driven Design (DDD)**.

Este proyecto ha sido construido desde cero como un ejercicio avanzado para dominar TypeScript, Patrones de Diseño y Arquitectura de Software.

## 🚀 Características Principales

- **Zero Primitive Obsession**: No usamos `number` para el dinero. Usamos Value Objects (`Money`) para garantizar la seguridad aritmética y evitar errores de redondeo.
- **Result Pattern**: Adiós a los `try/catch`. Usamos un tipo `Result<T, E>` (Monada) para manejar errores de forma explícita y segura.
- **DDD Puro**: Arquitectura hexagonal simplificada con separación clara entre Dominio (`src/domain`) e Infraestructura (`src/infrastructure`).
- **Async Services**: Manejo de operaciones asíncronas (como cambio de divisas) utilizando Promesas y patrones de inyección de dependencias.
- **Testing**: Suite de tests unitarios con **Vitest**.

## 📂 Estructura del Proyecto

```
src/
├── domain/              # Lógica de Negocio Pura (sin frameworks)
│   ├── money/           # Value Object: Money (Céntimos + Moneda)
│   ├── currency/        # Value Object: Currency (USD, EUR)
│   ├── account/         # Entity: Account (Cuenta bancaria)
│   ├── transaction/     # Entity: Transaction (Ingresos/Gastos)
│   └── exchange/        # Domain Service Interface: Cambio de divisas
├── infrastructure/      # Implementaciones del mundo real
│   └── exchange/        # Mock del servicio de cambio
└── shared/              # Kernel compartido
    └── result.ts        # Patrón Result<T, E> y Type Guards
```

## 🛠️ Tecnologías

- **TypeScript 5+**: Modo estricto ("Hardcore") activado.
- **Vitest**: Framework de testing ultrarrápido.
- **Node.js**: Entorno de ejecución.

## 💡 Ejemplos de Uso

### 1. Crear Dinero Seguro

```typescript
import { Money } from "./src/domain/Money/Money"
import { USD } from "./src/domain/currency/Currency"

// ✅ Correcto: 10.00 USD (se pasa en céntimos)
const price = Money.create(1000, USD)

if (isOk(price)) {
  console.log(price.value.amount) // 1000
}
```

### 2. Manejo de Errores (Result Pattern)

```typescript
// ❌ Error: No se permiten decimales
const invalid = Money.create(10.5, USD)

if (isFail(invalid)) {
  console.error(invalid.error) // "Amount must be an integer (cents)"
}
```

### 3. Entidades de Dominio

```typescript
const accountResult = Account.create({
  id: "1",
  name: "Ahorros",
  initialBalance: 5000, // 50.00
  currency: EUR,
})
```

## 🧪 Ejecutar Tests

```bash
npm test
```

## 🕹️ Ejecutar Demo

```bash
npx tsx demo.ts
```

---

_Creado con ❤️ y TypeScript._
