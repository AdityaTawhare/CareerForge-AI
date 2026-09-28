# Phase 17 — AI Coach (RAG), Notifications, Mentor & Placement Dashboards

> **Priority:** [S] SHOULD  
> **Owner:** C (AI/RAG) + B (Backend) + A (Frontend)  
> **Parallel:** Can overlap with Phase 16  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Build the RAG-powered AI Coach chat, in-app notifications with optional email reminders, Mentor dashboard (assigned students, progress, comments), Placement Admin dashboard (cohort readiness heatmap, common weak topics, KB editor, question bank review), shareable Skill Passport public page + PDF report, and optional Hindi UI.

---

## Detailed Task List

1. **AI Coach chat (RAG):**
   - Chat interface with message history
   - RAG retrieval over: student's own profile/resume/mock data, Company DNA, curated study notes
   - Source chips on each response (which documents were used)
   - Safe answers: "I'm not sure about this — here's what I found" when confidence low
   - Example queries: "What should I focus on this week?", "Tell me about TCS technical rounds", "Help me answer 'tell me about yourself'"
   - Per-user namespace in vector store (student's data is private)

2. **Notifications:**
   - In-app notification bell with unread count
   - Types: roadmap reminders, mock due, streak about to break, readiness update, mentor feedback
   - Optional email (Brevo/Nodemailer + SMTP if configured)
   - Notification preferences in settings

3. **Mentor dashboard:**
   - Mentor sees only assigned students (many-to-many: mentor ↔ students)
   - Student list with: name, target company, journey state, readiness score, last activity
   - Click student → see their journey progress, gap report, mock scores
   - Add comments/feedback on student's journey
   - Risk flags: "no activity in 7 days", "readiness score below 40"

4. **Placement Admin dashboard:**
   - Cohort readiness heatmap: students × readiness score (color-coded)
   - Most common weak topics across cohort (bar chart)
   - Student list with filters: branch, year, target company, readiness range
   - Company KB editor (from Phase 9)
   - Question bank review queue (from Phase 12)
   - Feedback votes review (correct/incorrect votes on company data)
   - Aggregate statistics: average readiness, mocks completed, active students

5. **Shareable Skill Passport:**
   - Public link (unique token, no auth required to view)
   - PDF export for recruiters/placement cell
   - Contains: skills with evidence, proficiency levels, mock scores, projects
   - Link expiration configurable

6. **Hindi UI [N]:**
   - i18next setup with English and Hindi translation files
   - Language switcher in settings
   - Start with critical UI text; expand coverage over time

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/coach/chat` | Yes | Send message to AI coach |
| `GET` | `/api/coach/history` | Yes | Get chat history |
| `GET` | `/api/notifications` | Yes | Get user notifications |
| `PUT` | `/api/notifications/:id/read` | Yes | Mark notification as read |
| `GET` | `/api/mentor/students` | Mentor | Get assigned students |
| `GET` | `/api/mentor/students/:id/journey` | Mentor | Get student's journey |
| `POST` | `/api/mentor/students/:id/feedback` | Mentor | Add feedback comment |
| `GET` | `/api/admin/cohort/analytics` | Admin | Get cohort analytics |
| `GET` | `/api/admin/cohort/students` | Admin | Get student list (filtered) |
| `GET` | `/api/admin/cohort/weak-topics` | Admin | Get common weak topics |
| `GET` | `/api/passport/:token` | Public | View shared Skill Passport |
| `POST` | `/api/passport/generate` | Yes | Generate shareable link |
| `GET` | `/api/passport/pdf` | Yes | Download Skill Passport PDF |

---

## Acceptance Checklist

- [ ] Coach answers cite sources (source chips visible)
- [ ] Coach says "I'm not sure" when no relevant source found
- [ ] Mentor sees only assigned students (test with two mentors)
- [ ] Mentor can add feedback visible to student
- [ ] Admin analytics use real aggregated data (not hardcoded)
- [ ] Cohort heatmap renders with real student data
- [ ] Skill Passport shareable link works without login
- [ ] Notifications appear for key events
- [ ] In-app notification bell shows unread count
- [ ] Hindi UI toggleable [N] (if implemented)

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| RAG retrieval quality poor | Tune chunk size, metadata filters; fallback to keyword search |
| Coach gives wrong advice | Always show sources; user can flag bad answers |
| Email service not configured | In-app notifications always work; email is optional |
| Hindi translations incomplete | Start with key screens; mark untranslated text |
