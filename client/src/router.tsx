import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import AppShell from '@/components/layout/AppShell';

// Public pages
import Landing from '@/pages/Landing';
import NotFound from '@/pages/errors/NotFound';

// Auth pages
import Login from '@/pages/auth/Login';
import Signup from '@/pages/auth/Signup';

// App pages
import Dashboard from '@/pages/dashboard/Dashboard';
import OnboardingWizard from '@/pages/onboarding/OnboardingWizard';

// Resume
import ResumeHub from '@/pages/resume/ResumeHub';
import ResumeUpload from '@/pages/resume/ResumeUpload';
import ResumeBuilder from '@/pages/resume/ResumeBuilder';
import ResumeAnalysis from '@/pages/resume/ResumeAnalysis';

// Profile
import StudentProfile from '@/pages/profile/StudentProfile';
import SkillPassport from '@/pages/profile/SkillPassport';

// Target
import TargetSelection from '@/pages/target/TargetSelection';
import JDAnalysis from '@/pages/target/JDAnalysis';
import CompanyDNA from '@/pages/target/CompanyDNA';

// Gap
import GapReport from '@/pages/gap/GapReport';
import ReadinessReport from '@/pages/gap/ReadinessReport';

// Roadmap
import RoadmapView from '@/pages/roadmap/RoadmapView';
import LearningHub from '@/pages/roadmap/LearningHub';

// Mock
import MockSetup from '@/pages/mock/MockSetup';
import MockRoom from '@/pages/mock/MockRoom';
import MockFeedback from '@/pages/mock/MockFeedback';

// Improvement
import Comparison from '@/pages/improvement/Comparison';
import ImprovementRoadmap from '@/pages/improvement/ImprovementRoadmap';

// Readiness
import FinalReadiness from '@/pages/readiness/FinalReadiness';
import InterviewPlan from '@/pages/readiness/InterviewPlan';

// Other
import JobTracker from '@/pages/tracker/JobTracker';
import CoachChat from '@/pages/coach/CoachChat';
import Settings from '@/pages/settings/Settings';
import PrivacyCenter from '@/pages/settings/PrivacyCenter';
import MentorDashboard from '@/pages/mentor/MentorDashboard';
import AdminDashboard from '@/pages/admin/AdminDashboard';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />

        {/* App shell — all app pages nested inside */}
        <Route path="/app" element={<AppShell showJourney />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="resume" element={<ResumeHub />} />
          <Route path="resume/upload" element={<ResumeUpload />} />
          <Route path="resume/builder" element={<ResumeBuilder />} />
          <Route path="resume/analysis" element={<ResumeAnalysis />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="profile/passport" element={<SkillPassport />} />
          <Route path="target" element={<TargetSelection />} />
          <Route path="target/jd" element={<JDAnalysis />} />
          <Route path="target/company" element={<CompanyDNA />} />
          <Route path="gap" element={<GapReport />} />
          <Route path="gap/readiness" element={<ReadinessReport />} />
          <Route path="roadmap" element={<RoadmapView />} />
          <Route path="roadmap/learn" element={<LearningHub />} />
          <Route path="mock" element={<MockSetup />} />
          <Route path="mock/room" element={<MockRoom />} />
          <Route path="mock/feedback" element={<MockFeedback />} />
          <Route path="improvement/compare" element={<Comparison />} />
          <Route path="improvement/roadmap" element={<ImprovementRoadmap />} />
          <Route path="readiness" element={<FinalReadiness />} />
          <Route path="readiness/plan" element={<InterviewPlan />} />
          <Route path="tracker" element={<JobTracker />} />
          <Route path="coach" element={<CoachChat />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/privacy" element={<PrivacyCenter />} />
        </Route>

        {/* Mentor / Admin (no app shell journey bar) */}
        <Route path="/mentor" element={<AppShell />}>
          <Route index element={<MentorDashboard />} />
        </Route>
        <Route path="/admin" element={<AppShell />}>
          <Route index element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
