# Phase 06 — Resume Stage A: Upload & Parser

> **Priority:** [M] MUST  
> **Owner:** C (AI/NLP) + A (Frontend upload UI)  
> **Parallel:** Phase 7 can partially overlap  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Build drag-and-drop resume upload (PDF/DOCX), text extraction, "is this a resume?" validation, structured parsing into the Unified Resume Schema using spaCy + rules + LLM fallback, per-field confidence scores, human-edit screen for corrections, and resume versioning.

---

## Detailed Task List

1. **Frontend upload component:** drag-and-drop zone, file type validation (PDF/DOCX only), size limit (5 MB), upload progress, preview
2. **Backend upload endpoint:** multer for file handling, store extracted text + structured JSON (not raw file by default), optional GridFS/Cloudinary for original file
3. **Python AI service — resume parser pipeline:**
   - Text extraction: PyMuPDF (PDF), pdfplumber (fallback for tables), python-docx (DOCX)
   - Scanned PDF detection: if extracted text is very short → show message "This looks like a scanned PDF. Text extraction may be incomplete."
   - "Is this a resume?" classifier: check for common resume section headings (Education, Experience, Skills, Projects) — simple heuristic + optional LLM check
   - Structured parsing into **Unified Resume Schema:**
     - Contact: name, email, phone, location, LinkedIn, GitHub, portfolio
     - Summary/Objective
     - Education: [degree, institution, year, CGPA/percentage, relevant coursework]
     - Skills: [name, category (language/framework/tool/soft), proficiency if stated]
     - Experience: [title, company, duration, description, achievements]
     - Projects: [name, description, technologies, links, duration]
     - Certifications: [name, issuer, year, link]
     - Achievements: [title, description, year]
     - Links: [label, url]
   - Parsing approach: spaCy NER + regex rules + section detection → fill what's possible → LLM fills gaps and normalizes → per-field confidence score
4. **Per-field confidence:** each field gets a confidence (high/medium/low) based on how it was extracted (regex = high, NER = medium, LLM = low)
5. **Human-edit screen:** show parsed resume with editable fields, highlight low-confidence fields in amber, user can correct before saving
6. **Resume versioning:** multiple resumes per user, each with a label ("Resume for TCS", "General")
7. **Unit tests:** parser tested on ≥10 varied resume formats

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/resumes/upload` | Yes | Upload and parse resume |
| `GET` | `/api/resumes` | Yes | List user's resumes |
| `GET` | `/api/resumes/:id` | Yes | Get parsed resume |
| `PUT` | `/api/resumes/:id` | Yes | Update (human corrections) |
| `DELETE` | `/api/resumes/:id` | Yes | Delete resume |
| `POST` | `[AI] /parse/resume` | Internal | Parse resume text → structured JSON |

---

## Acceptance Checklist

- [ ] PDF and DOCX upload works with drag-and-drop
- [ ] Parser extracts all Unified Resume Schema fields
- [ ] Per-field confidence scores shown
- [ ] Human-edit screen lets user correct parsed data
- [ ] Scanned PDF shows helpful message
- [ ] Non-resume files rejected with clear message
- [ ] Resume versions stored and retrievable
- [ ] Parser passes tests on ≥10 varied resumes
- [ ] File size and type validation works

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| Complex resume layouts break parser | LLM fallback for difficult sections; human-edit screen as safety net |
| spaCy model download large | Use `en_core_web_sm` (small); download in setup script |
| PyMuPDF/pdfplumber differences | Try PyMuPDF first, pdfplumber as fallback for table-heavy resumes |
