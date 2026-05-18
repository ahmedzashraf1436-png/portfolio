'use client';
import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const monthlyRevenue = {
  '1m': [
    { name: 'W1', revenue: 42000, target: 38000 },
    { name: 'W2', revenue: 51000, target: 42000 },
    { name: 'W3', revenue: 47000, target: 45000 },
    { name: 'W4', revenue: 58000, target: 48000 },
  ],
  '3m': [
    { name: 'Mar', revenue: 162000, target: 150000 },
    { name: 'Apr', revenue: 178000, target: 165000 },
    { name: 'May', revenue: 198000, target: 180000 },
  ],
  '1y': [
    { name: 'Jun', revenue: 110000, target: 100000 },
    { name: 'Jul', revenue: 125000, target: 112000 },
    { name: 'Aug', revenue: 118000, target: 115000 },
    { name: 'Sep', revenue: 132000, target: 120000 },
    { name: 'Oct', revenue: 148000, target: 130000 },
    { name: 'Nov', revenue: 141000, target: 135000 },
    { name: 'Dec', revenue: 167000, target: 145000 },
    { name: 'Jan', revenue: 152000, target: 150000 },
    { name: 'Feb', revenue: 178000, target: 158000 },
    { name: 'Mar', revenue: 162000, target: 160000 },
    { name: 'Apr', revenue: 178000, target: 165000 },
    { name: 'May', revenue: 198000, target: 180000 },
  ],
};

const categoryData = {
  sales: [
    { name: 'Electronics', value: 84000, prev: 72000 },
    { name: 'Clothing', value: 62000, prev: 58000 },
    { name: 'Furniture', value: 45000, prev: 41000 },
    { name: 'Appliances', value: 38000, prev: 35000 },
    { name: 'Accessories', value: 29000, prev: 26000 },
  ],
  marketing: [
    { name: 'Social Ads', value: 18000, prev: 14000 },
    { name: 'Google Ads', value: 24000, prev: 20000 },
    { name: 'Email', value: 9000, prev: 8000 },
    { name: 'Influencer', value: 12000, prev: 10000 },
    { name: 'Organic', value: 15000, prev: 12000 },
  ],
  operations: [
    { name: 'Cairo HQ', value: 58000, prev: 52000 },
    { name: 'Alex Branch', value: 34000, prev: 30000 },
    { name: 'Giza Mall', value: 28000, prev: 25000 },
    { name: 'Nasr City', value: 22000, prev: 20000 },
    { name: 'New Cairo', value: 19000, prev: 17000 },
  ],
};

const userGrowth = {
  '1m': [
    { name: 'W1', users: 11200, new: 320 },
    { name: 'W2', users: 11580, new: 380 },
    { name: 'W3', users: 12010, new: 430 },
    { name: 'W4', users: 12847, new: 837 },
  ],
  '3m': [
    { name: 'Mar', users: 10200, new: 1100 },
    { name: 'Apr', users: 11400, new: 1200 },
    { name: 'May', users: 12847, new: 1447 },
  ],
  '1y': [
    { name: 'Jun', users: 6200, new: 480 },
    { name: 'Jul', users: 6820, new: 620 },
    { name: 'Aug', users: 7300, new: 480 },
    { name: 'Sep', users: 7950, new: 650 },
    { name: 'Oct', users: 8600, new: 650 },
    { name: 'Nov', users: 9100, new: 500 },
    { name: 'Dec', users: 9800, new: 700 },
    { name: 'Jan', users: 10400, new: 600 },
    { name: 'Feb', users: 11000, new: 600 },
    { name: 'Mar', users: 11500, new: 500 },
    { name: 'Apr', users: 12100, new: 600 },
    { name: 'May', users: 12847, new: 747 },
  ],
};

const trafficSources = [
  { name: 'Direct', value: 34, color: '#6366f1' },
  { name: 'Organic Search', value: 28, color: '#818cf8' },
  { name: 'Social Media', value: 21, color: '#a78bfa' },
  { name: 'Referral', value: 12, color: '#c4b5fd' },
  { name: 'Email', value: 5, color: '#ddd6fe' },
];

const kpiData = {
  sales:      { revenue: '$284K', users: '12,847', conversion: '3.4%', session: '4m 32s' },
  marketing:  { revenue: '$78K',  users: '34,200', conversion: '1.8%', session: '2m 15s' },
  operations: { revenue: '$161K', users: '8,940',  conversion: '4.1%', session: '6m 48s' },
};

const tooltipStyle = {
  backgroundColor: '#0d0d1a', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#f4f4f8',
};

type Dataset = 'sales' | 'marketing' | 'operations';
type Range = '1m' | '3m' | '1y';

function ChartCard({ title, label, children }: { title: string; label: string; children: React.ReactNode }) {
  return (
    <div className="glass-card" style={{ padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span className="label" style={{ fontSize: '0.6rem', marginBottom: '4px' }}>{label}</span>
        <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', fontWeight: 700, color: '#f4f4f8' }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function DataVizDemo() {
  const [dataset, setDataset] = useState<Dataset>('sales');
  const [range, setRange] = useState<Range>('1y');
  const [exporting, setExporting] = useState(false);

  const kpis = kpiData[dataset];
  const revenue = monthlyRevenue[range];
  const categories = categoryData[dataset];
  const growth = userGrowth[range];

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => setExporting(false), 1800);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#080810' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: 'rgba(13,13,26,0.8)' }}>
        <div className="demo-hdr" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.5rem', fontWeight: 800, color: '#f4f4f8', marginBottom: '4px' }}>Analytics Dashboard</h1>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>Raneen Company · Business Intelligence Platform</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Dataset tabs */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '3px', border: '1px solid rgba(255,255,255,0.07)' }}>
              {(['sales', 'marketing', 'operations'] as Dataset[]).map(d => (
                <button key={d} onClick={() => setDataset(d)} style={{ padding: '6px 16px', borderRadius: '8px', border: 'none', background: dataset === d ? 'rgba(99,102,241,0.25)' : 'transparent', color: dataset === d ? '#818cf8' : '#475569', fontFamily: 'var(--font-inter)', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize', transition: 'all 0.2s' }}>{d}</button>
              ))}
            </div>
            {/* Date range */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '3px', border: '1px solid rgba(255,255,255,0.07)' }}>
              {[['1m', '1 Month'], ['3m', '3 Months'], ['1y', '1 Year']].map(([v, l]) => (
                <button key={v} onClick={() => setRange(v as Range)} style={{ padding: '6px 14px', borderRadius: '8px', border: 'none', background: range === v ? 'rgba(99,102,241,0.25)' : 'transparent', color: range === v ? '#818cf8' : '#475569', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' }}>{l}</button>
              ))}
            </div>
            <button onClick={handleExport} className="btn-ghost" style={{ padding: '8px 18px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '7px' }}>
              {exporting ? (
                <>
                  <div style={{ width: '12px', height: '12px', border: '2px solid rgba(255,255,255,0.2)', borderTop: '2px solid #f4f4f8', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  Exporting…
                </>
              ) : (
                <>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v8m0 0L3 5.5M6.5 9l3.5-3.5M1 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Export CSV
                </>
              )}
            </button>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>

      <div className="demo-inner">
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '14px', marginBottom: '24px' }}>
          {[
            { label: 'Total Revenue', value: kpis.revenue, trend: '+14.2%', up: true, icon: '💰' },
            { label: 'Active Users', value: kpis.users, trend: '+8.7%', up: true, icon: '👥' },
            { label: 'Conversion Rate', value: kpis.conversion, trend: '+0.3%', up: true, icon: '📈' },
            { label: 'Avg Session', value: kpis.session, trend: '-0.5%', up: false, icon: '⏱️' },
          ].map(k => (
            <div key={k.label} className="glass-card" style={{ padding: '22px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: '#475569' }}>{k.label}</span>
                <span style={{ fontSize: '1.2rem' }}>{k.icon}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.8rem', fontWeight: 800, color: '#f4f4f8', lineHeight: 1, marginBottom: '8px' }}>{k.value}</div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: k.up ? '#4ade80' : '#f87171', background: k.up ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '6px' }}>
                {k.trend} vs last period
              </span>
            </div>
          ))}
        </div>

        {/* Chart grid */}
        <div className="chart-2col">
          {/* Revenue line chart */}
          <ChartCard title="Revenue vs Target" label="Performance">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={revenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                <Legend wrapperStyle={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem' }} />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Revenue" />
                <Line type="monotone" dataKey="target" stroke="rgba(99,102,241,0.3)" strokeWidth={1.5} strokeDasharray="5 5" dot={false} name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Category bar chart */}
          <ChartCard title="Revenue by Category" label="Breakdown">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categories} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${Number(v).toLocaleString()}`, '']} />
                <Bar dataKey="prev" fill="rgba(99,102,241,0.2)" radius={[4,4,0,0]} name="Previous" />
                <Bar dataKey="value" fill="#6366f1" radius={[4,4,0,0]} name="Current" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="chart-3col">
          {/* User growth area chart */}
          <ChartCard title="User Growth" label="Acquisition">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={growth} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'var(--font-mono)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [Number(v).toLocaleString(), '']} />
                <Area type="monotone" dataKey="users" stroke="#6366f1" strokeWidth={2} fill="url(#userGrad)" name="Total Users" />
                <Area type="monotone" dataKey="new" stroke="#818cf8" strokeWidth={1.5} fill="url(#newGrad)" name="New Users" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Traffic sources pie */}
          <ChartCard title="Traffic Sources" label="Channels">
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={trafficSources} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {trafficSources.map((s, i) => <Cell key={i} fill={s.color} />)}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {trafficSources.map(s => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: '#94a3b8' }}>{s.name}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#f4f4f8', fontWeight: 600 }}>{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </ChartCard>

          {/* Summary table */}
          <ChartCard title="Top Performers" label="Summary">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {categories.slice(0, 5).map((c, i) => {
                const pct = Math.round((c.value / categories.reduce((s, x) => s + x.value, 0)) * 100);
                return (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#475569', width: '16px' }}>#{i + 1}</span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: '#94a3b8', flex: 1 }}>{c.name}</span>
                    <div style={{ width: '80px', height: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                      <div style={{ width: `${pct * 3}%`, height: '100%', background: '#6366f1', borderRadius: '4px' }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', fontWeight: 700, color: '#f4f4f8', minWidth: '52px', textAlign: 'right' }}>${(c.value / 1000).toFixed(0)}K</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#4ade80', minWidth: '36px', textAlign: 'right' }}>+{Math.round(((c.value - c.prev) / c.prev) * 100)}%</span>
                  </div>
                );
              })}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
