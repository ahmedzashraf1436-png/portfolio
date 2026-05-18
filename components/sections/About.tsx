'use client';
import { useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 2,  suffix: '+', label: 'Years of experience' },
  { value: 58, suffix: '+', label: 'Branches managed' },
  { value: 5,  suffix: '',  label: 'Projects shipped' },
  { value: 20, suffix: '+', label: 'Technologies' },
];

export default function About() {
  const sectionRef = useReveal() as React.RefObject<HTMLElement>;
  const { ref: statRef, inView: statInView } = useInView({ triggerOnce: true });

  return (
    <section id="about" className="section" ref={sectionRef as React.RefObject<HTMLElement>}>
      <div className="container">

        {/* Header */}
        <div className="reveal" style={{ marginBottom: '72px' }}>
          <span className="label" style={{ marginBottom: '16px' }}>About Me</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '520px' }}>
            The person behind the work
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }}>
          {/* Two-col on lg */}
          <div className="reveal" style={{ display: 'grid', gap: '32px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
              {/* Bio */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: '#94a3b8', lineHeight: 1.75 }}>
                  I'm an IT Specialist and Web Developer with 2+ years managing enterprise
                  infrastructure across 58+ retail branches at Raneen Company, Egypt. From
                  network deployment and hardware setup to Windows Server administration
                  and user support — I own the full IT lifecycle.
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: '#94a3b8', lineHeight: 1.75 }}>
                  In parallel, I build clean, performant web applications — full-stack
                  platforms, internal dashboards, and data tools. I'm drawn to the space
                  where infrastructure thinking meets modern frontend craft.
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: '#94a3b8', lineHeight: 1.75 }}>
                  Currently completing a Bachelor of Information Systems at the Canadian
                  International College, Cairo.
                </p>

                {/* Quick info */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px 24px', paddingTop: '8px' }}>
                  {[
                    ['Location',   'Sheikh Zayed City, Egypt'],
                    ['Education',  'BIS — Canadian Int\'l College'],
                    ['Email',      'ahmedz.ashraf1436@gmail.com'],
                    ['Phone',      '+20 111 182 3254'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span className="label" style={{ fontSize: '0.62rem', marginBottom: '3px' }}>{k}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: '#f4f4f8', lineHeight: 1.4, display: 'block', wordBreak: 'break-all' }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div style={{ paddingTop: '8px' }}>
                  <a href="#" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '11px 24px', display: 'inline-flex', textDecoration: 'none' }}>
                    Download CV
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginLeft: '6px' }}>
                      <path d="M7 2v8m0 0L3.5 6.5M7 10l3.5-3.5M2 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div ref={statRef as unknown as React.RefObject<HTMLDivElement>} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', alignContent: 'start' }}>
                {stats.map(s => (
                  <div key={s.label} className="glass-card" style={{ padding: '28px 24px', borderRadius: '16px' }}>
                    <div style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.04em', color: '#f4f4f8', lineHeight: 1, marginBottom: '6px' }}>
                      {statInView ? <CountUp end={s.value} duration={2} suffix={s.suffix} /> : `0${s.suffix}`}
                    </div>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
