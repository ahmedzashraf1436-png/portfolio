'use client';
import { motion } from 'framer-motion';
import { useReveal } from '@/hooks/useReveal';

const projects = [
  {
    id: 1, category: 'Full Stack', year: '2024', featured: true,
    title: 'E-Commerce Platform',
    description: 'Full-stack online store with real-time inventory, cart, JWT authentication, and order management. React front-end, Node.js microservices, MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT'],
    href: '/demo/ecommerce',
  },
  {
    id: 2, category: 'Web App', year: '2023', featured: false,
    title: 'IT Ticketing Dashboard',
    description: 'Internal support-ticket system with real-time updates, priority queuing, and an analytics dashboard — replacing a manual spreadsheet process.',
    tags: ['JavaScript', 'Firebase', 'HTML5', 'CSS3'],
    href: '/demo/ticketing',
  },
  {
    id: 3, category: 'Web App', year: '2024', featured: false,
    title: 'Network Inventory Tracker',
    description: 'Centralised tracker for managing network devices across 58 branches, with QR scanning and automated maintenance alerts.',
    tags: ['React', 'REST API', 'JavaScript'],
    href: '/demo/inventory',
  },
  {
    id: 4, category: 'Data Science', year: '2024', featured: false,
    title: 'Data Visualisation Dashboard',
    description: 'Interactive analytics tool transforming raw datasets into insightful charts and exportable reports using Python data-science libraries.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
    href: '/demo/data-viz',
  },
  {
    id: 5, category: 'Frontend', year: '2025', featured: false,
    title: 'Cybernetic Portfolio',
    description: 'This portfolio — Next.js 16, Framer Motion, GSAP, premium minimalism. Crafted for speed, elegance, and visual impact.',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind'],
    href: '#',
  },
];

function ProjectCard({ p, large = false }: { p: typeof projects[0]; large?: boolean }) {
  const isCurrentSite = p.href === '#';

  return (
    <motion.a
      href={p.href}
      target={p.href.startsWith('/') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="glass-card"
      style={{
        display: 'flex', flexDirection: 'column',
        padding: large ? '36px 32px' : '24px',
        textDecoration: 'none', height: '100%',
      }}
      whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <span className="label">{p.category}{large ? ' · Featured' : ''}</span>
        <span className="label" style={{ color: '#475569' }}>{p.year}</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-outfit)', fontWeight: 700,
        fontSize: large ? 'clamp(1.3rem, 2.5vw, 1.75rem)' : '1.05rem',
        letterSpacing: '-0.02em', color: '#f4f4f8', marginBottom: '12px',
      }}>
        {p.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-inter)', fontSize: large ? '0.95rem' : '0.875rem',
        color: '#94a3b8', lineHeight: 1.7, flex: 1, marginBottom: '20px',
      }}>
        {p.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
        {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
      </div>

      {/* CTA footer — always visible, makes clickability obvious */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.07)',
      }}>
        <span style={{
          fontFamily: 'var(--font-inter)', fontSize: '0.82rem', fontWeight: 600,
          color: isCurrentSite ? '#475569' : '#6366f1',
        }}>
          {isCurrentSite ? 'Currently viewing' : 'View live demo'}
        </span>
        {!isCurrentSite && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
          }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2.5 6.5h8M7 3l3.5 3.5L7 10" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        )}
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const sectionRef = useReveal();
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      className="section"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '56px' }}>
          <span className="label" style={{ marginBottom: '16px' }}>Selected work</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>Projects</h2>
        </div>

        {/* Featured card */}
        <div className="reveal" style={{ marginBottom: '14px' }}>
          <ProjectCard p={featured} large />
        </div>

        {/* 4-card grid */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {rest.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
