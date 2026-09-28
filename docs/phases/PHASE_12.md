# Phase 12 — Learning Hub & Practice Engine

> **Priority:** [M] MUST  
> **Owner:** D (Interview/QA lead) + A (Frontend)  
> **Parallel:** Can run alongside Phase 11  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Build the practice modules: Aptitude (timed MCQ sets, adaptive difficulty, explanations, optional Proctor-lite), Technical quizzes (DSA, DBMS, OS, CN, OOP, SQL) with topic mastery tracking, Coding practice (Monaco editor + in-browser runner for JS/Python), flashcards with spaced repetition, optional streaks/XP/badges, question-bank pipeline (seed + AI-generated + verified), and attempt analytics feeding the Gap Engine.

---

## Detailed Task List

1. **Aptitude module:**
   - Timed question sets (10/20/30 questions, configurable time)
   - Categories: quantitative, logical, verbal
   - Adaptive difficulty: start medium, adjust based on accuracy
   - Detailed explanations after submission
   - Optional **Proctor-lite mode [N]:** fullscreen enforcement, tab-switch counter, copy-paste blocking, 2-warning rule (warn → warn → auto-submit)
   - Results: score, time per question, accuracy per category

2. **Technical quizzes:**
   - Topics: DSA, DBMS, OS, CN, OOP, SQL
   - MCQ + short-answer (validated by keyword matching + LLM)
   - Topic mastery tracking: attempts → accuracy → mastery level (novice/learning/proficient/master)
   - Mastery feeds back into gap report and roadmap

3. **Coding practice:**
   - Monaco Editor component (syntax highlighting, auto-complete)
   - In-browser execution:
     - JavaScript: Web Worker with sandbox
     - Python: Pyodide (WebAssembly Python interpreter)
   - Problem display: description, examples, constraints
   - Test case runner: run against visible test cases, then hidden test cases
   - AI code review after submission (via LLM Gateway): correctness, efficiency, style suggestions
   - Hints system: 3 progressive hints per problem
   - Link to full problem on LeetCode/GfG (we don't copy problem text, just link)

4. **Flashcards with spaced repetition:**
   - Cards for key concepts per topic
   - SM-2 algorithm (or simplified version) for scheduling reviews
   - Card states: new → learning → review → mastered
   - User can create custom cards

5. **Question-bank pipeline:**
   - Seed data: initial questions from Phase 3
   - AI generation: LLM generates questions with answers + explanations
   - Verification: independent solve pass (LLM solves the question independently; if answer differs → discard)
   - Status: `seed` / `ai_generated` / `ai_verified` / `admin_reviewed`
   - Admin review queue

6. **Streaks, XP, badges [N]:**
   - Daily streak counter (any practice activity counts)
   - XP for completing tasks, quizzes, mocks
   - Badges: "First Quiz", "7-Day Streak", "100 Problems", "All Topics Covered"
   - No dark patterns (no punishment for missing a day, just encouragement)

7. **Attempt analytics:**
   - Track all attempts: question, answer, correct/incorrect, time, topic
   - Per-topic accuracy over time (line chart)
   - Weak topics identified from attempt patterns
   - Feed into Gap Engine for readiness recalculation

---

## Files/Folders to Create

```
client/src/pages/learning/
├─ LearningHub.tsx           # Main hub with tabs
├─ AptitudeQuiz.tsx          # Timed aptitude quiz
├─ TechnicalQuiz.tsx         # Technical MCQ quiz
├─ CodingPractice.tsx        # Monaco + test runner
├─ Flashcards.tsx            # Spaced repetition flashcards
├─ ProctorLite.tsx           # Fullscreen proctoring wrapper [N]
├─ QuizResults.tsx           # Results + explanations
├─ TopicMastery.tsx          # Mastery tracking dashboard
└─ components/
   ├─ QuestionCard.tsx
   ├─ CodeEditor.tsx         # Monaco wrapper
   ├─ TestRunner.tsx         # In-browser code execution
   ├─ FlashCard.tsx
   ├─ StreakBadge.tsx [N]
   └─ Timer.tsx

server/src/modules/practice/
├─ practiceRoutes.js
├─ practiceController.js
├─ practiceService.js
├─ practiceRepository.js
└─ questionGenerator.js      # AI question generation + verification

server/src/llm/prompts/
├─ generate_aptitude.v1.md
├─ generate_technical.v1.md
├─ code_review.v1.md
└─ verify_question.v1.md
```

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/practice/questions` | Yes | Get questions (filtered by type, topic, difficulty) |
| `POST` | `/api/practice/start-quiz` | Yes | Start a timed quiz session |
| `POST` | `/api/practice/submit-answer` | Yes | Submit an answer |
| `POST` | `/api/practice/submit-quiz` | Yes | Submit entire quiz |
| `GET` | `/api/practice/results/:quizId` | Yes | Get quiz results |
| `GET` | `/api/practice/mastery` | Yes | Get topic mastery data |
| `POST` | `/api/practice/code/run` | Yes | Run code (server validates, but execution is in-browser) |
| `POST` | `/api/practice/code/review` | Yes | AI code review |
| `GET` | `/api/practice/flashcards` | Yes | Get flashcards due for review |
| `POST` | `/api/practice/flashcards/review` | Yes | Submit flashcard review result |
| `GET` | `/api/practice/stats` | Yes | Get attempt analytics |
| `POST` | `/api/admin/questions/generate` | Admin | Generate AI questions |
| `GET` | `/api/admin/questions/review` | Admin | Get questions pending review |
| `PUT` | `/api/admin/questions/:id/verify` | Admin | Approve/reject question |

---

## AI Prompts Used

### `generate_aptitude.v1.md`
- **Input:** topic, difficulty, count
- **Output:** `{ questions: [{ question, options, correctAnswer, explanation }] }`
- **Verification:** independent solve pass

### `code_review.v1.md`
- **Input:** problem description, student code, language, test results
- **Output:** `{ correctness, efficiency, style, suggestions[], improvedCode }`

---

## External Keys/Data Needed

| Item | Status |
|---|---|
| Seed question bank (100+ aptitude, 150+ technical, 50+ HR) | ❌ Agent drafts, team reviews |
| Pyodide WASM bundle | Auto-downloaded from CDN |

---

## Tests to Write

- Quiz timer works correctly
- Correct/incorrect answers scored properly
- Adaptive difficulty adjusts after each quiz
- Code execution works for JS and Python in-browser
- AI-generated questions pass verification (solve pass)
- Topic mastery updates after attempts
- Flashcard scheduling follows SM-2 algorithm
- Proctor-lite detects tab switches (if implemented)

---

## Acceptance Checklist

- [ ] Aptitude quiz: timed, scored, with explanations
- [ ] Technical quiz: per-topic, with mastery tracking
- [ ] Coding practice: Monaco editor + in-browser JS/Python execution
- [ ] AI code review provides useful feedback
- [ ] Topic mastery updates after attempts
- [ ] AI-generated questions pass the verification step
- [ ] Flashcards: spaced repetition scheduling works
- [ ] Attempt analytics: per-topic accuracy charts visible
- [ ] Analytics feed back into gap engine for readiness update
- [ ] Proctor-lite works in fullscreen mode [N]
- [ ] No dark patterns in gamification [N]

---

## Demo Steps for Viva

1. Take an aptitude quiz — show timer, adaptive difficulty, results with explanations
2. Take a technical quiz — show mastery level change
3. Solve a coding problem — show Monaco editor, run tests, AI review
4. Show flashcards — review a card, explain spaced repetition
5. Show topic mastery dashboard — charts and analytics
6. Show question verification: "AI generated this question, then independently solved it to verify"

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Pyodide slow to load (10-20 MB WASM) | Medium | Lazy-load on first coding practice visit; show loading indicator |
| Code execution security (JS Web Worker) | Low | Worker sandbox prevents DOM access; timeout at 5 seconds |
| AI question verification fails often | Medium | Increase verification prompt quality; manual review queue for failures |
| Spaced repetition algorithm complexity | Low | Start with simplified SM-2; refine later |
