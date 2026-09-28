# CareerForge AI — Decisions Log

> **Last updated:** 2026-09-28  
> Records every important architectural and design decision for the project report and viva.

---

## Decision Format

Each entry: **What** was decided, **Why** (alternatives considered), **Impact**, **Date**.

---

### D-001: Backend Language — Plain JavaScript (not TypeScript)
- **Date:** 2026-09-28
- **Decision:** Use plain JavaScript for the Node/Express backend; TypeScript only on the React frontend.
- **Why:** Not all 4 team members are comfortable with TypeScript on the backend. Frontend TS is fine because the team has React+TS experience. Using JS on the backend reduces friction and speeds up development.
- **Alternatives:** Full TypeScript everywhere (rejected: learning curve risk with deadline); full JavaScript everywhere (rejected: frontend TS is too valuable for React props/state).
- **Impact:** Backend uses Zod for runtime validation instead of relying on TS compile-time checks. JSDoc comments encouraged for IDE support.

### D-002: No Docker — Local Dev Without Containers
- **Date:** 2026-09-28
- **Decision:** Do not use Docker for local development.
- **Why:** Docker Desktop is not available on all team members' Windows machines (admin restrictions, disk space, WSL issues).
- **Alternatives:** Docker Compose setup (rejected: availability issue). Each service runs natively: Node via npm, Python via venv, MongoDB Atlas cloud.
- **Impact:** No local MongoDB container — use Atlas M0 even for dev. Python venv setup instructions needed per-OS.

### D-003: All Windows Development
- **Date:** 2026-09-28
- **Decision:** All scripts, paths, and dev instructions assume Windows.
- **Why:** All 4 team members use Windows.
- **Impact:** Use cross-platform npm scripts (cross-env), forward slashes in code, PowerShell-compatible commands, .bat or npm scripts instead of shell scripts.

### D-004: Generic Branding (No College Logo)
- **Date:** 2026-09-28
- **Decision:** Use "CareerForge AI" as a standalone product brand.
- **Why:** Team prefers a generic product feel; no college branding requirement from faculty.
- **Impact:** Landing page and reports use CareerForge AI logo and colors. Can add college branding later if needed.

### D-005: IEEE Report Format
- **Date:** 2026-09-28
- **Decision:** Final report follows IEEE conference paper format.
- **Why:** Faculty requirement.
- **Impact:** Phase 20 includes IEEE paper skeleton. Evaluation (Phase 19) must produce tables and metrics suitable for IEEE format.

### D-006: Generic India Company List for Company DNA
- **Date:** 2026-09-28
- **Decision:** Start with a generic list of ~30-50 Indian IT/product companies (TCS, Infosys, Wipro, Google, Microsoft, Amazon, etc.). Team verifies and extends.
- **Why:** Team will supplement with their college's actual placement companies. Starting with a draft is faster.
- **Impact:** Company DNA data must be clearly marked as draft/unverified until team reviews. Source and confidence fields are mandatory.

### D-007: Timeline — ~10 Weeks to December 2026
- **Date:** 2026-09-28
- **Decision:** Plan for 10-week development with ~30-40 hours/week team effort.
- **Why:** Final submission is around end of December 2026.
- **Impact:** Aggressive but feasible with 4 people working 8-10 hrs each. Cut list defined in PHASES.md. Must prioritize [M] features; [S] and [N] are stretch goals.

### D-008: LLM Provider Priority
- **Date:** 2026-09-28
- **Decision:** Gemini (primary) → Groq (fast) → OpenRouter free (fallback) → Ollama (offline last resort).
- **Why:** Gemini has generous free tier with long context and good JSON output. Groq is fast for real-time interview turns. OpenRouter has free community models. Ollama is offline-only backup.
- **Impact:** LLM Gateway must implement automatic fallback chain, per-provider circuit breaker, and caching.

### D-009: Privacy-First Camera/Voice
- **Date:** 2026-09-28
- **Decision:** All camera/video processing happens in the browser using MediaPipe. No video is uploaded to any server. Only aggregated numerical metrics are sent to the backend.
- **Why:** Privacy, cost, bandwidth. Avoids bias concerns with face recognition. Students trust the system more.
- **Impact:** MediaPipe WASM/JS bundle loaded in browser. Backend receives only numbers (WPM, filler count, face-presence %, etc.).

### D-010: MongoDB Atlas Vector Search for RAG
- **Date:** 2026-09-28
- **Decision:** Use Atlas Vector Search for the RAG pipeline instead of a separate vector DB.
- **Why:** Already using Atlas M0; reduces infrastructure. Free tier supports vector search indexes.
- **Alternatives:** ChromaDB (kept as fallback if Atlas vector search limits are hit), Pinecone (requires credit card), Weaviate Cloud (limited free).
- **Impact:** Embeddings stored in MongoDB documents. Python AI service handles indexing and retrieval.
