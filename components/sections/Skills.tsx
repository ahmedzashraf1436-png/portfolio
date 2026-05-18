'use client';
import { useReveal } from '@/hooks/useReveal';

const categories = [
  {
    icon: '⚙️',
    title: 'IT Support & Operations',
    items: ['Hardware Troubleshooting', 'Device Management', 'User Onboarding / Offboarding', 'Endpoint Security', 'Inventory Management', 'Data Recovery'],
  },
  {
    icon: '🌐',
    title: 'Networking',
    items: ['TCP/IP · LAN / WAN', 'Aruba Access Points', 'HP PoE Switches', 'VPN Configuration', 'VLAN Management', 'Network Monitoring'],
  },
  {
    icon: '🛡️',
    title: 'Systems & Security',
    items: ['Windows Server', 'Active Directory', 'MS Dynamics AX', 'Access Control', 'Threat Analysis', 'Incident Response'],
  },
  {
    icon: '⚡',
    title: 'Web Development',
    items: ['React / Next.js', 'JavaScript · TypeScript', 'Node.js · Express', 'HTML5 · CSS3 · Tailwind', 'REST APIs', 'Git · Version Control'],
  },
  {
    icon: '🗄️',
    title: 'Databases & Data',
    items: ['MySQL · SQL Server', 'MongoDB · Firebase', 'Python · Pandas', 'Matplotlib · Jupyter', 'Data Visualisation', 'MS Dynamics AX ERP'],
  },
  {
    icon: '☁️',
    title: 'Cloud & Tools',
    items: ['Linux Administration', 'Docker (Basics)', 'Honeywell · Zebra Devices', 'NCR POS Systems', 'APC UPS · Canon', 'Preventive Maintenance'],
  },
];

export default function Skills() {
  const sectionRef = useReveal();

  return (
    <section
      id="skills"
      className="section"
      ref={sectionRef as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(0,0,0,0.25)' }}
    >
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span className="label" style={{ marginBottom: '16px' }}>Capabilities</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', marginBottom: '16px' }}>
            Skills & expertise
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: '#475569', maxWidth: '480px', margin: '0 auto' }}>
            A broad technical skillset built through real-world enterprise environments and independent projects.
          </p>
        </div>

        {/* Grid */}
        <div
          className="reveal"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}
        >
          {categories.map(cat => (
            <div key={cat.title} className="glass-card" style={{ padding: '32px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
                <span style={{ fontSize: '1.4rem' }}>{cat.icon}</span>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', fontWeight: 600, letterSpacing: '-0.01em', color: '#f4f4f8' }}>
                  {cat.title}
                </h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {cat.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontFamily: 'var(--font-inter)', fontSize: '0.88rem', color: '#94a3b8' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#6366f1', flexShrink: 0, opacity: 0.7 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
