import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, FileText, User, Target, BarChart2, Map,
  Mic, Briefcase, MessageSquare, Settings, ChevronLeft, Zap,
} from 'lucide-react';
import { ROUTES } from '@/lib/constants';
import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard',     href: ROUTES.DASHBOARD,    icon: LayoutDashboard },
  { label: 'Resume',        href: ROUTES.RESUME_HUB,   icon: FileText },
  { label: 'Profile',       href: ROUTES.PROFILE,      icon: User },
  { label: 'Target',        href: ROUTES.TARGET,       icon: Target },
  { label: 'Gap Report',    href: ROUTES.GAP_REPORT,   icon: BarChart2 },
  { label: 'Roadmap',       href: ROUTES.ROADMAP,      icon: Map },
  { label: 'Mock Interview',href: ROUTES.MOCK_SETUP,   icon: Mic },
  { label: 'Job Tracker',   href: ROUTES.JOB_TRACKER,  icon: Briefcase },
  { label: 'AI Coach',      href: ROUTES.COACH_CHAT,   icon: MessageSquare },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <motion.aside
      className={styles.sidebar}
      animate={{ width: collapsed ? 64 : 240 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon} aria-hidden="true">
          <Zap size={20} />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className={styles.logoText}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              CareerForge
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {navItems.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              [styles.navItem, isActive ? styles.active : ''].join(' ')
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={20} strokeWidth={1.75} className={styles.navIcon} aria-hidden="true" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  className={styles.navLabel}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15 }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Bottom — Settings + Collapse toggle */}
      <div className={styles.bottom}>
        <NavLink
          to={ROUTES.SETTINGS}
          className={({ isActive }) =>
            [styles.navItem, isActive ? styles.active : ''].join(' ')
          }
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={20} strokeWidth={1.75} className={styles.navIcon} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span className={styles.navLabel} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Settings
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>

        <button
          className={styles.collapseBtn}
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronLeft size={18} />
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
}
