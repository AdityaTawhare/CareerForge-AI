import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { JOURNEY_STEPS } from '@/lib/constants';
import styles from './JourneyProgressBar.module.css';

type StepStatus = 'done' | 'active' | 'upcoming';

interface Props {
  /** IDs of completed steps */
  completedSteps?: string[];
  /** Currently active step ID */
  activeStep?: string;
}

export default function JourneyProgressBar({ completedSteps = [], activeStep }: Props) {
  const { pathname } = useLocation();

  // Determine active step from current path if not provided
  const currentStepId = activeStep ?? (() => {
    const found = JOURNEY_STEPS.find(s => pathname.startsWith(s.href));
    return found?.id;
  })();

  const getStatus = (id: string): StepStatus => {
    if (completedSteps.includes(id)) return 'done';
    if (id === currentStepId) return 'active';
    return 'upcoming';
  };

  const activeIdx = JOURNEY_STEPS.findIndex(s => s.id === currentStepId);

  return (
    <nav className={styles.bar} aria-label="Journey progress">
      <ol className={styles.steps}>
        {JOURNEY_STEPS.map((step, i) => {
          const status = getStatus(step.id);
          const isCompleted = status === 'done';
          const isActive = status === 'active';

          return (
            <li key={step.id} className={styles.step}>
              {/* Connector line */}
              {i > 0 && (
                <div className={[styles.connector, isCompleted || i <= activeIdx ? styles.connectorFilled : ''].join(' ')}>
                  {i <= activeIdx && (
                    <motion.div
                      className={styles.connectorProgress}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    />
                  )}
                </div>
              )}

              <Link
                to={step.href}
                className={[
                  styles.stepLink,
                  isActive ? styles.active : '',
                  isCompleted ? styles.completed : '',
                ].join(' ')}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`${step.label} — ${status}`}
              >
                <span className={styles.stepIcon}>
                  {isCompleted ? (
                    <CheckCircle2 size={16} />
                  ) : isActive ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'flex' }}
                    >
                      <Loader2 size={16} />
                    </motion.span>
                  ) : (
                    <Circle size={16} />
                  )}
                </span>
                <span className={styles.stepLabel}>{step.label}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
