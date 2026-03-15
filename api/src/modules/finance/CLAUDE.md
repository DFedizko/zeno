# Finance Module

Handles financial data aggregation: connections to institutions, accounts, transactions, credit card bills, and categories. **Platform-agnostic** — all domain logic is independent of any external provider (Pluggy, Belvo, etc).

## Layered architecture

```
domain/
├── entities/         → Connection, FinancialAccount, Transaction, CreditCardBill, Category
└── value-objects/    → Money

application/
├── gateways/         → IFinanceGateway (abstract contract for any provider)
└── usecases/         → ICreateConnectToken, ISyncConnection, IListTransactions, etc.

infrastructure/
├── gateways/         → PluggyGateway (implements IFinanceGateway)
├── repositories/     → IConnectionRepository, ITransactionRepository, etc.
└── errors/           → ConnectionNotFound, AccountNotFound, TransactionNotFound

presentation/
└── controllers/      → FinanceController
```

## Dependency inversion

The application layer defines `IFinanceGateway`. Concrete adapters (Pluggy, Belvo) live in `infrastructure/gateways/` and implement that interface. Use cases receive the gateway via constructor injection — never reference a concrete adapter directly.

```ts
// Correct — use case depends on abstraction
new SyncConnectionUseCase(new PluggyGateway(clientId, secret), new ConnectionRepository())

// Wrong — use case imports PluggyGateway directly
import { PluggyGateway } from "infrastructure/gateways/PluggyGateway";
```

## Gateway contract

`IFinanceGateway` is the single abstraction for all external finance providers:

- `createConnectToken(itemId?)` → token for frontend widget
- `getItem(providerItemId)` → connection metadata
- `getAccounts(providerItemId)` → list of accounts
- `getTransactions(providerAccountId, from, to)` → transactions in date range
- `getBills(providerAccountId)` → credit card bills

Each method returns gateway-specific DTOs (`GatewayAccount`, `GatewayTransaction`, etc.) that use cases map to domain entities before persisting.

## Domain entities

All entities follow the same pattern as `User.ts`:

- Private constructor
- `static create(...)` factory method
- `static toOutput(row)` maps DB row to response DTO
- Getters for each field
- Domain convenience methods (`isDebit`, `isCreditCard`, `isOverdue`, etc.)

## Value objects

- `Money` — wraps amount + currency code. Use for any monetary field. Supports `add()`, `subtract()`, `format()`, `isPositive()`.

## Sync flow

1. Frontend calls `POST /finance/connect-token` → backend generates token via gateway
2. User connects institution in widget
3. Provider notifies via `POST /finance/webhook` (item/updated, transactions/created, etc.)
4. `HandleWebhookUseCase` → fetches updated data from gateway → upserts in DB

## Schemas and DTOs

All schemas live in `src/routes/finance/financeSchema.ts`. Types are inferred with `z.infer<>` and reused across layers:

- `ConnectionOutput`, `FinancialAccountOutput`, `TransactionOutput`, etc.
- `TransactionListQuery` for paginated filtering (from, to, categoryId, type, page, pageSize)
- `PaginatedTransactionOutput` for list responses

## Checklist for new finance feature

1. Domain entity or value object (if applicable)
2. Zod schema in `routes/finance/financeSchema.ts`
3. Repository interface in `infrastructure/repositories/`
4. Use case interface in `application/usecases/`
5. Use case implementation
6. Controller method
7. Handler + route with full schema (tags, description, all response codes)
