import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        textAlign: 'center',
        padding: '40px 24px',
        background: 'var(--bg-primary)',
      }}
    >
      <span style={{ fontSize: '4rem' }}>🗺️</span>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Page Not Found</h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '320px' }}>
        This page doesn't exist yet. It's probably being built in an upcoming
        phase!
      </p>
      <Link
        to="/"
        style={{
          marginTop: '8px',
          padding: '10px 24px',
          background: 'var(--primary-600)',
          color: '#fff',
          borderRadius: 'var(--radius-md)',
          fontWeight: 500,
          fontSize: '0.875rem',
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
