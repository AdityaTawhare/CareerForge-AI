# Phase 10 — Resume↔Job Matching & Skill Gap Engine

> **Priority:** [M] MUST  
> **Owner:** C (AI/NLP lead)  
> **Parallel:** None — needs Phase 8 + 9  
> **Estimated effort:** Medium-Large (3–4 days)  
> **Status:** NOT STARTED

---

## Objective

Build SBERT semantic matching + taxonomy matching + rules (mandatory skills, CGPA cut-off), round-wise skill gap analysis, Readiness Analysis v1 with a transparent formula, knowledge graph builder (skills–roles–companies–rounds–resources), "Why this?" explainability panel, radar + heatmap UI, and gap report export.

---

## Detailed Task List

1. **Semantic matching (SBERT):** embed resume skills/text and JD skills/text → cosine similarity
2. **Taxonomy matching:** exact and fuzzy match resume skills against JD required skills
3. **Rule-based checks:** mandatory skills present? CGPA ≥ cut-off? Branch allowed?
4. **Round-wise skill gap:** for each company round, map required skills → check student coverage → gap = required − current
5. **Readiness Analysis v1:** transparent formula:
   - `ReadinessScore = w1*resumeMatch + w2*technicalCoverage + w3*aptitudeCoverage + w4*hrCoverage + w5*projectEvidence`
   - Default weights in config (e.g., 25/25/15/15/20), adjustable by admin
   - Per-round minimum threshold (default 60); overall threshold (default 75)
6. **Knowledge graph builder:**
   - Nodes: skills, roles, companies, rounds, resources, student evidence
   - Edges: "requires", "tests", "covers", "evidenced_by"
   - Store as JSON, render with React Flow
7. **"Why this?" panel:** click any recommendation/gap → see trace through the graph
8. **UI:** radar chart (skill categories), heatmap (rounds × topics), gap list with severity, gap report page
9. **Gap report export:** PDF/printable summary

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/gap/analyze` | Yes | Run gap analysis for a journey |
| `GET` | `/api/gap/:journeyId` | Yes | Get gap report |
| `GET` | `/api/gap/:journeyId/graph` | Yes | Get knowledge graph data |
| `POST` | `[AI] /match/resume-jd` | Internal | Semantic matching |
| `POST` | `[AI] /gap/analyze` | Internal | Gap computation |

---

## Acceptance Checklist

- [ ] Every gap item shows evidence (what resume has vs what JD wants vs how matched)
- [ ] Round-wise gaps clearly show which round tests which skills
- [ ] Readiness formula visible in UI with breakdown
- [ ] Knowledge graph renders with React Flow, nodes clickable
- [ ] "Why this?" panel explains recommendations with graph trace
- [ ] Radar chart and heatmap render with real computed data
- [ ] Rules (CGPA, mandatory skills) correctly flag eligibility issues
- [ ] Unit tests cover matching logic and score computation
