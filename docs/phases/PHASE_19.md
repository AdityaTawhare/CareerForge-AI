# Phase 19 — Evaluation & Research Evidence

> **Priority:** [M] MUST  
> **Owner:** C (AI evaluation) + D (User study)  
> **Parallel:** Can partially overlap with Phase 18  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Run real experiments and produce honest, reproducible evaluation results for the IEEE report: resume parser accuracy, JD extraction accuracy, ATS score sanity, AI-vs-human scoring agreement (Cohen's kappa), roadmap usefulness rating, user study (SUS score), latency/load numbers, ablation study, and an honest limitations section.

---

## Detailed Task List

1. **Resume parser accuracy (a):**
   - Dataset: 30–50 labeled resumes (team-prepared)
   - For each resume: manually annotated fields (name, email, education, skills, experience, projects)
   - Run parser on all resumes
   - Compute: field-level precision, recall, F1 score
   - Report: per-field and overall, with confusion analysis

2. **JD skill extraction accuracy (b):**
   - Dataset: 20–30 JDs with manually identified skills
   - Run JD parser on all JDs
   - Compute: skill extraction precision, recall, F1
   - Report: must-have vs nice-to-have accuracy

3. **ATS score sanity check (c):**
   - 20 resumes manually rated by team (1–10 ATS friendliness)
   - Compare AI ATS scores with human ratings
   - Report: correlation (Pearson/Spearman), scatter plot

4. **Interview scoring agreement (d):**
   - Dataset: 30 mock answers scored by team members independently
   - Each answer scored on the 5-dimension rubric (0–10 each)
   - Compute AI scores for the same answers
   - Agreement metric: **Cohen's kappa** (or weighted kappa) per dimension + overall
   - Also report: Pearson correlation, mean absolute error
   - Honest interpretation: kappa > 0.6 = substantial agreement, 0.4–0.6 = moderate, < 0.4 = fair/poor

5. **Roadmap usefulness rating (e):**
   - 10–15 peers review generated roadmaps (for their own profile)
   - Rate: relevance (1–5), completeness (1–5), feasibility (1–5), resource quality (1–5)
   - Average scores with standard deviation

6. **User study (f):**
   - Participants: 20–30 classmates
   - Protocol:
     1. Create account, upload resume
     2. Select target company, view gap analysis
     3. Take at least one mock interview
     4. Fill SUS (System Usability Scale) questionnaire (10 questions)
     5. Optional: before/after mock score comparison
   - Compute: SUS score (0–100; > 68 = above average)
   - Report: mean, median, standard deviation, distribution chart
   - Qualitative: open-ended feedback themes

7. **Latency and load testing (g):**
   - Measure: API response times for key endpoints (auth, resume parse, gap analysis, mock evaluation)
   - Load test: concurrent users (5, 10, 20) using k6 or autocannon
   - Report: p50, p95, p99 latency; throughput; error rate under load

8. **Ablation study (h):**
   - Compare matching accuracy with:
     - Rules only (keyword matching + eligibility checks)
     - SBERT only (semantic matching)
     - Full system (rules + SBERT + LLM explanation)
   - Use the same test set for all three
   - Report: accuracy/F1 for each variant

9. **Honest limitations section (i):**
   - Free-tier constraints (rate limits, cold starts, storage)
   - Sample size limitations (30 resumes, 30 answers, 20–30 users)
   - AI scoring variability (document observed variance)
   - Single-college bias (all participants from one institution)
   - No longitudinal study (can't measure actual interview outcomes)
   - Knowledge base coverage (limited to seeded companies)
   - Camera metrics are indicators, not validated assessments

---

## Files/Folders to Create

```
ai-service/evals/
├─ eval_parser.py           # Resume parser evaluation
├─ eval_jd.py               # JD extraction evaluation
├─ eval_ats.py              # ATS score sanity
├─ eval_scoring.py          # Interview scoring agreement
├─ eval_ablation.py         # Ablation study
├─ datasets/
│  ├─ labeled_resumes/      # Team-prepared labeled resumes
│  ├─ labeled_jds/          # Team-prepared labeled JDs
│  ├─ human_scores/         # Team's manual mock answer scores
│  └─ ats_ratings/          # Team's manual ATS ratings
├─ results/                 # Raw output from eval runs
│  ├─ parser_results.json
│  ├─ jd_results.json
│  ├─ ats_results.json
│  ├─ scoring_results.json
│  └─ ablation_results.json
└─ scripts/
   └─ generate_report.py    # Generate charts and tables

docs/
├─ EVALUATION.md            # Full evaluation report
└─ LIMITATIONS.md           # Honest limitations
```

---

## External Keys/Data Needed (Team-Prepared)

| Item | Quantity | Status |
|---|---|---|
| Labeled resumes (annotated fields) | 30–50 | ❌ Team must prepare |
| Labeled JDs (annotated skills) | 20–30 | ❌ Team must prepare |
| ATS ratings (manual 1–10) | 20 | ❌ Team must prepare |
| Human-scored mock answers | 30 (each scored by ≥2 team members) | ❌ Team must prepare |
| User study participants | 20–30 classmates | ❌ Team must recruit |
| SUS questionnaire (Google Form) | 1 form | ❌ Team must create |

---

## Acceptance Checklist

- [ ] Resume parser F1 computed and reported per-field
- [ ] JD extraction accuracy computed
- [ ] ATS score correlation with human ratings reported
- [ ] Cohen's kappa for interview scoring computed with honest interpretation
- [ ] User study SUS score computed with distribution
- [ ] Latency numbers reported (p50, p95, p99)
- [ ] Ablation results show contribution of each component
- [ ] Limitations section is honest and complete
- [ ] Every number is reproducible from a script or saved raw file
- [ ] Charts and tables ready for IEEE report

---

## Demo Steps for Viva

1. Show evaluation script running → produces results
2. Show results table: "Our parser achieves F1 of X"
3. Show agreement chart: "Cohen's kappa is X — that means moderate/substantial agreement"
4. Show SUS score: "Our usability score is X, which is above/below average"
5. Show limitations: "We acknowledge these constraints..."
6. "Every number comes from a reproducible script"

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Low kappa score | Medium | Report honestly; explain what factors affect agreement |
| Not enough user study participants | Medium | Aim for 20 minimum; 15 is acceptable with explanation |
| Parser performs poorly on some resume formats | Medium | Report per-format breakdown; acknowledge limitations |
| Results look bad | — | Never fake numbers. Report honestly. Explain. Show improvement plans. |
