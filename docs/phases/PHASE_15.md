# Phase 15 — Performance Analytics & Roadmap 2 (AI Improvement)

> **Priority:** [M] MUST  
> **Owner:** C (AI) + D (Analytics UI)  
> **Parallel:** None — needs Phase 13  
> **Estimated effort:** Medium-Large (3–4 days)  
> **Status:** NOT STARTED

---

## Objective

Build the interview performance dashboard (technical, communication, confidence), gap detection and weakness ranking from mock results, generate Roadmap 2 (targeted improvement plan), run a second mock round, implement the Performance Comparison (Improved / Not Improved / Mixed with per-skill deltas), and the improvement loop logic.

---

## Detailed Task List

1. **Performance dashboard:**
   - Overall mock performance breakdown: technical, communication, confidence
   - Per-topic performance (which DS topics were weak, which HR dimensions)
   - Trend over multiple mocks (line chart)

2. **Gap detection from mock results:**
   - Analyze all answer scores by topic/dimension
   - Rank weaknesses by impact (which weakness, if fixed, would most improve readiness)
   - Priority weakness selection (top 3)

3. **Roadmap 2 generation (AI Improvement Roadmap):**
   - Input: mock evaluation, priority weaknesses, student profile
   - Output: targeted practice plan focused on weak areas
   - Types of tasks: concept revision, practice problems, mock answer rewriting, speaking practice (if voice was used), project explanation practice
   - Shorter and more focused than Roadmap 1

4. **Second Mock Round:**
   - Triggered after Roadmap 2 progress
   - Focus questions on previously weak areas
   - Same rubric for comparability

5. **Performance Comparison (Improvement Proof):**
   - Per-skill delta: Mock 1 score vs Mock 2 score
   - Delta bars visualization (green = improved, red = declined, grey = same)
   - Statistical caution: minimum-change threshold (±1 point change = "no significant change")
   - Overall verdict: **Improved** / **Not Improved** / **Mixed**
   - Plain-language explanation: "Your DBMS answers improved from 5.2 to 7.8. Your communication remained similar."

6. **Improvement loop logic:**
   - **Improved** → move to next weakness → generate new focused tasks
   - **Not Improved** → regenerate Roadmap 2 with a different strategy (different resources, different practice type, more repetition)
   - Loop continues until readiness threshold met or student decides to move on

7. **Journey state transitions:**
   - `MOCK1_DONE` → `ROADMAP2_ACTIVE` (after Roadmap 2 generated)
   - `ROADMAP2_ACTIVE` → `MOCK2_DONE` (after second mock completed)
   - `MOCK2_DONE` → `READINESS_CHECK` (triggers readiness assessment)

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/api/analytics/performance/:journeyId` | Yes | Get performance dashboard data |
| `GET` | `/api/analytics/weaknesses/:journeyId` | Yes | Get ranked weaknesses |
| `POST` | `/api/roadmaps/improvement` | Yes | Generate Roadmap 2 |
| `GET` | `/api/analytics/comparison/:journeyId` | Yes | Get Mock 1 vs Mock 2 comparison |
| `POST` | `/api/analytics/improvement-loop` | Yes | Process improvement loop decision |

---

## AI Prompts Used

### `improvement_roadmap.v1.md`
- **Input:** mock evaluation, weaknesses, student profile, previous roadmap
- **Output:** targeted improvement plan with tasks

### `performance_comparison.v1.md`
- **Input:** Mock 1 scores, Mock 2 scores, per-topic
- **Output:** `{ perSkillDeltas: [{skill, mock1, mock2, delta, verdict}], overall: "improved"|"not_improved"|"mixed", explanation: String }`

---

## Acceptance Checklist

- [ ] Performance dashboard shows technical, communication, confidence breakdown
- [ ] Weakness ranking identifies top 3 priority areas
- [ ] Roadmap 2 is focused and shorter than Roadmap 1
- [ ] Second mock focuses on previously weak areas
- [ ] Comparison: per-skill delta bars with Improved/Not Improved/Mixed verdict
- [ ] Minimum-change threshold prevents false improvement claims (±1 = no significant change)
- [ ] Loop runs end to end on demo data
- [ ] Journey state transitions correctly: MOCK1_DONE → ROADMAP2_ACTIVE → MOCK2_DONE → READINESS_CHECK
- [ ] Not Improved → Roadmap 2 regenerated with different strategy

---

## Demo Steps for Viva

1. Show Mock 1 results → performance dashboard
2. Show weakness ranking → "DBMS and communication are your top weaknesses"
3. Show generated Roadmap 2 → focused on those areas
4. Complete Roadmap 2 tasks → take Mock 2
5. Show comparison → delta bars → "Your DBMS improved from 5 to 8!"
6. Explain the loop: "If not improved, we try a different approach"

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Small score changes misinterpreted | High | Minimum-change threshold; statistical caution notes; never say "improved" for ±1 point |
| Loop gets stuck (never improves) | Medium | Max loop iterations (3); offer to move on with warning |
| Roadmap 2 too similar to Roadmap 1 | Medium | Prompt includes "use different resources/approach than previous roadmap" |
