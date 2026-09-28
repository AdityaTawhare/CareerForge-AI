# CareerForge AI — Phases Overview

> **Last updated:** 2026-09-28  
> **Legend:** [M] Must · [S] Should · [N] Nice  
> **Status:** NOT STARTED / IN PROGRESS / DONE / SKIPPED

---

| # | Phase | Priority | Owner | Status | Parallel with | Notes |
|---|---|---|---|---|---|---|
| 1 | Foundation & Project Setup | [M] | B | NOT STARTED | — | Must be first |
| 2 | Design System, UI Shell & Wireframes | [M] | A | NOT STARTED | 3 | A and B work in parallel |
| 3 | Database Schema & API Foundation | [M] | B | NOT STARTED | 2 | A and B work in parallel |
| 4 | Authentication, Roles & Onboarding | [M] | B + A | NOT STARTED | — | Needs Phase 2 + 3 done |
| 5 | LLM Gateway & AI Infrastructure | [M] | C | NOT STARTED | 4 | C starts while A+B do auth |
| 6 | Resume Stage A: Upload & Parser | [M] | C + A | NOT STARTED | — | Needs Phase 5 |
| 7 | Resume Stage B: Builder & Generator | [M] | A + C | NOT STARTED | 6 (partial) | Can overlap with Phase 6 |
| 8 | Resume Analysis & Profile / Skill Passport | [M] | C + A | NOT STARTED | — | Needs Phase 6 + 7 |
| 9 | Target Company, JD Intelligence & Company DNA | [M] | C + B | NOT STARTED | 8 (partial) | Can overlap with Phase 8 |
| 10 | Resume↔Job Matching & Skill Gap Engine | [M] | C | NOT STARTED | — | Needs Phase 8 + 9 |
| 11 | Roadmap 1: Placement Roadmap Generator | [M] | C + A | NOT STARTED | — | Needs Phase 10 |
| 12 | Learning Hub & Practice Engine | [M] | D + A | NOT STARTED | 11 | D starts while C+A do Roadmap |
| 13 | Mock Interview Engine (Core) | [M] | D + C | NOT STARTED | — | Needs Phase 11 + 12 |
| 14 | Voice & Behaviour Analytics | [S] | D | NOT STARTED | 13 (late) | Can start once mock basics work |
| 15 | Performance Analytics & Roadmap 2 | [M] | C + D | NOT STARTED | — | Needs Phase 13 |
| 16 | Company Readiness, Final Prep & Job Tools | [M] | C + B + A | NOT STARTED | — | Needs Phase 15 |
| 17 | AI Coach (RAG), Mentor & Placement Dashboards | [S] | C + B + A | NOT STARTED | 16 | Can overlap with Phase 16 |
| 18 | Quality: Testing, Security, Performance | [M] | D + B | NOT STARTED | 17 | Continuous, but dedicated phase |
| 19 | Evaluation & Research Evidence | [M] | C + D | NOT STARTED | 18 (partial) | Needs working app |
| 20 | Deployment, Demo & Documentation | [M] | B + D | NOT STARTED | — | Final phase |

---

## Suggested Timeline (~10 weeks)

| Week | Phases | Focus |
|---|---|---|
| 1 | 1, 2, 3 | Foundation + Design + Schema (parallel) |
| 2 | 4, 5 | Auth + LLM Gateway (parallel) |
| 3 | 6, 7 | Resume Upload + Builder |
| 4 | 8, 9 | Resume Analysis + Company DNA (overlap) |
| 5 | 10, 11, 12 | Gap Engine + Roadmap + Learning Hub |
| 6 | 13 | Mock Interview Engine |
| 7 | 14, 15 | Voice Analytics + Roadmap 2 |
| 8 | 16, 17 | Readiness + Coach + Dashboards |
| 9 | 18, 19 | Testing + Evaluation |
| 10 | 20 | Deployment + Demo + Docs |

---

## Cut List (if time is short)

**Drop first (NICE):**
- Phase 14: Voice/camera → text-only mocks still work
- Proctor-lite → regular timed quiz
- Streaks/XP/badges
- Hindi UI

**Reduce next (SHOULD):**
- Phase 17: Coach chat → simple FAQ; Mentor dashboard → read-only list
- GitHub import → manual skill entry
- Job Tracker → simple list instead of Kanban
- Skill Passport → no public link, just internal profile

**Never cut (MUST):**
- Core journey (Phases 1–13, 15, 16)
- Demo Mode (saves the viva)
- Evaluation (Phase 19)
- Deployment (Phase 20)
