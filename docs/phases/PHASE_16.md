# Phase 16 — Company Readiness, Final Prep & Job Tools

> **Priority:** [M] MUST  
> **Owner:** C (AI) + B (Backend) + A (Frontend)  
> **Parallel:** Phase 17 can overlap  
> **Estimated effort:** Medium-Large (3–4 days)  
> **Status:** NOT STARTED

---

## Objective

Build the Company Readiness Assessment (final score with per-round scores and READY/NOT READY decision), NOT READY → new skill gap → Roadmap 2 update loop, READY → Final Preparation (revision sheet, top likely questions, day-before checklist) and Interview Plan, Ready to Apply gate with override warning, Job Tracker (Kanban), tailored resume version per JD, cover letter generator, and optional live job feed from Adzuna.

---

## Detailed Task List

1. **Company Readiness Assessment:**
   - Final readiness score (0–100) using the transparent formula from Phase 10
   - Per-round scores (aptitude, technical, HR, etc.)
   - Formula breakdown visible in UI
   - Decision: **READY** (overall ≥ 75, no round below 60) / **NOT READY** (with specific reasons)
   - NOT READY → identifies new gaps → feeds back into Roadmap 2

2. **Final Preparation (for READY students):**
   - Revision sheet: key topics, formulas, concepts to review
   - Top likely questions from Company DNA (based on round patterns)
   - Day-before checklist: documents, dress code, logistics, mental prep
   - Interview plan: timeline for each round, what to expect, tips

3. **Ready to Apply gate:**
   - Journey state: `READY_TO_APPLY`
   - Can only reach through valid state transitions
   - Override option: student can mark as "ready" below threshold with a clear warning
   - Override logged in audit

4. **Job Tracker (Kanban) [S]:**
   - Columns: Wishlist → Applied → Screening → Interview → Offer → Rejected → Accepted
   - Drag-and-drop cards between columns
   - Each card: company, role, applied date, next action date, notes
   - Link to journey (if exists)

5. **Tailored resume version [S]:**
   - Generate a resume variant optimized for a specific JD
   - Highlight matching skills, reorder sections, adjust keywords
   - Save as a new resume version with label

6. **Cover letter generator [S]:**
   - Input: JD + resume + company
   - Output: professional cover letter with personalization
   - Editable before export

7. **Live job feed from Adzuna [S]:**
   - Search by role + location
   - Display: title, company, salary, link, posted date
   - Quick-add to Job Tracker

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/readiness/assess/:journeyId` | Yes | Run readiness assessment |
| `GET` | `/api/readiness/:journeyId` | Yes | Get readiness report |
| `POST` | `/api/readiness/:journeyId/override` | Yes | Override to READY with warning |
| `GET` | `/api/readiness/:journeyId/final-prep` | Yes | Get final preparation materials |
| `GET/POST/PUT/DELETE` | `/api/tracker/applications` | Yes | CRUD job applications |
| `POST` | `/api/resumes/:id/tailor` | Yes | Generate tailored resume for JD |
| `POST` | `/api/tools/cover-letter` | Yes | Generate cover letter |
| `GET` | `/api/jobs/search` | Yes | Search Adzuna job feed [S] |

---

## Acceptance Checklist

- [ ] Readiness score computed with transparent formula visible in UI
- [ ] Per-round scores shown with breakdown
- [ ] READY/NOT READY decision with clear reasons
- [ ] NOT READY → new gap identified → Roadmap 2 update triggered
- [ ] READY → Final Preparation page with revision sheet, questions, checklist
- [ ] Journey state machine reaches READY_TO_APPLY only through valid transitions
- [ ] Override warning logged when student bypasses threshold
- [ ] Job Tracker Kanban works with drag-and-drop [S]
- [ ] Cover letter generated and editable [S]
- [ ] Readiness formula documented and configurable

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| Readiness threshold too strict/lenient | Make threshold configurable; explain in UI |
| Adzuna API not available | Show "job search unavailable" gracefully; manual entry always works |
| Cover letter quality varies | Always editable; show "AI-generated draft" badge |
