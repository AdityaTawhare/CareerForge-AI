# Phase 20 — Deployment, Demo & Documentation

> **Priority:** [M] MUST  
> **Owner:** B (DevOps) + D (Docs/Demo)  
> **Parallel:** None — final phase  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Deploy the full stack (Vercel + Render + Hugging Face Spaces + Atlas), set up uptime monitoring, seed demo data with cached AI results, rehearse Demo Mode (works offline/without API quota), write all documentation (README, user manual, SRS, HLD/LLD, ER diagram, API docs, test report, IEEE paper skeleton, PPT outline, 3-minute demo script, viva Q&A cheat sheet).

---

## Detailed Task List

1. **Deployment:**
   - **Frontend → Vercel:** connect GitHub repo, configure build settings, environment variables
   - **Node API → Render:** free web service, configure start command, environment variables, health check
   - **Python AI service → Hugging Face Spaces:** Docker-based space (free CPU), Dockerfile, requirements, environment variables
   - **Database → Atlas M0:** already set up; configure IP whitelist for production (Render + HF Spaces IPs)
   - Environment variable checklist for each platform

2. **Uptime monitoring:**
   - UptimeRobot: monitor health endpoints for all 3 services
   - Alert on downtime (email notification)

3. **Cold start handling:**
   - Render free tier sleeps after 15 min inactivity
   - UptimeRobot ping every 14 minutes (keeps service warm)
   - Frontend shows "Service waking up..." message if API returns 503
   - Demo Mode as ultimate fallback

4. **Demo data seeding:**
   - **Demo student account:** pre-filled profile, uploaded resume, completed journey with all stages
   - **Demo company:** TCS or similar with full Company DNA, rounds, questions
   - **Cached AI results:** pre-generated gap report, roadmap, mock evaluation, readiness report
   - Stored in `data/demo-fixtures/`
   - Seed script populates demo data

5. **Demo Mode rehearsal:**
   - Toggle Demo Mode → verify all AI features work from cache
   - Test without internet → verify cached results display
   - Test with expired API quotas → verify fallback works
   - Record a practice demo run

6. **Documentation:**

   ### README.md
   - Project description, features, tech stack
   - Setup instructions (step-by-step for Windows)
   - Architecture diagram (Mermaid)
   - Screenshots
   - Team members
   - License

   ### User Manual (`docs/USER_MANUAL.md`)
   - Getting started guide
   - Feature-by-feature walkthrough with screenshots
   - FAQ

   ### SRS (`docs/SRS.md`)
   - Software Requirements Specification
   - Functional requirements (mapped to phases)
   - Non-functional requirements (performance, security, accessibility)
   - Use case diagrams (Mermaid)

   ### HLD/LLD (`docs/HLD.md`, `docs/LLD.md`)
   - High-level design: architecture diagram, data flow, component interactions
   - Low-level design: module-level details, class diagrams, sequence diagrams
   - All diagrams in Mermaid

   ### ER Diagram (`docs/ER_DIAGRAM.md`)
   - Entity-relationship diagram of all collections
   - Mermaid erDiagram

   ### API Documentation
   - Already exists as Swagger (from Phase 3)
   - Export as PDF/HTML for submission

   ### Test Report (`docs/TEST_REPORT.md`)
   - Summary of all tests (unit, integration, e2e)
   - Coverage report
   - Security audit results
   - Performance test results

   ### IEEE Paper Skeleton (`docs/IEEE_PAPER.md`)
   - Title, abstract, keywords
   - Introduction
   - Related work (use RESEARCH_GAP_ANALYSIS.md)
   - System architecture
   - Methodology
   - Implementation
   - Evaluation (use Phase 19 results)
   - Results and discussion
   - Limitations and future work
   - Conclusion
   - References

   ### PPT Outline (`docs/PPT_OUTLINE.md`)
   - 15–20 slide outline for project presentation
   - Key points for each slide

   ### Demo Script (`docs/DEMO_SCRIPT.md`)
   - 3-minute demo walkthrough
   - Exact clicks, pages, and talking points
   - Backup plan if something fails

   ### Viva Q&A Cheat Sheet (`docs/VIVA_QA.md`)
   - Expected questions + prepared answers
   - Examples:
     - "Why MERN + Python?" → Express for REST API speed; Python for NLP/ML ecosystem
     - "Why SBERT not TF-IDF?" → Semantic understanding vs keyword matching
     - "Why contextual bandit not deep RL?" → Less data needed, explainable, simpler
     - "Why Proctor-lite not face recognition?" → Privacy, bias, proportionality
     - "How do you handle privacy?" → PII masking, browser-only camera, consent, export/delete
     - "What are the limitations?" → (from Phase 19 limitations section)

---

## Files to Create

```
docs/
├─ USER_MANUAL.md
├─ SRS.md
├─ HLD.md
├─ LLD.md
├─ ER_DIAGRAM.md
├─ TEST_REPORT.md
├─ IEEE_PAPER.md
├─ PPT_OUTLINE.md
├─ DEMO_SCRIPT.md
└─ VIVA_QA.md

data/demo-fixtures/
├─ demo-student.json
├─ demo-company.json
├─ demo-resume.json
├─ demo-gap-report.json
├─ demo-roadmap.json
├─ demo-mock-session.json
├─ demo-mock-evaluation.json
├─ demo-readiness-report.json
└─ demo-coach-thread.json
```

---

## Acceptance Checklist

- [ ] Frontend deployed on Vercel and accessible via public URL
- [ ] Node API deployed on Render with health check passing
- [ ] Python AI service deployed on Hugging Face Spaces with health check passing
- [ ] All three services communicate correctly in production
- [ ] UptimeRobot monitoring all health endpoints
- [ ] Demo student + demo company seeded with cached AI results
- [ ] Demo Mode works without internet / with exhausted API quotas
- [ ] README has complete setup instructions a new person can follow
- [ ] SRS, HLD/LLD, ER diagram complete with Mermaid diagrams
- [ ] IEEE paper skeleton has all sections with placeholder content + evaluation data
- [ ] Demo script rehearsed successfully — teammate can follow it
- [ ] Viva Q&A cheat sheet covers ≥20 expected questions
- [ ] All environment variables documented for each deployment platform

---

## Demo Steps for Viva

1. Open the deployed app URL (Vercel)
2. Log in as demo student
3. Walk through the journey: resume → gap → roadmap → mock → comparison → readiness
4. Show one AI feature live (if quota available) OR switch to Demo Mode
5. Show Company DNA with sources
6. Show knowledge graph "Why this?"
7. Show Improvement Proof (Mock 1 vs 2)
8. Show Admin dashboard → cohort analytics
9. End: "We achieved an SUS score of X and Cohen's kappa of Y"

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Render service sleeping during demo | High | UptimeRobot ping; warm up 10 min before demo |
| HF Spaces slow/down | Medium | Demo Mode as fallback; all AI results cached |
| Internet down during viva | Medium | Demo Mode works offline for all AI features |
| Vercel deployment issues | Low | Test deployment 3 days before demo |
| Atlas M0 connection from Render | Low | Test connection; whitelist Render IPs |
