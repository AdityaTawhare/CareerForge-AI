# CareerForge AI — Research Gap Analysis

> **Last updated:** 2026-09-28  
> **Purpose:** Documents the gaps found in two research papers and how CareerForge AI addresses them. Use this in the project report (Related Work / Gap Analysis section).

---

## Source Papers

1. **AI TalentSuite** — IEEE WorldSUAS 2025  
   An AI-powered career preparation platform with resume analysis, mock interviews with video, exam proctoring, and RBAC.

2. **Sankalp** — IEEE Access 2025  
   A career guidance system using SBERT semantic matching, rule engine with RL-style adaptive weights, knowledge graphs, VADER sentiment analysis, and multilingual voice support.

---

## Gap Analysis Table

| # | Paper Idea (Good) | Gap We Identified | CareerForge AI Solution |
|---|---|---|---|
| 1 | **TalentSuite: Resume analyzer** using TF-IDF/keyword matching with 3 levels (Beginner/Intermediate/Pro) | Keyword-only scoring misses semantic meaning. 3 coarse levels lack granularity. Not tied to any specific target company or role. | **Semantic matching** using SBERT (all-MiniLM-L6-v2) + skill taxonomy mapping + LLM-generated explanation. Per-section scoring (format, keywords, impact, clarity, completeness). **Company-specific and role-specific** matching against the actual JD. |
| 2 | **TalentSuite: Mock interview** with video recording and scoring | Video handling and privacy policy not explained. Scoring methodology not described (black box). No follow-up mechanism for weak areas — a student gets a score but no improvement path. | **Rubric-based scoring** with explicit dimensions (correctness, depth, structure, communication, relevance) and evidence quotes. Camera metrics computed **entirely in the browser** using MediaPipe — no video upload, ever. **Improvement loop**: weak areas feed into Roadmap 2, student re-tests, and comparison proves (or disproves) improvement. |
| 3 | **TalentSuite: Exam proctoring** with face recognition | Face recognition is computationally heavy, raises serious privacy and bias concerns (false positives for certain demographics), and is disproportionate for a student self-practice tool. | **Proctor-lite**: fullscreen enforcement, tab-switch counter, copy-paste blocking, 2-warning rule. No face recognition. Optional camera indicators (face presence, gaze estimate) processed locally with clear consent. Proportionate, honest, and accessible. |
| 4 | **TalentSuite: RBAC** with Admin, Recruiter, Candidate roles | No mentor/faculty view for academic supervision. No placement cell cohort analytics. Recruiter role assumes employer integration which is out of scope for a student platform. | Three roles designed for the academic context: **Student** (full journey), **Mentor/Faculty** (assigned students, progress tracking, feedback), **Placement Cell Admin** (cohort analytics, company KB management, question bank curation). |
| 5 | **TalentSuite: Performance claims** (500 users, F1 0.93) | No dataset described, no methodology for computing F1, no reproducibility information. Numbers cannot be independently verified. | **Phase 19** creates labeled test sets, reports field-level precision/recall/F1 for resume parsing, Cohen's kappa for AI-vs-human interview scoring agreement, SUS usability scores from a real user study, and publishes all scripts and raw data for reproducibility. Honest limitations section included. |
| 6 | **Sankalp: SBERT semantic matching** for career recommendation | Matching is at the career/domain level only — no company-specific or round-specific matching. Does not consider what a specific employer's aptitude/technical/HR rounds actually test. | Use SBERT for **resume ↔ JD** and **skill ↔ role** semantic matching, plus company round knowledge from the verified Company DNA KB. Matching produces **round-wise skill gaps** — not just "you're a good fit for IT" but "for TCS Technical Round 2, you need to improve DBMS normalization and SQL joins." |
| 7 | **Sankalp: Rule engine + RL-style adaptive weights** | Pure rules are rigid and don't personalize. RL (reinforcement learning) with little training data is unreliable and unexplainable — it can make recommendations worse, not better. | **Hybrid approach**: Hard rules for eligibility checks (CGPA cut-offs, mandatory skills — these never bend). **Lightweight contextual bandit** (not full RL) for recommendation/task ordering — it learns from simple signals (task completed, skipped, "too easy/hard", mock improvement) with much less data than RL needs. All weight adjustments are logged and explainable. Rules always override learned weights as a safety net. |
| 8 | **Sankalp: Knowledge graph** for explainability | Knowledge graph covers only career domains (e.g., "Data Science requires Python"). Does not extend to companies, hiring rounds, resources, or the student's own profile. | Graph connects **skills ↔ roles ↔ companies ↔ rounds ↔ resources ↔ student evidence**. Visualized with React Flow as a "Why this recommendation?" panel. Students can trace: "I need DBMS → because TCS Round 2 tests it → here are the resources → your resume shows partial coverage." |
| 9 | **Sankalp: VADER emotion analysis + multilingual voice** | Translation-first sentiment analysis introduces distortion (translating Hindi to English before sentiment analysis changes the emotional tone). Voice processing details are vague. | Use VADER only on the **English transcript** (no translation step). Add quantitative speech metrics that work regardless of language: **words per minute, filler word count, pause frequency and duration, answer length**. Hindi speech support via the browser's built-in Web Speech API (free, no server cost). |
| 10 | **Sankalp: "Official Naukri API"** for job trends | We could not confirm a free, public Naukri API. The paper cites it but may be using scraping or a private arrangement. Relying on an unconfirmed API is risky. | Use **Adzuna API** (confirmed free developer tier with public documentation) and open job feeds (Remotive, RemoteOK) for job trends and live listings. These are documented, free, and reliable. |
| 11 | **Sankalp: Evaluation** with 160 self-made profiles | Small sample, partially internal evaluation, some numbers inconsistent between text and tables in the paper. Limited external validity. | Multi-faceted evaluation: (a) Parser accuracy on labeled resumes, (b) Skill extraction accuracy, (c) ATS score sanity check vs manual review, (d) AI vs human scoring agreement (Cohen's kappa on 30 hand-scored answers), (e) Peer roadmap usefulness rating, (f) **User study with 20-30 real classmates** (SUS questionnaire + before/after mock score change), (g) Latency/load testing, (h) Ablation study (rules only vs SBERT only vs full system), (i) Honest limitations. All numbers reproducible from scripts. |

---

## How This Analysis Helps the Project

1. **Related Work section** in the IEEE report: summarize what existing systems do well and where they fall short.
2. **Justification for our approach**: every design choice maps to a specific gap.
3. **Viva defense**: when asked "how is this different from existing work?" — point to this table with specific improvements and evidence.
4. **Evaluation design**: gaps 5 and 11 directly inform our Phase 19 evaluation methodology.

---

## Key Themes Across Both Papers

| Theme | Common Gap | Our Principle |
|---|---|---|
| **Explainability** | Scores and recommendations are black boxes | Every score has a breakdown, every recommendation has a "Why this?" trace |
| **Privacy** | Camera/video handling unclear | Camera optional, processed in-browser only, no upload, consent required |
| **Reproducibility** | Evaluation numbers not reproducible | All evaluation scripts, datasets, and raw results are saved and documented |
| **Personalization** | Generic advice, not company-specific | Everything is tied to a specific target company + role + JD |
| **Improvement loop** | One-shot assessment, no follow-up | Two-roadmap feedback loop with proof of improvement |
| **Free & accessible** | Some systems assume paid infrastructure | 100% free tier — every student can use it |
