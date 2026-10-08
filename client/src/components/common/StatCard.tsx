import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import styles from './StatCard.module.css';

interface Props {
  label: string;
  value: string | number;
  trend?: number;       // +/- percentage change
  trendLabel?: string;
  icon?: React.ReactNode;
  color?: string;       // CSS color
}

export default function StatCard({ label, value, trend, trendLabel, icon, color }: Props) {
  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;

  return (
    <motion.div
      className={styles.card}
      whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.header}>
        <span className={styles.label}>{label}</span>
        {icon && (
          <div className={styles.icon} style={{ color: color ?? 'var(--primary-500)' }}>
            {icon}
          </div>
        )}
      </div>

      <div className={styles.value} style={{ color: color }}>
        {value}
      </div>

      {trend !== undefined && (
        <div className={[styles.trend, isPositive ? styles.positive : isNegative ? styles.negative : styles.neutral].join(' ')}>
          {isPositive ? <TrendingUp size={14} /> : isNegative ? <TrendingDown size={14} /> : <Minus size={14} />}
          <span>
            {isPositive ? '+' : ''}{trend}%
            {trendLabel && ` ${trendLabel}`}
          </span>
        </div>
      )}
    </motion.div>
  );
}
