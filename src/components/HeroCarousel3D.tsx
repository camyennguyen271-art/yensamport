import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useI18n } from '../lib/i18n';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface CardItem {
  id: string;
  type: 'portrait' | 'keywords' | 'project' | 'visual_led';
  tagVi: string;
  tagEn: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  image?: string;
  accent: string;
  keywords?: string[];
  loglineVi?: string;
  loglineEn?: string;
}

const PORTRAIT_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790476859491_lrkwz.jpg';
const VISUAL_LED_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_event_stage_1790314370784.jpg';
const MV_GIAIDIEU_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-giai-dieu-viet-nam-minh.jpg';
const HACKATHON_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790480293325_1mi92.jpg';
const MV_AI_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-ai-bon-voyaige.jpg';

const CARDS: CardItem[] = [
  {
    id: 'portrait',
    type: 'portrait',
    tagVi: 'ĐẠO DIỄN SÁNG TẠO',
    tagEn: 'CREATIVE DIRECTOR',
    titleVi: 'Nguyễn Thị Cẩm Yến',
    titleEn: 'Nguyen Thi Cam Yen',
    subtitleVi: 'Yến Sam · Media Specialist',
    subtitleEn: 'Yen Sam · Media Specialist',
    image: PORTRAIT_IMG,
    accent: 'from-cyan-400 via-blue-500 to-indigo-500',
    loglineVi: 'Dẫn dắt câu chuyện thị giác và các chiến dịch truyền thông đa phương tiện.',
    loglineEn: 'Directing visual storytelling and high-impact media campaigns.',
  },
  {
    id: 'keywords',
    type: 'keywords',
    tagVi: 'NĂNG LỰC CỐT LÕI',
    tagEn: 'CORE CAPABILITIES',
    titleVi: 'Hồ Sơ Năng Lực',
    titleEn: 'Creative Profile',
    subtitleVi: 'Visual Storytelling & Direction',
    subtitleEn: 'Visual Storytelling & Direction',
    accent: 'from-rose-500 via-pink-500 to-amber-500',
    keywords: [
      'Đạo Diễn MV',
      'Motion Design',
      'Visual Storytelling',
      'Media Strategy',
      'Sân Khấu 3D LED',
      'Creative Leadership',
      'AI Generative',
      'Event Direction',
    ],
    loglineVi: 'Biến tầm nhìn sáng tạo thành những dự án truyền thông để đời.',
    loglineEn: 'Transforming creative vision into lasting media milestones.',
  },
  {
    id: 'visual-led',
    type: 'visual_led',
    tagVi: 'VISUAL LED SÂN KHẤU',
    tagEn: '3D STAGE VISUALS',
    titleVi: 'Sân Khấu 3D LED',
    titleEn: '3D Stage LED Visuals',
    subtitleVi: 'Đồ họa chuyển động & Ánh sáng sự kiện',
    subtitleEn: 'Motion Loops & Stage Environment',
    image: VISUAL_LED_IMG,
    accent: 'from-indigo-500 via-purple-500 to-pink-500',
    loglineVi: 'Thiết kế hiệu ứng ánh sáng 3D và bối cảnh sân khấu biểu diễn quy mô lớn.',
    loglineEn: 'Large-scale concert 3D visual loops, motion graphics and stage lighting.',
  },
  {
    id: 'mv-giai-dieu',
    type: 'project',
    tagVi: 'MV TIÊU BIỂU · TRIỆU VIEW',
    tagEn: 'FEATURED MV · MILLION VIEWS',
    titleVi: 'MV "Giai Điệu Việt Nam Mình"',
    titleEn: 'MV "Giai Dieu Viet Nam Minh"',
    subtitleVi: 'feat. Masew · FPT Edu',
    subtitleEn: 'feat. Masew · FPT Edu',
    image: MV_GIAIDIEU_IMG,
    accent: 'from-amber-400 via-orange-500 to-rose-600',
    loglineVi: 'Lan tỏa văn hóa dân tộc bằng phong cách trẻ trung, hiện đại và sôi động.',
    loglineEn: 'Empowering Vietnamese cultural heritage through high-energy modern visuals.',
  },
  {
    id: 'fpt-hackathon',
    type: 'project',
    tagVi: 'CHIẾN DỊCH QUỐC GIA',
    tagEn: 'NATIONAL CAMPAIGN',
    titleVi: 'FPT Edu Hackathon 2024',
    titleEn: 'FPT Edu Hackathon 2024',
    subtitleVi: 'Trưởng ban truyền thông toàn quốc',
    subtitleEn: 'Head of National Communications',
    image: HACKATHON_IMG,
    accent: 'from-emerald-400 via-teal-500 to-cyan-600',
    loglineVi: 'Chiến dịch truyền thông lan tỏa công nghệ đến hàng ngàn bạn trẻ.',
    loglineEn: 'Empowering thousands of young tech innovators through viral reach.',
  },
  {
    id: 'mv-ai',
    type: 'project',
    tagVi: 'CÔNG NGHỆ MỚI',
    tagEn: 'FRONTIER TECH',
    titleVi: 'MV AI "Bon VoyAIge"',
    titleEn: 'AI MV "Bon VoyAIge"',
    subtitleVi: 'Tiên phong Generative AI trong MV',
    subtitleEn: 'Pioneering Generative AI in Music Videos',
    image: MV_AI_IMG,
    accent: 'from-violet-400 via-purple-500 to-pink-500',
    loglineVi: 'Khám phá biên giới sáng tạo điện ảnh với trí tuệ nhân tạo thế hệ mới.',
    loglineEn: 'Exploring the new frontiers of cinematic creativity with generative AI.',
  },
];

interface HeroProps {
  onContactClick?: () => void;
  onNavigate?: (section: string) => void;
}

export const HeroCarousel3D: React.FC<HeroProps> = ({ onContactClick, onNavigate }) => {
  const { language } = useI18n();
  const isVi = language === 'vi';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = CARDS.length;

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play rotating carousel
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 3800);
    return () => clearInterval(interval);
  }, [isHovered, next]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  return (
    <section
      className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#030611] text-white flex flex-col justify-between items-center overflow-hidden py-10 px-4 select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Background Glow & Particle Rings (Cyber Hologram Atmosphere) ── */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {/* Large 3D Hologram Ring */}
        <div
          className="w-[700px] h-[340px] rounded-full border border-cyan-500/20 blur-[1px] absolute"
          style={{ transform: 'rotateX(75deg) translateY(120px)' }}
        />
        <div
          className="w-[900px] h-[440px] rounded-full border border-dashed border-cyan-400/15 absolute"
          style={{ transform: 'rotateX(75deg) translateY(160px)' }}
        />
        {/* Core Spotlight Glow */}
        <div className="w-[500px] h-[320px] rounded-full bg-cyan-500/10 blur-[120px] absolute" />
      </div>

      {/* ── Top Header Title: Single-line & Clean ── */}
      <div className="relative z-30 text-center max-w-4xl mx-auto pt-2 pb-6 px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>VISUAL MOTION SHOWCASE</span>
        </div>

        {/* Name without breaking lines */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white whitespace-nowrap">
          {isVi ? 'Nguyễn Thị Cẩm Yến' : 'Nguyen Thi Cam Yen'}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"> (Yến Sam)</span>
        </h1>

        <p className="text-sm sm:text-base font-mono text-slate-400 mt-2 tracking-wide">
          Creative Director · Media Specialist · Visual Storyteller
        </p>
      </div>

      {/* ── 3D Rotating Carousel Cylinder Stage ── */}
      <div
        className="relative z-20 w-full max-w-5xl h-[420px] sm:h-[460px] flex items-center justify-center"
        style={{
          perspective: '1300px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {CARDS.map((card, i) => {
            // Calculate relative offset in circular ring (-2, -1, 0, 1, 2)
            let offset = i - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            // Hide cards that are completely behind
            if (absOffset > 2) return null;

            // 3D positioning
            const rotateY = offset * 38; // 38 deg angle per card
            const translateZ = isCenter ? 260 : 260 - absOffset * 130;
            const translateX = offset * 240; // horizontal spread
            const scale = isCenter ? 1.05 : Math.max(0.75, 1 - absOffset * 0.16);
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - absOffset * 0.35);
            const zIndex = 20 - absOffset * 5;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIndex(i)}
                className={`absolute w-[270px] sm:w-[310px] h-[380px] sm:h-[420px] rounded-3xl p-3.5 bg-slate-900/90 border backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden ${
                  isCenter
                    ? 'border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400/40'
                    : 'border-white/10 hover:border-white/30 shadow-2xl'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Inner Card Content */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col justify-between bg-slate-950">
                  {/* Background Image (if project or visual LED or portrait) */}
                  {card.image && (
                    <div className="absolute inset-0">
                      <img
                        src={card.image}
                        alt={card.titleVi}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    </div>
                  )}

                  {/* Keywords Layout */}
                  {card.type === 'keywords' && (
                    <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                      <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 text-slate-950 self-start shadow-md">
                        {isVi ? card.tagVi : card.tagEn}
                      </span>

                      <div className="flex flex-wrap gap-1.5 my-auto">
                        {card.keywords?.map((kw, kwIdx) => (
                          <span
                            key={kwIdx}
                            className="text-xs px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-slate-200 font-medium"
                          >
                            ✦ {kw}
                          </span>
                        ))}
                      </div>

                      <p className="text-xs text-slate-300 italic font-light border-l-2 border-amber-400 pl-3">
                        "{isVi ? card.loglineVi : card.loglineEn}"
                      </p>
                    </div>
                  )}

                  {/* Standard Image Cards Layout */}
                  {card.type !== 'keywords' && (
                    <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                      {/* Top Tag */}
                      <span
                        className={`text-[10px] sm:text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-gradient-to-r ${card.accent} text-slate-950 self-start shadow-lg`}
                      >
                        {isVi ? card.tagVi : card.tagEn}
                      </span>

                      {/* Bottom Info */}
                      <div className="mt-auto space-y-1">
                        <h3 className="text-lg sm:text-xl font-bold font-display text-white leading-tight">
                          {isVi ? card.titleVi : card.titleEn}
                        </h3>
                        <p className="text-xs font-mono text-cyan-300">
                          {isVi ? card.subtitleVi : card.subtitleEn}
                        </p>
                        {card.loglineVi && (
                          <p className="text-[11px] text-slate-300 line-clamp-2 pt-1 font-light leading-relaxed">
                            {isVi ? card.loglineVi : card.loglineEn}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Active Card Subtle Hologram Sheen */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/10 pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Controls & Indicators ── */}
      <div className="relative z-30 flex flex-col items-center gap-5 mt-4">
        {/* Navigation Arrows + Dots */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === activeIndex
                    ? 'w-8 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md shadow-cyan-400/50'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Call to action buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={() => onNavigate?.('projects')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            <span>{isVi ? 'Khám Phá Dự Án' : 'Explore Projects'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onContactClick}
            className="px-5 py-2.5 rounded-full border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 hover:scale-105 transition-all"
          >
            {isVi ? 'Liên Hệ' : 'Contact'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel3D;
