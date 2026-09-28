# Phase 01 — Foundation & Project Setup

> **Priority:** [M] MUST  
> **Owner:** B (Backend & DevOps lead)  
> **Parallel:** None — must be first  
> **Estimated effort:** Medium (2–3 days)  
> **Status:** NOT STARTED

---

## Objective

Set up the monorepo structure, tooling, linting, environment config, and CI pipeline. Create health endpoints for the Node server and Python AI service. Ensure one command starts all services locally (without Docker). This is the foundation everything else builds on.

---

## Detailed Task List

1. Initialize the monorepo root with `package.json` (workspaces) and `.gitignore`
2. Create `client/` — React + Vite + TypeScript project (`npm create vite@latest`)
3. Create `server/` — Node + Express project (plain JavaScript)
   - Install: express, cors, helmet, express-rate-limit, mongoose, zod, pino, pino-pretty, dotenv, express-mongo-sanitize
   - Create folder structure: `src/modules/`, `src/llm/`, `src/journey/`, `src/middleware/`, `src/utils/`, `src/config/`
4. Create `ai-service/` — Python FastAPI project
   - Create `requirements.txt` with: fastapi, uvicorn, pydantic, python-dotenv
   - Create virtual environment instructions (Windows: `python -m venv venv`, `venv\Scripts\activate`)
   - Create folder structure: `app/`, `app/routers/`, `app/services/`, `app/models/`, `app/utils/`
5. Create `data/`, `docs/`, `packages/shared/` directories
6. Set up ESLint + Prettier for client and server
   - Client: TypeScript ESLint config
   - Server: JavaScript ESLint config
7. Set up Husky + commitlint for conventional commits
8. Create `.env.example` files for server and ai-service
9. Create `server/src/index.js` with Express app, health endpoint (`GET /api/health`), CORS, helmet, rate limit, mongo-sanitize, pino logger, error handler
10. Create `ai-service/app/main.py` with FastAPI app, health endpoint (`GET /health`)
11. Connect to MongoDB Atlas (require `MONGODB_URI` in `.env`)
12. Create root-level npm scripts:
    - `npm run dev:client` → starts Vite dev server
    - `npm run dev:server` → starts Node server with nodemon
    - `npm run dev:ai` → starts Python FastAPI with uvicorn --reload
    - `npm run dev` → starts client + server concurrently (npm-run-all or concurrently)
13. Create GitHub Actions CI workflow: `.github/workflows/ci.yml`
    - Lint (client + server)
    - Test (when tests exist)
    - Build client
    - Secret scanning (trufflehog or gitleaks)
14. Create `README.md` skeleton (project name, description, setup instructions, team)
15. Verify everything runs: health checks pass, CI is green

---

## Files/Folders to Create

```
careerforge/
├─ .github/workflows/ci.yml
├─ .gitignore
├─ .husky/
│  ├─ pre-commit
│  └─ commit-msg
├─ .eslintrc.js (root)
├─ .prettierrc
├─ commitlint.config.js
├─ package.json (workspaces)
├─ README.md
│
├─ client/
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ vite.config.ts
│  ├─ .eslintrc.cjs
│  ├─ src/
│  │  ├─ main.tsx
│  │  ├─ App.tsx
│  │  └─ ...
│  └─ .env.example
│
├─ server/
│  ├─ package.json
│  ├─ .eslintrc.cjs
│  ├─ .env.example
│  ├─ src/
│  │  ├─ index.js
│  │  ├─ config/
│  │  │  ├─ env.js
│  │  │  └─ db.js
│  │  ├─ middleware/
│  │  │  ├─ errorHandler.js
│  │  │  └─ requestLogger.js
│  │  ├─ modules/
│  │  ├─ llm/
│  │  ├─ journey/
│  │  └─ utils/
│  └─ ...
│
├─ ai-service/
│  ├─ requirements.txt
│  ├─ .env.example
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ config.py
│  │  ├─ routers/
│  │  ├─ services/
│  │  ├─ models/
│  │  └─ utils/
│  └─ ...
│
├─ data/
│  └─ .gitkeep
├─ docs/ (already created)
└─ packages/shared/
   └─ .gitkeep
```

---

## Data Models

None for this phase (schema is Phase 3).

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Server health check. Returns `{ status: "ok", timestamp, uptime, db: "connected"/"disconnected" }` |
| `GET` | `/health` | AI service health check. Returns `{ status: "ok", timestamp }` |

---

## UI Screens

None for this phase.

---

## AI Prompts / Schemas

None for this phase.

---

## External Keys/Data Needed

| Item | Env Variable | Status |
|---|---|---|
| MongoDB Atlas M0 connection string | `MONGODB_URI` | ❌ Team must create Atlas cluster |
| GitHub account (for repo + Actions) | — | ❌ Team must have GitHub accounts |

**⚠️ Before starting:** Team must create a MongoDB Atlas M0 cluster and provide the connection string.

---

## Tests to Write

- Server health endpoint returns 200 with expected JSON
- Server handles unknown routes with 404
- Server error handler returns proper error format
- AI service health endpoint returns 200
- ESLint passes on all files
- Prettier formatting is consistent

---

## Acceptance Checklist

- [ ] `npm run dev` starts client, server, and ai-service concurrently
- [ ] `GET http://localhost:5000/api/health` returns `{ status: "ok" }` with DB status
- [ ] `GET http://localhost:8000/health` returns `{ status: "ok" }`
- [ ] Client loads at `http://localhost:5173` with a placeholder page
- [ ] ESLint + Prettier configured and no errors
- [ ] Husky + commitlint enforce conventional commits
- [ ] `.env.example` files exist for server and ai-service (no real secrets)
- [ ] `.gitignore` excludes node_modules, venv, .env, dist, __pycache__
- [ ] GitHub Actions CI runs successfully (lint + build)
- [ ] README has setup instructions that a new team member can follow

---

## Demo Steps for Viva

1. Show the monorepo structure in VS Code
2. Run `npm run dev` — all three services start
3. Open browser: client loads, hit health endpoints
4. Show CI passing on GitHub
5. Explain the architecture: "Client talks to Node API, which talks to Python AI service and MongoDB"

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Atlas M0 connection issues from college network | Medium | Use Atlas IP whitelist `0.0.0.0/0` for dev; tighten in production |
| Python not installed on some machines | Low | Provide install guide; Python 3.10+ required |
| npm workspace issues on Windows | Low | Test on Windows; avoid symlink-dependent features |
| GitHub Actions free tier limits | Very Low | 2000 min/month is plenty for 4 people |
