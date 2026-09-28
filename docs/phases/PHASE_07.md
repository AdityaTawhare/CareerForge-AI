# Phase 07 — Resume Stage B: Builder & Generator

> **Priority:** [M] MUST  
> **Owner:** A (Frontend) + C (AI helpers)  
> **Parallel:** Can partially overlap with Phase 6  
> **Estimated effort:** Medium-Large (3–4 days)  
> **Status:** NOT STARTED

---

## Objective

Build a step-by-step resume builder using the same Unified Resume Schema, 3–4 ATS-safe templates, live preview, AI writing helpers (rewrite bullet, generate summary, STAR-style project description), PDF/DOCX export, autosave, and versioning. The builder output and parsed upload must end in the **same schema**.

---

## Detailed Task List

1. **Step-by-step builder form:** Contact → Summary → Education → Skills → Experience → Projects → Certifications → Achievements → Links → Preview
2. **3–4 ATS-safe templates:** Clean, single-column, standard fonts, no images/graphics, proper headings. Template names: "Professional", "Modern", "Academic", "Minimal"
3. **Live preview:** real-time rendering as user types
4. **AI writing helpers (via LLM Gateway):**
   - Rewrite bullet point with action verb + quantified metric
   - Generate professional summary from resume data
   - STAR-style project description generator
   - Skill suggestion based on role/industry
5. **PDF export:** @react-pdf/renderer with template layout
6. **DOCX export:** docx library for Word format
7. **Autosave:** save draft every 30 seconds (debounced)
8. **Versioning:** user can create multiple resumes with labels
9. **ATS text-extraction test:** exported PDF/DOCX passes basic text extraction (all text recoverable)

---

## Acceptance Checklist

- [ ] Builder produces the same Unified Resume Schema as the parser
- [ ] All 3–4 templates render correctly in preview and export
- [ ] PDF and DOCX exports open correctly in common viewers
- [ ] Exported files pass basic ATS text extraction (copy-paste text matches)
- [ ] AI helpers produce useful suggestions
- [ ] Autosave works (no data loss on accidental close)
- [ ] Versioning: multiple resumes per user with distinct labels

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| PDF rendering differences across viewers | Test in Chrome PDF viewer, Adobe Reader, Google Docs |
| DOCX library limitations | Keep templates simple; test in Word and Google Docs |
| AI helper quality varies | Show "AI suggestion" badge; user always has final edit control |
