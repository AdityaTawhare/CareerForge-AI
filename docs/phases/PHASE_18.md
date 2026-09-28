# Phase 18 — Quality: Testing, Security, Performance, Accessibility, Privacy

> **Priority:** [M] MUST  
> **Owner:** D (QA lead) + B (Backend security)  
> **Parallel:** Can overlap with Phase 17 (continuous testing)  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Comprehensive quality pass: unit + integration + e2e tests (Playwright: full journey happy path), API contract tests, security review (OWASP top 10), performance optimization (bundle, lazy loading, DB indexes, load test), accessibility audit (Lighthouse ≥ 90), Privacy Center (export, delete, consent log), optional error monitoring, and bug bash.

---

## Detailed Task List

1. **Unit tests:**
   - Frontend: Vitest + React Testing Library — all components render, hooks work
   - Backend: Jest + Supertest — all services, validators, middleware
   - AI service: Pytest — parser, matcher, scorer

2. **Integration tests:**
   - API contract tests: request/response shape for all endpoints
   - Auth flow: signup → login → protected route → refresh → logout
   - Journey flow: create journey → gap analysis → roadmap → mock → evaluation

3. **End-to-end tests (Playwright):**
   - Happy path: sign up → onboarding → upload resume → select company → view gap → start mock → complete mock → view results
   - Auth edge cases: expired token, wrong role
   - Error handling: invalid upload, network failure simulation

4. **Security review (OWASP Top 10):**
   - [ ] Injection: MongoDB sanitization, parameterized queries
   - [ ] Broken auth: token expiry, refresh rotation, rate limiting
   - [ ] Sensitive data: HTTPS only in prod, httpOnly cookies, no secrets in client
   - [ ] XXE: no XML parsing
   - [ ] Broken access control: RBAC tested for each role
   - [ ] Security misconfiguration: helmet headers, CORS, remove stack traces in prod
   - [ ] XSS: React default escaping, DOMPurify for user HTML
   - [ ] Insecure deserialization: Zod validation on all inputs
   - [ ] Vulnerable dependencies: `npm audit`, `pip audit`
   - [ ] Insufficient logging: audit log covers sensitive actions
   - File upload safety: type check (magic bytes), size limit, no execution

5. **Performance:**
   - Bundle analysis: identify large chunks, enable code splitting
   - Lazy loading: route-based splitting, heavy components (Monaco, React Flow, Recharts)
   - Image optimization: WebP where possible
   - DB indexes: verify indexes for all common query patterns
   - API load test: k6 or autocannon on critical endpoints (health, auth, resume parse)
   - Target: API response < 200ms for reads, < 2s for AI calls (excluding LLM time)

6. **Accessibility audit:**
   - Lighthouse accessibility score ≥ 90 on all key pages
   - Keyboard navigation: all interactive elements reachable
   - Screen reader: ARIA labels on dynamic content
   - Color contrast: WCAG AA (4.5:1 for normal text)
   - Focus management: modals trap focus, dialogs restore focus

7. **Privacy Center:**
   - Consent log: record all consent changes with timestamps
   - Export my data: download all user data as JSON (profile, resumes, mocks, analytics)
   - Delete my account: remove all personal data, cascade to related collections
   - Data export/delete confirmation with password re-entry
   - PII masking review: verify no PII reaches LLM providers unmasked

8. **Error monitoring (optional):**
   - Sentry free tier for frontend + backend error tracking
   - Or: simple error logging to DB with admin view

9. **Bug bash:**
   - Each team member tests every feature for 1 hour
   - Log bugs in a shared doc
   - Fix critical and high-severity bugs before Phase 19

---

## Tests to Write

- **Unit:** ≥80% coverage on services and utilities
- **Integration:** All API endpoints have at least one positive and one negative test
- **E2E:** Full journey happy path passes in CI
- **Security:** All OWASP checks documented as pass/fail
- **Performance:** Load test results recorded
- **Accessibility:** Lighthouse reports saved

---

## Acceptance Checklist

- [ ] CI runs all tests (unit + integration + e2e) and passes
- [ ] No `npm audit` high/critical vulnerabilities (or documented exceptions)
- [ ] No `pip audit` high/critical vulnerabilities
- [ ] OWASP checklist: no high-severity findings
- [ ] Lighthouse accessibility ≥ 90 on: landing, dashboard, resume, mock, roadmap pages
- [ ] Privacy Center: export and delete work correctly
- [ ] PII masking verified: no raw PII in LLM request logs
- [ ] E2E happy path: full journey runs in < 5 minutes
- [ ] Bundle size: main chunk < 500 KB gzipped
- [ ] Bug bash completed, critical bugs fixed
- [ ] File upload rejects non-PDF/DOCX files even with spoofed extensions

---

## Demo Steps for Viva

1. Show CI dashboard — all tests green
2. Show Lighthouse report — accessibility score
3. Show Privacy Center — export data, explain delete flow
4. Show OWASP checklist — explain security measures
5. "We tested with a team bug bash and fixed N bugs"

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| E2E tests flaky in CI | Retry logic; run locally if CI fails |
| Dependency vulnerabilities with no fix | Document in known issues; apply workarounds |
| Lighthouse score below 90 | Focus on contrast, labels, heading hierarchy |
