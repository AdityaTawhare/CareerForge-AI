# Phase 02 — Design System, UI Shell & Wireframes

> **Priority:** [M] MUST  
> **Owner:** A (Frontend & UI/UX lead)  
> **Parallel:** Can be done in parallel with Phase 3 (B works on API)  
> **Estimated effort:** Large (4–5 days)  
> **Status:** NOT STARTED

---

## Objective

Build the complete design system, app shell (sidebar, top bar, command palette, Journey Progress Bar), all reusable components, landing page, and wireframes for every key screen. Get team approval on wireframes before building full pages. The result is a **clickable mock-data prototype** that looks professional.

---

## Detailed Task List

1. Install and configure Tailwind CSS with custom theme tokens from `DESIGN_SYSTEM.md`
2. Set up shadcn/ui (init, configure components directory)
3. Install Framer Motion, Lucide React, Recharts, React Flow
4. Configure light/dark theme with `next-themes` or custom Zustand store + CSS variables
5. Set up Google Fonts: Inter (+ JetBrains Mono for code)
6. Create base layout components:
   - `AppShell` — sidebar + top bar + main content area
   - `Sidebar` — collapsible (240px ↔ 64px), navigation links with icons, active state
   - `TopBar` — breadcrumbs, command palette trigger (Ctrl+K), notifications bell, user avatar dropdown
   - `CommandPalette` — using shadcn Command component
   - `JourneyProgressBar` — horizontal stepper showing journey states
7. Create reusable components:
   - `ScoreRing` — circular progress with animated fill, score number, color-coded
   - `RadarChart` — 6-axis skill radar using Recharts
   - `GaugeChart` — semicircular readiness gauge
   - `HeatmapGrid` — skill gap heatmap (grid of colored cells)
   - `TimelineView` — vertical/horizontal timeline for roadmap
   - `KanbanBoard` — draggable columns for job tracker
   - `DeltaBars` — before/after comparison with green (improved) / red (declined)
   - `StreakCalendar` — GitHub-style contribution grid
   - `SourceChip` — badge showing source name + confidence level
   - `EmptyState` — illustration + title + description + CTA button
   - `ErrorState` — error icon + message + retry button
   - `SkeletonCard` — loading placeholder with shimmer animation
   - `StatCard` — number + label + trend indicator
   - `StepWizard` — multi-step form container with step indicators
8. Create page layout templates:
   - `DashboardLayout` — grid of cards
   - `ReportLayout` — scrollable report with sections
   - `FormLayout` — centered form with sidebar navigation
9. Build the **Landing Page**:
   - Hero section with animated journey visualization
   - Feature sections (6 key features with icons)
   - "How it works" (3–4 steps)
   - Privacy promise section
   - Demo video/GIF placeholder
   - Call to action (Sign up free)
   - Footer with links
10. Set up React Router with all routes (pages as placeholder components)
11. Create low-fidelity wireframes (Mermaid or simple HTML) for:
    - Dashboard, Resume hub, Resume analysis, Student profile
    - Target selection, JD analysis, Company DNA page
    - Gap report, Readiness report, Roadmap view
    - Mock setup, Mock interview room, Mock feedback
    - Comparison (Mock 1 vs 2), Job tracker, Coach chat
    - Settings, Mentor dashboard, Admin dashboard
12. **Get team approval on wireframes** before proceeding
13. Build all pages as **mock-data prototypes** with hardcoded sample data
14. Ensure responsive design (mobile + tablet + desktop)
15. Run Lighthouse accessibility audit — target ≥ 90

---

## Files/Folders to Create

```
client/src/
├─ styles/
│  └─ globals.css           # Tailwind + CSS variables
├─ lib/
│  ├─ utils.ts              # cn() helper, etc.
│  └─ constants.ts          # Route paths, config
├─ hooks/
│  ├─ useTheme.ts
│  └─ useKeyboardShortcut.ts
├─ components/
│  ├─ ui/                   # shadcn/ui components
│  ├─ layout/
│  │  ├─ AppShell.tsx
│  │  ├─ Sidebar.tsx
│  │  ├─ TopBar.tsx
│  │  ├─ CommandPalette.tsx
│  │  └─ JourneyProgressBar.tsx
│  ├─ charts/
│  │  ├─ ScoreRing.tsx
│  │  ├─ RadarChart.tsx
│  │  ├─ GaugeChart.tsx
│  │  ├─ HeatmapGrid.tsx
│  │  └─ DeltaBars.tsx
│  ├─ common/
│  │  ├─ EmptyState.tsx
│  │  ├─ ErrorState.tsx
│  │  ├─ SkeletonCard.tsx
│  │  ├─ StatCard.tsx
│  │  ├─ SourceChip.tsx
│  │  ├─ StreakCalendar.tsx
│  │  └─ StepWizard.tsx
│  └─ roadmap/
│     ├─ TimelineView.tsx
│     └─ KanbanBoard.tsx
├─ pages/
│  ├─ Landing.tsx
│  ├─ auth/
│  │  ├─ Login.tsx
│  │  └─ Signup.tsx
│  ├─ onboarding/
│  │  └─ OnboardingWizard.tsx
│  ├─ dashboard/
│  │  └─ Dashboard.tsx
│  ├─ resume/
│  │  ├─ ResumeHub.tsx
│  │  ├─ ResumeUpload.tsx
│  │  ├─ ResumeBuilder.tsx
│  │  └─ ResumeAnalysis.tsx
│  ├─ profile/
│  │  ├─ StudentProfile.tsx
│  │  └─ SkillPassport.tsx
│  ├─ target/
│  │  ├─ TargetSelection.tsx
│  │  ├─ JDAnalysis.tsx
│  │  └─ CompanyDNA.tsx
│  ├─ gap/
│  │  ├─ GapReport.tsx
│  │  └─ ReadinessReport.tsx
│  ├─ roadmap/
│  │  ├─ RoadmapView.tsx
│  │  └─ LearningHub.tsx
│  ├─ mock/
│  │  ├─ MockSetup.tsx
│  │  ├─ MockRoom.tsx
│  │  └─ MockFeedback.tsx
│  ├─ improvement/
│  │  ├─ ImprovementRoadmap.tsx
│  │  └─ Comparison.tsx
│  ├─ readiness/
│  │  ├─ FinalReadiness.tsx
│  │  └─ InterviewPlan.tsx
│  ├─ tracker/
│  │  └─ JobTracker.tsx
│  ├─ coach/
│  │  └─ CoachChat.tsx
│  ├─ settings/
│  │  ├─ Settings.tsx
│  │  └─ PrivacyCenter.tsx
│  ├─ mentor/
│  │  └─ MentorDashboard.tsx
│  ├─ admin/
│  │  ├─ AdminDashboard.tsx
│  │  ├─ CompanyKBEditor.tsx
│  │  └─ QuestionBankReview.tsx
│  └─ errors/
│     └─ NotFound.tsx
├─ router.tsx
└─ mock-data/                # Hardcoded sample data for prototyping
   ├─ sampleProfile.ts
   ├─ sampleCompany.ts
   ├─ sampleGapReport.ts
   ├─ sampleRoadmap.ts
   └─ sampleMockResults.ts
```

---

## Data Models

None (UI only). Uses mock data objects that mirror the schemas from Phase 3.

---

## API Endpoints

None (mock data only).

---

## UI Screens and States

Every screen must implement all four states:
| State | Implementation |
|---|---|
| **Loading** | Skeleton components with shimmer animation |
| **Empty** | EmptyState component with illustration + CTA |
| **Error** | ErrorState component with retry button |
| **Success** | Actual content with data |

### Key screen descriptions:

**Dashboard:** Journey progress bar at top, "Next best action" card (prominent), stat cards (readiness score, skills mastered, mocks completed, streak), recent activity feed, quick links to resume/roadmap/mock.

**Resume Hub:** Resume cards (versions) with preview thumbnails, upload button, builder button, each card shows ATS score badge.

**Gap Report:** Radar chart (skills), heatmap (rounds × topics), gap list with severity color-coding, "Start Roadmap" CTA.

**Roadmap View:** React Flow graph showing topic dependencies + timeline view with daily/weekly tasks, progress bars per track.

**Mock Room:** Split view — question panel (left) + answer area (right, text/voice), timer, question counter, submit button.

**Comparison:** Side-by-side Mock 1 vs Mock 2 delta bars per skill, overall verdict badge (Improved/Not Improved/Mixed).

---

## AI Prompts / Schemas

None for this phase.

---

## External Keys/Data Needed

None.

---

## Tests to Write

- All components render without crashing (React Testing Library)
- Theme toggle switches between light and dark
- Sidebar collapses and expands
- Command palette opens on Ctrl+K
- Journey progress bar shows correct active state
- Router navigates to all pages
- Landing page renders all sections
- Responsive: key pages render correctly at 375px, 768px, 1280px

---

## Acceptance Checklist

- [ ] Tailwind theme matches `DESIGN_SYSTEM.md` tokens
- [ ] Light and dark theme work with smooth transition
- [ ] App shell (sidebar + top bar + breadcrumbs) works on all pages
- [ ] Command palette opens with Ctrl+K
- [ ] Journey Progress Bar component shows states correctly
- [ ] All custom components render with mock data (ScoreRing, RadarChart, etc.)
- [ ] Landing page looks professional — would not be mistaken for a "student project"
- [ ] All key screens have placeholder pages with mock data
- [ ] All screens have loading, empty, error, and success states
- [ ] Responsive: works on mobile (375px) and desktop (1280px+)
- [ ] Lighthouse accessibility score ≥ 90
- [ ] Wireframes approved by team before full page builds
- [ ] Framer Motion animations are subtle and respect reduce-motion

---

## Demo Steps for Viva

1. Show landing page on desktop and mobile
2. Toggle light/dark theme
3. Navigate through all pages using sidebar
4. Use Ctrl+K command palette to jump to a page
5. Show the Journey Progress Bar changing states
6. Show responsive design on different screen sizes
7. Show charts and data visualizations with mock data

---

## Risks and Fallback

| Risk | Likelihood | Mitigation |
|---|---|---|
| shadcn/ui version compatibility issues | Low | Pin versions; check docs for Vite setup |
| Too many pages to build in one phase | Medium | Split into 2a (shell + components + landing) and 2b (all pages). Prioritize dashboard, resume, gap, mock screens first |
| Chart libraries API changes | Low | Pin recharts and react-flow versions |
| Lighthouse score below 90 | Medium | Focus on color contrast, alt texts, labels, heading hierarchy |
