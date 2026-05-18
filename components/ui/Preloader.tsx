'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ background: '#0d0d0f' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <motion.span
            className="text-2xl font-bold tracking-widest"
            style={{ fontFamily: 'var(--font-outfit)', color: '#6366f1', letterSpacing: '0.2em' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            AA
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
