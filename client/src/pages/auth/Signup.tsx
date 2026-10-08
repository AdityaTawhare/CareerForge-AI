import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import styles from './Auth.module.css';

export default function Signup() {
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brand}>
          <Link to={ROUTES.HOME} className={styles.logo}>
            <div className={styles.logoIcon}><Zap size={18} /></div>
            CareerForge AI
          </Link>
        </div>
        <div className={styles.quoteBlock}>
          <div className={styles.featureList}>
            {[
              'AI-powered gap analysis in minutes',
              'Company-specific preparation roadmap',
              'Round-wise mock interviews with feedback',
              '100% free — no credit card needed',
            ].map(f => (
              <div key={f} className={styles.featureItem}>
                <span className={styles.check}>✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.form}>
          <h1 className={styles.heading}>Create your account</h1>
          <p className={styles.subheading}>Start your placement journey in 60 seconds.</p>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Full name</span>
              <div className={styles.inputWrap}>
                <User size={16} className={styles.inputIcon} />
                <input id="signup-name" className={styles.input} type="text" placeholder="Arjun Mehta" autoComplete="name" />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>College email</span>
              <div className={styles.inputWrap}>
                <Mail size={16} className={styles.inputIcon} />
                <input id="signup-email" className={styles.input} type="email" placeholder="you@college.edu" autoComplete="email" />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Password</span>
              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  id="signup-password"
                  className={styles.input}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPwd(v => !v)}
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>
          </div>

          <p className={styles.terms}>
            By creating an account you agree to our{' '}
            <a href="#" className={styles.switchLink}>Terms</a> and{' '}
            <a href="#" className={styles.switchLink}>Privacy Policy</a>.
          </p>

          <button id="signup-submit" className={styles.submitBtn}>
            Create free account <ArrowRight size={16} />
          </button>

          <p className={styles.switchText}>
            Already have an account?{' '}
            <Link to={ROUTES.LOGIN} className={styles.switchLink}>Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
