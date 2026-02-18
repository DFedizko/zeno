# Instructions for the Shared module

This document defines how to implement and evolve code inside `src/shared`.

The `shared` module contains cross-cutting code reused by multiple domains/modules. It must stay generic, stable, and security-aware.

---

## Purpose and boundaries

`shared` is for reusable building blocks, such as:

- base errors and validation errors,
- global plugins (e.g. error handling),
- reusable API schemas,
- utility functions (e.g. hashing),
- global types used across modules.

`shared` must **not** contain user-domain rules or business-specific decisions from a single module.

---

## Reuse-first rules

Before adding code to a domain module, check:

1. Can this logic be reused by other modules?
2. Is this concern cross-cutting (errors, validation, security utility, schema helper, plugin)?
3. Is this implementation domain-agnostic?

If the answer is yes, place it in `shared` and design the API to be generic and explicit.

---

## Shared implementation guidelines

1. Keep functions small and deterministic when possible.
2. Prefer explicit inputs/outputs and avoid hidden side effects.
3. Keep naming generic and clear, using intention-revealing names (e.g. verb-based utility names, explicit plugin names, and schema names that describe the contract purpose).
4. Do not import module-specific entities/repositories/controllers into `shared`.
5. For security utilities, use safe defaults and avoid exposing sensitive data.

---

## Testing strategy for shared

Tests in `shared` must prove reusable behavior and safety, not framework internals.

### Required expectations

- New shared helper/plugin/error/schema must include tests or be covered by integration tests where it is consumed.
- Tests must focus on behavior contracts used by callers.
- Security-sensitive helpers (e.g. password/hash/token utilities) require focused tests.

### Avoid low-value tests

- Do not test that external libraries work by themselves.
- Do not create assertion-only tests that check "value exists" without validating expected behavior.

### What to test by shared area

- **errors**: status/message semantics and response shape compatibility.
- **plugins**: expected orchestration behavior (e.g. error type mapping to response).
- **schemas**: expected contract shape and relevant validation outcomes.
- **utils**: deterministic outputs or key behavioral guarantees (including failure/edge cases).

---

## Example guidance: security utility

For a password-hashing utility:

- test that output is different from input plain text,
- test that produced hash can be verified by the password API,
- test invalid/edge inputs if accepted by the utility contract.

Keep security utilities reusable for any module that needs secure credential handling.
