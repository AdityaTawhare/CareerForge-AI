import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Flame, Trophy, Mic, TrendingUp,
  FileText, Map, Zap, Clock
} from 'lucide-react';
import StatCard from '@/components/common/StatCard';
import ScoreRing from '@/components/charts/ScoreRing';
import StreakCalendar from '@/components/common/StreakCalendar';
import { sampleProfile } from '@/mock-data/sampleProfile';
import { ROUTES } from '@/lib/constants';
import styles from './Dashboard.module.css';

// Generate last 30 days of activity
const activeDates = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() - i * 2);
  return d.toISOString().slice(0, 10);
});

const recentActivity = [
  { type: 'mock',    text: 'Completed Mock Interview — Google Tech Round 1', time: '2 hours ago',   icon: Mic },
  { type: 'study',  text: 'Studied Graphs (BFS/DFS) — 45 min session',       time: '5 hours ago',   icon: Map },
  { type: 'resume', text: 'Resume updated — Added Razorpay internship',       time: 'Yesterday',     icon: FileText },
  { type: 'score',  text: 'Readiness score improved: 58 → 72',                time: '2 days ago',    icon: TrendingUp },
];

const quickLinks = [
  { label: 'Upload Resume',    href: ROUTES.RESUME_UPLOAD,  icon: FileText, color: 'var(--primary-500)' },
  { label: 'Start Mock',       href: ROUTES.MOCK_SETUP,     icon: Mic,      color: 'var(--accent-500)'  },
  { label: 'View Roadmap',     href: ROUTES.ROADMAP,        icon: Map,      color: 'var(--color-warning)' },
  { label: 'Gap Report',       href: ROUTES.GAP_REPORT,     icon: TrendingUp, color: 'var(--color-success)' },
];

export default function Dashboard() {
  const p = sampleProfile;

  return (
    <div className={styles.page}>
      {/* Header */}
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h1 className={styles.greeting}>Good evening, {p.name.split(' ')[0]} 👋</h1>
          <p className={styles.subtext}>You're on a {p.streak}-day streak. Keep going!</p>
        </div>
        <Link to={ROUTES.MOCK_SETUP} className={styles.ctaBtn} id="dashboard-start-mock">
          <Zap size={16} />
          Start today's mock
        </Link>
      </motion.div>

      {/* Next best action */}
      <motion.div
        className={styles.nextAction}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <div className={styles.nextActionIcon}><Zap size={20} /></div>
        <div className={styles.nextActionContent}>
          <span className={styles.nextActionLabel}>Next best action</span>
          <span className={styles.nextActionText}>
            Practice System Design — URL Shortener (your weakest area for Google)
          </span>
        </div>
        <Link to={ROUTES.ROADMAP} className={styles.nextActionCta}>
          Start <ArrowRight size={14} />
        </Link>
      </motion.div>

      {/* Stat cards */}
      <div className={styles.statsGrid}>
        {[
          { label: 'Readiness Score',  value: `${p.readinessScore}%`, trend: 14, icon: <TrendingUp size={16} />, color: 'var(--color-warning)' },
          { label: 'Mocks Completed',  value: p.mocksCompleted,       trend: 2,  icon: <Mic size={16} />,       color: 'var(--accent-500)'  },
          { label: 'Day Streak',        value: `${p.streak} 🔥`,       trend: 5,  icon: <Flame size={16} />,     color: 'var(--color-error)'  },
          { label: 'Skills Mastered',  value: '4 / 8',                trend: 1,  icon: <Trophy size={16} />,    color: 'var(--color-success)' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + i * 0.05 }}
          >
            <StatCard {...s} trendLabel="this week" />
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className={styles.mainGrid}>
        {/* Readiness ring + target */}
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className={styles.cardTitle}>Overall Readiness</h2>
          <div className={styles.readinessRow}>
            <ScoreRing score={p.readinessScore} size={120} label="Score" />
            <div className={styles.readinessMeta}>
              <div className={styles.targetBadge}>🎯 Google — SDE L4</div>
              <p className={styles.readinessNote}>
                You're 28 points below the benchmark for Tech Round 1.
                Focus on System Design and OS Internals.
              </p>
              <Link to={ROUTES.GAP_REPORT} className={styles.linkBtn}>
                See gap report <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Skill bars */}
          <div className={styles.skillBars}>
            {p.skills.slice(0, 5).map(s => (
              <div key={s.name} className={styles.skillRow}>
                <span className={styles.skillName}>{s.name}</span>
                <div className={styles.skillTrack}>
                  <motion.div
                    className={styles.skillFill}
                    style={{ background: s.level >= 75 ? 'var(--color-success)' : s.level >= 55 ? 'var(--color-warning)' : 'var(--color-error)' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${s.level}%` }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  />
                </div>
                <span className={styles.skillScore}>{s.level}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity feed + streak */}
        <div className={styles.sideCol}>
          {/* Streak */}
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <div className={styles.cardTitleRow}>
              <h2 className={styles.cardTitle}>Activity Streak</h2>
              <span className={styles.streakCount}>
                <Flame size={14} style={{ color: 'var(--color-error)' }} />
                {p.streak} days
              </span>
            </div>
            <StreakCalendar activeDates={activeDates} weeks={10} />
          </motion.div>

          {/* Recent activity */}
          <motion.div
            className={styles.card}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className={styles.cardTitle}>Recent Activity</h2>
            <div className={styles.activityList}>
              {recentActivity.map(({ text, time, icon: Icon }, i) => (
                <div key={i} className={styles.activityItem}>
                  <div className={styles.activityIcon}><Icon size={14} /></div>
                  <div className={styles.activityText}>
                    <span className={styles.activityMsg}>{text}</span>
                    <span className={styles.activityTime}>
                      <Clock size={11} /> {time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick links */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <h2 className={styles.sectionTitle}>Quick Access</h2>
        <div className={styles.quickLinks}>
          {quickLinks.map(({ label, href, icon: Icon, color }) => (
            <Link key={label} to={href} className={styles.quickLink}>
              <div className={styles.quickLinkIcon} style={{ background: `${color}18`, color }}>
                <Icon size={20} />
              </div>
              <span className={styles.quickLinkLabel}>{label}</span>
              <ArrowRight size={14} className={styles.quickLinkArrow} />
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
