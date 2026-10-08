import { motion } from 'framer-motion';
import styles from './DeltaBars.module.css';

interface DeltaItem {
  name: string;
  before: number;
  after: number;
}

interface Props {
  items: DeltaItem[];
}

export default function DeltaBars({ items }: Props) {
  return (
    <div className={styles.list} role="list" aria-label="Before and after comparison">
      {items.map((item, i) => {
        const delta = item.after - item.before;
        const isImproved = delta > 0;
        const isDeclined = delta < 0;

        return (
          <div key={item.name} className={styles.item} role="listitem">
            <div className={styles.label}>{item.name}</div>

            <div className={styles.bars}>
              {/* Before */}
              <div className={styles.barRow}>
                <span className={styles.barLabel}>Before</span>
                <div className={styles.track}>
                  <motion.div
                    className={styles.barBefore}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.before}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                  />
                </div>
                <span className={styles.value}>{item.before}</span>
              </div>

              {/* After */}
              <div className={styles.barRow}>
                <span className={styles.barLabel}>After</span>
                <div className={styles.track}>
                  <motion.div
                    className={[styles.barAfter, isImproved ? styles.improved : isDeclined ? styles.declined : ''].join(' ')}
                    initial={{ width: 0 }}
                    animate={{ width: `${item.after}%` }}
                    transition={{ duration: 0.5, delay: i * 0.05 + 0.1 }}
                  />
                </div>
                <span className={styles.value}>{item.after}</span>
              </div>
            </div>

            {/* Delta badge */}
            <div className={[styles.delta, isImproved ? styles.deltaPos : isDeclined ? styles.deltaNeg : styles.deltaNeutral].join(' ')}>
              {isImproved ? '+' : ''}{delta}
            </div>
          </div>
        );
      })}
    </div>
  );
}
