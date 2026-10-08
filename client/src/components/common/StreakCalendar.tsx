import styles from './StreakCalendar.module.css';

interface Props {
  /** Array of ISO date strings that have activity */
  activeDates?: string[];
  weeks?: number;
}

function getDatesGrid(weeks: number) {
  const today = new Date();
  const days: Date[] = [];
  const start = new Date(today);
  start.setDate(start.getDate() - weeks * 7 + 1);
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StreakCalendar({ activeDates = [], weeks = 12 }: Props) {
  const days = getDatesGrid(weeks);
  const activeSet = new Set(activeDates);

  // Group into columns (weeks)
  const cols: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    cols.push(days.slice(i, i + 7));
  }

  return (
    <div className={styles.wrapper} aria-label="Activity calendar">
      {/* Day labels */}
      <div className={styles.dayLabels}>
        {DAYS.map((d, i) => (
          <span key={d} className={styles.dayLabel}>{i % 2 === 1 ? d : ''}</span>
        ))}
      </div>

      {/* Grid */}
      <div className={styles.grid}>
        {cols.map((col, ci) => (
          <div key={ci} className={styles.col}>
            {col.map(date => {
              const iso = date.toISOString().slice(0, 10);
              const active = activeSet.has(iso);
              return (
                <div
                  key={iso}
                  className={[styles.cell, active ? styles.active : ''].join(' ')}
                  title={`${iso}${active ? ' — Active' : ''}`}
                  aria-label={`${iso}${active ? ', active' : ''}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
