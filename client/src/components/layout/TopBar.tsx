import { useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Sun, Moon, Bell, Search, Menu } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import CommandPalette from './CommandPalette';
import styles from './TopBar.module.css';

interface TopBarProps {
  onMenuClick?: () => void;
}

/** Generate breadcrumb labels from pathname */
function useBreadcrumbs() {
  const { pathname } = useLocation();
  const parts = pathname.replace('/app/', '').split('/').filter(Boolean);
  return parts.map((part, i) => ({
    label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
    href:  '/app/' + parts.slice(0, i + 1).join('/'),
    isLast: i === parts.length - 1,
  }));
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { isDark, toggleTheme } = useTheme();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const breadcrumbs = useBreadcrumbs();

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  useKeyboardShortcut('k', openPalette, { ctrlKey: true });

  return (
    <>
      <header className={styles.topbar} role="banner">
        {/* Mobile hamburger */}
        <button
          className={styles.menuBtn}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumbs */}
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <span className={styles.breadcrumbHome}>CareerForge</span>
          {breadcrumbs.map(({ label, isLast }) => (
            <span key={label}>
              <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
              <span className={isLast ? styles.breadcrumbCurrent : styles.breadcrumbLink}>
                {label}
              </span>
            </span>
          ))}
        </nav>

        <div className={styles.actions}>
          {/* Command palette trigger */}
          <button
            id="cmd-palette-trigger"
            className={styles.searchBtn}
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette (Ctrl+K)"
          >
            <Search size={16} />
            <span className={styles.searchLabel}>Search…</span>
            <kbd className={styles.kbd}>Ctrl K</kbd>
          </button>

          {/* Notifications */}
          <button className={styles.iconBtn} aria-label="View notifications">
            <Bell size={20} />
            <span className={styles.notifDot} aria-hidden="true" />
          </button>

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Avatar */}
          <button className={styles.avatar} aria-label="Open user menu">
            <span aria-hidden="true">AM</span>
          </button>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  );
}
