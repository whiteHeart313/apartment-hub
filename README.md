# Apartment Listings App

Simple app to list apartments, view details, and add new ones.

## Stack

- Frontend: Next.js (client on port `3000`)
- Backend: NestJS (server on port `8080`)
- Database: Postgres (port `5432`)

## Run with Docker (recommended)

- Build and start all services:

```bash
docker-compose up -d --build
```

- Open:
  - Frontend: http://localhost:3000
  - Backend API: http://localhost:8080/v1
- Compose sets:
  - `NEXT_PUBLIC_API_URL=http://backend:8080/v1` (frontend)
  - `POSTGRES_URI=postgres://postgres:password@apartment-db:5432/nawy-db` (backend)

## Run locally (without Docker)

- Install dependencies:

```bash
yarn install:all
```

- Start backend:

```bash
yarn --cwd server start:dev
```

- Start frontend:

```bash
yarn --cwd client dev
```

## API Summary (to implement)

- `GET /v1/apartments` — list apartments
- `GET /v1/apartments/:id` — apartment details
- `POST /v1/apartments` — add an apartment

## Husky (pre-commit)

- Pre-commit runs `lint-staged`:
  - ESLint fix + Prettier format on staged files
- If a commit fails, run checks manually:

```bash
yarn --cwd client lint
```

```bash
yarn --cwd server lint
```

```bash
yarn --cwd client tsc --noEmit -p tsconfig.json
```

```bash
yarn --cwd server tsc --noEmit -p tsconfig.json
```
