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
  points: number;
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
  const lastMouseRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Draw sparkle star (4 or 5 pointed diamond star)
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

      // Star glow
      c.shadowBlur = radius * 3;
      c.shadowColor = color;
      c.fillStyle = color;

      // 4-pointed cross star (sparkle effect)
      c.beginPath();
      for (let i = 0; i < 4; i++) {
        c.lineTo(0, radius);
        c.quadraticCurveTo(0, 0, radius * 0.25, 0);
        c.lineTo(radius, 0);
        c.quadraticCurveTo(0, 0, 0, -radius * 0.25);
        c.rotate(Math.PI / 2);
      }
      c.closePath();
      c.fill();

      // Bright center core
      c.beginPath();
      c.arc(0, 0, radius * 0.35, 0, Math.PI * 2);
      c.fillStyle = '#ffffff';
      c.shadowBlur = radius * 2;
      c.shadowColor = '#ffffff';
      c.fill();

      c.restore();
    };

    // Animation render loop
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.vRot;
        p.size *= 0.985; // gently shrink

        if (p.alpha <= 0 || p.size <= 0.5) {
          particles.splice(i, 1);
          continue;
        }

        drawSparkle(ctx, p.x, p.y, p.size, p.color, p.alpha, p.rotation);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Mouse movement tracker to spawn sparkle particles
    const handleMouseMove = (e: MouseEvent) => {
      // Relative mouse percentage for nebula background
      const px = (e.clientX / window.innerWidth) * 100;
      const py = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x: px, y: py });

      const now = Date.now();
      const dist = Math.hypot(e.clientX - lastMouseRef.current.x, e.clientY - lastMouseRef.current.y);
      lastMouseRef.current = { x: e.clientX, y: e.clientY, time: now };

      // Spawn galaxy star trail
      const count = Math.min(Math.floor(dist / 6) + 1, 5);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.3;
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 16,
          y: e.clientY + (Math.random() - 0.5) * 16,
          size: Math.random() * 8 + 4, // 4px to 12px sparkle star
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          alpha: Math.random() * 0.4 + 0.6,
          decay: Math.random() * 0.018 + 0.012, // stays visible for ~1.5s
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.5,
          vy: Math.sin(angle) * speed - Math.random() * 0.6, // float upwards gently
          rotation: Math.random() * Math.PI,
          vRot: (Math.random() - 0.5) * 0.08,
          points: 4,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
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
        className="absolute -top-32 -left-32 w-[700px] h-[700px] rounded-full blur-[140px] opacity-25 mix-blend-screen transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, #ec4899 60%, transparent 100%)',
          transform: `translate(${mousePos.x * 0.15}px, ${mousePos.y * 0.15}px)`,
        }}
      />
      <div
        className="absolute top-1/2 -right-40 w-[750px] h-[750px] rounded-full blur-[150px] opacity-25 mix-blend-screen transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, #06b6d4 0%, #8b5cf6 60%, transparent 100%)',
          transform: `translate(${-mousePos.x * 0.2}px, ${-mousePos.y * 0.15}px)`,
        }}
      />
      <div
        className="absolute -bottom-40 left-1/3 w-[800px] h-[800px] rounded-full blur-[160px] opacity-20 mix-blend-screen transition-transform duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, #d946ef 0%, #3b82f6 60%, transparent 100%)',
          transform: `translate(${mousePos.x * 0.1}px, ${-mousePos.y * 0.1}px)`,
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
