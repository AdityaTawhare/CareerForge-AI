import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import JourneyProgressBar from './JourneyProgressBar';
import styles from './AppShell.module.css';

interface Props {
  /** Whether to show the journey progress bar (journey pages only) */
  showJourney?: boolean;
  completedSteps?: string[];
}

export default function AppShell({ showJourney = false, completedSteps }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content area */}
      <div
        className={styles.main}
        style={{ marginLeft: collapsed ? 64 : 240 }}
      >
        <TopBar onMenuClick={() => setMobileOpen(o => !o)} />
        {showJourney && <JourneyProgressBar completedSteps={completedSteps} />}
        <main className={styles.content} id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
