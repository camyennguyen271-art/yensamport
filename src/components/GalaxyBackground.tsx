import React, { useEffect, useState } from 'react';

export const GalaxyBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse coordinates (0 - 100%)
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,5,15,0.7)_100%)] pointer-events-none" />
    </div>
  );
};
