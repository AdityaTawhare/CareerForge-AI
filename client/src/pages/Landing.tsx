import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Zap, ArrowRight, FileText, Target, BarChart2, Map, Mic, Star,
  Shield, ChevronRight, CheckCircle2, Sparkles,
  TrendingUp, Brain
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { ROUTES } from '@/lib/constants';
import styles from './Landing.module.css';

/* ── Animated counter ─────────────────────────────────────────────────────── */
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      setVal(Math.floor(start));
      if (start >= target) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [target]);
  return <>{val.toLocaleString()}{suffix}</>;
}

/* ── Feature card ─────────────────────────────────────────────────────────── */
function FeatureCard({ icon: Icon, title, desc, delay = 0, color = 'var(--primary-500)' }: {
  icon: React.ElementType; title: string; desc: string; delay?: number; color?: string;
}) {
  return (
    <motion.div
      className={styles.featureCard}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
    >
      <div className={styles.featureIcon} style={{ background: `${color}18`, color }}>
        <Icon size={24} />
      </div>
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureDesc}>{desc}</p>
    </motion.div>
  );
}

/* ── Step card ────────────────────────────────────────────────────────────── */
function StepCard({ n, title, desc, delay = 0 }: { n: number; title: string; desc: string; delay?: number }) {
  return (
    <motion.div
      className={styles.stepCard}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
    >
      <div className={styles.stepNum}>{n}</div>
      <div>
        <h3 className={styles.stepTitle}>{title}</h3>
        <p className={styles.stepDesc}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────────────────────── */
export default function Landing() {
  const { isDark, toggleTheme } = useTheme();
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ['rgba(0,0,0,0)', 'var(--bg-primary)']);

  const features = [
    { icon: FileText,   title: 'Resume Analysis',        desc: 'AI parses your resume and identifies strengths, gaps, and ATS score instantly.',               color: 'var(--primary-500)',    delay: 0     },
    { icon: Target,     title: 'Company-Specific Prep',  desc: 'Understand the exact topics, rounds, and patterns for your target company.',                   color: 'var(--accent-500)',     delay: 0.05  },
    { icon: BarChart2,  title: 'Gap Report & Heatmap',   desc: 'Visualise exactly where you stand vs. what companies expect with radar charts and heatmaps.',  color: 'var(--color-warning)',  delay: 0.1   },
    { icon: Map,        title: 'Placement Roadmap',       desc: 'Get a day-by-day, personalised roadmap built from your gaps — not a generic plan.',            color: 'var(--color-success)',  delay: 0.15  },
    { icon: Mic,        title: 'Mock Interviews',         desc: 'Round-wise mock interviews with AI feedback, behavioural coaching, and before/after comparison.',color: 'var(--color-info)',    delay: 0.2   },
    { icon: Brain,      title: 'AI Coach (RAG)',          desc: 'Ask anything. Get explainable, source-cited answers about your preparation journey.',           color: '#A855F7',               delay: 0.25  },
  ];

  return (
    <div className={styles.page} data-theme={isDark ? 'dark' : 'light'}>

      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <motion.nav className={styles.nav} style={{ backgroundColor: navBg }}>
        <div className={styles.navInner}>
          <Link to={ROUTES.HOME} className={styles.navLogo} aria-label="CareerForge AI home">
            <div className={styles.navLogoIcon}><Zap size={18} /></div>
            <span>CareerForge AI</span>
          </Link>
          <div className={styles.navLinks}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#how-it-works" className={styles.navLink}>How it works</a>
            <a href="#privacy" className={styles.navLink}>Privacy</a>
          </div>
          <div className={styles.navActions}>
            <button className={styles.themeBtn} onClick={toggleTheme} aria-label="Toggle theme">
              {isDark ? '☀' : '☾'}
            </button>
            <Link to={ROUTES.LOGIN} className={styles.loginLink}>Log in</Link>
            <Link to={ROUTES.SIGNUP} className={styles.ctaBtn}>
              Get started free <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        {/* Background gradient orbs */}
        <div className={styles.orb1} aria-hidden="true" />
        <div className={styles.orb2} aria-hidden="true" />

        <div className={styles.heroInner}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={styles.heroBadge}
          >
            <Sparkles size={12} />
            AI-powered · Company-specific · Explainable
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            From resume to{' '}
            <span className={styles.gradient}>interview-ready</span>
            <br />in 60 days.
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            CareerForge AI builds a personalised, company-specific placement roadmap from
            your resume — gap analysis, mock interviews, AI coaching, all in one place.
          </motion.p>

          <motion.div
            className={styles.heroCtas}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to={ROUTES.SIGNUP} className={styles.ctaBtnPrimary} id="hero-cta">
              Start for free — no credit card
              <ArrowRight size={16} />
            </Link>
            <a href="#how-it-works" className={styles.ctaBtnSecondary}>
              See how it works
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className={styles.socialProof}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill="var(--color-warning)" color="var(--color-warning)" aria-hidden="true" />
            ))}
            <span>Trusted by 200+ students at top colleges</span>
          </motion.div>

          {/* Hero visual — mock dashboard card */}
          <motion.div
            className={styles.heroCard}
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className={styles.heroCardHeader}>
              <div className={styles.windowDots} aria-hidden="true">
                <span /><span /><span />
              </div>
              <span className={styles.heroCardTitle}>CareerForge — Dashboard</span>
            </div>

            <div className={styles.heroCardBody}>
              {/* Readiness score */}
              <div className={styles.readinessBlock}>
                <div>
                  <div className={styles.readinessScore} style={{ color: 'var(--color-warning)' }}>72</div>
                  <div className={styles.readinessLabel}>Readiness Score</div>
                  <div className={styles.readinessSub}>Google SDE — Tech Round 1</div>
                </div>
                <div className={styles.readinessBadge}>
                  <TrendingUp size={12} />
                  +14 this week
                </div>
              </div>

              {/* Progress bars */}
              <div className={styles.progressList}>
                {[
                  { label: 'DSA',           pct: 85, color: 'var(--primary-500)' },
                  { label: 'System Design', pct: 55, color: 'var(--color-warning)' },
                  { label: 'Behavioural',   pct: 40, color: 'var(--color-error)' },
                ].map(({ label, pct, color }) => (
                  <div key={label} className={styles.progressItem}>
                    <span className={styles.progressLabel}>{label}</span>
                    <div className={styles.progressTrack}>
                      <motion.div
                        className={styles.progressFill}
                        style={{ background: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      />
                    </div>
                    <span className={styles.progressPct}>{pct}%</span>
                  </div>
                ))}
              </div>

              {/* Next action chip */}
              <div className={styles.nextAction}>
                <Zap size={14} style={{ color: 'var(--primary-500)' }} />
                <span><strong>Next: </strong>Practice System Design — URL Shortener (45 min)</span>
                <ChevronRight size={14} style={{ color: 'var(--text-muted)' }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className={styles.stats} aria-label="Key statistics">
        <div className={styles.container}>
          {[
            { label: 'Resumes analysed',    n: 1200, suffix: '+' },
            { label: 'Mock interviews done', n: 4800, suffix: '+' },
            { label: 'Avg readiness uplift', n: 28,  suffix: '%' },
            { label: 'Companies supported',  n: 50,  suffix: '+' },
          ].map(({ label, n, suffix }) => (
            <motion.div
              key={label}
              className={styles.statItem}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.statNumber}>
                <AnimatedNumber target={n} suffix={suffix} />
              </div>
              <div className={styles.statLabel}>{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section id="features" className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionBadge}>Features</span>
            <h2 className={styles.sectionTitle}>Everything you need to crack the interview</h2>
            <p className={styles.sectionDesc}>
              One platform that takes you from an unstructured resume to a company-ready candidate
              — with AI at every step.
            </p>
          </motion.div>

          <div className={styles.featureGrid}>
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section id="how-it-works" className={[styles.section, styles.sectionAlt].join(' ')}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.sectionBadge}>How it works</span>
            <h2 className={styles.sectionTitle}>Four steps to placement-ready</h2>
          </motion.div>

          <div className={styles.stepsGrid}>
            <StepCard n={1} title="Upload your resume" desc="Paste or upload your resume. Our parser extracts skills, experience, and projects in seconds." delay={0} />
            <StepCard n={2} title="Select target company & role" desc="Pick from 50+ companies. We load their interview patterns, round types, and expected skills." delay={0.08} />
            <StepCard n={3} title="Get your gap report + roadmap" desc="Receive a detailed gap report and a day-by-day preparation roadmap tailored to your profile." delay={0.16} />
            <StepCard n={4} title="Practice, mock, and track" desc="Do round-specific mock interviews, get AI feedback, track improvement, and know when you're ready." delay={0.24} />
          </div>
        </div>
      </section>

      {/* ── Privacy ─────────────────────────────────────────────────────── */}
      <section id="privacy" className={styles.section}>
        <div className={styles.container}>
          <motion.div
            className={styles.privacyCard}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className={styles.privacyIcon}><Shield size={28} /></div>
            <div>
              <h2 className={styles.privacyTitle}>Your data belongs to you</h2>
              <p className={styles.privacyDesc}>
                Your resume and interview data are encrypted, never sold, and never used to train
                models. Delete everything at any time from the Privacy Centre. We comply with
                Indian PDPB and GDPR standards.
              </p>
              <div className={styles.privacyBullets}>
                {['End-to-end encryption', 'No third-party sharing', 'Instant account deletion', 'Transparent AI outputs'].map(b => (
                  <span key={b} className={styles.privacyBullet}>
                    <CheckCircle2 size={14} /> {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className={[styles.section, styles.ctaSection].join(' ')}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaBlock}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={styles.ctaTitle}>Ready to start your placement journey?</h2>
            <p className={styles.ctaDesc}>Join 200+ students who are already preparing smarter, not harder.</p>
            <Link to={ROUTES.SIGNUP} className={styles.ctaBtnPrimary} id="bottom-cta">
              Create your free account <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>
                <div className={styles.navLogoIcon}><Zap size={16} /></div>
                <span>CareerForge AI</span>
              </div>
              <p className={styles.footerTagline}>Your personal AI career mentor.</p>
            </div>
            <div className={styles.footerLinks}>
              <div className={styles.footerCol}>
                <span className={styles.footerColTitle}>Product</span>
                <a href="#features">Features</a>
                <a href="#how-it-works">How it works</a>
                <Link to={ROUTES.SIGNUP}>Sign up</Link>
              </div>
              <div className={styles.footerCol}>
                <span className={styles.footerColTitle}>Legal</span>
                <a href="#privacy">Privacy policy</a>
                <a href="#privacy">Terms of use</a>
                <Link to={ROUTES.PRIVACY_CENTER}>Privacy centre</Link>
              </div>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2026 CareerForge AI. All rights reserved.</span>
            <div className={styles.footerSocial}>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer">GH</a>
              <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer">𝕏</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
