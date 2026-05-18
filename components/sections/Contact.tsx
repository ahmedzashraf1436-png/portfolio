'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReveal } from '@/hooks/useReveal';

const socials = [
  { label: 'LinkedIn', sub: '/in/ahmed-ashraf-16a27721b', href: 'https://linkedin.com/in/ahmed-ashraf-16a27721b/' },
  { label: 'GitHub',   sub: 'ahmedzashraf1436-png',        href: 'https://github.com/ahmedzashraf1436-png' },
  { label: 'Phone',    sub: '+20 111 182 3254',           href: 'tel:+201111823254' },
];

function Field({ label, type='text', value, onChange, rows }: {
  label: string; type?: string; value: string; onChange: (v:string)=>void; rows?: number;
}) {
  const Tag = rows ? 'textarea' : 'input';
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
      <span className="label" style={{ fontSize: '0.62rem' }}>{label}</span>
      <Tag
        type={type} value={value} onChange={e=>onChange(e.target.value)} rows={rows} required
        style={{
          background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '10px', padding: rows ? '14px 16px' : '13px 16px',
          color: '#f4f4f8', fontFamily: 'var(--font-inter)', fontSize: '0.9rem',
          outline: 'none', resize: 'none', width: '100%',
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        }}
        onFocus={e => { e.currentTarget.style.borderColor='rgba(99,102,241,0.55)'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(99,102,241,0.12)'; }}
        onBlur={e  => { e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; e.currentTarget.style.boxShadow='none'; }}
      />
    </label>
  );
}

export default function Contact() {
  const sectionRef = useReveal();
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }));

  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: 'ad118898-9a6d-42bb-9ad7-f6fc296e1cbd',
          subject: `New portfolio message from ${form.name}`,
          name: form.name,
          email: form.email,
          message: form.message,
          botcheck: '',
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || 'Failed to send');
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="container">

        {/* Header — centered */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '72px' }}>
          <span className="label" style={{ marginBottom: '16px' }}>Contact</span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '16px' }}>
            Let&apos;s build something together
          </h2>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '1rem', color: '#475569', maxWidth: '440px', margin: '0 auto' }}>
            Whether it&apos;s a project, a role, or just a conversation — I&apos;m always open to connecting.
          </p>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', alignItems: 'start' }}>

          {/* Left — info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            {/* Direct email */}
            <div className="glass-card" style={{ padding: '28px 32px' }}>
              <span className="label" style={{ fontSize: '0.62rem', marginBottom: '10px' }}>Direct email</span>
              <a
                href="mailto:ahmedz.ashraf1436@gmail.com"
                style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.05rem', fontWeight: 600, color: '#f4f4f8', textDecoration: 'none', letterSpacing: '-0.01em', display: 'block', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#f4f4f8')}
              >
                ahmedz.ashraf1436@gmail.com
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card"
                  style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'none' }}
                >
                  <div>
                    <span className="label" style={{ fontSize: '0.6rem', marginBottom: '3px' }}>{s.label}</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#94a3b8', display: 'block' }}>{s.sub}</span>
                  </div>
                  <span style={{ color: '#475569', fontSize: '1rem', transition: 'color 0.2s' }}>↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="glass-card" style={{ padding: '36px 32px' }}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '32px 0', gap: '14px' }}
                >
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10l4 4 8-8" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.2rem', color: '#f4f4f8' }}>Message sent</h3>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#94a3b8' }}>I'll respond within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} exit={{ opacity: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <Field label="Name"  value={form.name}  onChange={set('name')} />
                    <Field label="Email" type="email" value={form.email} onChange={set('email')} />
                  </div>
                  <Field label="Message" value={form.message} onChange={set('message')} rows={5} />
                  <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
                    {loading ? 'Sending…' : 'Send message'}
                    {!loading && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                  {error && (
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#f87171', textAlign: 'center', marginTop: '4px' }}>
                      {error}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
