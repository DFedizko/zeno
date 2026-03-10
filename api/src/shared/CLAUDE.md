# Shared Module

Cross-cutting code reused by multiple modules. Lives in `src/shared/`. Must stay **generic**, **stable**, and **security-aware**.

## What belongs here

| Area | Examples |
|------|---------|
| `errors/` | `BaseError`, `ValidationError` |
| `plugins/` | Global error handler |
| `schemas/` | `errorResponseSchema`, `validationErrorResponseSchema` |
| `utils/` | `hashPassword`, `verifyPassword`, JWT helpers |
| `types/` | `FastifyTypedInstance` |

## What does NOT belong here

- Domain rules from a single module (e.g. auth flows, user business logic)
- Module-specific entities, repositories, or controllers
- Anything that imports from `src/modules/`

## Before adding to a module — ask first

1. Can this be reused by other modules?
2. Is this a cross-cutting concern (security, validation, error handling)?
3. Is it domain-agnostic?

If all three are yes → put it in `shared/`. Otherwise keep it in the module.

## Implementation rules

- Functions must be small and deterministic
- Prefer explicit inputs/outputs — no hidden side effects
- Use intention-revealing names (`hashPassword`, not `process`, `handle`, `util`)
- Security-sensitive helpers must use safe defaults and never expose sensitive data

## Security utilities

`hashPassword` and `verifyPassword` are critical security utilities. Any change requires tests:

```ts
// hashPassword — required test coverage
// 1. Output is not equal to plain-text input
// 2. Result can be verified by verifyPassword
// 3. Edge inputs (empty string, very long string) behave as specified
```

## Testing strategy

Tests in shared prove reusable **behavior contracts** — not that external libraries work.

| Area | What to test |
|------|-------------|
| `errors/` | Status code, message semantics, response shape `{ status, message }` |
| `plugins/` | Error type mapping to HTTP response (ValidationError → 400, BaseError → status, else → 500) |
| `schemas/` | Contract shape and validation outcomes |
| `utils/` | Deterministic outputs, edge cases, failure behavior |

### Anti-patterns

- Do not test that `bcrypt` or `jsonwebtoken` work internally
- Do not write assertion-only tests ("value is a string") without validating expected behavior
- Do not duplicate module-specific tests here
