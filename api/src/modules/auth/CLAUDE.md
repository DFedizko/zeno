# Auth Module

Handles login (email/password), token refresh, and logout. For route registration and global testing strategy, see [api/CLAUDE.md](../../../CLAUDE.md).

## Layered architecture

```
domain/           → TokenPayload value object (no Prisma, no HTTP)
application/      → IAuthService / AuthService (use-case orchestration)
infrastructure/   → IAuthRepository / AuthRepository (Prisma + JWT + domain errors)
presentation/     → AuthController (req/reply → service → reply)
```

## Handler wiring (explicit composition)

```ts
export const postLoginHandler = async (req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) =>
  new AuthController(new AuthService(new AuthRepository())).login(req, reply);
```

No DI containers, no module-level singletons.

## Controller — thin I/O only

```ts
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  async login(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    const result = await this.authService.login(req.body);
    return reply.status(200).send(result);
  }

  async refresh(req: FastifyRequest, reply: FastifyReply) {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, "") ?? "";
    const result = await this.authService.refreshToken(token);
    return reply.status(200).send(result);
  }
}
```

## Service interface

```ts
export interface IAuthService {
  login(input: LoginInput): Promise<LoginOutput>;
  refreshToken(refreshToken: string): Promise<LoginOutput>;
  logout(token: string): Promise<void>;
}
```

## Repository — where credentials and tokens are validated

The repository is the only place that touches Prisma for auth and shared utils like `verifyPassword` and token generation.

Domain errors thrown here, caught by the global error handler:

```ts
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { TokenExpiredOrInvalid } from "../errors/TokenExpiredOrInvalid";
```

## Domain errors

```ts
// infrastructure/errors/InvalidCredentials.ts
export class InvalidCredentials extends BaseError {
  constructor(message = "Invalid email or password.") {
    super(message, 401);
  }
}

// infrastructure/errors/TokenExpiredOrInvalid.ts
export class TokenExpiredOrInvalid extends BaseError {
  constructor(message = "Token is invalid or expired.") {
    super(message, 401);
  }
}
```

## Security rules (non-negotiable)

- Wrong password or unknown user → always `InvalidCredentials` (401) with a generic message — never leak which field is wrong
- Invalid/expired refresh token → `TokenExpiredOrInvalid` (401)
- Never return `passwordHash` or raw JWT secret in any response
- Tokens in responses must be opaque strings — do not expose claims

## Testing — auth module priorities

| Layer | Priority | What to test |
|-------|----------|-------------|
| Infrastructure/Repository | **Highest** | Credential validation, token creation/refresh/revocation, domain error semantics |
| Routes | High | Status codes (200, 400, 401, 500), error shape `{ status, message }` |
| Application/Service | Low | Only if real orchestration logic exists beyond delegation |
| Domain | Low | Only if TokenPayload/Session has invariants |

### Required test coverage

- `401` when password is wrong
- `401` when refresh token is expired or invalid
- `400` for Zod validation failures on body
- `200` with correct output shape on success
- Success output must **never** contain `passwordHash`

### Anti-patterns

- Do not test that `bcrypt.compare` itself works — test that invalid credentials return 401
- Do not assert on internal token structure — assert on status and response shape
- Do not over-mock credential verification; prefer repository or route-level tests

## Checklist for new auth feature

1. Domain entity/value object (if needed) + errors in `infrastructure/errors/`
2. Zod schema in `src/routes/auth/` — `input`, `output`, exported types
3. `IAuthRepository` + `AuthRepository` — Prisma + shared utils + domain errors
4. `IAuthService` + `AuthService` (or use-case classes)
5. `AuthController` method
6. Handler function
7. Route with full schema (tags, description, body/params, all response codes)
8. Register in `src/routes.ts` with `/auth` prefix
