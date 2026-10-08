import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { scoreToColor } from '@/lib/utils';
import styles from './ScoreRing.module.css';

interface Props {
  score: number;       // 0–100
  size?: number;       // px, default 120
  strokeWidth?: number; // default 8
  label?: string;
  sublabel?: string;
  animate?: boolean;
}

export default function ScoreRing({
  score,
  size = 120,
  strokeWidth = 8,
  label,
  sublabel,
  animate = true,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;
  const color = scoreToColor(score);

  const motionOffset = useMotionValue(circumference);
  const springOffset = useSpring(motionOffset, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (animate) {
      setTimeout(() => motionOffset.set(targetOffset), 100);
    } else {
      motionOffset.set(targetOffset);
    }
  }, [score, animate, targetOffset, motionOffset]);

  return (
    <div className={styles.ring} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`Score: ${score} out of 100`}
        role="img"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />
        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? springOffset : targetOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      {/* Center text */}
      <div className={styles.center}>
        <span className={styles.score} style={{ color }}>
          {score}
        </span>
        {label && <span className={styles.label}>{label}</span>}
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>
    </div>
  );
}
