# Zeno API

Backend for Zeno built with Bun, Fastify, Prisma, and PostgreSQL.

## Commands

```bash
# Development
bun run dev          # tsx watch with .env

# Build
bun run build        # tsup → dist/

# Production
bun run start        # node dist/index.js

# Format / lint
bun run format       # biome check --write

# Tests
bun vitest           # run all tests
bun vitest run       # run once (CI)
bun vitest --watch   # watch mode
```

## Architecture

Modules live in `src/modules/<name>/` and follow strict layering:

```
domain/          → entities, value objects (no Prisma, no HTTP)
application/     → services / use cases (interfaces + implementations)
infrastructure/  → repositories (Prisma), domain errors
presentation/    → controllers (Fastify req/reply only, no business logic)
```

Handlers wire the layers explicitly — **no DI containers, no singletons**:

```ts
export const postCreateUserHandler = async (req, reply) =>
  new UserController(new UserService(new UserRepository())).createUser(req, reply);
```

Shared cross-cutting code goes in `src/shared/` (errors, schemas, utils, plugins). Never put domain rules in shared.

## Adding a new feature — checklist

1. Domain entity / value object (if applicable) + domain errors in `infrastructure/errors/`
2. Zod schema in `src/routes/<domain>/` — define `input`, `output`, export inferred types
3. `I*Repository` interface + `*Repository` implementation (Prisma + domain errors)
4. `I*Service` interface + `*Service` implementation (or explicit use-case classes)
5. `*Controller` — thin: extract from request, call service, send reply
6. Handler function — instantiate Controller(Service(Repository()))
7. Route file — `schema` with `tags`, `description`, `body`/`params`/`query`, all `response` codes
8. Register route group in `src/routes.ts`

## Route schema requirements

Every route must document all possible responses:

```ts
app.post("/users", {
  schema: {
    tags: ["users"],
    description: "Create a new user",
    body: userSchema.input,
    response: {
      201: userSchema.output,
      400: validationErrorResponseSchema,
      409: errorResponseSchema,
      500: errorResponseSchema,
    },
  },
}, handler);
```

Always use `FastifyTypedInstance`, `ZodTypeProvider`, `validatorCompiler`, and `serializerCompiler` so validation, serialization, and docs stay in sync.

## Error handling

- `BaseError(message, status)` → extend for domain errors (lives in `infrastructure/errors/`)
- `ValidationError` → Zod issues, status 400 (lives in `shared/errors/`)
- Global error handler in `src/plugins/` processes: `ValidationError` → `BaseError` → 500 fallback
- Response shape is always `{ status: number, message: string }` (+ `issues` for 400)

## Testing strategy

Tests protect **security**, **data consistency**, and **business rules** — not framework internals.

### What to test per layer

| Layer | Focus |
|-------|-------|
| Domain | Pure invariants and entity behavior |
| Application | Real orchestration rules and conditional flows |
| Infrastructure | Persistence guarantees, conflict/not-found semantics, sensitive data safety |
| Routes | HTTP contract: status codes, validation, error shapes |

### Mandatory per change

- New business rule → test proving the rule
- Bug fix → regression test
- HTTP contract change → route/contract test update

### Anti-patterns — never do

- Service tests that only assert passthrough `toHaveBeenCalledWith` with no business logic
- Repository tests verifying Prisma echoes input without business assertions
- Tests proving ORM or framework behavior (assume libraries work)
- Exposing `passwordHash` or raw tokens in response outputs

### Minimum route contract coverage

- Success: `200`/`201`/`204`
- Validation failure: `400`
- Domain errors: `404`/`409` as applicable
- Fallback: `500`
- Error shape: `{ status, message }` compatible

## Code conventions

- Path alias: `@/` maps to `src/`
- Validation: Zod everywhere — body, params, query, response
- Hashing: use `shared/utils/hashPassword` and `shared/utils/verifyPassword`
- Prisma client: imported from `src/database/prisma` — only used in repositories
- Biome for formatting and linting; run `bun run format` before committing

## Security rules

- Never return `passwordHash` in any response
- Tokens must be opaque in API responses — do not expose JWT internals
- Wrong credentials always return 401 with a generic message (no user enumeration)
- Shared security utils (hash, verify, token) must have focused tests

## Module-specific instructions

- Auth module: [src/modules/auth/CLAUDE.md](src/modules/auth/CLAUDE.md)
- User module: [src/modules/user/CLAUDE.md](src/modules/user/CLAUDE.md)
- Shared module: [src/shared/CLAUDE.md](src/shared/CLAUDE.md)
