'use client';
import { useReveal } from '@/hooks/useReveal';

const items = [
  {
    period: 'Aug 2025 — Present',
    role: 'Information Technology Help Desk',
    org: 'Raneen',
    location: 'Giza, Al Jizah, Egypt',
    type: 'Work · Full-time',
    highlight: null,
    points: [
      'Providing first and second-line IT support across all company branches',
      'Diagnosing and resolving hardware, software, and connectivity issues',
      'Managing user accounts, access control, and endpoint configurations',
      'Escalating and tracking complex issues through internal ticketing systems',
      'Supporting daily operations across retail branches in the Greater Cairo area',
    ],
    stack: ['IT Support', 'Help Desk', 'Endpoint Management', 'Active Directory', 'Troubleshooting'],
  },
  {
    period: 'May 2023 — May 2025',
    role: 'IT Specialist',
    org: 'Raneen',
    location: 'Giza, Al Jizah, Egypt',
    type: 'Work · Full-time · On-site',
    highlight: {
      icon: '🏆',
      text: 'Youngest employee to manage and launch a company project — led the rollout of Raneen\'s first-ever Smart Store at age 19, a milestone in the company\'s history.',
    },
    points: [
      'Managed IT infrastructure across 58+ retail branches nationwide',
      'Led system and hardware installation for new branch openings and upgrades',
      'Designed and executed onboarding/offboarding IT workflows, cutting setup time by ~40%',
      'Conducted quarterly network equipment audits across all branches',
      'Supported 200+ end-users with troubleshooting, maintenance, and training',
      'Maintained Aruba APs, HP PoE switches, Windows Server, and Active Directory environments',
      'Administered MS Dynamics AX ERP across operational and retail teams',
    ],
    stack: ['Windows Server', 'Active Directory', 'Aruba APs', 'HP Switches', 'MS Dynamics AX', 'LAN/WAN', 'VPN'],
  },
  {
    period: 'Jan 2021 — Present',
    role: 'Bachelor of Information Systems',
    org: 'Canadian International College',
    location: 'Cairo, Egypt',
    type: 'Education',
    highlight: null,
    points: [
      'Comprehensive study of networking, databases, and software engineering',
      'Technical Support Fundamentals — Google / Coursera — 97.50%',
      'Introduction to Artificial Intelligence — IBM / Coursera — 79.44%',
      'Share Data Through the Art of Visualization — IBM / Coursera — 83.77%',
    ],
    stack: ['Networking', 'Databases', 'Web Development', 'Data Analysis', 'AI Fundamentals'],
  },
];

export default function Experience() {
  const sectionRef = useReveal();

  return (
    <section
      id="experience"
      className="section"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(0,0,0,0.2)' }}
    >
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '72px' }}>
          <span className="label" style={{ marginBottom: '16px' }}>Background</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>Experience &amp; education</h2>
        </div>

        {/* Cards */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {items.map((item, i) => (
            <div key={i} className="glass-card exp-card">

              {/* Type badge */}
              <span className="label exp-badge">{item.type}</span>

              <div className="exp-grid">

                {/* Left: period */}
                <div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#475569', letterSpacing: '0.04em', lineHeight: 1.5, display: 'block' }}>
                    {item.period}
                  </span>
                </div>

                {/* Right: content */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-outfit)', fontWeight: 600, fontSize: '1.15rem', letterSpacing: '-0.015em', color: '#f4f4f8', marginBottom: '4px' }}>
                    {item.role}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', fontWeight: 500, color: '#6366f1' }}>
                      {item.org}
                    </span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#475569' }} />
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>
                      {item.location}
                    </span>
                  </div>

                  {/* Achievement highlight */}
                  {item.highlight && (
                    <div style={{
                      display: 'flex', alignItems: 'flex-start', gap: '12px',
                      padding: '14px 18px', borderRadius: '12px', marginBottom: '22px',
                      background: 'rgba(99,102,241,0.08)',
                      border: '1px solid rgba(99,102,241,0.22)',
                    }}>
                      <span style={{ fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' }}>{item.highlight.icon}</span>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#c7d2fe', lineHeight: 1.65 }}>
                        {item.highlight.text}
                      </p>
                    </div>
                  )}

                  {/* Points */}
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '22px' }}>
                    {item.points.map((pt, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.65 }}>
                        <span style={{ marginTop: '9px', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(99,102,241,0.5)', flexShrink: 0 }} />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {item.stack.map(s => <span key={s} className="chip">{s}</span>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
