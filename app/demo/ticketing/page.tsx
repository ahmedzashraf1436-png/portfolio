'use client';
import { useState } from 'react';

interface Ticket {
  id: string; title: string; priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved'; category: string;
  assignee: string; created: string; description: string; branch: string;
}

const tickets: Ticket[] = [
  { id: 'TKT-1091', title: 'Main Server Unresponsive', priority: 'Critical', status: 'Open', category: 'Infrastructure', assignee: 'Ahmed A.', created: '2h ago', branch: 'Cairo HQ', description: 'Production server at Cairo HQ is not responding to ping. Services down across 12 workstations. Requires immediate physical inspection and possible restart of core network equipment.' },
  { id: 'TKT-1090', title: 'VPN Access Denied — Remote Team', priority: 'High', status: 'In Progress', category: 'Security', assignee: 'Sara M.', created: '4h ago', branch: 'All Branches', description: 'Remote employees unable to connect to VPN since 09:00. Likely related to certificate renewal. Investigating Active Directory group policy.' },
  { id: 'TKT-1089', title: 'Printer Offline — Branch 14', priority: 'Medium', status: 'Open', category: 'Hardware', assignee: 'Unassigned', created: '6h ago', branch: 'Maadi', description: 'Network printer at Maadi branch showing offline in Windows print spooler. Cannot ping device. Possible IP conflict after yesterday\'s DHCP maintenance window.' },
  { id: 'TKT-1088', title: 'Password Reset Request', priority: 'Low', status: 'Resolved', category: 'User Support', assignee: 'Ahmed A.', created: '1d ago', branch: 'Nasr City', description: 'User locked out of Active Directory account after 5 failed login attempts. Password reset performed via AD console. User confirmed access restored.' },
  { id: 'TKT-1087', title: 'Outlook Not Syncing', priority: 'High', status: 'Open', category: 'Software', assignee: 'Karim B.', created: '1d ago', branch: 'Giza Mall', description: 'Branch manager reporting email not syncing for 2 days. OST file may be corrupted. Scheduled remote session to rebuild Outlook profile.' },
  { id: 'TKT-1086', title: 'New Employee IT Setup', priority: 'Medium', status: 'In Progress', category: 'Onboarding', assignee: 'Ahmed A.', created: '2d ago', branch: 'Sheikh Zayed', description: 'Onboarding 3 new hires. Workstations imaged and joined to domain. Configuring email accounts and ERP access. Expected completion: EOD.' },
  { id: 'TKT-1085', title: 'Network Slow — Peak Hours', priority: 'High', status: 'Resolved', category: 'Networking', assignee: 'Sara M.', created: '3d ago', branch: '6th October', description: 'Intermittent slowness between 12:00–14:00 daily. Root cause: CCTV cameras consuming 60% of bandwidth during recording. QoS policy applied. Resolved.' },
  { id: 'TKT-1084', title: 'Monitor Display Artifacts', priority: 'Low', status: 'Resolved', category: 'Hardware', assignee: 'Karim B.', created: '4d ago', branch: 'Heliopolis', description: 'Dell monitor showing green vertical lines. Tested with different cable — issue persists. Monitor RMA submitted to supplier. Temporary spare provided.' },
  { id: 'TKT-1083', title: 'ERP Access Rights Update', priority: 'Medium', status: 'Open', category: 'Security', assignee: 'Ahmed A.', created: '5d ago', branch: 'Alexandria', description: 'Department head requesting elevated MS Dynamics AX permissions for 4 team members. Awaiting approval from IT Manager and HR before applying changes.' },
  { id: 'TKT-1082', title: 'Antivirus License Expired', priority: 'Low', status: 'In Progress', category: 'Software', assignee: 'Unassigned', created: '6d ago', branch: 'New Cairo', description: '18 endpoints showing expired antivirus license warning. Procurement process initiated for renewed volume license. Temporary definitions update applied.' },
];

const priorityColor: Record<string, { bg: string; text: string; border: string }> = {
  Critical: { bg: 'rgba(239,68,68,0.1)', text: '#f87171', border: 'rgba(239,68,68,0.25)' },
  High:     { bg: 'rgba(251,146,60,0.1)', text: '#fb923c', border: 'rgba(251,146,60,0.25)' },
  Medium:   { bg: 'rgba(251,191,36,0.1)', text: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
  Low:      { bg: 'rgba(74,222,128,0.1)', text: '#4ade80', border: 'rgba(74,222,128,0.25)' },
};
const statusColor: Record<string, { bg: string; text: string; border: string }> = {
  Open:        { bg: 'rgba(99,102,241,0.1)', text: '#818cf8', border: 'rgba(99,102,241,0.25)' },
  'In Progress':{ bg: 'rgba(251,191,36,0.1)', text: '#fbbf24', border: 'rgba(251,191,36,0.25)' },
  Resolved:    { bg: 'rgba(74,222,128,0.1)', text: '#4ade80', border: 'rgba(74,222,128,0.25)' },
};

function Badge({ label, colors }: { label: string; colors: { bg: string; text: string; border: string } }) {
  return (
    <span style={{ padding: '2px 10px', borderRadius: '20px', background: colors.bg, border: `1px solid ${colors.border}`, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: colors.text, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
      {label}
    </span>
  );
}

export default function TicketingDemo() {
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Ticket | null>(null);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const stats = [
    { label: 'Open', value: tickets.filter(t => t.status === 'Open').length, color: '#818cf8' },
    { label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, color: '#fbbf24' },
    { label: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length, color: '#4ade80' },
    { label: 'Critical', value: tickets.filter(t => t.priority === 'Critical').length, color: '#f87171' },
  ];

  const filtered = tickets.filter(t =>
    (statusFilter === 'All' || t.status === statusFilter) &&
    (priorityFilter === 'All' || t.priority === priorityFilter) &&
    (search === '' || t.title.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: '100vh', background: '#080810' }}>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(13,13,26,0.8)' }}>
        <div className="demo-hdr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f8', marginBottom: '4px' }}>IT Support Portal</h1>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>Raneen Company · IT Department</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ position: 'relative' }}>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search tickets..."
                style={{ padding: '9px 14px 9px 36px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', color: '#f4f4f8', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', outline: 'none', width: '220px' }}
              />
              <svg style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
            <button onClick={() => { setShowNewTicket(true); setSubmitted(false); setNewTitle(''); }} className="btn-primary" style={{ padding: '9px 20px', fontSize: '0.85rem' }}>
              + New Ticket
            </button>
          </div>
        </div>
      </div>

      <div className="demo-inner">
        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '12px', marginBottom: '28px' }}>
          {stats.map(s => (
            <div key={s.label} className="glass-card" style={{ padding: '20px 24px' }}>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '2.2rem', fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: '6px' }}>{s.value}</div>
              <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: '4px' }}>Status:</span>
          {['All', 'Open', 'In Progress', 'Resolved'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '5px 14px', borderRadius: '8px', border: '1px solid', borderColor: statusFilter === s ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)', background: statusFilter === s ? 'rgba(99,102,241,0.12)' : 'transparent', color: statusFilter === s ? '#818cf8' : '#475569', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>{s}</button>
          ))}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: '12px', marginRight: '4px' }}>Priority:</span>
          {['All', 'Critical', 'High', 'Medium', 'Low'].map(p => (
            <button key={p} onClick={() => setPriorityFilter(p)} style={{ padding: '5px 14px', borderRadius: '8px', border: '1px solid', borderColor: priorityFilter === p ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)', background: priorityFilter === p ? 'rgba(99,102,241,0.12)' : 'transparent', color: priorityFilter === p ? '#818cf8' : '#475569', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s' }}>{p}</button>
          ))}
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#475569' }}>{filtered.length} tickets</span>
        </div>

        {/* Ticket table */}
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['ID', 'Title', 'Priority', 'Status', 'Category', 'Assignee', 'Branch', 'Created'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <tr
                    key={t.id}
                    onClick={() => setSelected(t)}
                    style={{ borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', cursor: 'pointer', transition: 'background 0.15s', background: selected?.id === t.id ? 'rgba(99,102,241,0.06)' : 'transparent' }}
                    onMouseEnter={e => { if (selected?.id !== t.id) e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    onMouseLeave={e => { if (selected?.id !== t.id) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#6366f1', whiteSpace: 'nowrap' }}>{t.id}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#f4f4f8', maxWidth: '240px' }}>{t.title}</td>
                    <td style={{ padding: '14px 20px' }}><Badge label={t.priority} colors={priorityColor[t.priority]} /></td>
                    <td style={{ padding: '14px 20px' }}><Badge label={t.status} colors={statusColor[t.status]} /></td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t.category}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{t.assignee}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569', whiteSpace: 'nowrap' }}>{t.branch}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#475569', whiteSpace: 'nowrap' }}>{t.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ticket detail panel */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', justifyContent: 'flex-end' }} onClick={e => e.target === e.currentTarget && setSelected(null)}>
          <div style={{ flex: 1 }} onClick={() => setSelected(null)} />
          <div style={{ width: '460px', maxWidth: '92vw', background: '#0d0d1a', borderLeft: '1px solid rgba(255,255,255,0.08)', overflowY: 'auto' }}>
            <div style={{ padding: '28px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#6366f1' }}>{selected.id}</span>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.15rem', fontWeight: 700, color: '#f4f4f8', marginTop: '6px' }}>{selected.title}</h3>
              </div>
              <button onClick={() => setSelected(null)} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1.4rem', flexShrink: 0 }}>×</button>
            </div>
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[['Priority', selected.priority, priorityColor[selected.priority]], ['Status', selected.status, statusColor[selected.status]]].map(([k, v, c]) => (
                  <div key={k as string}>
                    <span className="label" style={{ fontSize: '0.58rem', marginBottom: '8px' }}>{k as string}</span>
                    <Badge label={v as string} colors={c as typeof priorityColor[string]} />
                  </div>
                ))}
                {[['Category', selected.category], ['Branch', selected.branch], ['Assignee', selected.assignee], ['Created', selected.created]].map(([k, v]) => (
                  <div key={k as string}>
                    <span className="label" style={{ fontSize: '0.58rem', marginBottom: '4px' }}>{k as string}</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#94a3b8', display: 'block' }}>{v as string}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="label" style={{ fontSize: '0.58rem', marginBottom: '10px' }}>Description</span>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#94a3b8', lineHeight: 1.7 }}>{selected.description}</p>
              </div>
              <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: '0.82rem', padding: '10px' }}>Assign to Me</button>
                <button className="btn-ghost" style={{ flex: 1, fontSize: '0.82rem', padding: '10px' }}>Mark Resolved</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Ticket Modal */}
      {showNewTicket && (
        <div onClick={e => e.target === e.currentTarget && setShowNewTicket(false)} style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div className="glass-card" style={{ maxWidth: '520px', width: '100%', padding: '36px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-9" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.2rem', color: '#f4f4f8', marginBottom: '8px' }}>Ticket Submitted</h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#475569', marginBottom: '24px' }}>TKT-1092 has been created and assigned to the queue.</p>
                <button onClick={() => setShowNewTicket(false)} className="btn-primary">Done</button>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.25rem', fontWeight: 700, color: '#f4f4f8', marginBottom: '24px' }}>New Support Ticket</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span className="label" style={{ fontSize: '0.6rem' }}>Issue Title</span>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Briefly describe the issue..." style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', color: '#f4f4f8', fontFamily: 'var(--font-inter)', fontSize: '0.875rem', outline: 'none' }} />
                  </label>
                  {[['Priority', ['Critical', 'High', 'Medium', 'Low']], ['Category', ['Infrastructure', 'Security', 'Hardware', 'Software', 'Networking', 'User Support']], ['Branch', ['Cairo HQ', 'Giza Mall', 'Maadi', 'Nasr City', 'Sheikh Zayed', 'Alexandria']]].map(([label, opts]) => (
                    <label key={label as string} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span className="label" style={{ fontSize: '0.6rem' }}>{label as string}</span>
                      <select style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(13,13,26,0.95)', color: '#f4f4f8', fontFamily: 'var(--font-inter)', fontSize: '0.875rem', outline: 'none' }}>
                        {(opts as string[]).map(o => <option key={o}>{o}</option>)}
                      </select>
                    </label>
                  ))}
                  <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span className="label" style={{ fontSize: '0.6rem' }}>Description</span>
                    <textarea rows={4} placeholder="Detailed description of the issue..." style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', color: '#f4f4f8', fontFamily: 'var(--font-inter)', fontSize: '0.875rem', outline: 'none', resize: 'none' }} />
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                  <button onClick={() => { if (newTitle.trim()) setSubmitted(true); }} className="btn-primary" style={{ flex: 1 }}>Submit Ticket</button>
                  <button onClick={() => setShowNewTicket(false)} className="btn-ghost" style={{ flex: 1 }}>Cancel</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
