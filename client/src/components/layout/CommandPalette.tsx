import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, LayoutDashboard, FileText, User, Target, BarChart2, Map, Mic, Briefcase, MessageSquare, Settings, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import styles from './CommandPalette.module.css';

const commands = [
  { label: 'Dashboard',      href: ROUTES.DASHBOARD,   icon: LayoutDashboard, category: 'Navigate' },
  { label: 'Resume Hub',     href: ROUTES.RESUME_HUB,  icon: FileText,        category: 'Navigate' },
  { label: 'Profile',        href: ROUTES.PROFILE,     icon: User,            category: 'Navigate' },
  { label: 'Target Company', href: ROUTES.TARGET,      icon: Target,          category: 'Navigate' },
  { label: 'Gap Report',     href: ROUTES.GAP_REPORT,  icon: BarChart2,       category: 'Navigate' },
  { label: 'Roadmap',        href: ROUTES.ROADMAP,     icon: Map,             category: 'Navigate' },
  { label: 'Mock Interview', href: ROUTES.MOCK_SETUP,  icon: Mic,             category: 'Navigate' },
  { label: 'Job Tracker',    href: ROUTES.JOB_TRACKER, icon: Briefcase,       category: 'Navigate' },
  { label: 'AI Coach',       href: ROUTES.COACH_CHAT,  icon: MessageSquare,   category: 'Navigate' },
  { label: 'Settings',       href: ROUTES.SETTINGS,    icon: Settings,        category: 'Settings' },
];

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const filtered = commands.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useKeyboardShortcut('Escape', onClose);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[activeIdx]) {
      navigate(filtered[activeIdx].href);
      onClose();
    }
  };

  const handleSelect = (href: string) => {
    navigate(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            className={styles.dialog}
            role="dialog"
            aria-label="Command palette"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
          >
            {/* Search input */}
            <div className={styles.inputRow}>
              <Search size={18} className={styles.searchIcon} />
              <input
                ref={inputRef}
                id="command-palette-input"
                className={styles.input}
                placeholder="Search pages, actions…"
                value={query}
                onChange={e => { setQuery(e.target.value); setActiveIdx(0); }}
                onKeyDown={handleKeyDown}
                aria-autocomplete="list"
                aria-controls="command-list"
              />
              <kbd className={styles.esc}>Esc</kbd>
            </div>

            {/* Results */}
            <ul id="command-list" className={styles.list} role="listbox">
              {filtered.length === 0 && (
                <li className={styles.empty}>No results for "{query}"</li>
              )}
              {filtered.map((cmd, i) => (
                <li
                  key={cmd.href}
                  className={[styles.item, i === activeIdx ? styles.active : ''].join(' ')}
                  role="option"
                  aria-selected={i === activeIdx}
                  onClick={() => handleSelect(cmd.href)}
                  onMouseEnter={() => setActiveIdx(i)}
                >
                  <cmd.icon size={18} className={styles.itemIcon} />
                  <span className={styles.itemLabel}>{cmd.label}</span>
                  <span className={styles.itemCategory}>{cmd.category}</span>
                  {i === activeIdx && <ArrowRight size={14} className={styles.arrow} />}
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <span><kbd>↑↓</kbd> Navigate</span>
              <span><kbd>↵</kbd> Select</span>
              <span><kbd>Esc</kbd> Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
