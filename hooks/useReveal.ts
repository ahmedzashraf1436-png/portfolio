'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.reveal'),
        { y: 30, opacity: 0, filter: 'blur(3px)' },
        {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.75, stagger: 0.09, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
