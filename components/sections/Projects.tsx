'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={p.href}
      target={p.href.startsWith('/') ? '_self' : '_blank'}
      rel="noopener noreferrer"
      className="glass-card"
      style={{ display: 'flex', flexDirection: 'column', padding: large ? '40px' : '28px', textDecoration: 'none', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span className="label">{p.category}{large ? ' · Featured' : ''}</span>
        </div>
        <motion.span
          animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0, color: hovered ? '#818cf8' : '#475569' }}
          transition={{ duration: 0.2 }}
          style={{ fontSize: '1.1rem', lineHeight: 1 }}
        >
          ↗
        </motion.span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'var(--font-outfit)', fontWeight: 700,
        fontSize: large ? 'clamp(1.4rem, 2.5vw, 1.85rem)' : '1.1rem',
        letterSpacing: '-0.02em', color: '#f4f4f8', marginBottom: '12px',
      }}>
        {p.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'var(--font-inter)', fontSize: large ? '1rem' : '0.875rem',
        color: '#94a3b8', lineHeight: 1.7, flex: 1, marginBottom: '24px',
        maxWidth: large ? '560px' : undefined,
      }}>
        {p.description}
      </p>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {p.tags.map(t => <span key={t} className="chip">{t}</span>)}
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
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '56px' }}>
          <div>
            <span className="label" style={{ marginBottom: '16px' }}>Selected work</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}>Projects</h2>
          </div>
          <a
            href="https://github.com/ahmedzashraf1436-png"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#94a3b8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f4f4f8')}
            onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
          >
            View all on GitHub
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1v8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Featured card */}
        <div className="reveal" style={{ marginBottom: '14px' }}>
          <ProjectCard p={featured} large />
        </div>

        {/* 4-col grid */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
          {rest.map(p => <ProjectCard key={p.id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
