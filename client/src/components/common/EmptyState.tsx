import { motion } from 'framer-motion';
import { Inbox } from 'lucide-react';
import styles from './EmptyState.module.css';

interface Props {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export default function EmptyState({ title, description, action, icon }: Props) {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
    >
      <div className={styles.icon} aria-hidden="true">
        {icon ?? <Inbox size={32} />}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.desc}>{description}</p>}
      {action && (
        <button className={styles.cta} onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
