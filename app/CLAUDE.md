# Zeno App

Frontend for Zeno built with React 19, Vite, TanStack Router/Query, and Tailwind CSS v4.

## Commands

```bash
# Development
bun run dev          # Vite dev server

# Build
bun run build        # Vite production build → dist/

# Preview
bun run preview      # serve dist/ locally

# Format / lint
bun run format       # biome check --write
bun run lint         # eslint
```

<!-- intent-skills:start -->
# Skill mappings — when working in these areas, load the linked skill file into context.
skills:
  - task: "creating or modifying routes, pages, layouts, or navigation"
    load: "skills/tanstack-router/SKILL.md"
  - task: "protecting routes with authentication or redirecting based on auth state"
    load: "skills/tanstack-router/SKILL.md"
  - task: "working with URL search params, dynamic route params, or type-safe navigation"
    load: "skills/tanstack-router/SKILL.md"
  - task: "setting up router context, beforeLoad guards, or loaders"
    load: "skills/tanstack-router/SKILL.md"
<!-- intent-skills:end -->

## Tech stack — when to use what

| Concern | Tool |
|---------|------|
| Routing | TanStack Router (file-based, `src/pages/`) |
| Server state | TanStack Query (`useQuery` / `useMutation`) |
| API client | Kubb-generated hooks from `src/gen/` |
| Client state | Zustand (`src/stores/`) |
| Forms | React Hook Form + `zodResolver` |
| Validation | Zod |
| UI components | shadcn/ui + Radix UI primitives |
| Styling | Tailwind CSS v4 utility classes |

**Rule:** prefer Kubb-generated hooks over hand-written fetch calls. If the endpoint is in the OpenAPI spec, a typed hook already exists in `src/gen/`.

## Code style

### Exports

Always use **named exports** with `const` arrow functions:

```tsx
// Correct
export const UserCard = () => { ... };

// Wrong — default export
export default function UserCard() { ... }
```

### No comments in code

Do not add inline comments or JSDoc to component files.

### Markup — no single-child divs

Never wrap a single child with a parent that exists only to add classes. Merge into one element:

```tsx
// Wrong
<div className="flex flex-col">
  <div className="bg-card rounded-lg">
    <p>Content</p>
  </div>
</div>

// Correct
<div className="flex flex-col bg-card rounded-lg">
  <p>Content</p>
</div>
```

### Forms

Always pair React Hook Form with a Zod schema:

```tsx
const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
const form = useForm({ resolver: zodResolver(schema) });
```

### Error handling

API errors follow `{ status: number, message: string }` (+ `issues` for 400). Show user-friendly messages. Never display raw payloads or expose API internals in the UI.

### Sensitive data

Never store tokens, passwords, or financial details in component state, `console.log`, or DOM attributes. Keep sensitive data in memory only as long as needed.

## State ownership

| Data type | Where it lives |
|-----------|---------------|
| Server data (API responses) | TanStack Query cache |
| Session / auth tokens | Zustand auth store |
| UI state (modals, tabs) | Local `useState` or Zustand slice |

Do not duplicate server state in Zustand stores.

## File structure conventions

```
src/
├── gen/            # Kubb-generated client — do not edit manually
├── pages/          # TanStack Router file-based routes (routesDirectory)
├── components/     # Reusable UI components (named exports)
├── stores/         # Zustand stores
├── hooks/          # Custom hooks
├── lib/            # Utilities and helpers
└── styles/         # Global CSS
```

Reusable components go in `src/components/`. Feature-specific components can be co-located with their route/page.

## TanStack Router naming conventions

Routes live in `src/pages/`. Never edit `src/routeTree.gen.ts` — it's auto-generated.

| File pattern | URL | Notes |
|---|---|---|
| `__root.tsx` | (root) | Must use `createRootRouteWithContext` |
| `index.tsx` | `/` | Exact match of parent path |
| `about.tsx` | `/about` | Flat route |
| `blog.post.tsx` | `/blog/post` | Nested via `.` separator |
| `$postId.tsx` | `/:postId` | Dynamic param → `params.postId` |
| `_layout.tsx` | (no segment) | Pathless layout — wraps children, no URL |
| `_layout/page.tsx` | `/page` | Child of pathless layout |
| `posts_.tsx` | `/posts` | `_` suffix = non-nested (skip parent layout) |
| `(group)/route.tsx` | `/route` | Route group — org only, no URL impact |
| `-helper.tsx` | excluded | Not added to route tree (colocation) |

For full patterns and anti-patterns, see [skills/tanstack-router/SKILL.md](skills/tanstack-router/SKILL.md).

## Design tokens

From [design/ZENO-DS-TOKENS.md](../design/ZENO-DS-TOKENS.md):

```css
--color-primary: #111827;
--color-accent: #3B82F6;
--color-danger: #EF4444;
--color-success: #10B981;
--color-border: #E5E7EB;
--color-background: #F5F7F5;
--color-card: #FFFFFF;
--font-family-sans: Manrope;
```

## Self-check before implementing UI

1. **API contract** — does this touch a documented endpoint? Use the generated hook from `src/gen/`.
2. **Sensitive data** — could this log or render tokens/PII? Remove it.
3. **State ownership** — server state in TanStack Query, client state in Zustand.
4. **Form validation** — use `zodResolver` so schema and types stay in sync.
5. **Reusability** — if used in 2+ places, extract to `src/components/` or `src/hooks/`.
6. **Markup depth** — too many nested divs? Extract into components.

## Kubb-generated client

Run Kubb after changing API schemas:

```bash
bun kubb         # regenerates src/gen/ from the OpenAPI spec
```

Config: [kubb.config.ts](kubb.config.ts). Never edit files inside `src/gen/` manually.
