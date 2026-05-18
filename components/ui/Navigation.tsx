'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'About',      id: 'about' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Experience', id: 'experience' },
  { label: 'Contact',    id: 'contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[900]"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          height: scrolled ? '62px' : '74px',
          backdropFilter: scrolled ? 'blur(18px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
          background: scrolled ? 'rgba(8,8,16,0.82)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
          transition: 'height 0.3s ease, background 0.35s ease, border-color 0.35s ease',
        }}
      >
        <div className="container h-full flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ fontFamily: 'var(--font-outfit)', fontWeight: 700, fontSize: '1rem', color: '#f4f4f8', letterSpacing: '-0.015em' }}
          >
            Ahmed Ashraf
          </button>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-7">
            {links.map(l => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', fontWeight: 400, color: '#94a3b8', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f4f4f8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="mailto:ahmedz.ashraf1436@gmail.com"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: '10px 22px', fontSize: '0.85rem' }}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-1" onClick={() => setOpen(!open)}>
            {[0,1,2].map(i => (
              <motion.span
                key={i}
                className="block w-5 rounded-full"
                style={{ height: '1.5px', background: '#f4f4f8' }}
                animate={open ? i===1 ? {opacity:0} : i===0 ? {rotate:45,y:6.5} : {rotate:-45,y:-6.5} : {rotate:0,y:0,opacity:1}}
                transition={{ duration: 0.2 }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[800] flex flex-col items-center justify-center md:hidden"
            style={{ background: 'rgba(8,8,16,0.97)', backdropFilter: 'blur(24px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="flex flex-col items-center gap-10">
              {links.map((l, i) => (
                <motion.button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  style={{ fontFamily: 'var(--font-outfit)', fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', color: '#f4f4f8' }}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                  transition={{ delay: i * 0.06 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#6366f1')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#f4f4f8')}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
