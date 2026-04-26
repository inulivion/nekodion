# Nekodion

A personal finance management app (family budget tracker).

## Repository Structure

```
nekodion
├─ core      # Backend (Java / Spring Boot)
├─ fluffy    # Database (Flyway migrations)
├─ paw       # Documentation (design, requirements, coding conventions)
├─ scratch   # Scripts
└─ whisker   # Frontend (Next.js)
```

## Backend (`core/`)

**Stack:** Java, Spring Boot, Spring Data JPA, Lombok, Gradle multi-project

**Modules:**

| Module     | Responsibility                                       |
| ---------- | ---------------------------------------------------- |
| `api`      | REST controllers, use cases, request/response models |
| `batch`    | Scheduled batch jobs                                 |
| `domain`   | Entities, repositories, domain services              |
| `external` | Email parsing, CSV parsing, web scraping             |
| `support`  | Shared utilities                                     |

**Module dependency direction:** `api` / `batch` → `domain` / `external` → `support`. Never create reverse dependencies.

**Running the API (IntelliJ):**

- Task: `api:bootRun`, Gradle project: `core`
- Env vars: `DB_NAME=nekodion;DB_USERNAME=;DB_PASSWORD=;ISSUER=;AUDIENCE=`

**Running batch jobs:**

- Task: `batch:bootRun --args='--batch.execute=<name>'`, Gradle project: `core`
- Env vars: `DB_NAME=nekodion;DB_USERNAME=;DB_PASSWORD=`

## Frontend (`whisker/`)

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui, Auth0, pnpm

**Key directories:**

- `src/app/(authorized)/` — authenticated pages
- `src/app/(unauthorized)/` — public pages
- `src/features/<name>/` — feature modules (`api.ts`, `actions.ts`, `types.ts`, `components/`)
- `src/components/ui/` — shadcn/ui components (auto-generated, do not edit manually)
- `src/util/fetcher/` — HTTP client wrapper (use this instead of raw `fetch`)

**Running the frontend:**

```bash
cd whisker
pnpm dev
```

## Database (`fluffy/`)

- Managed by Flyway, run via Docker
- Migration files: `fluffy/src/main/resources/db/migration/`
- Naming: `V<major>_<minor>__<description>.sql`

## Key Conventions

- **Cross-domain dependencies:** Domain modules must not reference each other. Use IDs only across domain boundaries.
- **User authentication:** Use `@CurrentUser UserDto currentUser` in controllers. Never access `SecurityContextHolder` directly.
- **API calls (frontend):** Always use `fetcher` from `@/util/fetcher`. Never use raw `fetch`.
- **Server Actions:** Must have `"use server"` at the top. Return typed state objects with `errors` and optional `success`.
- **`components/ui/`:** shadcn/ui only — do not hand-edit files in this directory.

## Documentation

Full coding conventions are in `paw/コーディング規約/`:

- [バックエンド.md](paw/コーディング規約/バックエンド.md)
- [フロントエンド.md](paw/コーディング規約/フロントエンド.md)

Design docs are in `paw/設計/`.
