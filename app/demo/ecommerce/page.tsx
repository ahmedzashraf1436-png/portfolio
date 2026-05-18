'use client';
import { useState } from 'react';

interface Product {
  id: number; name: string; price: number; category: string;
  description: string; rating: number; reviews: number;
  gradient: string; icon: string; badge?: string;
}

const products: Product[] = [
  { id: 1, name: 'MacBook Pro M4', price: 1299, category: 'Laptops', rating: 4.9, reviews: 2847, badge: 'Best Seller', icon: '💻', gradient: 'linear-gradient(135deg,#312e81,#4f46e5)', description: '14-inch Liquid Retina XDR display, M4 chip, 16GB RAM, 512GB SSD. The most powerful MacBook Pro ever.' },
  { id: 2, name: 'AirPods Pro 3', price: 249, category: 'Audio', rating: 4.8, reviews: 5310, badge: 'New', icon: '🎧', gradient: 'linear-gradient(135deg,#1e3a5f,#2563eb)', description: 'Active Noise Cancellation, Adaptive Audio, H3 chip, 30hr battery life with case. Exceptional sound quality.' },
  { id: 3, name: 'iPad Pro M4 13"', price: 1099, category: 'Tablets', rating: 4.7, reviews: 1923, icon: '📱', gradient: 'linear-gradient(135deg,#1e4d40,#059669)', description: 'Ultra Retina XDR tandem OLED display, M4 chip, 256GB. Thinnest Apple product ever made.' },
  { id: 4, name: 'Apple Watch Ultra 2', price: 799, category: 'Wearables', rating: 4.6, reviews: 988, icon: '⌚', gradient: 'linear-gradient(135deg,#7c1d6f,#db2777)', description: '49mm titanium case, precision dual-frequency GPS, 60hr battery, Action button. Built for extremes.' },
  { id: 5, name: 'Keychron Q3 Max', price: 189, category: 'Peripherals', rating: 4.8, reviews: 3201, badge: 'Popular', icon: '⌨️', gradient: 'linear-gradient(135deg,#14532d,#16a34a)', description: 'QMK/VIA wireless mechanical keyboard, Gateron G Pro switches, CNC aluminium body, hot-swap.' },
  { id: 6, name: 'LG UltraFine 5K 27"', price: 699, category: 'Monitors', rating: 4.7, reviews: 742, icon: '🖥️', gradient: 'linear-gradient(135deg,#4a1d96,#7c3aed)', description: '5120×2880 IPS, 96W USB-C, Thunderbolt 4, built-in speakers and webcam. Perfect for creators.' },
  { id: 7, name: 'Anker USB-C Hub 12-in-1', price: 79, category: 'Accessories', rating: 4.5, reviews: 8847, icon: '🔌', gradient: 'linear-gradient(135deg,#78350f,#d97706)', description: 'HDMI 4K, 3× USB-A, 2× USB-C, SD/microSD, Ethernet, 100W PD. Essential for modern workstations.' },
  { id: 8, name: 'Samsung 990 Pro 2TB', price: 149, category: 'Storage', rating: 4.9, reviews: 4102, icon: '💾', gradient: 'linear-gradient(135deg,#1e3a5f,#0ea5e9)', description: 'PCIe 4.0 NVMe SSD, 7,450MB/s read, 6,900MB/s write, included heatsink, 10yr warranty.' },
];

const orders = [
  { id: 'ORD-8841', date: 'May 15, 2025', status: 'Delivered', total: 1448, items: ['MacBook Pro M4', 'Anker USB-C Hub 12-in-1'] },
  { id: 'ORD-8790', date: 'May 2, 2025', status: 'Shipped', total: 249, items: ['AirPods Pro 3'] },
  { id: 'ORD-8712', date: 'Apr 18, 2025', status: 'Delivered', total: 888, items: ['Apple Watch Ultra 2', 'Keychron Q3 Max'] },
];

const statusColor: Record<string, string> = {
  Delivered: '#4ade80', Shipped: '#60a5fa', Processing: '#fbbf24',
};

export default function EcommerceDemo() {
  const [view, setView] = useState<'shop' | 'orders'>('shop');
  const [cart, setCart] = useState<{ product: Product; qty: number }[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'done'>('cart');
  const [qty, setQty] = useState(1);

  const addToCart = (p: Product, q = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === p.id);
      if (existing) return prev.map(i => i.product.id === p.id ? { ...i, qty: i.qty + q } : i);
      return [...prev, { product: p, qty: q }];
    });
    setCartOpen(true);
    setSelected(null);
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(i => i.product.id !== id));
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#080810' }}>
      {/* App Header */}
      <header style={{
        position: 'sticky', top: '52px', zIndex: 100,
        background: 'rgba(8,8,16,0.95)', backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <div className="demo-ecom-hdr">
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <span style={{ fontFamily: 'var(--font-outfit)', fontWeight: 800, fontSize: '1.2rem', color: '#f4f4f8', letterSpacing: '-0.03em' }}>
              Tech<span style={{ color: '#6366f1' }}>Store</span>
            </span>
            <nav style={{ display: 'flex', gap: '4px' }}>
              {(['shop', 'orders'] as const).map(v => (
                <button key={v} onClick={() => setView(v)} style={{
                  padding: '6px 16px', borderRadius: '8px', border: 'none',
                  background: view === v ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: view === v ? '#818cf8' : '#475569',
                  fontFamily: 'var(--font-inter)', fontSize: '0.85rem', fontWeight: 500,
                  cursor: 'pointer', transition: 'all 0.2s', textTransform: 'capitalize',
                }}>
                  {v === 'shop' ? 'Shop' : 'My Orders'}
                </button>
              ))}
            </nav>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="demo-welcome" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>
              Welcome, Ahmed
            </span>
            <button onClick={() => { setCartOpen(true); setCheckoutStep('cart'); }} style={{
              position: 'relative', padding: '8px 20px', borderRadius: '10px',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
              color: '#818cf8', fontFamily: 'var(--font-inter)', fontSize: '0.85rem',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 1h2l2.4 9h7.2l1.4-6H4M6 13.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0M11 13.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Cart
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#6366f1', color: '#fff',
                  fontSize: '0.65rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="demo-ecom-body">
        {view === 'shop' ? (
          <>
            {/* Hero banner */}
            <div style={{
              borderRadius: '20px', marginBottom: '40px', padding: 'clamp(20px, 5vw, 48px)',
              background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)',
              border: '1px solid rgba(99,102,241,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px',
            }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#6366f1', letterSpacing: '0.18em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>New Arrivals — May 2025</span>
                <h1 style={{ fontFamily: 'var(--font-outfit)', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 800, color: '#f4f4f8', letterSpacing: '-0.03em', marginBottom: '12px' }}>
                  Premium Tech,<br />Delivered Fast
                </h1>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', color: '#94a3b8' }}>
                  Free shipping on orders over $200 · 30-day returns
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['💻 Laptops', '🎧 Audio', '⌚ Wearables'].map(tag => (
                  <span key={tag} style={{ padding: '8px 18px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#94a3b8' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Product grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: '16px' }}>
              {products.map(p => (
                <div key={p.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  {/* Product image area */}
                  <div
                    onClick={() => { setSelected(p); setQty(1); }}
                    style={{ height: '180px', background: p.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem', cursor: 'pointer', position: 'relative' }}
                  >
                    {p.badge && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', padding: '3px 10px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#f4f4f8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{p.badge}</span>
                    )}
                    {p.icon}
                  </div>
                  {/* Info */}
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: '#6366f1', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{p.category}</span>
                    <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', fontWeight: 700, color: '#f4f4f8', letterSpacing: '-0.01em', cursor: 'pointer' }} onClick={() => { setSelected(p); setQty(1); }}>{p.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#fbbf24', fontSize: '0.75rem' }}>{'★'.repeat(Math.round(p.rating))}</span>
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', color: '#475569' }}>{p.rating} ({p.reviews.toLocaleString()})</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '12px' }}>
                      <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.2rem', fontWeight: 800, color: '#f4f4f8' }}>${p.price.toLocaleString()}</span>
                      <button onClick={() => addToCart(p)} style={{
                        padding: '8px 18px', borderRadius: '8px',
                        background: '#6366f1', border: 'none', color: '#fff',
                        fontFamily: 'var(--font-inter)', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#818cf8')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#6366f1')}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Orders view */
          <div>
            <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.75rem', fontWeight: 700, color: '#f4f4f8', marginBottom: '32px' }}>Order History</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {orders.map(o => (
                <div key={o.id} className="glass-card" style={{ padding: '28px 32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#f4f4f8', fontWeight: 600 }}>{o.id}</span>
                        <span style={{ padding: '2px 10px', borderRadius: '20px', background: `${statusColor[o.status]}22`, border: `1px solid ${statusColor[o.status]}44`, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: statusColor[o.status], letterSpacing: '0.1em', textTransform: 'uppercase' }}>{o.status}</span>
                      </div>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#475569', marginBottom: '4px' }}>{o.date}</p>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#94a3b8' }}>{o.items.join(' · ')}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.4rem', fontWeight: 800, color: '#f4f4f8' }}>${o.total.toLocaleString()}</div>
                      <button style={{ marginTop: '8px', padding: '6px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#94a3b8', fontFamily: 'var(--font-inter)', fontSize: '0.78rem', cursor: 'pointer' }}>View Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selected && (
        <div
          onClick={e => e.target === e.currentTarget && setSelected(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}
        >
          <div className="glass-card" style={{ maxWidth: '640px', width: '100%', overflow: 'hidden' }}>
            <div style={{ height: '220px', background: selected.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem' }}>
              {selected.icon}
            </div>
            <div style={{ padding: '32px' }}>
              <span className="label" style={{ marginBottom: '8px' }}>{selected.category}</span>
              <h2 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.6rem', fontWeight: 800, color: '#f4f4f8', marginBottom: '12px' }}>{selected.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ color: '#fbbf24' }}>{'★'.repeat(Math.round(selected.rating))}</span>
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>{selected.rating} · {selected.reviews.toLocaleString()} reviews</span>
              </div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '24px' }}>{selected.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '2rem', fontWeight: 800, color: '#f4f4f8' }}>${selected.price.toLocaleString()}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden' }}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '8px 14px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>−</button>
                    <span style={{ padding: '8px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: '#f4f4f8', borderLeft: '1px solid rgba(255,255,255,0.08)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} style={{ padding: '8px 14px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem' }}>+</button>
                  </div>
                  <button onClick={() => addToCart(selected, qty)} className="btn-primary" style={{ fontSize: '0.88rem', padding: '10px 24px' }}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', width: '32px', height: '32px', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>×</button>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex' }} onClick={e => e.target === e.currentTarget && setCartOpen(false)}>
          <div style={{ flex: 1 }} onClick={() => setCartOpen(false)} />
          <div style={{ width: '400px', maxWidth: '90vw', background: '#0d0d1a', borderLeft: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Cart header */}
            <div style={{ padding: '24px 28px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.15rem', fontWeight: 700, color: '#f4f4f8' }}>
                {checkoutStep === 'cart' ? 'Your Cart' : checkoutStep === 'checkout' ? 'Checkout' : 'Order Placed!'}
              </h3>
              <button onClick={() => { setCartOpen(false); setCheckoutStep('cart'); }} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1.4rem', lineHeight: 1 }}>×</button>
            </div>

            {checkoutStep === 'done' ? (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(74,222,128,0.12)', border: '1px solid rgba(74,222,128,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M5 14l6 6 12-12" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.3rem', fontWeight: 700, color: '#f4f4f8' }}>Order Confirmed!</h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#94a3b8', textAlign: 'center' }}>Your order has been placed successfully. You'll receive a confirmation email shortly.</p>
                <button onClick={() => { setCartOpen(false); setCheckoutStep('cart'); setCart([]); setView('orders'); }} className="btn-primary" style={{ marginTop: '8px' }}>View Orders</button>
              </div>
            ) : checkoutStep === 'checkout' ? (
              <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[['Full Name', 'text', 'Ahmed Ashraf'], ['Email', 'email', 'ahmedz.ashraf1436@gmail.com'], ['Address', 'text', ''], ['City', 'text', 'Sheikh Zayed City'], ['Card Number', 'text', '•••• •••• •••• ••••']].map(([label, type, placeholder]) => (
                    <label key={label as string} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span className="label" style={{ fontSize: '0.6rem' }}>{label as string}</span>
                      <input type={type as string} defaultValue={placeholder as string} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: '8px', padding: '10px 14px', color: '#f4f4f8', fontFamily: 'var(--font-inter)', fontSize: '0.875rem', outline: 'none' }} />
                    </label>
                  ))}
                </div>
                <div style={{ marginTop: '24px', padding: '16px', borderRadius: '10px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px' }}>
                    <span>Subtotal</span><span>${total.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px' }}>
                    <span>Shipping</span><span style={{ color: '#4ade80' }}>Free</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-outfit)', fontSize: '1.1rem', fontWeight: 700, color: '#f4f4f8', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <span>Total</span><span>${total.toLocaleString()}</span>
                  </div>
                </div>
                <button onClick={() => setCheckoutStep('done')} className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>Confirm Order →</button>
                <button onClick={() => setCheckoutStep('cart')} style={{ width: '100%', marginTop: '10px', padding: '10px', background: 'transparent', border: 'none', color: '#475569', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', cursor: 'pointer' }}>← Back to Cart</button>
              </div>
            ) : (
              <>
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {cart.length === 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '200px', gap: '12px' }}>
                      <span style={{ fontSize: '2.5rem' }}>🛒</span>
                      <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#475569' }}>Your cart is empty</p>
                    </div>
                  ) : cart.map(item => (
                    <div key={item.product.id} style={{ display: 'flex', gap: '14px', padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: item.product.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', flexShrink: 0 }}>{item.product.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.9rem', fontWeight: 700, color: '#f4f4f8', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.product.name}</p>
                        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#475569' }}>Qty: {item.qty} · ${(item.product.price * item.qty).toLocaleString()}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.product.id)} style={{ background: 'transparent', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '1.1rem', padding: '0 4px', flexShrink: 0 }}>×</button>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-outfit)', fontSize: '1.1rem', fontWeight: 700, color: '#f4f4f8', marginBottom: '16px' }}>
                      <span>Total</span><span>${total.toLocaleString()}</span>
                    </div>
                    <button onClick={() => setCheckoutStep('checkout')} className="btn-primary" style={{ width: '100%' }}>Proceed to Checkout →</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
