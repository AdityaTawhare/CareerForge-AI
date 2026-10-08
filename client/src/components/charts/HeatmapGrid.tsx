import styles from './HeatmapGrid.module.css';

interface Props {
  rounds: string[];
  topics: string[];
  /** cells[roundIdx][topicIdx] = 0–1 coverage */
  cells: number[][];
}

function cellColor(value: number): string {
  if (value >= 0.8) return 'var(--color-success)';
  if (value >= 0.5) return 'var(--color-warning)';
  if (value > 0)   return 'var(--color-error)';
  return 'var(--bg-tertiary)';
}

function cellOpacity(value: number): number {
  return Math.max(0.15, value);
}

export default function HeatmapGrid({ rounds, topics, cells }: Props) {
  return (
    <div className={styles.wrapper} role="table" aria-label="Skill gap heatmap">
      {/* Header row */}
      <div className={styles.headerRow} role="row">
        <div className={styles.corner} role="columnheader" aria-label="Topic / Round" />
        {rounds.map(r => (
          <div key={r} className={styles.colHeader} role="columnheader">{r}</div>
        ))}
      </div>

      {/* Data rows (topics as rows, rounds as columns) */}
      {topics.map((topic, tIdx) => (
        <div key={topic} className={styles.row} role="row">
          <div className={styles.rowHeader} role="rowheader">{topic}</div>
          {rounds.map((_, rIdx) => {
            const v = cells[rIdx]?.[tIdx] ?? 0;
            return (
              <div
                key={rIdx}
                className={styles.cell}
                role="cell"
                style={{
                  background: cellColor(v),
                  opacity: cellOpacity(v),
                }}
                title={`${topic} in ${rounds[rIdx]}: ${Math.round(v * 100)}%`}
                aria-label={`${topic}, ${rounds[rIdx]}: ${Math.round(v * 100)}%`}
              />
            );
          })}
        </div>
      ))}

      {/* Legend */}
      <div className={styles.legend} aria-hidden="true">
        <span>Not covered</span>
        <div className={styles.legendBar}>
          <div className={styles.legendGrad} />
        </div>
        <span>Strong</span>
      </div>
    </div>
  );
}
