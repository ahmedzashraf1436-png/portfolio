'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const demoNames: Record<string, string> = {
  '/demo/ecommerce': 'E-Commerce Platform',
  '/demo/ticketing': 'IT Ticketing Dashboard',
  '/demo/inventory': 'Network Inventory Tracker',
  '/demo/data-viz': 'Data Visualisation Dashboard',
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const name = demoNames[pathname] ?? 'Demo';

  return (
    <>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: '52px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 28px',
        background: 'rgba(8,8,16,0.92)', backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <Link
          href="/#projects"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontFamily: 'var(--font-inter)', fontSize: '0.82rem',
            color: '#94a3b8', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#f4f4f8')}
          onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Portfolio
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            display: 'inline-block', padding: '2px 10px', borderRadius: '20px',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
            color: '#818cf8', letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>Live Demo</span>
        </div>

        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: '#475569',
          maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {name}
        </span>
      </div>

      <div style={{ paddingTop: '52px', minHeight: '100vh' }}>
        {children}
      </div>
    </>
  );
}
