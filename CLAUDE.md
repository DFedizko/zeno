# Zeno — Project Root

Zeno is a personal financial management app with purchase tracking, dashboards, goal tracking, and JWT-based authentication.

## Monorepo structure

```
zeno/
├── api/          # Fastify + Prisma + Bun backend
├── app/          # React 19 + Vite + TanStack frontend
└── design/       # Design system tokens and Pencil prototypes
```

Each workspace has its own `CLAUDE.md` with commands and conventions. Always read the relevant workspace `CLAUDE.md` before making changes.

## Product priorities

When implementing anything, prioritize in this order:
1. **Security** — financial data, credentials, token handling
2. **Data consistency** — no partial writes, no orphaned records
3. **Business rule clarity** — explicit over implicit

## Design system

Design tokens live in [design/ZENO-DS-TOKENS.md](design/ZENO-DS-TOKENS.md). Use them as source of truth for colors, typography, and spacing when building UI.

- Font: `Manrope`
- Primary: `#111827` | Accent: `#3B82F6` | Danger: `#EF4444`
- Background: `#F5F5F7` | Card: `#FFFFFF` | Border: `#E5E7EB`

## Cross-workspace rules

- The API exposes an OpenAPI spec. The frontend consumes it via Kubb-generated client. Never hand-write fetch calls for documented endpoints.
- Error shape is always `{ status: number, message: string }` — both sides must respect this contract.
- Never commit `.env` files or secrets.
