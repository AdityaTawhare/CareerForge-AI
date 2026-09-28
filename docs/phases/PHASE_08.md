# Phase 08 — Resume Analysis & Student Profile / Skill Passport

> **Priority:** [M] MUST  
> **Owner:** C (AI) + A (Frontend)  
> **Parallel:** Phase 9 can partially overlap  
> **Estimated effort:** Medium-Large (3–4 days)  
> **Status:** NOT STARTED

---

## Objective

Build ATS scoring with section-level scores, issue detection with fix suggestions, skill extraction mapped to the taxonomy with proficiency evidence and level classification, optional GitHub import, unified Student Profile, and first version of the Skill Passport.

---

## Detailed Task List

1. **ATS score engine (AI service):**
   - Overall score (0–100) with section scores: format (20%), keywords (25%), impact/metrics (20%), clarity (20%), completeness (15%)
   - Issue list with severity and fix suggestions
   - Score explanation for each section
2. **Skill extraction & mapping:**
   - Extract skills from resume text
   - Map to skills taxonomy (exact match + fuzzy + synonym)
   - Assign proficiency level based on evidence (mentioned, used in project, years of experience)
   - Level classification: beginner / intermediate / advanced / expert
3. **GitHub import [S]:**
   - Public API (no auth for basic; token for rate limit)
   - Extract: repos, languages, contribution activity, project descriptions
   - Map to skills taxonomy
4. **Student Profile page:**
   - Aggregated view: education, skills with evidence sources, projects, strengths
   - Auto-updates when new resume version is saved or GitHub data imported
5. **Skill Passport v1:**
   - Skills backed by evidence (resume mention, GitHub repo, mock score, quiz result)
   - Visual skill cards with proficiency bar and evidence badges

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/resumes/:id/analyze` | Yes | Trigger ATS analysis |
| `GET` | `/api/resumes/:id/analysis` | Yes | Get analysis results |
| `GET` | `/api/profiles/me` | Yes | Get student profile |
| `POST` | `/api/profiles/github-import` | Yes | Import GitHub data |
| `GET` | `/api/profiles/skill-passport` | Yes | Get skill passport |
| `POST` | `[AI] /analyze/resume` | Internal | ATS scoring |
| `POST` | `[AI] /extract/skills` | Internal | Skill extraction |

---

## Acceptance Checklist

- [ ] ATS score shows per-section breakdown with explanations
- [ ] Issues list includes actionable fix suggestions
- [ ] Skills mapped to taxonomy with proficiency levels
- [ ] Profile auto-updates when resume changes
- [ ] GitHub import extracts languages and projects (if token provided)
- [ ] Skill Passport shows evidence for each skill

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| GitHub rate limit without token | 60 req/hr is enough for one import; prompt for token if needed |
| Skill taxonomy mapping misses niche skills | Allow "other" skills; admin can add to taxonomy |
