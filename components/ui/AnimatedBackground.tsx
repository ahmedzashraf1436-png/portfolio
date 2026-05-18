'use client';

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>

      {/* Blob 1 — top-left, indigo */}
      <div
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          top: '-200px',
          left: '-180px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 68%)',
          filter: 'blur(80px)',
          animation: 'blobA 20s ease-in-out infinite',
        }}
      />

      {/* Blob 2 — top-right, violet */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          top: '-100px',
          right: '-160px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 68%)',
          filter: 'blur(90px)',
          animation: 'blobB 24s ease-in-out infinite',
        }}
      />

      {/* Blob 3 — mid-left, deep blue */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          top: '50%',
          left: '-120px',
          background: 'radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'blobC 28s ease-in-out infinite',
        }}
      />

      {/* Blob 4 — bottom-right */}
      <div
        style={{
          position: 'absolute',
          width: '580px',
          height: '580px',
          bottom: '-100px',
          right: '-100px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.09) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'blobD 22s ease-in-out infinite',
        }}
      />

      {/* Dot grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 0%, transparent 50%, #080810 100%)',
        }}
      />

      <style>{`
        @keyframes blobA {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(60px,80px) scale(1.12); }
          66%      { transform: translate(-30px,40px) scale(0.92); }
        }
        @keyframes blobB {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-70px,50px) scale(0.9); }
          66%      { transform: translate(40px,80px) scale(1.1); }
        }
        @keyframes blobC {
          0%,100% { transform: translate(0,0) scale(1); }
          40%      { transform: translate(50px,-60px) scale(1.08); }
          70%      { transform: translate(-20px,30px) scale(0.95); }
        }
        @keyframes blobD {
          0%,100% { transform: translate(0,0) scale(1); }
          35%      { transform: translate(-50px,-40px) scale(1.1); }
          70%      { transform: translate(30px,60px) scale(0.9); }
        }
      `}</style>
    </div>
  );
}
