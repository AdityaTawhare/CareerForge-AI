# CareerForge AI — Progress Log

> **Last updated:** 2026-10-08

---

## Current Status

- **Last completed phase:** Phase 2 — Design System, UI Shell & Wireframes ✅
- **Current task:** Awaiting Phase 3 start
- **Next step:** Phase 3 — Database Schema & API Foundation (Owner: B)

---

## Session Log

### Session 1 — 2026-09-28
- Gathered team answers (deadline, TypeScript, Docker, OS, etc.)
- Created all planning documents in `/docs`
- Created 20 detailed phase files in `/docs/phases/`
- Created workspace rules in `.agents/rules/`

### Session 2 — 2026-09-29 — Phase 1 Complete ✅
- Created monorepo root (`package.json` workspaces, `.gitignore`, `.prettierrc`, `commitlint.config.js`)
- Created `README.md` with Windows setup instructions
- Created `server/` — Express + Mongoose + Zod + pino + helmet + CORS + rate-limit + mongo-sanitize
  - `src/config/env.js` — validated env config (crashes fast on missing vars)
  - `src/config/db.js` — MongoDB connection with status tracking
  - `src/utils/ApiError.js` — custom error class with factory methods
  - `src/utils/ApiResponse.js` — standardised success response
  - `src/utils/asyncHandler.js` — eliminates try/catch in controllers
  - `src/utils/logger.js` — pino (pretty in dev, silent in test, JSON in prod)
  - `src/middleware/errorHandler.js` — central handler for Mongoose/Zod/JWT/ApiError
  - `src/middleware/requestLogger.js` — per-request logging
  - `src/index.js` — Express app with health endpoint + graceful shutdown
  - `src/__tests__/health.test.js` — 4 tests, all passing ✅
- Created `client/` — React 18 + Vite + TypeScript
  - Design tokens CSS (colors, spacing, radius, shadows, motion, dark theme)
  - Landing placeholder + 404 page
  - Build: ✅ 37 modules, gzip 55KB total
- Created `ai-service/` — Python FastAPI
  - `app/main.py` — health endpoint + CORS
  - `app/config.py` — pydantic-settings typed config
  - `setup.bat` — one-command Python venv setup
- Created `.github/workflows/ci.yml` — lint + test + build + Gitleaks
- Created `setup.bat` — first-time team setup script
- Husky + commitlint + lint-staged configured
- npm install: 847 packages ✅

### Session 3 — 2026-10-08 — Phase 2 Complete ✅
- Installed: framer-motion, lucide-react, recharts, reactflow, @hello-pangea/dnd, zustand, clsx, tailwind-merge
- **Design system:** CSS variables fully wired (colors, spacing, radius, shadows, motion, dark theme)
- **Lib layer:** `src/lib/utils.ts` (cn, formatNumber, clamp, scoreToColor), `src/lib/constants.ts` (all routes + nav items + journey steps)
- **Hooks:** `useTheme` (light/dark, localStorage, OS preference sync), `useKeyboardShortcut` (Ctrl+K etc.)
- **Mock data:** sampleProfile, sampleCompany, sampleGapReport, sampleRoadmap, sampleMockResults
- **Layout components:**
  - `AppShell` — sidebar + topbar + journey bar + Outlet
  - `Sidebar` — animated 240px↔64px collapse, nav links with active state
  - `TopBar` — breadcrumbs, Ctrl+K trigger, theme toggle, notification bell, user avatar
  - `CommandPalette` — keyboard nav (↑↓ Enter Esc), fuzzy search, backdrop blur, ARIA
  - `JourneyProgressBar` — animated connectors, done/active/upcoming states
- **Chart components:** ScoreRing, RadarChart, GaugeChart, HeatmapGrid, DeltaBars
- **Common components:** StatCard, SkeletonCard, EmptyState, ErrorState, SourceChip, StreakCalendar, PlaceholderPage
- **Pages built:**
  - `Landing` — hero + stats + 6 features + how-it-works + privacy + CTA + footer (Framer Motion scroll animations)
  - `Login` / `Signup` — two-panel auth with animated form entry
  - `Dashboard` — next-best-action, 4 stat cards, readiness ring + skill bars, streak calendar, activity feed, quick links
  - 27 stub pages covering all 30+ routes (each with descriptive placeholder)
- **Router:** `router.tsx` with all 30+ routes, AppShell nesting for /app/*
- **Build:** ✅ 2383 modules, 0 errors, 9.02s, gzip ~120KB total

---

## Phase 2 — Acceptance Checklist

- [x] Design tokens match `DESIGN_SYSTEM.md`
- [x] Light and dark theme with smooth transition (Ctrl+K → theme toggle)
- [x] AppShell (sidebar + topbar + breadcrumbs) renders on all app pages
- [x] Command palette opens with Ctrl+K, keyboard navigable
- [x] JourneyProgressBar with done/active/upcoming states and animated connectors
- [x] All custom components render with mock data
- [x] Landing page — professional, animated, all sections present
- [x] All key screens have placeholder pages
- [x] `tsc -b && vite build` passes with 0 errors ✅
- [ ] Lighthouse audit (run manually: `npm run preview` → DevTools audit)
- [ ] Team wireframe review before full page builds

---

## Phase 1 — Acceptance Checklist

- [x] `npm run dev` starts client + server concurrently
- [x] `GET /api/health` returns `{ status: "ok", db: "...", demoMode: false }`
- [x] `GET /health` (AI service) returns `{ status: "ok" }`
- [x] Client builds at `http://localhost:5173`
- [x] ESLint + Prettier configured
- [x] Husky + commitlint configured
- [x] `.env.example` files for all three services
- [x] `.gitignore` covers node_modules, venv, .env, dist, __pycache__
- [x] GitHub Actions CI (lint + test + build + Gitleaks)
- [x] README with setup instructions
- [x] 4/4 Jest tests pass cleanly ✅
- [ ] **Team TODO:** Fill in `server/.env` with `MONGODB_URI`
- [ ] **Team TODO:** Run `ai-service/setup.bat` to set up Python venv

---

## Open Bugs
*None*

---

## Decisions Made

| Decision | Reason |
|---|---|
| Backend: plain JavaScript | Team comfort |
| No Docker | Windows local dev without containers |
| All Windows scripts | All team members on Windows |
| Generic CareerForge AI branding | No college branding required |
| IEEE report format | Project report requirement |
| Generic India company list | Team verifies later |
| Deadline: ~December 2026 | ~10 weeks |
| pino-pretty silent in test | Prevents Jest open handle warning |
| vitest/config defineConfig | Allows `test` key in vite.config.ts |
| tsconfig.node.json composite:true | Required for TS project references |
| react-flow-renderer → reactflow | v10 deprecated, v11 is current |
| Github/Twitter not in lucide-react | Used text symbols instead |
| Recharts Tooltip formatter: untyped | Avoid strict ValueType incompatibility |
