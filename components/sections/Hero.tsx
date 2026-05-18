'use client';
import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const opacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  /* GSAP stagger entrance on mount */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stagger',
        { y: 48, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.85 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
    >
      {/* Hero-specific glow pulse */}
      <div
        style={{
          position: 'absolute',
          width: '900px',
          height: '900px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -54%)',
          background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'heroPulse 8s ease-in-out infinite',
        }}
      />

      {/* Horizontal lines — subtle drift */}
      {['-30px', '0px', '30px'].map((offset, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: '10%', right: '10%',
            height: '1px',
            top: `calc(50% + ${offset})`,
            background: `rgba(99,102,241,${0.04 - i * 0.01})`,
            animation: `lineDrift ${14 + i * 4}s ease-in-out infinite`,
            animationDelay: `${i * 2}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <style>{`
        @keyframes heroPulse {
          0%,100% { opacity:0.6; transform:translate(-50%,-54%) scale(1); }
          50%      { opacity:1;   transform:translate(-50%,-54%) scale(1.06); }
        }
        @keyframes lineDrift {
          0%,100% { transform:scaleX(1) translateX(0); opacity:0.5; }
          50%      { transform:scaleX(0.7) translateX(2%); opacity:1; }
        }
      `}</style>

      {/* Content — parallax wrapper */}
      <motion.div style={{ y: contentY, opacity }} className="container">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>

          {/* Availability badge */}
          <div className="hero-stagger" style={{ opacity: 0, marginBottom: '36px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '8px 18px', borderRadius: '100px',
              background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.22)',
              fontFamily: 'var(--font-inter)', fontSize: '0.78rem', fontWeight: 500, color: '#818cf8',
              letterSpacing: '0.02em',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.8)', display: 'inline-block' }} />
              Available for new opportunities
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-stagger"
            style={{
              opacity: 0,
              fontFamily: 'var(--font-outfit)', fontWeight: 800,
              fontSize: 'clamp(60px, 11vw, 130px)',
              letterSpacing: '-0.035em', lineHeight: 1.0,
              color: '#f4f4f8', marginBottom: '20px',
            }}
          >
            Ahmed <span className="gradient-text">Ashraf</span>
          </h1>

          {/* Animated role */}
          <div
            className="hero-stagger"
            style={{
              opacity: 0, marginBottom: '24px',
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)',
              color: '#6366f1', letterSpacing: '0.04em',
            }}
          >
            <TypeAnimation
              sequence={['IT Specialist', 2200, 'Web Developer', 2200, 'System Architect', 2200, 'Problem Solver', 2200]}
              speed={55} wrapper="span" repeat={Infinity}
            />
          </div>

          {/* Tagline */}
          <p
            className="hero-stagger"
            style={{
              opacity: 0,
              fontFamily: 'var(--font-inter)', fontSize: 'clamp(1rem, 1.8vw, 1.125rem)',
              color: '#475569', lineHeight: 1.65,
              maxWidth: '520px', marginBottom: '48px',
            }}
          >
            Building reliable infrastructure and modern digital experiences
            for organisations that care about quality.
          </p>

          {/* CTAs */}
          <div className="hero-stagger" style={{ opacity: 0, display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => scrollTo('projects')} className="btn-primary">
              View Projects
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 7.5h10m-4.5-4 4.5 4-4.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-ghost">Get in Touch</button>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
      >
        <motion.div
          style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, rgba(99,102,241,0.7), transparent)' }}
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#475569' }}>scroll</span>
      </motion.div>
    </section>
  );
}
