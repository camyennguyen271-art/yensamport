import React, { useState, useRef, useEffect } from 'react';
import { DotMatrixHeader } from './DotMatrixHeader';
import { Mail, ArrowDown, Sparkles, Check, Copy, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HeroSectionProps {
  onContactClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onContactClick,
  onNavigate,
}) => {
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Data State
  const [heroData, setHeroData] = useState({
    title: 'NGUYỄN THỊ CẨM YẾN',
    subtitle: 'YẾN SAM · MEDIA SPECIALIST',
    tagline: 'Proactive · Friendly · Motivated Ambivert',
    description: 'Connecting strategic communication, viral media production, and artist management through a holistic, creative problem-solving approach.',
    email: 'camyen.nguyen.271@gmail.com',
    imageUrl: '/src/assets/images/hero_yen_portrait_1790314347035.jpg'
  });

  useEffect(() => {
    const fetchHeroData = async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('content_json')
        .eq('section_name', 'hero')
        .single();
      
      if (!error && data && data.content_json) {
        setHeroData((prev) => ({ ...prev, ...data.content_json }));
      }
    };
    fetchHeroData();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(heroData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-6 pb-24 overflow-hidden bg-[#030611] select-none"
    >
      {/* Dynamic Cursor Tracking Ambient Glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 ease-out"
        style={{
          background: `
            radial-gradient(650px circle at ${mousePos.x}% ${mousePos.y}%, rgba(14, 165, 233, 0.22), transparent 60%),
            radial-gradient(550px circle at ${100 - mousePos.x * 0.8}% ${mousePos.y * 1.1}%, rgba(225, 29, 72, 0.15), transparent 50%),
            radial-gradient(800px circle at 50% 45%, rgba(30, 58, 138, 0.35), transparent 75%)
          `,
        }}
      />

      {/* Atmospheric Dual-Color Stage Glows (Inspired by the Reference Image) */}
      <div className="pointer-events-none absolute top-1/4 -left-20 w-[450px] h-[450px] rounded-full bg-cyan-700/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-rose-600/18 blur-[140px]" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-900/25 blur-[160px]" />

      {/* Subtle Grid Backdrop */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* 1. TOP TITLE HEADER: Large Dot-Matrix/LED Pixel Typography */}
      <div className="w-full max-w-6xl mx-auto z-10 pt-2 pb-4">
        <DotMatrixHeader text="MEDIA SPECIALIST" />
      </div>

      {/* 2. MAIN CENTER HERO SUBJECT WITH ORBIT AESTHETIC */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center py-4 my-auto">
        
        {/* Orbit container with circular geometry */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] aspect-[4/5] flex items-center justify-center">
          
          {/* Subtle Outer Glowing Orbit Arc */}
          <div className="absolute inset-[-12%] sm:inset-[-14%] rounded-full border border-white/[0.12] pointer-events-none transition-transform duration-1000">
            {/* Soft luminous pulse ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-pulse" />
          </div>


          {/* Hero Portrait Container with Studio Glow and Contrast Scrim */}
          <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] bg-gradient-to-b from-slate-900 to-[#02050f]">
            {/* Background dynamic rim shadow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 via-transparent to-rose-800/30 mix-blend-screen z-10 pointer-events-none" />
            
            {/* Candidate Editorial Portrait */}
            <img
              src={heroData.imageUrl}
              alt={heroData.title}
              className="w-full h-full object-cover object-center filter contrast-105 brightness-95 transform scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
              loading="eager"
            />

            {/* Bottom Scrim for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030611] via-[#030611]/40 to-transparent z-10 pointer-events-none" />

            {/* In-Frame Candidate Identity Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-20 text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/15 text-[11px] font-mono tracking-widest uppercase text-cyan-300 backdrop-blur-md mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                {heroData.subtitle}
              </span>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-display drop-shadow-md">
                {heroData.title}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-sm mx-auto font-normal leading-relaxed drop-shadow">
                {heroData.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Orbit Curved Editorial Arc Statement */}
        <div className="mt-6 text-center max-w-xl mx-auto px-4">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {heroData.description}
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
            <button
              onClick={() => onNavigate('experience')}
              className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/90 border border-white/20 hover:bg-slate-700 hover:border-cyan-400/50 transition-all cursor-pointer shadow-sm"
            >
              View Work Experience
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="px-4 py-2 rounded-full text-xs font-semibold text-white bg-slate-800/90 border border-white/20 hover:bg-slate-700 hover:border-rose-400/50 transition-all cursor-pointer shadow-sm"
            >
              Explore Key Projects
            </button>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white text-slate-900 hover:bg-cyan-100 hover:text-cyan-950 transition-all cursor-pointer shadow-md"
              title="Click to copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Email Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{heroData.email}</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-1.5 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={() => onNavigate('about')}>
        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 text-cyan-400 animate-bounce" />
      </div>
    </section>
  );
};
