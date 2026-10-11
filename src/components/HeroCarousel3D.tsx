import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useI18n } from '../lib/i18n';
import { ChevronLeft, ChevronRight, ExternalLink, Play } from 'lucide-react';

// ─── Card Data ──────────────────────────────────────────────────────────────

const PORTRAIT_URL =
  'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790476859491_lrkwz.jpg';

const CARDS_VI = [
  {
    id: 'portrait',
    type: 'portrait',
    image: PORTRAIT_URL,
    label: '🎬 Creative Director',
    name: 'Nguyễn Thị Cẩm Yến',
    nick: 'Yến Sam',
    role: 'Media Specialist · Đạo diễn MV',
    accent: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/40',
  },
  {
    id: 'keywords',
    type: 'keywords',
    label: '✦ Hồ Sơ Năng Lực',
    logline: '"Biến tầm nhìn sáng tạo thành những dự án truyền thông để đời."',
    keywords: [
      'Đạo diễn MV', 'Motion Design', 'Visual Storytelling',
      'Media Strategy', 'Event Production', 'Creative Leadership',
      'AI × Art', 'Truyền thông số',
    ],
    accent: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/40',
  },
  {
    id: 'mv-giai-dieu',
    type: 'project',
    image: 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-giai-dieu-viet-nam-minh.jpg',
    label: '🎵 Dự Án Nổi Bật',
    title: 'MV "Giai Điệu Việt Nam Mình"',
    sub: 'feat. Masew · FPT Edu',
    tags: ['MV Production', 'Cultural', '10M+ Views'],
    accent: 'from-yellow-500 to-orange-600',
    glow: 'shadow-orange-500/40',
  },
  {
    id: 'fpt-hackathon',
    type: 'project',
    image: 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790480293325_1mi92.jpg',
    label: '🏆 Giải Thưởng',
    title: 'FPT Edu Hackathon 2024',
    sub: 'Trưởng ban truyền thông',
    tags: ['Hackathon', 'Event', 'National Scale'],
    accent: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/40',
  },
  {
    id: 'mv-ai',
    type: 'project',
    image: 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-ai-bon-voyaige.jpg',
    label: '🤖 AI × Sáng Tạo',
    title: 'MV AI "Bon VoyAIge"',
    sub: 'Ứng dụng AI tạo sinh trong MV',
    tags: ['AI Generative', 'MV', 'Innovation'],
    accent: 'from-violet-500 to-purple-600',
    glow: 'shadow-purple-500/40',
  },
];

const CARDS_EN = [
  {
    id: 'portrait',
    type: 'portrait',
    image: PORTRAIT_URL,
    label: '🎬 Creative Director',
    name: 'Nguyen Thi Cam Yen',
    nick: 'Yen Sam',
    role: 'Media Specialist · MV Director',
    accent: 'from-cyan-500 to-blue-600',
    glow: 'shadow-cyan-500/40',
  },
  {
    id: 'keywords',
    type: 'keywords',
    label: '✦ Creative Profile',
    logline: '"Turning creative vision into media projects that leave a lasting mark."',
    keywords: [
      'MV Director', 'Motion Design', 'Visual Storytelling',
      'Media Strategy', 'Event Production', 'Creative Leadership',
      'AI × Art', 'Digital Media',
    ],
    accent: 'from-rose-500 to-pink-600',
    glow: 'shadow-rose-500/40',
  },
  {
    id: 'mv-giai-dieu',
    type: 'project',
    image: 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-giai-dieu-viet-nam-minh.jpg',
    label: '🎵 Featured Project',
    title: 'MV "Giai Dieu Viet Nam Minh"',
    sub: 'feat. Masew · FPT Edu',
    tags: ['MV Production', 'Cultural', '10M+ Views'],
    accent: 'from-yellow-500 to-orange-600',
    glow: 'shadow-orange-500/40',
  },
  {
    id: 'fpt-hackathon',
    type: 'project',
    image: 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790480293325_1mi92.jpg',
    label: '🏆 Award',
    title: 'FPT Edu Hackathon 2024',
    sub: 'Head of Communications',
    tags: ['Hackathon', 'Event', 'National Scale'],
    accent: 'from-green-500 to-emerald-600',
    glow: 'shadow-green-500/40',
  },
  {
    id: 'mv-ai',
    type: 'project',
    image: 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-ai-bon-voyaige.jpg',
    label: '🤖 AI × Creativity',
    title: 'AI MV "Bon VoyAIge"',
    sub: 'Generative AI applied in MV',
    tags: ['AI Generative', 'MV', 'Innovation'],
    accent: 'from-violet-500 to-purple-600',
    glow: 'shadow-purple-500/40',
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const TOTAL = CARDS_VI.length;
// Angle per card: evenly distributed around a circle
const ANGLE_STEP = 360 / TOTAL;

function getCardAngle(index: number, activeIndex: number): number {
  return (index - activeIndex) * ANGLE_STEP;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface CardProps {
  card: (typeof CARDS_VI)[number];
  angle: number;          // degrees Y rotation
  isActive: boolean;
  onClick: () => void;
}

const RADIUS = 420; // px — distance from center to card

function Card3D({ card, angle, isActive, onClick }: CardProps) {
  // Determine how "visible" this card is: active = 0°, ±ANGLE_STEP = one step away etc.
  const absAngle = Math.abs(((angle % 360) + 540) % 360 - 180);
  // absAngle: 0 = front, 180 = back
  const opacity = absAngle > 90 ? 0 : 1 - absAngle / 110;
  const scale = isActive ? 1 : 0.82 - (absAngle / 180) * 0.1;
  const zIndex = isActive ? 10 : Math.round(10 - absAngle / 18);

  const style: React.CSSProperties = {
    position: 'absolute',
    width: 280,
    height: 380,
    left: '50%',
    top: '50%',
    marginLeft: -140,
    marginTop: -190,
    transform: `rotateY(${angle}deg) translateZ(${RADIUS}px) scale(${scale})`,
    opacity,
    zIndex,
    transition: 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.7s ease, scale 0.7s ease',
    cursor: isActive ? 'default' : 'pointer',
    willChange: 'transform, opacity',
  };

  const base =
    'w-full h-full rounded-2xl overflow-hidden relative select-none border border-white/10 backdrop-blur-sm';
  const activeRing = isActive
    ? `ring-2 ring-white/30 shadow-2xl ${card.glow}`
    : 'shadow-lg';

  return (
    <div style={style} onClick={!isActive ? onClick : undefined} role="button" tabIndex={isActive ? -1 : 0}>
      <div className={`${base} ${activeRing} transition-all duration-500`}>
        {card.type === 'portrait' && <PortraitCard card={card as any} isActive={isActive} />}
        {card.type === 'keywords' && <KeywordsCard card={card as any} isActive={isActive} />}
        {card.type === 'project' && <ProjectCard card={card as any} isActive={isActive} />}

        {/* Active glow border overlay */}
        {isActive && (
          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${card.accent} opacity-10 pointer-events-none`} />
        )}
      </div>
    </div>
  );
}

function PortraitCard({ card, isActive }: { card: any; isActive: boolean }) {
  return (
    <div className="w-full h-full bg-slate-900 relative">
      <img
        src={card.image}
        alt={card.name}
        className="w-full h-full object-cover object-top"
        loading="lazy"
      />
      {/* Gradient overlay bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

      {/* Top label */}
      <div className="absolute top-3 left-3 right-3">
        <span className={`text-xs font-mono font-bold px-2 py-1 rounded-full bg-gradient-to-r ${card.accent} text-white/90`}>
          {card.label}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-display font-extrabold text-lg leading-tight tracking-tight">
          {card.name}
        </p>
        <p className={`text-sm font-bold bg-gradient-to-r ${card.accent} bg-clip-text text-transparent`}>
          {card.nick}
        </p>
        <p className="text-xs text-slate-300 mt-1 font-mono">{card.role}</p>
      </div>
    </div>
  );
}

function KeywordsCard({ card, isActive }: { card: any; isActive: boolean }) {
  return (
    <div className={`w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 p-5 flex flex-col`}>
      {/* Label */}
      <span className={`text-xs font-mono font-bold px-2 py-1 rounded-full bg-gradient-to-r ${card.accent} text-white/90 self-start mb-4`}>
        {card.label}
      </span>

      {/* Keywords grid */}
      <div className="flex flex-wrap gap-2 flex-1">
        {card.keywords.map((kw: string, i: number) => (
          <span
            key={i}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-medium hover:bg-white/10 transition-colors"
          >
            {kw}
          </span>
        ))}
      </div>

      {/* Logline */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-slate-300 italic leading-relaxed font-light">
          {card.logline}
        </p>
      </div>

      {/* Decorative gradient orbs */}
      <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${card.accent} opacity-20 blur-2xl pointer-events-none`} />
      <div className={`absolute -top-5 -left-5 w-20 h-20 rounded-full bg-gradient-to-br ${card.accent} opacity-10 blur-xl pointer-events-none`} />
    </div>
  );
}

function ProjectCard({ card, isActive }: { card: any; isActive: boolean }) {
  return (
    <div className="w-full h-full bg-slate-900 relative">
      {/* BG image */}
      <img
        src={card.image}
        alt={card.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-slate-900/10" />

      {/* Top label */}
      <div className="absolute top-3 left-3 right-3">
        <span className={`text-xs font-mono font-bold px-2 py-1 rounded-full bg-gradient-to-r ${card.accent} text-white/90`}>
          {card.label}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="text-white font-display font-extrabold text-base leading-tight mb-1">
          {card.title}
        </p>
        <p className="text-xs text-slate-300 mb-2 font-mono">{card.sub}</p>
        <div className="flex flex-wrap gap-1">
          {card.tags.map((t: string, i: number) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Play icon if active */}
      {isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface HeroCarousel3DProps {
  onContactClick?: () => void;
  onNavigate?: (section: string) => void;
}

export const HeroCarousel3D: React.FC<HeroCarousel3DProps> = ({ onContactClick, onNavigate }) => {
  const { language } = useI18n();
  const isVi = language === 'vi';
  const CARDS = isVi ? CARDS_VI : CARDS_EN;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setActiveIndex((i) => (i + 1) % TOTAL);
  }, []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + TOTAL) % TOTAL);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isHovered || isDragging) return;
    intervalRef.current = setInterval(next, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered, isDragging, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(true);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    setIsDragging(false);
  };

  const activeCard = CARDS[activeIndex];

  return (
    <section
      className="relative w-full min-h-screen bg-[#030611] flex flex-col items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Ambient background glow from active card ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none`}
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 60%, rgba(${
            activeCard.id === 'portrait' ? '6,182,212' :
            activeCard.id === 'keywords' ? '244,63,94' :
            activeCard.id === 'mv-giai-dieu' ? '234,179,8' :
            activeCard.id === 'fpt-hackathon' ? '34,197,94' :
            '139,92,246'
          }, 0.08) 0%, transparent 70%)`,
        }}
      />

      {/* ── Static starfield dots ── */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* ── Top intro text ── */}
      <div className="relative z-20 text-center mb-6 px-4">
        <p className="text-xs font-mono text-slate-500 tracking-[0.3em] uppercase mb-2">
          {isVi ? 'Hồ Sơ Năng Lực' : 'Creative Portfolio'}
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white tracking-tight">
          {isVi ? 'Yến Sam' : 'Yen Sam'}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> ✦</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1 font-mono">
          {isVi
            ? 'Creative Director · Media Specialist · MV Producer'
            : 'Creative Director · Media Specialist · MV Producer'}
        </p>
      </div>

      {/* ── 3D Carousel stage ── */}
      <div
        className="relative z-10"
        style={{
          width: '100%',
          height: 420,
          perspective: '1100px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
          }}
        >
          {CARDS.map((card, i) => {
            const angle = getCardAngle(i, activeIndex);
            return (
              <Card3D
                key={card.id}
                card={card}
                angle={angle}
                isActive={i === activeIndex}
                onClick={() => setActiveIndex(i)}
              />
            );
          })}
        </div>
      </div>

      {/* ── Navigation ── */}
      <div className="relative z-20 flex items-center gap-6 mt-8">
        {/* Prev */}
        <button
          onClick={prev}
          className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {CARDS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? 'w-6 h-2 bg-white'
                  : 'w-2 h-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={next}
          className="w-10 h-10 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* ── CTA Buttons ── */}
      <div className="relative z-20 flex items-center gap-3 mt-6 flex-wrap justify-center px-4">
        <button
          onClick={() => onNavigate?.('projects')}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105 shadow-lg shadow-cyan-500/20"
        >
          {isVi ? '🎬 Khám Phá Dự Án' : '🎬 Explore Projects'}
        </button>
        <button
          onClick={onContactClick}
          className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all hover:scale-105"
        >
          {isVi ? '✉️ Liên Hệ' : '✉️ Contact'}
        </button>
        <button
          onClick={() => onNavigate?.('experience')}
          className="px-5 py-2.5 rounded-full border border-white/10 text-slate-400 text-sm font-semibold hover:bg-white/5 hover:text-white transition-all"
        >
          {isVi ? 'Kinh nghiệm →' : 'Experience →'}
        </button>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-40">
        <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
          {isVi ? 'Cuộn xuống' : 'Scroll down'}
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-slate-400 to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default HeroCarousel3D;
