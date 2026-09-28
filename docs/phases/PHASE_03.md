# Phase 03 — Database Schema & API Foundation

> **Priority:** [M] MUST  
> **Owner:** B (Backend & DevOps lead)  
> **Parallel:** Can be done in parallel with Phase 2 (A works on UI)  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Define all Mongoose models with proper indexes, create Zod validation schemas, establish the layered architecture (routes → controllers → services → repositories), build central error handling, request logging, pagination/filter helpers, Swagger/OpenAPI docs, and seed scripts for skills taxonomy and sample data.

---

## Detailed Task List

1. Design and create all Mongoose models (see Data Models below)
2. Create Zod schemas for request/response validation for each model
3. Establish layered architecture pattern:
   - `routes/` — Express router definitions
   - `controllers/` — request/response handling, calls services
   - `services/` — business logic, calls repositories
   - `repositories/` — database access layer (Mongoose queries)
4. Create middleware:
   - `errorHandler.js` — central error handler with proper HTTP status codes
   - `requestLogger.js` — pino-based request logging
   - `validateRequest.js` — Zod validation middleware
   - `paginate.js` — pagination/filter/sort helper
5. Create utility modules:
   - `ApiError` class with status code, message, and error code
   - `ApiResponse` helper for consistent response format
   - `asyncHandler` wrapper for try/catch
6. Set up Swagger/OpenAPI documentation (swagger-jsdoc + swagger-ui-express)
7. Create seed scripts:
   - Skills taxonomy from open data (ESCO/O*NET categories, simplified)
   - Sample companies (30+ Indian companies with basic info)
   - Sample questions (10 aptitude, 10 technical, 10 HR — just starters)
   - Sample resources catalog (free learning resources with verified URLs)
8. Create indexes for common queries (userId, companyId, journeyId, status, etc.)
9. Write unit tests for services and repositories using Jest + in-memory MongoDB
10. Verify: API docs render, seed script fills the DB, tests pass

---

## Files/Folders to Create

```
server/src/
├─ models/
│  ├─ User.js
│  ├─ Profile.js
│  ├─ Resume.js
│  ├─ SkillsTaxonomy.js
│  ├─ Company.js
│  ├─ CompanyRound.js
│  ├─ JobDescription.js
│  ├─ Journey.js
│  ├─ GapReport.js
│  ├─ Roadmap.js
│  ├─ RoadmapTask.js
│  ├─ Resource.js
│  ├─ Question.js
│  ├─ Attempt.js
│  ├─ MockSession.js
│  ├─ MockAnswer.js
│  ├─ Evaluation.js
│  ├─ Metric.js
│  ├─ ReadinessReport.js
│  ├─ Application.js
│  ├─ CoachThread.js
│  ├─ FeedbackVote.js
│  ├─ Notification.js
│  ├─ AuditLog.js
│  ├─ LLMCache.js
│  └─ QuotaUsage.js
├─ schemas/              # Zod validation schemas
│  ├─ userSchemas.js
│  ├─ resumeSchemas.js
│  ├─ companySchemas.js
│  ├─ journeySchemas.js
│  └─ ...
├─ middleware/
│  ├─ errorHandler.js
│  ├─ requestLogger.js
│  ├─ validateRequest.js
│  └─ paginate.js
├─ utils/
│  ├─ ApiError.js
│  ├─ ApiResponse.js
│  └─ asyncHandler.js
├─ config/
│  ├─ swagger.js
│  └─ db.js (updated)
└─ scripts/
   ├─ seed.js
   ├─ seedSkills.js
   ├─ seedCompanies.js
   ├─ seedQuestions.js
   └─ seedResources.js
```

---

## Data Models (Core Fields + Types)

### User
```
_id, email (unique, indexed), passwordHash, role (enum: student/mentor/admin),
firstName, lastName, avatar, isEmailVerified, isOnboarded, lastLogin,
preferences: { theme, language, reduceMotion },
consent: { termsAccepted, privacyAccepted, aiProcessing, consentDate },
createdAt, updatedAt
```

### Profile
```
_id, userId (ref: User, unique, indexed), branch, year, cgpa, college,
goals[], preferredRoles[], selfRatedSkills[{skillId, level}],
languages[], location, linkedIn, github, portfolio,
onboardingCompleted, createdAt, updatedAt
```

### Resume
```
_id, userId (indexed), version, label (e.g. "Resume for TCS"),
parsedData: { contact, summary, education[], skills[], experience[],
  projects[], certifications[], achievements[], links[] },
rawText, fileUrl (optional), fileType,
parseConfidence: { overall, perField:{} },
isActive (boolean), createdAt, updatedAt
```

### SkillsTaxonomy
```
_id, name (unique, indexed), category (technical/soft/domain),
subcategory, aliases[], relatedSkills[], level (beginner/intermediate/advanced/expert),
description, isVerified, source
```

### Company
```
_id, name (indexed), industry, website, description,
typicalRoles[], eligibility: { minCgpa, branches[], noActiveBacklogs },
packageRange: { min, max, currency },
isVerified, source, confidence (high/medium/low), lastVerified,
votes: { correct: Number, incorrect: Number },
createdAt, updatedAt
```

### CompanyRound
```
_id, companyId (ref: Company, indexed), roundNumber, roundType (enum: aptitude/technical/hr/group_discussion/coding/other),
name, format, duration, description,
topics[], skills[], difficulty (1-5),
tips[], commonQuestions[],
source, confidence, lastVerified,
votes: { correct, incorrect }
```

### JobDescription
```
_id, userId (indexed), companyId (ref: Company), role, rawText, sourceUrl,
parsed: {
  mustHaveSkills[], niceToHaveSkills[], tools[],
  experienceRange, responsibilities[], keywords[],
  educationReq, otherReq[]
},
createdAt, updatedAt
```

### Journey
```
_id, userId (indexed), companyId, jobDescriptionId, role,
state (enum: ACCOUNT_CREATED, RESUME_STAGE, PROFILE_READY, TARGET_SELECTED,
  JD_ANALYZED, GAP_ANALYZED, ROADMAP1_ACTIVE, MOCK1_DONE,
  ROADMAP2_ACTIVE, MOCK2_DONE, READINESS_CHECK, FINAL_PREP, READY_TO_APPLY),
stateHistory[{state, enteredAt, exitedAt}],
readinessScore, isActive,
createdAt, updatedAt
```

### GapReport
```
_id, journeyId (indexed), userId,
overallMatch: Number (0-100),
sectionScores: { resume, technical, aptitude, hr, projects },
roundWiseGaps[{roundId, roundType, gaps[{skill, required, current, severity}]}],
strengths[], weaknesses[],
recommendations[],
graphData (JSON for knowledge graph),
createdAt
```

### Roadmap
```
_id, journeyId (indexed), userId, type (enum: placement/improvement),
version, tracks[{name, topics[]}],
totalTasks, completedTasks, progressPercent,
dailyHours, deadline,
adaptiveWeights (JSON), isActive,
createdAt, updatedAt
```

### RoadmapTask
```
_id, roadmapId (indexed), track, topic, title, description,
taskType (enum: learn/practice/quiz/project/review),
resourceIds[], difficulty, estimatedMinutes,
scheduledDate, status (enum: pending/in_progress/completed/skipped),
feedback (enum: too_easy/just_right/too_hard/null),
completedAt, order, dependencies[],
createdAt, updatedAt
```

### Resource
```
_id, title, url (indexed), type (enum: video/article/course/docs/tool/problem),
topic, subtopic, platform, difficulty,
isFree, isVerified, isUrlAlive,
lastChecked, description, tags[],
createdAt
```

### Question
```
_id, type (enum: aptitude/technical/coding/hr, indexed),
topic, subtopic, difficulty (1-5),
question, options[] (for MCQ), correctAnswer, explanation,
codeTemplate (for coding), testCases[] (for coding),
source (enum: seed/ai_generated/manual), isVerified,
verificationMethod, companyTags[],
createdAt
```

### Attempt
```
_id, userId (indexed), questionId, type,
answer, isCorrect, score, timeTaken,
createdAt
```

### MockSession
```
_id, userId (indexed), journeyId, companyId,
roundType, difficulty, duration,
questionCount, status (enum: setup/in_progress/completed/abandoned),
startedAt, completedAt,
overallScore, overallFeedback,
metrics: { technical, communication, confidence, relevance },
speechMetrics: { wpm, fillerCount, pauseCount, avgPauseDuration },
cameraMetrics: { facePresencePercent, gazeScore, postureScore },
isFirstMock, createdAt
```

### MockAnswer
```
_id, sessionId (indexed), questionIndex, question,
answer, transcript (if voice),
score, rubricScores: { correctness, depth, structure, communication, relevance },
feedback, improvementTip, modelAnswer,
evidenceQuotes[], timeTaken,
createdAt
```

### Evaluation (AI evaluation result)
```
_id, sessionId (indexed), userId,
scores: { technical, communication, confidence, overall },
strengths[], weaknesses[], priorityWeakness,
comparison (if second mock): { previousSessionId, deltas:{}, verdict },
recommendations[],
createdAt
```

### Metric (aggregated voice/camera metrics)
```
_id, sessionId (indexed), userId,
type (enum: speech/camera),
data (JSON — WPM, fillers, pauses, face presence, etc.),
createdAt
```

### ReadinessReport
```
_id, journeyId (indexed), userId, companyId,
overallScore (0-100),
roundScores[{roundType, score, details}],
formulaBreakdown: { resumeMatch, technical, aptitude, hr, projects, weights },
decision (enum: ready/not_ready),
reasons[], nextSteps[],
threshold, overridden (boolean),
createdAt
```

### Application (Job Tracker)
```
_id, userId (indexed), companyId, role,
status (enum: wishlist/applied/screening/interview/offer/rejected/accepted),
jdId, tailoredResumeId, coverLetter,
notes, appliedDate, nextActionDate,
source, createdAt, updatedAt
```

### CoachThread
```
_id, userId (indexed), messages[{role, content, sources[], timestamp}],
topic, createdAt, updatedAt
```

### FeedbackVote
```
_id, userId, targetType (enum: company/round/question/resource),
targetId, vote (enum: correct/incorrect/helpful/not_helpful),
comment, createdAt
```

### Notification
```
_id, userId (indexed), type, title, message,
link, isRead, createdAt
```

### AuditLog
```
_id, userId (indexed), action, targetType, targetId,
details (JSON), ip, userAgent,
createdAt
```

### LLMCache
```
_id, promptHash (unique, indexed), provider, model,
promptVersion, input (JSON), output (JSON),
tokensUsed, latencyMs, createdAt, expiresAt (TTL index)
```

### QuotaUsage
```
_id, provider (indexed), date (indexed),
userId, tokensUsed, requestCount,
createdAt
```

---

## API Endpoints (Foundation)

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/health` | Health check with DB status |
| `GET` | `/api/docs` | Swagger UI |
| `POST` | `/api/seed` | Run seed script (dev only) |

All module-specific endpoints are defined in their respective phase files. This phase sets up the **pattern** (one sample CRUD module for reference).

### Sample Module (for reference pattern):
| Method | Path | Description |
|---|---|---|
| `GET` | `/api/skills` | List skills (paginated, filterable) |
| `GET` | `/api/skills/:id` | Get skill by ID |
| `POST` | `/api/skills` | Create skill (admin only) |
| `PUT` | `/api/skills/:id` | Update skill (admin only) |
| `DELETE` | `/api/skills/:id` | Delete skill (admin only) |

---

## Tests to Write

- Each model validates required fields
- Zod schemas reject invalid data
- ApiError returns correct HTTP status
- Pagination helper returns correct metadata
- Seed scripts run without errors
- Sample CRUD module: create, read, update, delete, list with pagination

---

## Acceptance Checklist

- [ ] All Mongoose models created with proper types and indexes
- [ ] Zod validation schemas for all models
- [ ] Layered architecture working (routes → controllers → services → repositories)
- [ ] Central error handler catches all errors, returns proper JSON
- [ ] Request logging shows method, path, status, duration
- [ ] Pagination/filter/sort works on list endpoints
- [ ] Swagger docs render at `/api/docs` and show all endpoints
- [ ] Seed scripts populate: skills taxonomy, sample companies, sample questions
- [ ] Unit tests pass for services layer
- [ ] No raw Mongoose queries in controllers (all go through repositories)

---

## Demo Steps for Viva

1. Open Swagger UI — show all endpoints and schemas
2. Run seed script — show data populated in MongoDB Atlas
3. Make API calls through Swagger — show pagination, filtering
4. Show error handling: invalid input, not found, etc.
5. Explain the layered architecture pattern

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| Schema changes in later phases | High | Design for flexibility; use `Mixed` type sparingly; version schemas |
| Atlas M0 storage limit (512 MB) | Low initially | Monitor with Atlas dashboard; schema designed for lean storage |
| O*NET/ESCO data format changes | Low | Download a snapshot; seed script uses local JSON file |
