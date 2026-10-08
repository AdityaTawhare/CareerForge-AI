/** All app route constants */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',

  ONBOARDING: '/onboarding',

  APP: '/app',
  DASHBOARD: '/app/dashboard',

  RESUME_HUB: '/app/resume',
  RESUME_UPLOAD: '/app/resume/upload',
  RESUME_BUILDER: '/app/resume/builder',
  RESUME_ANALYSIS: '/app/resume/analysis',

  PROFILE: '/app/profile',
  SKILL_PASSPORT: '/app/profile/passport',

  TARGET: '/app/target',
  JD_ANALYSIS: '/app/target/jd',
  COMPANY_DNA: '/app/target/company',

  GAP_REPORT: '/app/gap',
  READINESS_REPORT: '/app/gap/readiness',

  ROADMAP: '/app/roadmap',
  LEARNING_HUB: '/app/roadmap/learn',

  MOCK_SETUP: '/app/mock',
  MOCK_ROOM: '/app/mock/room',
  MOCK_FEEDBACK: '/app/mock/feedback',

  COMPARISON: '/app/improvement/compare',
  IMPROVEMENT_ROADMAP: '/app/improvement/roadmap',

  FINAL_READINESS: '/app/readiness',
  INTERVIEW_PLAN: '/app/readiness/plan',

  JOB_TRACKER: '/app/tracker',
  COACH_CHAT: '/app/coach',

  SETTINGS: '/app/settings',
  PRIVACY_CENTER: '/app/settings/privacy',

  MENTOR_DASHBOARD: '/mentor',
  ADMIN_DASHBOARD: '/admin',
} as const;

/** Sidebar navigation items */
export const NAV_ITEMS = [
  { label: 'Dashboard', href: ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
  { label: 'Resume', href: ROUTES.RESUME_HUB, icon: 'FileText' },
  { label: 'Profile', href: ROUTES.PROFILE, icon: 'User' },
  { label: 'Target', href: ROUTES.TARGET, icon: 'Target' },
  { label: 'Gap Report', href: ROUTES.GAP_REPORT, icon: 'BarChart2' },
  { label: 'Roadmap', href: ROUTES.ROADMAP, icon: 'Map' },
  { label: 'Mock Interview', href: ROUTES.MOCK_SETUP, icon: 'Mic' },
  { label: 'Job Tracker', href: ROUTES.JOB_TRACKER, icon: 'Briefcase' },
  { label: 'AI Coach', href: ROUTES.COACH_CHAT, icon: 'MessageSquare' },
] as const;

/** Journey steps for the JourneyProgressBar */
export const JOURNEY_STEPS = [
  { id: 'resume',   label: 'Resume',    href: ROUTES.RESUME_HUB },
  { id: 'profile',  label: 'Profile',   href: ROUTES.PROFILE },
  { id: 'target',   label: 'Target',    href: ROUTES.TARGET },
  { id: 'gap',      label: 'Gap Report',href: ROUTES.GAP_REPORT },
  { id: 'roadmap',  label: 'Roadmap',   href: ROUTES.ROADMAP },
  { id: 'mock',     label: 'Mock',      href: ROUTES.MOCK_SETUP },
  { id: 'ready',    label: 'Ready',     href: ROUTES.FINAL_READINESS },
] as const;
