# Instructions for this project

This document describes the product context, tech stack, and how to expose documented routes in the API. The **internal architecture** of each module (service, repository, entities, errors) is defined in **that module’s AGENTS.md** (e.g. in `src/modules/<name>/AGENTS.md`), since it can vary by domain.

---

## Product context

Backend for **Zeno**, a personal financial management app with the following characteristics:

- **Purchase tracking**: users record purchases manually or automatically, registering preferred banks. The system is **agnostic to card networks and banks**.
- **Views**: listing of purchases and income; dashboards for spending, revenue, and savings; **goals**.
- **Authentication**: login with email/password or sign-up with Google. Users **subscribe** on a web landing page and get access to the app.

When implementing features, prioritize **security** (financial and login data), **data consistency**, and **clear business rules**.

---

## Tech stack

- **Runtime**: Bun 3.2, Node 24.4.1
- **HTTP**: Fastify with `fastify-type-provider-zod` (validation and serialization via Zod)
- **Documentation**: `@fastify/swagger` + `@scalar/fastify-api-reference` (docs and schemas generated from route schemas)
- **ORM**: Prisma with PostgreSQL
- **Validation**: Zod on body, params, query, and response

Always use the configured types and plugins (ZodTypeProvider, validatorCompiler, serializerCompiler) to keep documentation and validation in sync.

---

## Testing strategy (global)

Tests must prioritize what protects Zeno's product risks: **security**, **data consistency**, and **clear business rules**.

### Mandatory test expectations for any change

1. **New business rule**: add or update tests that prove the rule.
2. **Bug fix**: add a regression test for the bug scenario.
3. **HTTP contract change**: add or update route/contract tests for request/response and status codes.

### What to test by layer

- **Domain**: pure business invariants and entity behavior.
- **Application (services)**: orchestration rules, conditional flows, and cross-repository decisions.
- **Infrastructure (repositories)**: persistence behavior, mapping, conflict/not-found behavior, and security-sensitive data handling.
- **Routes/Presentation**: Fastify + Zod contract (body/params/query validation, documented responses, and error format).

### Avoid low-value tests

- Do **not** create service tests that only assert passthrough calls (e.g. pure `toHaveBeenCalledWith` delegation) when there is no business rule in the service.
- Do **not** duplicate the same scenario in multiple layers unless each layer has a distinct responsibility to validate.
- Do **not** write repository tests that only verify Prisma passthrough behavior (e.g. "receives input and returns exactly what Prisma returns") without business assertions.
- Do **not** spend effort proving ORM internals or basic framework behavior; assume Prisma/Fastify/Zod work as libraries and test your application decisions.

### What repository tests must prove

Repository tests should focus on application guarantees, not ORM mechanics:

- business constraints enforced at persistence boundaries (e.g. uniqueness/conflict semantics),
- mapping and output safety (sensitive fields are never leaked),
- error semantics used by the API (`404`, `409`, etc. through domain errors),
- security-sensitive transformations (e.g. password hashing and update behavior),
- consistency of partial updates (omitted fields are preserved when expected).

### Minimum contract checklist for documented routes

For each critical route, cover at least:

- success status (`200`, `201`, `204` as applicable),
- validation failure (`400`) for invalid `body`/`params`/`query`,
- domain error statuses (`404`, `409`, etc.) when applicable,
- generic fallback (`500`) when unexpected errors occur,
- default error shape compatibility with shared error handling (`{ status, message }`).

### Security and consistency checklist

- Never expose sensitive fields in output contracts.
- Validate conflict scenarios that can break consistency (e.g., duplicate unique data).
- Validate update semantics for partial updates so omitted fields are not unintentionally overwritten.

---

## AI development self-check questions

Before implementing new code, refactors, or helpers, the AI should explicitly evaluate:

1. **Reusability**
   - "Can this function be reused in other modules?"
   - If yes, prefer placing it in `src/shared/utils` (or another `shared` folder that matches the concern) instead of keeping it tied to one module.
2. **Business value**
   - "Does this change enforce or clarify a business rule, security requirement, or consistency rule?"
   - Avoid adding abstractions that do not improve product safety, consistency, or maintainability.
3. **Security impact**
   - "Could this logic expose sensitive data or weaken authentication/authorization?"
   - If security-sensitive, require tests that validate safe behavior.
4. **Contract impact**
   - "Does this affect API input/output, error semantics, or schema validation?"
   - If yes, update route/contract tests accordingly.
5. **Test value**
   - "Am I testing a product decision, or only testing library passthrough?"
   - Prefer tests that protect business/security behavior over framework mechanics.

### Rule for shared helpers and converters

- When creating reusable helpers/converters frequently used across modules, place them in `shared` and include focused tests.
- Tests for shared helpers must validate at least:
  - expected output behavior,
  - edge or invalid scenarios that matter for callers,
  - security-sensitive behavior when applicable.

Example: `shared/utils/hashPassword` should be treated as a reusable security utility and must have tests that validate hashing behavior (not plain-text passthrough).

---

## Routes: schemas and documentation (Scalar/Swagger)

Routes live in per-domain folders (e.g. `routes/<domain>/`). Each route group has a **schema file** that defines the entity, `input`, and `output` in Zod. These schemas are used in Fastify’s `body`, `params`, `query`, and `response` for validation and automatic documentation.

### Zod schema (input and output)

Define a base object (entity), `input` (API request payload), and `output` (API response payload). Export inferred types for use in handlers and the module.

```ts
import { z } from "zod";

const item = z.object({
  id: z.string().uuid(),
  name: z.string(),
  amount: z.number(),
  createdAt: z.date(),
});

export const itemSchema = {
  item,
  input: z.object({
    name: z.string().min(1),
    amount: z.number().positive(),
  }),
  output: item,
};

export type ItemInput = z.infer<typeof itemSchema.input>;
export type ItemOutput = z.infer<typeof itemSchema.output>;
```

### Documentation with Scalar and Swagger

Every route must be documented so that the docs (Scalar at `/docs`) and OpenAPI (Swagger) reflect the API contract:

1. **Tags**: use `tags` with an array of strings that group the route in the doc (e.g. `["items"]`). Use the same tag for all routes of the same resource.
2. **Description**: set `description` to a clear sentence of what the route does.
3. **Inputs**: document inputs with `body` (POST/PATCH/PUT), `params` (path), and `query` (query string), using Zod schemas.
4. **Outputs (responses)**: document **all** possible responses in `response`:
   - Success (200, 201, 204) with the corresponding output schema.
   - Errors (400 validation, 404, 409 conflict, 500) using reusable error schemas from shared (`errorResponseSchema`, `validationErrorResponseSchema`).

The default API error format is `{ status: number, message: string }`; for 400 validation there may also be `issues` (array of Zod issues). Error schemas live in `shared/schemas/errorSchemas`.

### Example: registering routes

Use the Fastify instance type with Zod (e.g. `FastifyTypedInstance`). For each route, set `schema` with `tags`, `description`, `body`/`params`/`query`, and `response` with all responses. Handlers are functions that receive `request` and `reply` and delegate to the module’s controller (the exact controller/service/repository wiring is defined in the module’s AGENTS.md).

```ts
import { z } from "zod";
import type { FastifyTypedInstance } from "@/types/FastifyTypedInstance";
import { itemSchema } from "./itemSchema";
import {
  errorResponseSchema,
  validationErrorResponseSchema,
} from "@/shared/schemas/errorSchemas";
// handlers imported

export const itemRoutes = async (app: FastifyTypedInstance) => {
  app.get(
    "/items",
    {
      schema: {
        tags: ["items"],
        description: "List all items",
        response: {
          200: z.array(itemSchema.output),
          500: errorResponseSchema,
        },
      },
    },
    getItemsHandler,
  );

  app.post(
    "/items",
    {
      schema: {
        tags: ["items"],
        description: "Create a new item",
        body: itemSchema.input,
        response: {
          201: itemSchema.output,
          400: validationErrorResponseSchema,
          409: errorResponseSchema,
          500: errorResponseSchema,
        },
      },
    },
    postCreateItemHandler,
  );
};
```

The main routes file registers each group with a prefix (e.g. `app.register(itemRoutes, { prefix: "/items" })`).
