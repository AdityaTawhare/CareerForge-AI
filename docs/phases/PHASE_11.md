# Phase 11 — Roadmap 1: Placement Roadmap Generator

> **Priority:** [M] MUST  
> **Owner:** C (AI) + A (Frontend — roadmap UI)  
> **Parallel:** Phase 12 (D starts Learning Hub)  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Generate a personalized Placement Roadmap with three tracks (Aptitude, Technical, HR), a topic dependency graph rendered with React Flow, a weekly/daily task plan based on available hours and deadline, curated resources from the catalog (by ID, never generated URLs), project recommendations, coding practice plan, progress tracking, and adaptive re-planning when tasks are missed or the target changes.

---

## Detailed Task List

1. **Roadmap generation (LLM + rules):**
   - Input: gap report, student profile, target company rounds, available hours/week, deadline
   - Output: three tracks with ordered topics, dependencies, tasks, resources, estimated time
   - LLM generates the plan; rules enforce: mandatory topics first, dependencies respected, time budget realistic
2. **Three tracks:**
   - **Aptitude:** quantitative, logical, verbal — based on company aptitude round topics
   - **Technical:** DSA, DBMS, OS, CN, OOP, SQL, coding practice, system design basics, project prep — based on company technical rounds
   - **HR:** self-intro, behavioral questions, STAR method, company research — based on HR round
3. **Topic dependency graph (React Flow):**
   - Nodes = topics, edges = dependencies (e.g., Arrays → Sorting → Searching → Trees)
   - Color-coded by status: not started (grey), in progress (blue), completed (green), blocked (orange)
   - Clickable nodes show topic details + resources
4. **Timeline view:**
   - Weekly/daily breakdown
   - Tasks with estimated duration, resource links, status
   - Drag-to-reschedule (optional, nice-to-have)
5. **Resources from curated catalog:**
   - Each task links to resources by resource ID (from Phase 3 seed data)
   - Resources verified with HTTP HEAD check in seed script
   - Never generate free-text URLs from LLM
   - Resource types: video, article, course, docs, problem set
   - Platforms: NPTEL, freeCodeCamp, official docs, YouTube, GeeksforGeeks, LeetCode (link only, not content)
6. **Project recommendations:**
   - Based on JD gaps: "This project would demonstrate your React + Node.js skills"
   - Each recommendation includes: project scope, suggested stack, which JD gap it addresses, estimated time
   - Projects come from a curated project ideas catalog (not LLM-invented)
7. **Coding practice plan:**
   - Topic-wise problem lists with links to LeetCode/GfG/HackerRank
   - Problems organized by difficulty and company frequency
   - Link out only — do not copy problem statements
8. **Progress tracking:**
   - Mark tasks as: pending → in progress → completed / skipped
   - Task feedback: too easy / just right / too hard
   - Track time spent (optional, manual entry)
   - Progress percentage per track and overall
9. **Adaptive re-planning:**
   - When tasks are missed or skipped → reschedule, compress remaining timeline
   - When target company/role changes → regenerate roadmap for new requirements
   - When mock results come in (Phase 15) → re-prioritize topics
   - Adaptive weights (contextual bandit) v1: learn from task completion/skip/feedback to reorder recommendations
10. **Pre-Interview Readiness indicator:**
    - Based on roadmap progress + quiz scores + practice completion
    - Shows on dashboard as a progress ring

---

## Files/Folders to Create

```
server/src/modules/roadmaps/
├─ roadmapRoutes.js
├─ roadmapController.js
├─ roadmapService.js
├─ roadmapRepository.js
└─ adaptiveWeights.js        # Contextual bandit logic

server/src/llm/prompts/
├─ roadmap_generation.v1.md
├─ project_recommendation.v1.md
└─ coding_plan.v1.md

client/src/pages/roadmap/
├─ RoadmapView.tsx           # Main roadmap page
├─ DependencyGraph.tsx       # React Flow graph
├─ TimelineView.tsx          # Weekly/daily timeline
├─ TaskCard.tsx              # Individual task component
├─ TrackProgress.tsx         # Track progress bars
└─ ResourceLink.tsx          # Verified resource link component

data/
├─ resources-catalog.json    # Curated learning resources
└─ project-ideas.json        # Curated project recommendations
```

---

## Data Models

### Roadmap (extends Phase 3 schema)
```
tracks: [{
  name: "Technical" | "Aptitude" | "HR",
  topics: [{
    name: String,
    dependencies: [topicName],
    status: "not_started" | "in_progress" | "completed",
    tasks: [RoadmapTask._id]
  }]
}]
```

### RoadmapTask (extends Phase 3 schema)
```
resourceIds: [Resource._id],    // Linked by ID, not URL
projectRecommendation: {        // If task type is "project"
  scope: String,
  stack: [String],
  addressesGap: String,
  estimatedHours: Number
}
```

---

## API Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `POST` | `/api/roadmaps/generate` | Yes | Generate roadmap for a journey |
| `GET` | `/api/roadmaps/:journeyId` | Yes | Get roadmap |
| `PUT` | `/api/roadmaps/:id/task/:taskId` | Yes | Update task status/feedback |
| `POST` | `/api/roadmaps/:id/replan` | Yes | Trigger adaptive re-planning |
| `GET` | `/api/roadmaps/:id/progress` | Yes | Get progress summary |
| `GET` | `/api/roadmaps/:id/graph` | Yes | Get dependency graph data |
| `POST` | `[AI] /roadmap/generate` | Internal | Generate roadmap plan |
| `POST` | `[AI] /roadmap/replan` | Internal | Adaptive re-planning |

---

## AI Prompts Used

### `roadmap_generation.v1.md`
- **Input:** gap report JSON, student profile, company rounds, available hours, deadline
- **Output schema:** `{ tracks: [{ name, topics: [{ name, dependencies, tasks: [{ title, type, description, difficulty, estimatedMinutes, resourceQuery }] }] }] }`
- **Rules:** respect dependencies, fit within time budget, mandatory topics first
- **Temperature:** 0.3

### `project_recommendation.v1.md`
- **Input:** JD gaps, student skills, target role
- **Output schema:** `{ projects: [{ name, scope, stack, addressesGap, estimatedHours, difficulty }] }`
- **Temperature:** 0.3

---

## External Keys/Data Needed

| Item | Status |
|---|---|
| Curated resources catalog (free URLs) | ❌ Agent drafts, URL check in seed script |
| Curated project ideas | ❌ Agent drafts |

---

## Tests to Write

- Roadmap generates valid structure with all three tracks
- Dependencies are respected (no task before its dependency)
- Total estimated time fits within available hours
- Resources link to valid IDs in the catalog
- Re-planning adjusts timeline when tasks are missed
- Progress calculation is correct
- Adaptive weights update on task feedback

---

## Acceptance Checklist

- [ ] Roadmap generates for any target company + gap report combination
- [ ] Three tracks (Aptitude, Technical, HR) with relevant topics
- [ ] Dependency graph renders correctly in React Flow
- [ ] Timeline shows daily/weekly tasks
- [ ] All resource links are from the curated catalog (no LLM-generated URLs)
- [ ] Project recommendations explain which gap they address
- [ ] Coding practice plan links to external problem sites
- [ ] Progress tracking updates on task completion
- [ ] Re-planning works when tasks are missed or target changes
- [ ] Roadmap regenerates sensibly with different company/hours/deadline

---

## Demo Steps for Viva

1. Show gap report → click "Generate Roadmap"
2. Show dependency graph — explain the topic flow
3. Show timeline — daily tasks with resources
4. Mark a task as completed → show progress update
5. Skip several tasks → trigger re-planning → show adjusted timeline
6. Show project recommendation — explain how it maps to JD gap
7. Explain adaptive weights: "The system learns which tasks are too easy or too hard"

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| LLM generates unrealistic time estimates | Medium | Post-process: cap tasks at 120 min, flag outliers |
| Resources catalog too small initially | Medium | Start with 100+ verified resources; grow over time |
| Dependency graph too complex | Low | Group related topics; allow zoom/filter in React Flow |
| Adaptive weights don't converge | Low | Weights update slowly (low learning rate); rules always override |
