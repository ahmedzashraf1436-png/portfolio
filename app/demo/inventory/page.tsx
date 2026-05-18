'use client';
import { useState } from 'react';

interface Device {
  id: string; name: string; type: string; ip: string; mac: string;
  status: 'Online' | 'Offline' | 'Maintenance'; model: string;
  lastSeen: string; location: string;
}

interface Branch {
  id: number; name: string; city: string; region: string;
  devices: number; online: number; alerts: number;
  manager: string; phone: string;
}

const branches: Branch[] = [
  { id: 1, name: 'Cairo HQ',      city: 'Cairo',       region: 'Greater Cairo', devices: 47, online: 46, alerts: 1, manager: 'Ahmed Ashraf', phone: '+20 111 182 3254' },
  { id: 2, name: 'Giza Mall',     city: 'Giza',        region: 'Greater Cairo', devices: 28, online: 28, alerts: 0, manager: 'Sara Mahmoud', phone: '+20 100 234 5678' },
  { id: 3, name: 'Maadi Branch',  city: 'Cairo',       region: 'Greater Cairo', devices: 22, online: 21, alerts: 1, manager: 'Karim Bassem', phone: '+20 122 345 6789' },
  { id: 4, name: 'Nasr City',     city: 'Cairo',       region: 'Greater Cairo', devices: 31, online: 31, alerts: 0, manager: 'Dina Hassan', phone: '+20 111 456 7890' },
  { id: 5, name: 'Sheikh Zayed',  city: '6th October', region: 'Greater Cairo', devices: 19, online: 19, alerts: 0, manager: 'Omar Sayed', phone: '+20 100 567 8901' },
  { id: 6, name: 'Alexandria',    city: 'Alexandria',  region: 'North Coast',   devices: 34, online: 33, alerts: 1, manager: 'Mona Farouk', phone: '+20 122 678 9012' },
  { id: 7, name: 'Heliopolis',    city: 'Cairo',       region: 'Greater Cairo', devices: 26, online: 26, alerts: 0, manager: 'Youssef Ali', phone: '+20 111 789 0123' },
  { id: 8, name: '6th October',   city: '6th October', region: 'Greater Cairo', devices: 21, online: 20, alerts: 0, manager: 'Nada Ibrahim', phone: '+20 100 890 1234' },
  { id: 9, name: 'New Cairo',     city: 'Cairo',       region: 'Greater Cairo', devices: 38, online: 38, alerts: 0, manager: 'Sherif Nour', phone: '+20 122 901 2345' },
  { id: 10, name: 'Zamalek',      city: 'Cairo',       region: 'Greater Cairo', devices: 15, online: 15, alerts: 0, manager: 'Laila Mostafa', phone: '+20 111 012 3456' },
];

const devicesByBranch: Record<number, Device[]> = {
  1: [
    { id: 'DEV-001', name: 'Core Router', type: 'Router', ip: '192.168.1.1', mac: 'AA:BB:CC:DD:EE:01', status: 'Online', model: 'Cisco ISR 4331', lastSeen: 'Just now', location: 'Server Room' },
    { id: 'DEV-002', name: 'Main Switch', type: 'Switch', ip: '192.168.1.2', mac: 'AA:BB:CC:DD:EE:02', status: 'Online', model: 'HP ProCurve 2920-48G', lastSeen: 'Just now', location: 'Server Room' },
    { id: 'DEV-003', name: 'AP — Floor 1', type: 'Access Point', ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:03', status: 'Offline', model: 'Aruba AP-505', lastSeen: '2h ago', location: 'Floor 1' },
    { id: 'DEV-004', name: 'AP — Floor 2', type: 'Access Point', ip: '192.168.1.11', mac: 'AA:BB:CC:DD:EE:04', status: 'Online', model: 'Aruba AP-505', lastSeen: 'Just now', location: 'Floor 2' },
    { id: 'DEV-005', name: 'NAS Storage', type: 'Storage', ip: '192.168.1.20', mac: 'AA:BB:CC:DD:EE:05', status: 'Online', model: 'Synology DS923+', lastSeen: 'Just now', location: 'Server Room' },
    { id: 'DEV-006', name: 'IP Camera 01', type: 'Camera', ip: '192.168.1.50', mac: 'AA:BB:CC:DD:EE:06', status: 'Online', model: 'Hikvision DS-2CD2T47G2', lastSeen: 'Just now', location: 'Entrance' },
    { id: 'DEV-007', name: 'PoS Terminal 1', type: 'PoS', ip: '192.168.1.100', mac: 'AA:BB:CC:DD:EE:07', status: 'Online', model: 'Ingenico Move 5000', lastSeen: 'Just now', location: 'Checkout 1' },
    { id: 'DEV-008', name: 'PoS Terminal 2', type: 'PoS', ip: '192.168.1.101', mac: 'AA:BB:CC:DD:EE:08', status: 'Maintenance', model: 'Ingenico Move 5000', lastSeen: '6h ago', location: 'Checkout 2' },
  ],
};

const statusStyle: Record<string, { dot: string; bg: string; text: string; border: string }> = {
  Online:      { dot: '#4ade80', bg: 'rgba(74,222,128,0.08)', text: '#4ade80', border: 'rgba(74,222,128,0.2)' },
  Offline:     { dot: '#f87171', bg: 'rgba(239,68,68,0.08)',  text: '#f87171', border: 'rgba(239,68,68,0.2)' },
  Maintenance: { dot: '#fbbf24', bg: 'rgba(251,191,36,0.08)', text: '#fbbf24', border: 'rgba(251,191,36,0.2)' },
};

const deviceIcons: Record<string, string> = {
  Router: '🌐', Switch: '🔀', 'Access Point': '📡', Storage: '💾', Camera: '📷', PoS: '💳', Workstation: '🖥️',
};

export default function InventoryDemo() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [scanOpen, setScanOpen] = useState(false);
  const [scanDone, setScanDone] = useState(false);

  const globalStats = [
    { label: 'Total Branches', value: '58', color: '#818cf8' },
    { label: 'Total Devices', value: '1,247', color: '#818cf8' },
    { label: 'Uptime', value: '98.2%', color: '#4ade80' },
    { label: 'Alerts', value: '3', color: '#f87171' },
  ];

  const branchDevices = selectedBranch ? (devicesByBranch[selectedBranch.id] ?? [
    { id: `DEV-${selectedBranch.id}01`, name: 'Core Router', type: 'Router', ip: '10.0.1.1', mac: 'CC:DD:EE:FF:00:01', status: 'Online' as const, model: 'Cisco ISR 4321', lastSeen: 'Just now', location: 'Server Room' },
    { id: `DEV-${selectedBranch.id}02`, name: 'Main Switch', type: 'Switch', ip: '10.0.1.2', mac: 'CC:DD:EE:FF:00:02', status: 'Online' as const, model: 'HP Aruba 2530-24G', lastSeen: 'Just now', location: 'Server Room' },
    { id: `DEV-${selectedBranch.id}03`, name: 'Access Point', type: 'Access Point', ip: '10.0.1.10', mac: 'CC:DD:EE:FF:00:03', status: 'Online' as const, model: 'Aruba AP-303', lastSeen: '5m ago', location: 'Floor 1' },
    { id: `DEV-${selectedBranch.id}04`, name: 'PoS Terminal', type: 'PoS', ip: '10.0.1.50', mac: 'CC:DD:EE:FF:00:04', status: 'Online' as const, model: 'Ingenico Lane 3000', lastSeen: 'Just now', location: 'Checkout' },
    { id: `DEV-${selectedBranch.id}05`, name: 'IP Camera', type: 'Camera', ip: '10.0.1.80', mac: 'CC:DD:EE:FF:00:05', status: 'Online' as const, model: 'Hikvision DS-2CD', lastSeen: 'Just now', location: 'Entrance' },
  ]) : [];

  const filteredDevices = branchDevices.filter(d =>
    (statusFilter === 'All' || d.status === statusFilter) &&
    (typeFilter === 'All' || d.type === typeFilter) &&
    (search === '' || d.name.toLowerCase().includes(search.toLowerCase()) || d.ip.includes(search))
  );

  const deviceTypes = ['All', ...Array.from(new Set(branchDevices.map(d => d.type)))];

  return (
    <div style={{ minHeight: '100vh', background: '#080810' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(13,13,26,0.8)' }}>
        <div className="demo-hdr">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f8', marginBottom: '4px' }}>
                Network Inventory Tracker
              </h1>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>Raneen Company · IT Infrastructure · 58 Branches Nationwide</p>
            </div>
            <button onClick={() => { setScanOpen(true); setScanDone(false); setTimeout(() => setScanDone(true), 2000); }} className="btn-ghost" style={{ fontSize: '0.82rem', padding: '9px 18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4 1v3M10 1v3M4 10v3M10 10v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              Scan Network
            </button>
          </div>
          {/* Global stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: '12px' }}>
            {globalStats.map(s => (
              <div key={s.label} style={{ padding: '16px 20px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.6rem', fontWeight: 800, color: s.color, lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', color: '#475569' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="demo-inner">
        {!selectedBranch ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.1rem', fontWeight: 700, color: '#f4f4f8' }}>All Branches</h2>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#475569' }}>Showing 10 of 58 branches</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '14px' }}>
              {branches.map(b => {
                const uptime = Math.round((b.online / b.devices) * 100);
                return (
                  <div key={b.id} className="glass-card" style={{ padding: '24px', cursor: 'pointer' }} onClick={() => setSelectedBranch(b)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', fontWeight: 700, color: '#f4f4f8', marginBottom: '3px' }}>{b.name}</h3>
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: '#475569' }}>{b.city} · {b.region}</span>
                      </div>
                      {b.alerts > 0 && (
                        <span style={{ padding: '2px 10px', borderRadius: '20px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#f87171' }}>{b.alerts} alert</span>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '16px' }}>
                      {[['Devices', b.devices, '#818cf8'], ['Online', b.online, '#4ade80'], ['Uptime', `${uptime}%`, uptime === 100 ? '#4ade80' : '#fbbf24']].map(([l, v, c]) => (
                        <div key={l as string} style={{ textAlign: 'center', padding: '8px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.1rem', fontWeight: 800, color: c as string }}>{v as string | number}</div>
                          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', color: '#475569' }}>{l as string}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: '#475569' }}>{b.manager}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: b.online === b.devices ? '#4ade80' : '#fbbf24', boxShadow: `0 0 6px ${b.online === b.devices ? '#4ade80' : '#fbbf24'}` }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#475569' }}>{b.online === b.devices ? 'All Online' : `${b.devices - b.online} Offline`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <>
            {/* Branch detail header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px', flexWrap: 'wrap' }}>
              <button onClick={() => setSelectedBranch(null)} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '7px 14px', color: '#94a3b8', fontFamily: 'var(--font-inter)', fontSize: '0.82rem', cursor: 'pointer' }}>
                ← All Branches
              </button>
              <div>
                <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.2rem', fontWeight: 700, color: '#f4f4f8' }}>{selectedBranch.name}</h2>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: '#475569' }}>{selectedBranch.city} · Manager: {selectedBranch.manager} · {selectedBranch.phone}</span>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', marginRight: '8px' }}>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or IP..." style={{ padding: '8px 14px 8px 34px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(255,255,255,0.04)', color: '#f4f4f8', fontFamily: 'var(--font-inter)', fontSize: '0.82rem', outline: 'none', width: '200px' }} />
                <svg style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#475569', pointerEvents: 'none' }} width="13" height="13" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.3"/><path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
              </div>
              {['All', 'Online', 'Offline', 'Maintenance'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: '5px 13px', borderRadius: '8px', border: '1px solid', borderColor: statusFilter === s ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)', background: statusFilter === s ? 'rgba(99,102,241,0.1)' : 'transparent', color: statusFilter === s ? '#818cf8' : '#475569', fontFamily: 'var(--font-inter)', fontSize: '0.78rem', cursor: 'pointer' }}>{s}</button>
              ))}
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.09)', background: 'rgba(13,13,26,0.95)', color: '#94a3b8', fontFamily: 'var(--font-inter)', fontSize: '0.78rem', outline: 'none' }}>
                {deviceTypes.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>

            {/* Device table */}
            <div className="glass-card" style={{ overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      {['Device', 'Type', 'IP Address', 'MAC Address', 'Model', 'Status', 'Location', 'Last Seen'].map(h => (
                        <th key={h} style={{ padding: '13px 18px', textAlign: 'left', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDevices.map((d, i) => {
                      const s = statusStyle[d.status];
                      return (
                        <tr key={d.id} style={{ borderBottom: i < filteredDevices.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                          <td style={{ padding: '13px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <span style={{ fontSize: '1.2rem' }}>{deviceIcons[d.type] ?? '🔧'}</span>
                              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#f4f4f8', whiteSpace: 'nowrap' }}>{d.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '13px 18px' }}><span className="chip" style={{ fontSize: '0.65rem' }}>{d.type}</span></td>
                          <td style={{ padding: '13px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#6366f1' }}>{d.ip}</td>
                          <td style={{ padding: '13px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#475569' }}>{d.mac}</td>
                          <td style={{ padding: '13px 18px', fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{d.model}</td>
                          <td style={{ padding: '13px 18px' }}>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', borderRadius: '20px', background: s.bg, border: `1px solid ${s.border}`, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: s.text, whiteSpace: 'nowrap' }}>
                              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: s.dot, boxShadow: `0 0 5px ${s.dot}` }} />
                              {d.status}
                            </span>
                          </td>
                          <td style={{ padding: '13px 18px', fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: '#475569' }}>{d.location}</td>
                          <td style={{ padding: '13px 18px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#475569' }}>{d.lastSeen}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Scan modal */}
      {scanOpen && (
        <div onClick={e => { if (scanDone && e.target === e.currentTarget) setScanOpen(false); }} style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-card" style={{ maxWidth: '400px', width: '90%', padding: '40px', textAlign: 'center' }}>
            {scanDone ? (
              <>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-9" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.2rem', color: '#f4f4f8', marginBottom: '8px' }}>Scan Complete</h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#94a3b8', marginBottom: '8px' }}>1,247 devices found across 58 branches.</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4ade80', marginBottom: '24px' }}>3 alerts detected · 98.2% uptime</p>
                <button onClick={() => setScanOpen(false)} className="btn-primary">Done</button>
              </>
            ) : (
              <>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid rgba(99,102,241,0.3)', borderTop: '2px solid #6366f1', margin: '0 auto 20px', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.1rem', color: '#f4f4f8', marginBottom: '8px' }}>Scanning Network…</h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: '#475569' }}>Pinging all devices across 58 branches</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
