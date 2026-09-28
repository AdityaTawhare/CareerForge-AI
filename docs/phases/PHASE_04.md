# Phase 04 — Authentication, Roles & Onboarding

> **Priority:** [M] MUST  
> **Owner:** B (Backend) + A (Frontend — onboarding UI)  
> **Parallel:** Phase 5 (C works on LLM Gateway)  
> **Estimated effort:** Medium (3–4 days)  
> **Status:** NOT STARTED

---

## Objective

Implement complete auth flow (sign up, login, logout, refresh tokens), RBAC middleware (student/mentor/admin), onboarding wizard, consent screen, profile settings, and audit logging for sensitive actions. Security hardened with rate limiting, sanitization, and secure cookie configuration.

---

## Detailed Task List

1. **Backend auth module:**
   - Sign up with email + password (bcrypt hash, Zod validation)
   - Login: verify password, issue access token (15 min) + refresh token (7 days) in httpOnly cookies
   - Logout: clear cookies, invalidate refresh token
   - Refresh endpoint: issue new access + refresh tokens
   - Password reset (email optional — if SMTP configured; otherwise skip)
   - Optional: Google OAuth (if team provides credentials)
2. **RBAC middleware:**
   - `authenticate` — verify JWT, attach user to request
   - `authorize(roles[])` — check user role against allowed roles
   - Default role on sign up: `student`
   - Admin can change roles (protected endpoint)
3. **Onboarding wizard (frontend):**
   - Step 1: Personal info (name, college, branch, year)
   - Step 2: Academic (CGPA, backlogs)
   - Step 3: Goals (preferred roles, target companies, career interests)
   - Step 4: Skills self-assessment (rate skills from taxonomy, 1–5)
   - Step 5: Preferences (language, theme)
   - Step 6: Consent screen (terms, privacy, AI processing)
   - Data saved to Profile model; `isOnboarded` flag set
4. **Profile settings page:**
   - Edit profile, change password, delete account
   - Theme toggle, notification preferences
5. **Audit log:** record login, role change, data export, data delete
6. **Security checklist:** rate limiting on auth endpoints, input sanitization, helmet headers, CORS configured, secure cookies (httpOnly, sameSite, secure in production)
7. **Frontend auth:**
   - Protected route wrapper component
   - Auth context/store (Zustand)
   - Auto-refresh tokens before expiry
   - Redirect to onboarding if not onboarded

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/signup` | No | Create account |
| `POST` | `/api/auth/login` | No | Login, set cookies |
| `POST` | `/api/auth/logout` | Yes | Clear cookies |
| `POST` | `/api/auth/refresh` | Cookie | Refresh tokens |
| `POST` | `/api/auth/forgot-password` | No | Send reset email (optional) |
| `POST` | `/api/auth/reset-password` | Token | Reset password |
| `GET` | `/api/auth/me` | Yes | Get current user |
| `PUT` | `/api/users/profile` | Yes | Update profile |
| `POST` | `/api/users/onboarding` | Yes | Save onboarding data |
| `DELETE` | `/api/users/me` | Yes | Delete account + data |
| `PUT` | `/api/admin/users/:id/role` | Admin | Change user role |

---

## External Keys/Data Needed

| Item | Env Variable | Status |
|---|---|---|
| JWT access secret | `JWT_ACCESS_SECRET` | ❌ Generate: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"` |
| JWT refresh secret | `JWT_REFRESH_SECRET` | ❌ Generate same command |
| Google OAuth (optional) | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | 🔄 Optional |

---

## Acceptance Checklist

- [ ] Sign up, login, logout work end to end
- [ ] Tokens in httpOnly cookies (not localStorage)
- [ ] Protected routes return 401 without token, 403 without correct role
- [ ] Onboarding wizard saves all data to Profile
- [ ] Consent screen records acceptance with timestamp
- [ ] Rate limiting works on auth endpoints (test with rapid requests)
- [ ] Audit log records login and role changes
- [ ] Password is never stored in plain text
- [ ] Delete account removes all user data

---

## Risks and Fallback

| Risk | Mitigation |
|---|---|
| OAuth setup complex | Make it optional — email/password auth always works |
| Email service not set up | Password reset via email is optional; show a fallback message |
