'use client';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '40px', paddingBottom: '40px', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1.1rem', color: '#f4f4f8', letterSpacing: '-0.02em' }}>
          Ahmed Ashraf
        </span>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#475569' }}>
          © {new Date().getFullYear()} · Designed &amp; built with Next.js, GSAP &amp; Framer Motion
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.7)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#475569' }}>Available for opportunities</span>
        </div>
      </div>
    </footer>
  );
}
