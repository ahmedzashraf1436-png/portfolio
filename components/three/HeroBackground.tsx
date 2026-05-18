'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth, H = el.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ─── Particle sphere ────────────────────────────────────────────────
    const COUNT = 1200;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r * 2.2;
      const z = Math.sin(theta) * r * 2.2;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y * 2.2;
      positions[i * 3 + 2] = z;

      const t = i / COUNT;
      colors[i * 3] = 0 + t * 0.1;
      colors[i * 3 + 1] = 0.5 + t * 0.5;
      colors[i * 3 + 2] = 1.0;
    }

    const sphereGeo = new THREE.BufferGeometry();
    sphereGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    sphereGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const sphereMat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.7, sizeAttenuation: true });
    const sphere = new THREE.Points(sphereGeo, sphereMat);
    scene.add(sphere);

    // ─── Wireframe icosahedron ───────────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.08 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    // ─── Inner glowing sphere ────────────────────────────────────────────
    const innerGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.03, wireframe: false });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // ─── Floating particles background ──────────────────────────────────
    const bgCount = 300;
    const bgPos = new Float32Array(bgCount * 3);
    for (let i = 0; i < bgCount; i++) {
      bgPos[i * 3] = (Math.random() - 0.5) * 20;
      bgPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      bgPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    const bgGeo = new THREE.BufferGeometry();
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
    const bgMat = new THREE.PointsMaterial({ size: 0.008, color: 0x00d4ff, transparent: true, opacity: 0.3 });
    const bgParticles = new THREE.Points(bgGeo, bgMat);
    scene.add(bgParticles);

    // ─── Mouse parallax ─────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouse);

    // ─── Resize ──────────────────────────────────────────────────────────
    const onResize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ─── Animation loop ──────────────────────────────────────────────────
    let raf: number;
    let t = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      t += 0.004;

      sphere.rotation.y = t * 0.3 + mouseX * 0.3;
      sphere.rotation.x = mouseY * 0.2;

      ico.rotation.y = -t * 0.15 + mouseX * 0.15;
      ico.rotation.x = t * 0.1 + mouseY * 0.1;

      bgParticles.rotation.y = t * 0.03;

      sphereMat.opacity = 0.5 + Math.sin(t * 2) * 0.1;
      icoMat.opacity = 0.05 + Math.sin(t * 1.5) * 0.03;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
