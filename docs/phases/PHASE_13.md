# Phase 13 — Mock Interview Engine (Core)

> **Priority:** [M] MUST  
> **Owner:** D (Interview lead) + C (AI scoring)  
> **Parallel:** None — needs Phase 11 + 12  
> **Estimated effort:** Large (5–6 days)  
> **Status:** NOT STARTED

---

## Objective

Build the mock interview engine: setup (round type, company, role, difficulty, duration), question generation tailored by resume + JD + company round pattern, Aptitude/Technical/HR/Project Grill modes, adaptive follow-up questions, text-based answers first, rubric-based AI evaluation per answer + overall, model answers, transcript storage, mock history, and retry weak questions.

---

## Detailed Task List

1. **Mock setup screen:**
   - Select: round type (aptitude/technical/hr), company, role, difficulty (1–5), duration (15/30/45/60 min)
   - Option: "Project Grill" mode (questions about YOUR projects from resume)
   - Preview: "You'll get ~10 questions about DSA and DBMS for TCS Technical Round 2"

2. **Question generation (LLM + bank):**
   - Input: resume, JD, company round pattern, difficulty, round type
   - Mix: 60% from question bank (filtered by topic/company/difficulty) + 40% AI-generated (tailored to student's profile)
   - **Aptitude mock:** timed MCQ set (uses Phase 12 engine with Proctor-lite optional)
   - **Technical mock:** concept questions + coding problems + follow-ups
   - **HR mock:** behavioral (STAR), situational, company-specific
   - **Project Grill:** questions about student's own projects (extracted from resume): "Why did you choose React for this project?", "How would you scale this?", "What was the hardest bug?"
   - Adaptive follow-ups: if answer is shallow → probe deeper; if answer mentions a technology → ask about trade-offs

3. **Interview room UI (text-based first):**
   - Split view: question panel (left) + answer area (right)
   - Timer (per question + total)
   - Question counter ("Question 3 of 10")
   - Submit answer button → next question
   - "Skip" option (counts as incomplete)
   - Progress indicator

4. **Rubric-based AI evaluation:**
   - **Per-answer scoring** (0–10 per dimension):
     - Correctness / Relevance
     - Depth of explanation
     - Structure / Clarity
     - Communication quality
     - Relevance to JD/role
   - Evidence quotes from the answer (what was good, what was missing)
   - One improvement tip per answer
   - Model answer (what a good answer looks like)
   - Low temperature (0.1–0.3) for consistency
   - **Self-check pass:** for borderline scores (4–6), run a second evaluation and average

5. **Overall evaluation:**
   - Aggregate scores across all answers
   - Overall technical, communication, confidence scores
   - Strengths and weaknesses identified
   - Priority weakness (most impactful to fix)
   - Recommendations for improvement

6. **STAR-method checker [S] (for HR answers):**
   - Detect STAR components: Situation, Task, Action, Result
   - Highlight which parts are present/missing
   - Suggest how to add missing parts

7. **Transcript storage:**
   - All questions + answers + scores saved as MockSession + MockAnswer documents
   - Searchable and reviewable later

8. **Mock history:**
   - List of past mocks with scores, dates, round types
   - Filter by company, round type, date
   - Re-attempt weak questions from past mocks

9. **Score reproducibility:**
   - Same answer evaluated twice should score within ±1 point
   - Test with 10 sample answers; report variance

---

## Files/Folders to Create

```
client/src/pages/mock/
├─ MockSetup.tsx            # Setup screen
├─ MockRoom.tsx             # Interview room
├─ MockFeedback.tsx         # Results + evaluation
├─ MockHistory.tsx          # Past mocks list
├─ ProjectGrill.tsx         # Project-specific questions
├─ components/
│  ├─ QuestionPanel.tsx     # Question display
│  ├─ AnswerArea.tsx        # Text answer input
│  ├─ MockTimer.tsx         # Timer component
│  ├─ RubricScoreCard.tsx   # Per-answer score display
│  ├─ STARChecker.tsx       # STAR method analysis [S]
│  └─ ModelAnswer.tsx       # Model answer display

server/src/modules/mocks/
├─ mockRoutes.js
├─ mockController.js
├─ mockService.js
├─ mockRepository.js
├─ questionGenerator.js     # Interview question generation
├─ evaluationEngine.js      # Rubric-based scoring
└─ starChecker.js           # STAR method analysis [S]

server/src/llm/prompts/
├─ interview_question_technical.v1.md
├─ interview_question_hr.v1.md
├─ interview_question_project.v1.md
├─ interview_followup.v1.md
├─ evaluate_answer.v1.md
├─ evaluate_overall.v1.md
├─ star_check.v1.md [S]
└─ model_answer.v1.md
```

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/mocks/setup` | Yes | Create mock session |
| `GET` | `/api/mocks/:sessionId/question` | Yes | Get next question |
| `POST` | `/api/mocks/:sessionId/answer` | Yes | Submit answer |
| `POST` | `/api/mocks/:sessionId/complete` | Yes | Complete mock, trigger evaluation |
| `GET` | `/api/mocks/:sessionId/evaluation` | Yes | Get evaluation results |
| `GET` | `/api/mocks/history` | Yes | Get mock history |
| `GET` | `/api/mocks/:sessionId/transcript` | Yes | Get full transcript |
| `POST` | `/api/mocks/:sessionId/retry-weak` | Yes | Retry weak questions |

---

## AI Prompts Used

### `evaluate_answer.v1.md`
- **Input:** question, student answer, JD context, round type, rubric
- **Output schema:**
```json
{
  "scores": {
    "correctness": 8, "depth": 6, "structure": 7,
    "communication": 7, "relevance": 8
  },
  "overallScore": 7.2,
  "evidenceQuotes": ["Good use of...", "Missing explanation of..."],
  "improvementTip": "Add time complexity analysis",
  "modelAnswer": "A strong answer would include..."
}
```
- **Temperature:** 0.1–0.2
- **Self-check:** if overall 4–6, run second pass and average

### `interview_question_project.v1.md` (Project Grill)
- **Input:** student's project details from resume
- **Output:** `{ questions: [{ question, probeArea, expectedDepth }] }`
- **Probes:** tech choices, trade-offs, failures, scaling, alternatives

---

## External Keys/Data Needed

| Item | Status |
|---|---|
| LLM API keys (from Phase 5) | Should be obtained by now |
| Question bank seed data (from Phase 12) | Should be populated |

---

## Tests to Write

- Mock session lifecycle: setup → questions → answers → evaluation → complete
- Question generation returns correct number/type for round
- Evaluation scores are within valid range (0–10)
- Self-check pass averages borderline scores
- STAR checker identifies missing components
- Transcript stored completely (all Q&A pairs)
- Score reproducibility: ≤ ±1 point on re-evaluation
- Follow-up questions relate to the previous answer

---

## Acceptance Checklist

- [ ] Full text mock works end to end for Aptitude, Technical, HR round types
- [ ] Project Grill asks about student's actual projects from resume
- [ ] Evaluation JSON validated with Zod schema
- [ ] Per-answer rubric scores with evidence quotes and improvement tips
- [ ] Model answers provided for each question
- [ ] STAR checker highlights missing components for HR answers [S]
- [ ] Mock history shows all past sessions with scores
- [ ] Retry weak questions creates a new session with those questions
- [ ] Scores reproducible within ±1 point margin on repeated evaluation
- [ ] Adaptive follow-up questions probe shallow answers deeper

---

## Demo Steps for Viva

1. Set up a Technical mock for TCS → show tailored questions
2. Answer 3–4 questions → submit
3. Show evaluation: rubric scores, evidence quotes, improvement tips, model answer
4. Switch to Project Grill → show questions about YOUR projects
5. Show HR mock → STAR checker highlights missing parts
6. Show mock history → compare scores over time
7. Explain: "Scoring uses a fixed rubric with low temperature for consistency, plus a self-check for borderline scores"

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| LLM scoring inconsistency | Medium | Low temperature, rubric, self-check, minimum-change threshold |
| Project Grill questions too generic | Medium | Parse project details carefully; include tech stack, scope, description in prompt |
| Follow-up questions not coherent | Medium | Include previous Q&A in follow-up prompt context |
| Long evaluation time (multiple LLM calls) | Medium | Batch evaluation in one call if possible; show "Evaluating..." with progress |
