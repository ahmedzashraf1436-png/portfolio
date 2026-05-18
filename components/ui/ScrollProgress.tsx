'use client';
import { useScroll, useSpring, motion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9999] origin-left"
      style={{
        scaleX,
        height: '1px',
        background: '#6366f1',
        opacity: 0.7,
      }}
    />
  );
}
