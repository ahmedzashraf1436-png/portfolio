'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const mx = useMotionValue(-40);
  const my = useMotionValue(-40);
  const sx = useSpring(mx, { stiffness: 300, damping: 28, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 300, damping: 28, mass: 0.5 });

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches);

    const onMove = (e: MouseEvent) => { mx.set(e.clientX); my.set(e.clientY); };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsPointer(!!t.closest('a, button, [role="button"], input, textarea'));
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseover', onOver); };
  }, [mx, my]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full"
      style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width:  isPointer ? 36 : 10,
        height: isPointer ? 36 : 10,
        background: isPointer ? 'transparent' : '#6366f1',
        border: isPointer ? '1.5px solid rgba(255,255,255,0.5)' : '1.5px solid transparent',
        opacity: isPointer ? 0.7 : 0.85,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    />
  );
}
