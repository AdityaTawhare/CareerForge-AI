import { motion } from 'framer-motion';
import { Construction } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
}

/**
 * Shared placeholder used by all Phase 2 stub pages.
 * Each page will be built out in its respective phase.
 */
export default function PlaceholderPage({ title, description }: Props) {
  return (
    <motion.div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 16, padding: '80px 24px', textAlign: 'center',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: 16, background: 'var(--bg-secondary)',
        border: '1px solid var(--border)', display: 'flex', alignItems: 'center',
        justifyContent: 'center', color: 'var(--text-muted)',
      }}>
        <Construction size={28} />
      </div>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{title}</h1>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: 400, lineHeight: 1.7, margin: 0 }}>
        {description ?? 'This page will be built in its respective phase. The design system, routing, and shell are all ready.'}
      </p>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px',
        background: 'var(--primary-50)', borderRadius: 999,
        fontSize: '0.8125rem', fontWeight: 500, color: 'var(--primary-600)',
      }}>
        🚧 Coming in next phase
      </div>
    </motion.div>
  );
}
