# Instructions for this project

This document describes the product context, tech stack, and code style for the Zeno frontend. It aligns with the backend API (see `api/AGENTS.md` for routes, schemas, and contracts). Feature- or area-specific conventions can live in local AGENTS.md files when the app grows.

---

## Product context

Frontend for **Zeno**, a personal financial management app with the following characteristics:

- **Purchase tracking**: users record purchases manually or automatically and manage preferred banks. The system is **agnostic to card networks and banks**.
- **Views**: lists of purchases and income; dashboards for spending, revenue, and savings; **goals**.
- **Authentication**: login with email/password or sign-up with Google. Users **subscribe** on a web landing page and get access to the app.

When implementing features, prioritize **security** (no sensitive data in UI state or logs), **consistency with the API contract** (request/response and error shapes), and **clear, accessible UX** (forms, loading, and error states).

---

## Tech stack

- **React** + **Vite**: app shell and build. Use React 19 patterns; Vite for dev and production builds.
- **TanStack Router**: file-based routing. Use the project’s `routesDirectory` and generated route tree; follow naming (`__root`, `$param`, `_layout`, `index`) so routes match the intended URLs and layouts.
- **TanStack Query**: server state and API calls. Use `useQuery` for reads and `useMutation` for writes; invalidate or update queries in `onSuccess` when data changes. Prefer generated hooks (e.g. from Kubb) when available so types stay aligned with the API.
- **Kubb**: type-safe API client and TanStack Query hooks from the backend OpenAPI spec. Keep generated code in the configured output path; use it for request/response types and for queries/mutations instead of hand-written `fetch` when the API is documented.
- **Zustand**: client state (UI state, session, preferences). Prefer a single store with slices when state is related; use `create` with slice functions and `get`/`set` for cross-slice updates. Keep stores focused and avoid duplicating server state that belongs in TanStack Query.
- **Zod**: validation and types. Use for form schemas (with React Hook Form), URL/search params, and any runtime validation that must match the API or domain rules.
- **React Hook Form** + **@hookform/resolvers**: forms with minimal re-renders. Use `zodResolver(schema)` so validation and types come from Zod; handle string/number/date coercion in the schema or transform step when needed.
- **shadcn/ui** + **Radix UI**: components and primitives. shadcn gives copy-paste, Tailwind-based components built on Radix; use them as the default for new UI. Customize in place; do not wrap Radix primitives in extra abstraction layers unless the design system requires it.
- **Tailwind CSS**: styling. Follow the project’s Tailwind config and design tokens; prefer utility classes and shared components over one-off inline styles.

Use the stack consistently so routing, data fetching, forms, and UI stay predictable and type-safe.

---

## Code style rules

### Exporting rules

- Always declare components and page components with `const` (arrow or function expressions).
- Use **named exports** for components (reusable UI pieces).

#### Example

Component (named export):

```tsx
export const Card = () => {
  return (
    <li>
      <p>This is a named export</p>
    </li>
  );
};
```

### General

- Don't add comments.
- Prefer existing shadcn/Radix components over custom markup for accessibility and consistency.
- For API errors, rely on the shared shape (`{ status, message }` and optionally `issues` for validation); show user-friendly messages and avoid exposing raw payloads in the UI.

### Markup and layout

- Never use a `div` that has a single child which is also a `div`. Merge the outer and inner container into one: apply the needed classes (e.g. layout + styling) on a single element and avoid extra wrappers.

**Avoid:**

```tsx
<div className="flex flex-col">
  <div className="bg-gray-300">
    <p>Content</p>
  </div>
</div>
```

**Prefer:**

```tsx
<div className="bg-gray-300 flex flex-col">
  <p>Content</p>
</div>
```

---

## AI development self-check (frontend)

Before adding or changing UI or client logic, consider:

1. **API contract**  
   Does this touch request/response or error handling? If yes, align with the backend contract (types, status codes, error shape) and use generated client/hooks when available.

2. **Sensitive data**  
   Could this log, store, or display sensitive data (tokens, PII, financial details)? If yes, avoid keeping it in client state longer than needed and never expose it in console or markup.

3. **State ownership**  
   Is this server state (from the API) or client state (UI, session)? Use TanStack Query for the former and Zustand (or local state) for the latter; avoid duplicating server state in stores.

4. **Forms and validation**  
   Do forms need validation? Use React Hook Form with `zodResolver` and a Zod schema so types and validation stay in sync and match API expectations where relevant.

5. **Reusability**  
   Is this component or util reusable across routes or features? If yes, place it in a shared folder (e.g. `components/`, `lib/`, `hooks/`) and export it with a clear name.

6. **Over-nested markup**  
   Am I stacking many divs inside divs, with lots of spans and paragraphs in one place? If yes, consider componentizing: extract meaningful blocks into components and create folders following the project’s structure (e.g. `components/`, feature folders) instead of keeping everything in a single file.
