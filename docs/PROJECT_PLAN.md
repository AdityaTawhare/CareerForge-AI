# CareerForge AI — Project Plan

> **Version:** 1.0  
> **Last updated:** 2026-09-28  
> **Team size:** 4  
> **Deadline:** December 2026  

---

## 1. Vision

**One line:** *A personal AI career mentor that takes a student from "I have a resume" to "I am ready for THIS company, for THIS role" — with a clear roadmap, honest mock interviews, and proof of improvement.*

CareerForge AI is company-specific and round-wise. It has two roadmaps with a feedback loop (Placement Roadmap → Mock Interviews → AI Improvement Roadmap → re-test → readiness decision). It is explainable, privacy-first, and ships with real evaluation.

---

## 2. Users & Roles (RBAC)

| Role | Capabilities |
|---|---|
| **Student** | Main user — full journey, resume, mocks, roadmaps, tracker, coach |
| **Mentor / Faculty** | View assigned students, give feedback, see progress |
| **Placement Cell Admin** | Cohort analytics, manage Company DNA KB, question bank review |

---

## 3. Core Features (Priority)

### MUST [M]
- Full student journey (state machine) from resume to readiness
- Career Readiness Score (0–100) per company+role with transparent formula
- Company DNA — verified knowledge base with rounds, sources, votes
- Explainable Knowledge Graph (React Flow)
- Project Grill mock mode
- Improvement Proof (Mock 1 vs Mock 2 comparison)
- Adaptive Roadmap with re-planning
- Demo Mode (cached AI results for viva)
- Privacy Center (consent, export, delete, PII masking)

### SHOULD [S]
- Skill Passport (evidence-backed, shareable)
- GitHub import
- STAR-method checker for HR answers
- Voice & behaviour analytics (MediaPipe in-browser)
- Job Tracker (Kanban) + cover letter + job feed
- AI Career Coach (RAG chat)
- Mentor & Placement Cell dashboards

### NICE [N]
- Proctor-lite aptitude mode
- Streaks, XP, badges (light gamification)
- Hindi + English UI (i18next)

---

## 4. Tech Stack

| Layer | Choice |
|---|---|
| **Frontend** | React + Vite + TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, TanStack Query, Zustand, React Hook Form + Zod, Recharts, React Flow, Monaco Editor, i18next, Lucide icons |
| **Backend** | Node.js + Express (plain JavaScript), Mongoose, Zod, JWT (httpOnly cookies), bcrypt, helmet, cors, express-rate-limit, mongo-sanitize, pino, Swagger |
| **Database** | MongoDB Atlas M0 (free) + Atlas Vector Search |
| **AI Service** | Python FastAPI, PyMuPDF/pdfplumber, spaCy, sentence-transformers, VADER, scikit-learn |
| **LLM Providers** | Gemini (primary) → Groq (fast) → OpenRouter :free (fallback) → Ollama (offline) |
| **Speech** | Web Speech API (browser), Groq Whisper (fallback) |
| **Camera** | MediaPipe Tasks Vision (browser only) |
| **Job Data** | Adzuna API (free) |
| **Resume Export** | @react-pdf/renderer, docx library |
| **Testing** | Vitest, React Testing Library, Jest + Supertest, Pytest, Playwright, Lighthouse |
| **CI/CD** | GitHub Actions |
| **Hosting** | Vercel (frontend), Render (Node API), Hugging Face Spaces (Python AI), Atlas M0 (DB) |

---

## 5. Architecture Overview

```
careerforge/
├─ client/                # React + Vite + TypeScript
├─ server/                # Node/Express (JavaScript)
│  ├─ src/modules/        # auth, users, resumes, profiles, companies, jobs, gap,
│  │                      # roadmaps, practice, mocks, analytics, readiness,
│  │                      # tracker, coach, admin
│  ├─ src/llm/            # LLM Gateway (providers, fallback, cache, quota, prompts, schemas)
│  └─ src/journey/        # State machine + guards
├─ ai-service/            # Python FastAPI
├─ data/                  # Seed: skills taxonomy, companies, questions, resources, demo fixtures
├─ docs/                  # Planning + report docs
└─ .github/workflows/     # CI/CD
```

**Data flow:** Client → Node API → (MongoDB | LLM Gateway | Python AI service)

Long AI jobs use a Mongo-based job queue (`queued → running → done/failed`) with SSE or polling.

---

## 6. Key Decisions

| Decision | Choice | Why |
|---|---|---|
| Backend language | Plain JavaScript | Team comfort; TypeScript only on frontend |
| No Docker | Local dev without containers | Not available on all machines |
| OS | All Windows | Scripts and paths must be Windows-compatible |
| Branding | Generic CareerForge AI | No college branding needed |
| Report format | IEEE | Faculty requirement |
| Company list | Generic India IT/product draft | Team verifies and extends |
| Deadline | ~Dec 2026 (~10 weeks) | Plan phases accordingly |

---

## 7. Student Journey States

```
ACCOUNT_CREATED → RESUME_STAGE → PROFILE_READY → TARGET_SELECTED →
JD_ANALYZED → GAP_ANALYZED → ROADMAP1_ACTIVE → MOCK1_DONE →
ROADMAP2_ACTIVE → MOCK2_DONE → READINESS_CHECK → FINAL_PREP → READY_TO_APPLY
```

Each journey = one student + one target company + one role. A student can have multiple journeys.

---

## 8. Free-Tier Limits to Watch

| Service | Limit | Mitigation |
|---|---|---|
| MongoDB Atlas M0 | 512 MB, shared cluster | Keep data lean; archive old mocks |
| Gemini API (AI Studio) | RPM/RPD limits (check current) | Cache, batch, fallback to Groq |
| Groq | Token/RPM limits (check current) | Secondary provider; cache |
| Render | Service sleeps after 15 min idle | Demo Mode, cold start handling |
| Vercel | 100 GB bandwidth/month | More than enough for demo |
| HF Spaces | CPU-only, 16 GB RAM | Enough for MiniLM embeddings |
