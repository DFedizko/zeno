# TanStack Router — Skill Reference

> Conventions and patterns for TanStack Router with file-based routing in the Zeno project.
> Routes live in `src/pages/` (configured in `vite.config.ts`).

---

## File naming conventions

| File / Pattern | URL produced | Notes |
|---|---|---|
| `__root.tsx` | (root layout) | Must use `createRootRouteWithContext` |
| `index.tsx` | `/` | Index route, exact match of parent |
| `about.tsx` | `/about` | Flat route |
| `blog.post.tsx` | `/blog/post` | Nested via `.` separator |
| `$postId.tsx` | `/:postId` | Dynamic param — value in `params.postId` |
| `_layout.tsx` | (no URL segment) | Pathless layout — wraps children, no path |
| `_layout/dashboard.tsx` | `/dashboard` | Child of `_layout` pathless route |
| `posts_.tsx` | `/posts` | `_` suffix = non-nested (no parent layout) |
| `(group)/route.tsx` | `/route` | Route group folder — org only, no URL |
| `-helpers.tsx` | excluded | `-` prefix = not added to route tree |
| `script[.]js.tsx` | `/script.js` | `[x]` escapes special chars in filenames |
| `blog/post/route.tsx` | `/blog/post` | Directory + `route.tsx` for layout split |

> **Auto-generate:** never edit `src/routeTree.gen.ts` manually. The TanStack Router Vite plugin regenerates it on file changes.

---

## Route file structure

Every page file must export `Route` as a named export:

```tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return <div>About</div>;
}
```

### Root route (with context)

```tsx
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthState } from "@/auth";

export const Route = createRootRouteWithContext<{ auth: AuthState }>()({
  component: () => <Outlet />,
});
```

---

## Router context

The Zeno router passes `auth: AuthState` as context. Access it in `beforeLoad` and `loader`:

```tsx
// src/router.tsx
export const router = createRouter({
  routeTree,
  context: { auth: undefined! }, // provided by AuthProvider at runtime
});

// Declaration merging for full type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
```

Wrap `<RouterProvider>` with the context provider:

```tsx
<AuthProvider>
  <RouterProvider router={router} context={{ auth: useAuth() }} />
</AuthProvider>
```

---

## Authentication / protected routes

Use a pathless layout (`_authenticated.tsx`) with `beforeLoad`:

```tsx
export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isLoading && !context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => {
    const auth = useAuth();
    if (auth.isLoading) return <Spinner />;
    if (!auth.isAuthenticated) return null;
    return <Outlet />;
  },
});
```

All routes under `_authenticated/` are protected automatically.

---

## Search params

Always validate with Zod via `zodValidator`. Use `.catch()` to prevent breaking navigation on invalid values:

```tsx
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const searchSchema = z.object({
  page: z.number().catch(1),
  filter: z.string().catch(""),
  sort: z.enum(["newest", "oldest"]).catch("newest"),
});

export const Route = createFileRoute("/transactions")({
  validateSearch: zodValidator(searchSchema),
  component: TransactionsPage,
});

// Reading
function TransactionsPage() {
  const { page, filter, sort } = Route.useSearch();
}

// Updating (via Link — preserves other params)
<Link from={Route.fullPath} search={(prev) => ({ ...prev, page: prev.page + 1 })}>
  Next
</Link>

// Updating (imperatively)
const navigate = useNavigate({ from: Route.fullPath });
navigate({ search: (prev) => ({ ...prev, page: prev.page + 1 }) });
```

---

## Dynamic params

```tsx
// File: src/pages/transactions/$transactionId.tsx
export const Route = createFileRoute("/transactions/$transactionId")({
  loader: ({ params }) => fetchTransaction(params.transactionId),
  component: TransactionDetail,
});

function TransactionDetail() {
  const { transactionId } = Route.useParams();
  const data = Route.useLoaderData();
}
```

---

## Data loading

### With TanStack Query (preferred in Zeno)

Use `loader` to prefetch and `useQuery` / generated Kubb hooks in the component:

```tsx
import { queryClient } from "@/lib/queryClient";

export const Route = createFileRoute("/dashboard")({
  loader: () => queryClient.ensureQueryData(getDashboardQueryOptions()),
  component: DashboardPage,
});

function DashboardPage() {
  const { data } = useGetApiDashboard(); // Kubb-generated hook
}
```

### Loader deps (cache keyed on search params)

```tsx
export const Route = createFileRoute("/transactions")({
  validateSearch: zodValidator(searchSchema),
  loaderDeps: ({ search: { page, filter } }) => ({ page, filter }),
  loader: ({ deps }) => fetchTransactions(deps),
});
```

---

## Navigation

### Link (preferred for interactive elements)

```tsx
import { Link } from "@tanstack/react-router";

// Static
<Link to="/dashboard">Dashboard</Link>

// With params
<Link to="/transactions/$id" params={{ id: tx.id }}>View</Link>

// Active styling
<Link to="/dashboard" activeProps={{ className: "font-bold text-accent" }}>
  Dashboard
</Link>

// Preload on hover
<Link to="/dashboard" preload="intent">Dashboard</Link>
```

### useNavigate (imperative, side effects only)

```tsx
const navigate = useNavigate({ from: Route.fullPath });

// After a mutation
await createTransaction(data);
navigate({ to: "/transactions" });

// After login — restore original destination
const search = Route.useSearch();
navigate({ to: search.redirect ?? "/dashboard" });
```

### redirect (in loaders / beforeLoad)

```tsx
import { redirect } from "@tanstack/react-router";

throw redirect({ to: "/login", search: { redirect: location.href } });
```

---

## Outlets

Every layout route renders children via `<Outlet />`:

```tsx
function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <main><Outlet /></main>
    </div>
  );
}
```

---

## Common mistakes

| Mistake | Correct |
|---------|---------|
| Editing `routeTree.gen.ts` | Never — it's auto-generated |
| Using `<a href>` for internal links | Use `<Link to="...">` |
| Using `useNavigate` for link elements | Use `<Link>` — supports cmd+click, prefetch |
| Not validating search params | Always use `validateSearch` with `zodValidator` |
| Accessing route data without `Route.useSearch()` | Use the typed `Route.useSearch()` / `Route.useParams()` hooks |
| Forgetting `from` in `useNavigate` | Pass `from: Route.fullPath` for full type safety |
| Nesting a route inside `_authenticated/` for public pages | Only put protected routes under the pathless auth layout |
| Reading loader data with `useLoaderData()` without route context | Use `Route.useLoaderData()` or `getRouteApi('/path').useLoaderData()` |
