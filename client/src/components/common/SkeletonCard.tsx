import styles from './SkeletonCard.module.css';

interface Props {
  lines?: number;
  showAvatar?: boolean;
  height?: string;
}

export default function SkeletonCard({ lines = 3, showAvatar = false, height }: Props) {
  return (
    <div className={styles.card} style={height ? { height } : undefined} aria-busy="true" aria-label="Loading…">
      {showAvatar && (
        <div className={styles.avatarRow}>
          <div className={[styles.shimmer, styles.avatar].join(' ')} />
          <div className={styles.avatarLines}>
            <div className={[styles.shimmer, styles.line, styles.lineMd].join(' ')} />
            <div className={[styles.shimmer, styles.line, styles.lineSm].join(' ')} />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={[styles.shimmer, styles.line, i === lines - 1 ? styles.lineShort : ''].join(' ')}
        />
      ))}
    </div>
  );
}
