import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import styles from './Auth.module.css';

export default function Login() {
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
          <blockquote className={styles.quote}>
            "I went from 0 structured prep to a Google offer in 8 weeks. CareerForge showed me exactly what to fix."
          </blockquote>
          <cite className={styles.citeAuthor}>— Priya Sharma, BITS Pilani → Google L4</cite>
        </div>
      </div>

      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.form}>
          <h1 className={styles.heading}>Welcome back</h1>
          <p className={styles.subheading}>Sign in to continue your preparation journey.</p>

          <div className={styles.fields}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Email</span>
              <div className={styles.inputWrap}>
                <Mail size={16} className={styles.inputIcon} />
                <input id="login-email" className={styles.input} type="email" placeholder="you@college.edu" autoComplete="email" />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Password</span>
              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.inputIcon} />
                <input
                  id="login-password"
                  className={styles.input}
                  type={showPwd ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
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

          <Link to={ROUTES.SIGNUP} className={styles.forgotLink} style={{ alignSelf: 'flex-end' }}>
            Forgot password?
          </Link>

          <button id="login-submit" className={styles.submitBtn}>
            Sign in <ArrowRight size={16} />
          </button>

          <p className={styles.switchText}>
            Don't have an account?{' '}
            <Link to={ROUTES.SIGNUP} className={styles.switchLink}>Create one free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
