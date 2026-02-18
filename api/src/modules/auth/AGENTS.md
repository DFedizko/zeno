# Instructions for the Auth module

This module follows a layered architecture: **domain**, **application**, **infrastructure**, and **presentation**. Use this document when implementing or changing features inside the auth module. For routes, schemas, and Scalar/Swagger documentation, see the **AGENTS.md at the API root**.

---

## Module architecture

1. **Domain**: entities and pure business rules related to authentication (e.g. session/token concepts). No Prisma, no HTTP.
2. **Application**: use cases and/or services. Auth use cases (login, logout, refresh token, validate token). Dependencies are inverted via repository interfaces and optional shared utils (e.g. token generation from `shared`).
3. **Infrastructure**: repository implementations (`I*Repository` and `*Repository`), data access (Prisma for sessions/refresh tokens when stored), token utilities, and domain-specific errors (e.g. invalid credentials, token expired).
4. **Presentation**: controllers that receive Fastify request/reply and call the service; no business logic.

**Shared** (outside the module) holds generic errors, plugins (errorHandler), utils (hash, JWT/token generation if generic), reusable API schemas (error responses), and global types. No auth-domain rules in shared.

---

## Handlers: wiring Controller → Service → Repository

Each route handler is a function that **instantiates** the controller with a service instance, and the service with a repository instance (and any shared util it needs). Do not use DI containers or singletons; composition is explicit in the handler.

```ts
import type { FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "@/modules/auth/presentation/controllers/AuthController";
import { AuthService } from "@/modules/auth/application/services/AuthService";
import { AuthRepository } from "@/modules/auth/infrastructure/repositories/AuthRepository";
import type { LoginInput } from "@/routes/auth/authSchema";

export const postLoginHandler = async (
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply,
) => {
  return new AuthController(new AuthService(new AuthRepository())).login(
    request,
    reply,
  );
};
```

---

## Controller (presentation)

The controller receives `FastifyRequest` and `FastifyReply`, extracts data (body, params, query, headers for tokens), and calls **one service method**. Then it sends the response with `reply.status(...).send(...)`. It does not access Prisma or business rules; it only orchestrates input/output.

```ts
import type { FastifyReply, FastifyRequest } from "fastify";
import type { IAuthService } from "../../application/services/IAuthService";
import type { LoginInput } from "@/routes/auth/authSchema";

export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(
    request: FastifyRequest<{ Body: LoginInput }>,
    reply: FastifyReply,
  ) {
    const { email, password } = request.body;
    const result = await this.authService.login({ email, password });
    return reply.status(200).send(result);
  }

  async refresh(request: FastifyRequest, reply: FastifyReply) {
    const token = request.headers.authorization?.replace(/^Bearer\s+/i, "") ?? "";
    const result = await this.authService.refreshToken(token);
    return reply.status(200).send(result);
  }
}
```

---

## Service (application)

The service implements the `I*Service` interface and receives the repository in its constructor (`I*Repository`). It holds use-case orchestration: validate credentials, generate/refresh tokens, invalidate sessions. Data access and token storage/validation are through the repository; password comparison and token generation may use shared utils.

### Use cases in application layer

The application layer may expose explicit **use cases** (e.g. login, logout, refresh) instead of a single service. Each use case should have a clear contract (input/output) and solve one auth flow.

When using use cases:

- define a clear use-case contract (interface/type) with explicit input and output (types from route schemas),
- orchestrate repository flow (e.g. find user by email, verify password, create/refresh token),
- keep controllers/handlers thin by delegating to use cases,
- keep domain rules in domain entities when they are pure (e.g. token/session invariants).

**Interface (example):**

```ts
import type { LoginInput, LoginOutput } from "@/routes/auth/authSchema";

export interface IAuthService {
  login(input: LoginInput): Promise<LoginOutput>;
  refreshToken(refreshToken: string): Promise<LoginOutput>;
  logout(accessTokenOrRefreshToken: string): Promise<void>;
}
```

**Implementation (example):**

```ts
import type { IAuthService } from "./IAuthService";
import type { IAuthRepository } from "../../infrastructure/repositories/IAuthRepository";
import type { LoginInput, LoginOutput } from "@/routes/auth/authSchema";

export class AuthService implements IAuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async login(input: LoginInput): Promise<LoginOutput> {
    return this.authRepository.validateCredentialsAndCreateTokens(input);
  }

  async refreshToken(refreshToken: string): Promise<LoginOutput> {
    return this.authRepository.refreshTokens(refreshToken);
  }

  async logout(token: string): Promise<void> {
    return this.authRepository.invalidateToken(token);
  }
}
```

---

## Repository (infrastructure)

The repository implements `I*Repository` and uses the Prisma client (when sessions/refresh tokens are stored) and shared utils (e.g. `hashPassword` for comparison, JWT/token generation). It maps between domain concepts and persistence. **Domain errors** (e.g. invalid credentials, token expired, token not found) are thrown in this layer and handled by the global error handler.

**Interface (example):**

```ts
import type { LoginInput, LoginOutput } from "@/routes/auth/authSchema";

export interface IAuthRepository {
  validateCredentialsAndCreateTokens(input: LoginInput): Promise<LoginOutput>;
  refreshTokens(refreshToken: string): Promise<LoginOutput>;
  invalidateToken(token: string): Promise<void>;
}
```

**Implementation (example with domain errors):**

```ts
import { prisma } from "@/database/prisma";
import type { IAuthRepository } from "./IAuthRepository";
import type { LoginInput, LoginOutput } from "@/routes/auth/authSchema";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { TokenExpiredOrInvalid } from "../errors/TokenExpiredOrInvalid";
import { verifyPassword } from "@/shared/utils/verifyPassword";
// import token generation from shared or infra

export class AuthRepository implements IAuthRepository {
  async validateCredentialsAndCreateTokens(input: LoginInput): Promise<LoginOutput> {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user?.passwordHash) throw new InvalidCredentials("Invalid email or password.");
    const valid = await verifyPassword(input.password, user.passwordHash);
    if (!valid) throw new InvalidCredentials("Invalid email or password.");
    // build and return accessToken + refreshToken (and optionally store refresh token)
    return { accessToken: "...", refreshToken: "...", expiresIn: 3600 };
  }

  async refreshTokens(refreshToken: string): Promise<LoginOutput> {
    // validate refresh token (DB or JWT), revoke old, issue new; throw TokenExpiredOrInvalid on failure
    throw new TokenExpiredOrInvalid("Refresh token is invalid or expired.");
  }

  async invalidateToken(token: string): Promise<void> {
    // remove or blacklist token from storage if applicable
  }
}
```

---

## Domain entities

They live in `domain/entities`. Use them for pure auth concepts (e.g. Session, Token payload) when you need invariants or validation that do not depend on Prisma or HTTP. They **must not** import Prisma or Fastify. If auth is fully stateless (JWT only), the domain layer may be minimal (e.g. only value objects for token claims).

```ts
// Example: value object for token payload
export class TokenPayload {
  private constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly exp: number,
  ) {}

  static create(userId: string, email: string, expSeconds: number) {
    return new TokenPayload(userId, email, Math.floor(Date.now() / 1000) + expSeconds);
  }
}
```

---

## Errors

- **Base (shared)**: `BaseError` with `message`, `status`, and `sendMessage(reply)`.
- **Domain errors**: extend `BaseError` and set the appropriate `status` (e.g. 401 unauthorized, 403 forbidden). They live in the module’s `infrastructure/errors`.
- **Validation**: `ValidationError` (shared) with Zod `issues` (400). The global error handler treats them in order: `ValidationError` → `BaseError` → 500 fallback.

**Example domain errors:**

```ts
import { BaseError } from "@/shared/errors/BaseError";

export class InvalidCredentials extends BaseError {
  constructor(message = "Invalid email or password.") {
    super(message, 401);
  }
}

export class TokenExpiredOrInvalid extends BaseError {
  constructor(message = "Token is invalid or expired.") {
    super(message, 401);
  }
}
```

---

## Prisma and shared

- The Prisma client is imported from the central database module and used only in repositories (e.g. to load user for credential check, or to store/revoke refresh tokens).
- Utils (password hashing/verification, JWT or token generation) and global types live in shared or in auth infrastructure if they are auth-specific; the auth module imports and uses them. Keep token generation/verification in one place (shared or auth infra) and reuse.

---

## Testing strategy for Auth module

Use the global testing strategy from the API root AGENTS and apply these module-specific requirements.

### Layer priorities for this module

- **Domain (`domain/entities`)**: token/session value objects and invariants when present.
- **Application (`application/services`)**: test only real use-case rules (e.g. login flow orchestration, refresh flow). If a service method is pure delegation, prefer coverage in repository/route tests.
- **Infrastructure (`infrastructure/repositories`)**: high priority; validate credential verification, token creation/refresh/revocation, and that invalid credentials or expired tokens throw the correct domain errors.
- **Presentation/routes**: validate HTTP contract, status codes (200, 401, 400, 500), and integration with shared error handling.

### Contract and error expectations

- Route tests must cover `400` validation via Zod for invalid body/params/query.
- Error payloads must remain compatible with shared error shape (`{ status, message }`).
- Success outputs must match `authSchema.output` and must **never** leak passwords or raw password hashes; tokens must be opaque or clearly documented as short-lived.

### Security expectations

- Tests must prove that wrong password or missing user returns 401 (InvalidCredentials).
- Tests must prove that invalid or expired refresh token returns 401 (TokenExpiredOrInvalid).
- Do not assert on raw token content unless the contract explicitly exposes it; focus on status and response shape.

### Anti-patterns to avoid in this module

- Service unit tests that only verify passthrough repository calls without business/security assertions.
- Over-mocking credential verification; prefer repository or route-level tests that validate 401 semantics.
- Tests that only assert "token is a string" without validating error paths and status codes.
- Exposing internal token structure in API responses beyond what is required by the contract.

---

## Checklist when adding a new feature in the module

1. **Domain**: entity or value object (if applicable) and specific errors in `infrastructure/errors`.
2. **Schema**: in `routes/auth/`, define or update Zod `input` and `output` and export types (route documentation process is in the root AGENTS.md).
3. **Repository**: `I*Repository` and `*Repository` using Prisma and shared utils; throw domain errors (InvalidCredentials, TokenExpiredOrInvalid, etc.) when applicable.
4. **Service**: `I*Service` and `*Service` (or use cases) receiving the repository and implementing auth flows.
5. **Controller**: methods that receive request/reply and call the service.
6. **Handlers**: functions that instantiate Controller(Service(Repository())) and call the corresponding method.
7. **Routes**: register in the auth route file with full `schema` (tags, description, body/params/query, response with success and errors); point to the handlers.
8. **Registration**: add the route group to the main routes file with the appropriate prefix (e.g. `/auth`).
