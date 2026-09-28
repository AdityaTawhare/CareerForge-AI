# Phase 09 — Target Company, JD Intelligence & Company DNA

> **Priority:** [M] MUST  
> **Owner:** C (AI) + B (Backend KB module)  
> **Parallel:** Can partially overlap with Phase 8  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Build company + role selection, JD input and parsing, the Company DNA module (company info, recruitment process, round identification with round-wise requirements), all from the verified knowledge base + RAG. Show sources, confidence, last-verified, and student votes. Build admin KB editor. Handle unknown companies with search-assisted AI drafts clearly marked as unverified. Optional market snapshot from Adzuna.

---

## Detailed Task List

1. **Company + role selection UI:** searchable dropdown from company list, role input, create journey
2. **JD input:** paste text or enter URL (URL fetch optional), save raw JD
3. **JD parser (AI service):**
   - Extract: must-have skills, nice-to-have skills, tools, experience range, responsibilities, keywords, education requirements
   - Validate output with Zod schema
4. **Company DNA module:**
   - Company info: industry, typical roles, eligibility, package range
   - Recruitment process: number of rounds, order, overall description
   - **Round identification:** list each round with type (Aptitude/Technical/HR/GD/Coding/Other), format, duration, topics, skills tested, difficulty, tips, common questions
   - Each data point has: source, confidence (high/medium/low), last_verified date
   - Student votes: "this was correct" / "this was wrong" per company and per round
5. **Knowledge base backed by RAG:**
   - Company data stored in MongoDB
   - Vector embeddings for company round descriptions (for semantic search)
   - RAG pipeline: query → retrieve relevant company info → LLM synthesizes answer with citations
6. **Unknown company handling:**
   - If company not in KB → "draft mode"
   - AI uses web search (Tavily if key provided) to draft company info
   - Clearly marked as **"Unverified — AI Draft"** with prominent warning
   - Admin or student can verify and flag drafts
7. **Admin KB editor:**
   - CRUD for companies and rounds
   - Bulk import from JSON
   - Review student votes and flags
   - Mark data as verified with date
8. **Market snapshot from Adzuna [S]:**
   - Search Adzuna API for role + location
   - Show: number of openings, common skills demanded, salary range
9. **Seed data:** 30+ Indian companies with basic round info (draft, team verifies)

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/companies` | Yes | List companies (search, filter) |
| `GET` | `/api/companies/:id` | Yes | Get company details + rounds |
| `POST` | `/api/companies` | Admin | Create company |
| `PUT` | `/api/companies/:id` | Admin | Update company |
| `GET` | `/api/companies/:id/rounds` | Yes | Get company rounds |
| `POST` | `/api/companies/:id/vote` | Yes | Vote on company data accuracy |
| `POST` | `/api/jd/parse` | Yes | Parse JD text |
| `POST` | `/api/jd` | Yes | Save parsed JD |
| `GET` | `/api/jd/:id` | Yes | Get parsed JD |
| `GET` | `/api/market/:role` | Yes | Adzuna market data [S] |
| `POST` | `[AI] /parse/jd` | Internal | JD skill extraction |
| `POST` | `[AI] /company/draft` | Internal | Draft unknown company info |

---

## External Keys/Data Needed

| Item | Status |
|---|---|
| Company data (30-50 companies, team verified) | ❌ Agent drafts, team must verify |
| Adzuna API keys (optional) | 🔄 For market snapshot feature |
| Tavily API key (optional) | 🔄 For unknown company research |

---

## Acceptance Checklist

- [ ] Choosing a seeded company shows its rounds with sources and confidence
- [ ] Unverified/draft data is clearly labeled with warning
- [ ] JD parser extracts skills, tools, requirements as JSON
- [ ] Student can vote "correct/incorrect" on company data
- [ ] Admin can add/edit/verify companies and rounds
- [ ] RAG pipeline returns relevant company info with citations
- [ ] Journey created with target company + role

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| Company data quality | All data marked with confidence; team verification required |
| Tavily API not available | Unknown companies show "limited info" with manual entry option |
| Adzuna API limits | Cache results; show "market data unavailable" gracefully |
