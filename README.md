# Helios Capital — Take-Home Interview

Welcome! This repository is a mini full-stack app for an internal research
tool used by a fictional asset manager called **Helios Capital**. There is one
finished page (**Fund Universe**) wired end-to-end from the SQLite database
all the way to the React UI. Your job is to build the matching **Clients**
page using the existing Funds work as a template.

We're more interested in *how you read and reuse existing code* than in how
much new code you write. Most of this task is about following the patterns
that are already there.

---

## 1. Quick start

From the project root:

```bash
npm run install:all   # installs root, client, and server deps
npm run dev           # starts the API (port 8787) and the web app (port 5173)
```

Then open <http://localhost:5173/funds> — you should see a table of 200 funds
with search, filter chips, sorting, and pagination. That is the page you'll
be mirroring.

If the API isn't running, the page will be blank. Make sure both processes
are up.

---

## 2. The shape of the project

```
denny-interview/
├── types/                 ← shared TypeScript types used by BOTH sides
│   ├── funds.ts           ←  type Fund = { ticker, name, ... }
│   └── clients.ts         ←  type Client = { id, name, advisor, ... }   ← already defined for you
│
├── server/                ← Hono API + SQLite
│   └── src/
│       ├── index.ts       ← mounts each module's routes onto the app
│       ├── db.ts          ← creates the `funds` and `clients` tables and seeds them
│       ├── seed.ts        ← generates 200 unique funds and 200 unique clients
│       └── modules/
│           └── funds/                  ← the pattern you'll be copying
│               ├── funds.service.ts    ← talks to SQLite
│               ├── funds.route.ts      ← exposes HTTP endpoints
│               └── _shared/
│                   └── funds.constants.ts  ← raw SQL strings live here
│
└── client/                ← React + Vite + Tailwind + shadcn/ui + ag-grid + react-query
    └── src/
        ├── App.tsx        ← router; you'll register your new page here
        ├── pages/
        │   ├── FundUniverse/                  ← the page you'll be copying
        │   │   ├── FundUniverse.tsx
        │   │   ├── index.ts
        │   │   └── _shared/
        │   │       ├── FundUniverse.constants.tsx  ← columns, filter chips, copy
        │   │       ├── FundUniverse.cells.tsx      ← page-specific cell renderers
        │   │       ├── FundUniverseLegend.tsx      ← bottom strip, driven by useFundStats
        │   │       ├── useFunds.ts                 ← react-query hook for the table
        │   │       └── useFundStats.ts             ← react-query hook for total count + AUM
        │   └── Clients/
        │       └── Clients.tsx                ← placeholder you will replace
        └── components/
            ├── layout/    ← PageLayout, TopBar, PageHeader  (reuse as-is)
            └── table/
                ├── HeliosTable.tsx   ← generic ag-grid wrapper, takes columns/data/filter
                └── cells/          ← reusable cell renderers (badge, avatar, status, two-line)
```

Two patterns to internalise before you start:

- **Page composition** — `FundUniverse.tsx` is short on purpose. It pulls
  static configuration (columns, filter chips, page copy) from a
  `*.constants.tsx` file in `_shared/`, fetches data with a hook in
  `_shared/`, and renders `<PageLayout> → <PageHeader> → <HeliosTable> →
  <Legend>`.
- **Backend module** — every feature on the server lives under
  `server/src/modules/<name>/`, with one service class that owns SQL, one
  route file that owns HTTP, and a `_shared/<name>.constants.ts` holding raw
  SQL strings. `index.ts` plugs the route into the app with
  `app.route('/api/<name>', someRoute)`.

---

## 3. Your tasks

You'll build the Clients feature in two halves. We recommend doing the
backend first so the frontend has real data to render.

### Part A — Backend: expose `/api/clients`

The `clients` table is already created and seeded with 200 unique rows
(`db.ts` + `seed.ts`). The frontend type is already defined in
`types/clients.ts`. You just need to surface the data.

1. Create `server/src/modules/clients/clients.service.ts` modelled on
   `funds.service.ts`. Export a `ClientsService` class with at least:
   - `list(): Client[]`
   - `get(id: string): Client | undefined`
   - and a `clientsService` singleton instance.
   Import `Client` from `@shared/clients` so the type is shared with the
   frontend.

2. Create `server/src/modules/clients/_shared/clients.constants.ts` with the
   raw SQL strings (mirror the funds version). The `clients` table columns
   are `id, name, advisor, segment, aum, status` — no need to alias them.

3. Create `server/src/modules/clients/clients.route.ts` modelled on
   `funds.route.ts`. Expose:
   - `GET /` → return the full list
   - `GET /:id` → return one client, or `404` with `{ error: ... }` if not
     found.

4. Mount the route in `server/src/index.ts`:
   ```ts
   app.route('/api/clients', clientsRoute)
   ```

**You're done when** `curl http://localhost:8787/api/clients` returns a JSON
array of 200 clients, and `curl http://localhost:8787/api/clients/C-1001`
returns a single client.

### Part B — Frontend: render the Clients page

1. Inside `client/src/pages/Clients/`, mirror the `FundUniverse` folder
   structure:
   - `Clients.tsx` (page composition)
   - `index.ts` (re-export)
   - `_shared/Clients.constants.tsx` — `columns`, `filterChips`,
     `breadcrumbs`, `title`, `description`
   - `_shared/Clients.cells.tsx` — the two page-specific cell components
     (see step 2). Keeping them out of the constants file is required by
     the linter: Fast Refresh wants a file to either export only React
     components, or none.
   - `_shared/useClients.ts` — a react-query hook that fetches
     `/api/clients`
   - `_shared/ClientsLegend.tsx` — a small summary strip rendered under the
     table, mirroring `FundUniverseLegend.tsx`. For now you can hardcode
     "Showing X of Y clients" using the loaded list. The optional bonus in
     Part C plugs real numbers into this slot.

2. Define the column set for clients. You'll write two small cell
   components in `Clients.cells.tsx` (modelled on
   `FundUniverse.cells.tsx`), import them into `Clients.constants.tsx`, and
   reuse the two generic ones from `client/src/components/table/cells/` for
   the rest. Suggested layout:
   - **Client** — a `ClientNameCell` arrow function: a two-line block
     showing the client name on top and the id (e.g. `C-1042`) underneath.
     Copy `FundNameCell` and change the two fields.
   - **Segment** — `BadgeCell` (reuse, no changes)
   - **Advisor** — `AvatarCell` (reuse, no changes)
   - **AUM** — right-aligned plain text (no `cellRenderer`)
   - **Status** — a `ClientStatusCell` arrow function that maps the three
     statuses to a colour-coded `<Badge>`: `Active` → green, `Onboarding` →
     amber, `Lapsed` → grey. Copy `FundStatusCell` and update the
     conditional.

3. Set `filterChips` to the segment values you want users to filter by
   (e.g. `['Institutional', 'Private', 'Retail']`). The chips quick-filter
   the table.

4. Compose the page in `Clients.tsx` just like `FundUniverse.tsx`:
   ```tsx
   <PageLayout>
     <PageHeader breadcrumbs={...} title={...} description={...} />
     <HeliosTable<Client> columns={columns} data={clients} filter={filterChips} />
   </PageLayout>
   ```

5. Wire the new page into the router in `client/src/App.tsx`. The
   `/clients` route is already in place — point it at your new
   `ClientsPage` instead of the placeholder. The "Clients" tab in the top
   bar already navigates there.

**You're done when** clicking the **Clients** tab loads a table of 200
clients with working search, segment filter chips, sorting, and pagination,
all styled consistently with the Funds page.

### Part C — Bonus: show some SQL skill (optional)

If you've finished Parts A and B and want to take it one step further,
drive your `ClientsLegend` from **real counts computed in SQL** instead of
hardcoded text or numbers tallied on the frontend.

**This pattern already exists for Funds** — use it as your template. The
`FundUniverseLegend` shows total funds and total AUM, but those numbers
aren't in the constants file: they come from `GET /api/funds/stats`. Walk
that flow end-to-end before you start:

- `server/src/modules/funds/_shared/funds.constants.ts` — SQL strings
  (`SELECT COUNT(*)`, `SELECT SUM(aum_millions)`)
- `server/src/modules/funds/funds.service.ts` — `stats()` method
- `server/src/modules/funds/funds.route.ts` — `GET /stats`
- `types/funds.ts` — `FundStats` shared response type
- `client/.../_shared/useFundStats.ts` — react-query hook
- `client/.../_shared/FundUniverseLegend.tsx` — consumes the hook

Now do the equivalent for Clients. The interesting SQL shift is that you'll
also use `GROUP BY` for the per-status breakdown.

1. **Backend — add `GET /api/clients/stats`**. Response shape:
   ```ts
   {
     total: number
     byStatus: { Active: number; Onboarding: number; Lapsed: number }
   }
   ```
   Two queries cover it:
   ```sql
   SELECT COUNT(*) AS total FROM clients;
   SELECT status, COUNT(*) AS count FROM clients GROUP BY status;
   ```
   Put both SQL strings in `_shared/clients.constants.ts` alongside the
   ones you wrote in Part A, add a `stats()` method on `ClientsService`
   that runs both queries and shapes them into the response, and expose
   it from `clients.route.ts`. Add a `ClientStats` type to
   `types/clients.ts` so both sides agree on the shape.

2. **Frontend — add a `useClientStats` hook** under `_shared/`, modelled on
   `useFundStats`, that fetches `/api/clients/stats`.

3. **Render the result** in `ClientsLegend.tsx` so the strip shows
   something like:
   `● Active 120  · ● Onboarding 50  · ● Lapsed 30  ·  Total 200`
   driven by the response, with no hardcoded numbers.

**You're done when** the legend's numbers stay correct after you edit a few
seed rows in `server/src/seed.ts`, restart the server, and refresh the
page.

---

## 4. Acceptance checklist

- [ ] `GET /api/clients` returns 200 rows
- [ ] `GET /api/clients/:id` returns one row, 404 when missing
- [ ] No SQL strings live in the service file — they're in the `_shared`
      constants file
- [ ] `ClientsService` mirrors `FundsService` in shape and naming
- [ ] The Clients page renders without any new global CSS
- [ ] Status pills are colour-coded (Active green, Onboarding amber,
      Lapsed grey)
- [ ] Search box filters across all visible columns
- [ ] The page scrolls internally — the toolbar, table, and pagination
      footer all stay visible as you scroll the data
- [ ] You imported `Client` from `@shared/clients` on both client and
      server, not declared it twice

**Bonus (Part C, optional):**

- [ ] `GET /api/clients/stats` returns counts that match the table
- [ ] The SQL aggregation lives in `_shared/clients.constants.ts` (with
      the other SQL strings), not inlined inside the service
- [ ] The legend displays live numbers — change a row's status in
      `server/src/seed.ts`, restart the server, and the legend updates

---

## 5. Tips before you start

- **Read first, then code.** Spend 10 minutes reading `FundUniverse.tsx`,
  `funds.service.ts`, and `funds.route.ts`. The Clients version is the same
  files with different table names and column configs.
- **Copy is fine.** This task is intentionally a copy-and-rename exercise.
  We want to see that you can recognise the pattern and apply it
  correctly — not that you can invent a new one.
- **Shared types are non-negotiable.** Don't redeclare `Client` in any
  file; always import from `@shared/clients`. If a type drifts later, this
  is what keeps it honest.
- **Don't touch the database file (`server/data.db`) directly.** The seed
  in `server/src/seed.ts` runs on startup and will fix the row counts for
  you if anything looks off.
- **Restart the server** after creating new route/service files so the new
  endpoint is mounted. `tsx watch` usually picks it up, but a manual
  restart is the fastest way to be sure.
- **Stuck?** Look at what the Funds equivalent does and mirror it as
  closely as possible. There is no trick — the answer for "how should I do
  X on the Clients side?" is almost always "exactly like the Funds side
  does it."

Good luck, and enjoy!
