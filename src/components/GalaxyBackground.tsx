import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
}

const STAR_COLORS = [
  '#38bdf8', // sky cyan
  '#a855f7', // cosmic purple
  '#f43f5e', // rose pink
  '#facc15', // star gold
  '#ffffff', // diamond white
  '#22d3ee', // neon cyan
];

export const GalaxyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Optimized Sparkle Star drawing
    const drawSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      color: string,
      alpha: number,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.globalAlpha = Math.max(0, alpha);

      c.fillStyle = color;

      // 4-pointed diamond sparkle star
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(0, radius);
        c.quadraticCurveTo(0, 0, radius * 0.22, 0);
        c.lineTo(radius, 0);
        c.quadraticCurveTo(0, 0, 0, -radius * 0.22);
        c.rotate(Math.PI / 2);
      }
      c.closePath();
      c.fill();

      // Bright diamond center core
      c.beginPath();
      c.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
      c.fillStyle = '#ffffff';
      c.fill();

      c.restore();
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.vRot;
        p.size *= 0.985;

        if (p.alpha <= 0 || p.size <= 0.5) {
          particles.splice(i, 1);
          continue;
        }

        drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Spawn sparkles along cursor or finger drag trail
    const spawnSparkles = (clientX: number, clientY: number) => {
      const px = (clientX / window.innerWidth) * 100;
      const py = (clientY / window.innerHeight) * 100;
      setMousePos({ x: px, y: py });

      const dist = Math.hypot(clientX - lastPosRef.current.x, clientY - lastPosRef.current.y);
      lastPosRef.current = { x: clientX, y: clientY, time: Date.now() };

      const count = Math.min(Math.floor(dist / 6) + 1, 4);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.3;
        particlesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 16,
          y: clientY + (Math.random() - 0.5) * 16,
          size: Math.random() * 8 + 4,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          alpha: Math.random() * 0.4 + 0.6,
          decay: Math.random() * 0.02 + 0.015,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.4,
          vy: Math.sin(angle) * speed - Math.random() * 0.5,
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.08,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      spawnSparkles(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        spawnSparkles(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#02050f]">
      {/* ── Interactive Cursor Follow Spotlight Glow ── */}
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-all duration-300 ease-out opacity-45 mix-blend-screen pointer-events-none"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          background: `radial-gradient(circle, rgba(56, 189, 248, 0.45) 0%, rgba(168, 85, 247, 0.35) 45%, rgba(244, 63, 94, 0.15) 75%, transparent 100%)`,
        }}
      />

      {/* ── Ambient Floating Galaxy Clouds ── */}
      <div
        className="absolute -top-32 -left-32 w-[600px] sm:w-[700px] h-[600px] sm:h-[700px] rounded-full blur-[130px] opacity-25 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, #ec4899 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute top-1/2 -right-40 w-[600px] sm:w-[750px] h-[600px] sm:h-[750px] rounded-full blur-[130px] opacity-25 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #8b5cf6 60%, transparent 100%)',
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[650px] sm:w-[800px] h-[650px] sm:h-[800px] rounded-full blur-[130px] opacity-20 mix-blend-screen pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #d946ef 0%, #3b82f6 60%, transparent 100%)',
        }}
      />

      {/* ── Deep Galaxy Starfield Matrix ── */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 30px 40px, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 160px 190px, #38bdf8, transparent),
            radial-gradient(1px 1px at 340px 90px, #f43f5e, transparent),
            radial-gradient(2px 2px at 480px 310px, #e879f9, transparent),
            radial-gradient(1px 1px at 620px 160px, #ffffff, transparent),
            radial-gradient(1.5px 1.5px at 820px 340px, #38bdf8, transparent),
            radial-gradient(1px 1px at 960px 110px, #ffffff, transparent)
          `,
          backgroundSize: '1000px 600px',
        }}
      />

      {/* ── Real-time Sparkling Star Dust Canvas Trail (Blink Blink Galaxy Trail) ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Subtle Depth Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,5,15,0.65)_100%)] pointer-events-none" />
    </div>
  );
};

export default GalaxyBackground;
