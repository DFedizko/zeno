# User Module

Handles user registration and management. For route registration and global testing strategy, see [api/CLAUDE.md](../../../CLAUDE.md).

## Layered architecture

```
domain/           → User entity (no Prisma, no HTTP)
application/      → IUserService / UserService (orchestration)
infrastructure/   → IUserRepository / UserRepository (Prisma + domain errors)
presentation/     → UserController (req/reply → service → reply)
```

## Handler wiring (explicit composition)

```ts
export const postCreateUserHandler = async (req: FastifyRequest<{ Body: UserInput }>, reply: FastifyReply) =>
  new UserController(new UserService(new UserRepository())).createUser(req, reply);
```

No DI containers, no module-level singletons.

## Domain entity

```ts
export class User {
  private constructor(
    public readonly _email: string,
    public readonly _name?: string,
    public readonly _password?: string,
  ) {}

  static create(email: string, name?: string, password?: string) {
    return new User(email, name, password);
  }

  get email() { return this._email; }
  get name() { return this._name; }
  get password() { return this._password; }
}
```

Entities must not import Prisma or Fastify.

## Service interface

```ts
export interface IUserService {
  getUsers(): Promise<UserOutput[]>;
  createUser(input: UserInput): Promise<UserOutput>;
}
```

Use explicit use-case classes (`CreateUserUseCase`, etc.) when multiple steps or cross-repository checks are needed.

## Repository

The repository implements `IUserRepository`, uses Prisma, and throws domain errors:

```ts
export class UserRepository implements IUserRepository {
  async createUser(input: UserInput): Promise<UserOutput> {
    const exists = await this.userExistsByEmail(input.email);
    if (exists) throw new UserAlreadyExists("User already exists with this email.");

    const user = User.create(input.email, input.name, input.password);
    return prisma.user.create({
      data: {
        id: randomUUID(),
        email: user.email,
        name: user.name ?? null,
        passwordHash: user.password ? await hashPassword(user.password) : null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
```

## Domain errors

```ts
// infrastructure/errors/UserAlreadyExists.ts
export class UserAlreadyExists extends BaseError {
  constructor(message = "User already exists.") {
    super(message, 409);
  }
}
```

## Security rules (non-negotiable)

- Never return `passwordHash` in any `UserOutput`
- Hash passwords with `shared/utils/hashPassword` — never store plaintext
- Conflict check must throw `UserAlreadyExists` (409), not expose whether email exists in a public-facing context

## Testing — user module priorities

| Layer | Priority | What to test |
|-------|----------|-------------|
| Infrastructure/Repository | **Highest** | Persistence, conflict (duplicate email → 409), password hashing (never plain text), output never leaks `passwordHash` |
| Routes | High | Status codes (201, 400, 409, 500), Zod validation, error shape `{ status, message }` |
| Domain | Medium | `User.create` invariants |
| Application/Service | Low | Only real orchestration; if pure delegation, skip |

### Required test coverage

- `409` when email already exists
- `400` for invalid body (Zod validation)
- `201` with correct output — `passwordHash` must **never** appear
- Partial update semantics: omitted fields are preserved when applicable

### Anti-patterns

- Do not write tests that only verify `prisma.user.create` was called with exact input
- Do not test that `bcrypt.hash` produces a string — test that the stored hash is not plain text
- Do not expose `passwordHash` anywhere in assertions or fixtures

## Checklist for new user feature

1. Domain entity update (if applicable) + errors in `infrastructure/errors/`
2. Zod schema in `src/routes/user/` — `input`, `output`, exported types
3. `IUserRepository` + `UserRepository` — Prisma + domain errors
4. `IUserService` + `UserService` (or use-case classes per action)
5. `UserController` method
6. Handler function
7. Route with full schema (tags, description, body/params, all response codes)
8. Register in `src/routes.ts` (add prefix if new group)
