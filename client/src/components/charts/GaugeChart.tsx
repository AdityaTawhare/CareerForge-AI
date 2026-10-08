import styles from './GaugeChart.module.css';

interface Props {
  score: number;   // 0–100
  size?: number;   // px, default 160
  label?: string;
}

export default function GaugeChart({ score, size = 160, label = 'Readiness' }: Props) {
  const angle = -135 + (score / 100) * 270; // -135° to +135°

  const getColor = () => {
    if (score >= 80) return 'var(--color-success)';
    if (score >= 60) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const r = size * 0.38;
  const cx = size / 2;
  const cy = size * 0.58;

  // Arc from -135° to +135°
  const arcPath = (pct: number) => {
    const startAngle = -135 * (Math.PI / 180);
    const endAngle = (-135 + pct * 270) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = pct > 0.5 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  return (
    <div className={styles.gauge} style={{ width: size, height: size * 0.7 }}>
      <svg width={size} height={size * 0.7} viewBox={`0 0 ${size} ${size * 0.7}`} aria-label={`${label}: ${score} out of 100`} role="img">
        {/* Track */}
        <path
          d={arcPath(1)}
          fill="none"
          stroke="var(--border)"
          strokeWidth={size * 0.06}
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={arcPath(score / 100)}
          fill="none"
          stroke={getColor()}
          strokeWidth={size * 0.06}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 0.5s ease' }}
        />
        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={cx + (r - size * 0.08) * Math.cos((angle - 90) * (Math.PI / 180))}
          y2={cy + (r - size * 0.08) * Math.sin((angle - 90) * (Math.PI / 180))}
          stroke="var(--text-primary)"
          strokeWidth={2}
          strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px`, transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)' }}
        />
        <circle cx={cx} cy={cy} r={size * 0.03} fill="var(--text-primary)" />
      </svg>

      <div className={styles.text}>
        <span className={styles.score} style={{ color: getColor() }}>{score}</span>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
