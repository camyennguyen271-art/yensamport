import React, { useState, useEffect, useCallback } from 'react';
import { useI18n } from '../lib/i18n';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText, InlineImage } from './admin/InlineEditHelpers';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CardItem {
  id: string;
  type: 'portrait' | 'keywords' | 'project' | 'visual_led';
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  image?: string;
  keywords?: string[];
  loglineVi?: string;
  loglineEn?: string;
}

const PORTRAIT_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790476859491_lrkwz.jpg';
// User uploaded real Visual LED stage photos
const VISUAL_LED_IMG_VO_VIET = '/images/visual_led_khoi_nguon_vo_viet.jpg'; // Ảnh 1: Khơi nguồn võ việt
const VISUAL_LED_IMG_TICH_TICH = '/images/visual_led_tich_tich_tinh_tang.jpg'; // Ảnh 2: Tích tịch tình tang
const MV_GIAIDIEU_IMG = '/images/projects/mv-giai-dieu-viet-nam-minh.jpg';
const HACKATHON_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790480293325_1mi92.jpg';
const MV_AI_IMG = '/images/projects/mv-ai-bon-voyaige.jpg';

const CARDS: CardItem[] = [
  {
    id: 'portrait',
    type: 'portrait',
    titleVi: 'Nguyễn Thị Cẩm Yến',
    titleEn: 'Nguyen Thi Cam Yen',
    subtitleVi: 'Yến Sam · Media Specialist',
    subtitleEn: 'Yen Sam · Media Specialist',
    image: PORTRAIT_IMG,
    loglineVi: 'Đạo diễn MV, chỉ đạo truyền thông & sản xuất dự án sáng tạo.',
    loglineEn: 'Directing music videos, media campaigns & creative projects.',
  },
  {
    id: 'keywords',
    type: 'keywords',
    titleVi: 'Hồ Sơ Năng Lực',
    titleEn: 'Creative Profile',
    subtitleVi: 'Visual Storytelling & Direction',
    subtitleEn: 'Visual Storytelling & Direction',
    keywords: [
      'Đạo Diễn MV',
      'Motion Design',
      'Visual Storytelling',
      'Media Strategy',
      'Visual LED',
      'Creative Leadership',
      'AI Generative',
      'Event Direction',
    ],
    loglineVi: 'Kết nối chuyên môn và sáng tạo để tạo nên những câu chuyện có ý nghĩa.',
    loglineEn: 'Connecting expertise and creativity to craft meaningful stories.',
  },
  {
    id: 'visual-led-tich-tich',
    type: 'visual_led',
    titleVi: 'Visual LED',
    titleEn: 'Visual LED',
    subtitleVi: 'Đêm Công Diễn Tích Tịch Tình Tang',
    subtitleEn: 'Tich Tich Tinh Tang Concert Stage',
    image: VISUAL_LED_IMG_TICH_TICH,
    loglineVi: 'Thiết kế đồ họa chuyển động Visual LED và bối cảnh sân khấu biểu diễn âm nhạc.',
    loglineEn: 'Motion graphic visual loops and live concert stage environments.',
  },
  {
    id: 'visual-led-vo-viet',
    type: 'visual_led',
    titleVi: 'Visual LED',
    titleEn: 'Visual LED',
    subtitleVi: 'Đêm Công Diễn Khơi Nguồn Võ Việt',
    subtitleEn: 'Khoi Nguon Vo Viet Live Stage',
    image: VISUAL_LED_IMG_VO_VIET,
    loglineVi: 'Hiệu ứng visual ánh sáng màn hình LED hòa quyện cùng âm thanh và võ nhạc.',
    loglineEn: 'Lighting visual synergy with live martial arts musical performance.',
  },
  {
    id: 'mv-giai-dieu',
    type: 'project',
    titleVi: 'MV "Giai Điệu Việt Nam Mình"',
    titleEn: 'MV "Giai Dieu Viet Nam Minh"',
    subtitleVi: 'feat. Masew · FPT Edu',
    subtitleEn: 'feat. Masew · FPT Edu',
    image: MV_GIAIDIEU_IMG,
    loglineVi: 'Lan tỏa văn hóa dân tộc bằng phong cách trẻ trung, hiện đại và sôi động.',
    loglineEn: 'Empowering Vietnamese cultural heritage through high-energy modern visuals.',
  },
  {
    id: 'fpt-hackathon',
    type: 'project',
    titleVi: 'FPT Edu Hackathon 2024',
    titleEn: 'FPT Edu Hackathon 2024',
    subtitleVi: 'Trưởng ban truyền thông toàn quốc',
    subtitleEn: 'Head of National Communications',
    image: HACKATHON_IMG,
    loglineVi: 'Chiến dịch truyền thông lan tỏa công nghệ đến hàng ngàn bạn trẻ.',
    loglineEn: 'Empowering thousands of young tech innovators through viral reach.',
  },
  {
    id: 'mv-ai',
    type: 'project',
    titleVi: 'MV AI "Bon VoyAIge"',
    titleEn: 'AI MV "Bon VoyAIge"',
    subtitleVi: 'Ứng dụng AI tạo sinh trong MV',
    subtitleEn: 'Generative AI in Music Videos',
    image: MV_AI_IMG,
    loglineVi: 'Khám phá biên giới sáng tạo điện ảnh với trí tuệ nhân tạo.',
    loglineEn: 'Exploring new creative horizons with generative AI.',
  },
];

interface HeroProps {
  onContactClick?: () => void;
  onNavigate?: (section: string) => void;
}

export const HeroCarousel3D: React.FC<HeroProps> = ({ onContactClick, onNavigate }) => {
  const { language } = useI18n();
  const { data, updateHero } = useSiteData();
  const heroData = data.hero;
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

  // Auto-play
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(next, 3800);
    return () => clearInterval(interval);
  }, [isHovered, next]);

  return (
    <section
      className="relative w-full min-h-[95vh] sm:min-h-screen text-white flex flex-col justify-between items-center overflow-hidden pt-8 pb-12 px-4 select-none bg-transparent"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── Top Header: Name & Positions with Inline Edit capability ── */}
      <div className="relative z-30 text-center max-w-4xl mx-auto pt-6 pb-6 px-4">
        {/* Name without breaking lines */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white whitespace-nowrap drop-shadow-2xl">
          <InlineText
            as="span"
            value={isVi ? (heroData.titleVi || heroData.title || 'Nguyễn Thị Cẩm Yến') : (heroData.titleEn || heroData.title || 'Nguyen Thi Cam Yen')}
            onChange={(val) => updateHero(isVi ? { titleVi: val, title: val } : { titleEn: val })}
            placeholder="Tên của bạn..."
          />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400"> (Yến Sam)</span>
        </h1>

        {/* Positions under Name */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono text-cyan-300 mt-4 mb-2">
          <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/40 backdrop-blur-md shadow-lg shadow-cyan-950/50">
            🎬{' '}
            <InlineText
              as="span"
              value={isVi ? (heroData.subtitleVi || 'Đạo diễn sản xuất MV') : (heroData.subtitleEn || 'MV Production Director')}
              onChange={(val) => updateHero(isVi ? { subtitleVi: val, subtitle: val } : { subtitleEn: val })}
              placeholder="Vị trí 1..."
            />
          </span>
          <span className="text-slate-500">✦</span>
          <span className="px-3.5 py-1.5 rounded-full bg-purple-950/70 border border-purple-500/40 backdrop-blur-md text-purple-300 shadow-lg shadow-purple-950/50">
            📡{' '}
            <InlineText
              as="span"
              value={isVi ? (heroData.taglineVi || 'Lãnh đạo truyền thông') : (heroData.taglineEn || 'Media Leadership')}
              onChange={(val) => updateHero(isVi ? { taglineVi: val, tagline: val } : { taglineEn: val })}
              placeholder="Vị trí 2..."
            />
          </span>
        </div>
      </div>

      {/* ── 3D Rotating Carousel Cylinder Stage (with generous top margin so position badges never clash) ── */}
      <div
        className="relative z-20 w-full max-w-5xl h-[420px] sm:h-[460px] flex items-center justify-center mt-6 mb-auto"
        style={{
          perspective: '1400px',
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
            let offset = i - activeIndex;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const absOffset = Math.abs(offset);

            if (absOffset > 2) return null;

            // 3D positioning
            const rotateY = offset * 36;
            const translateZ = isCenter ? 280 : 280 - absOffset * 135;
            const translateX = offset * 240;
            const scale = isCenter ? 1.05 : Math.max(0.72, 1 - absOffset * 0.16);
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - absOffset * 0.35);
            const zIndex = 25 - absOffset * 5;

            return (
              <div
                key={card.id}
                onClick={() => setActiveIndex(i)}
                className={`absolute w-[270px] sm:w-[310px] h-[380px] sm:h-[420px] rounded-3xl p-3.5 bg-slate-900/85 border backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden ${
                  isCenter
                    ? 'border-cyan-400/70 shadow-[0_0_60px_rgba(6,182,212,0.4)] ring-1 ring-cyan-300/50'
                    : 'border-white/10 hover:border-white/25 shadow-2xl'
                }`}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Inner Card Content */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative flex flex-col justify-end bg-slate-950">
                  {/* Background Image */}
                  {card.image && (
                    <div className="absolute inset-0">
                      <img
                        src={card.image}
                        alt={card.titleVi}
                        className="w-full h-full object-cover object-top transition-transform duration-700 ease-out hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/45 to-transparent" />
                    </div>
                  )}

                  {/* Keywords Card (no top badge) */}
                  {card.type === 'keywords' && (
                    <div className="relative z-10 p-5 flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-xl font-bold font-display text-white">
                          {isVi ? card.titleVi : card.titleEn}
                        </h3>
                        <p className="text-xs font-mono text-cyan-300 mt-0.5">
                          {isVi ? card.subtitleVi : card.subtitleEn}
                        </p>
                      </div>

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

                      <p className="text-xs text-slate-300 italic font-light border-l-2 border-cyan-400 pl-3">
                        "{isVi ? card.loglineVi : card.loglineEn}"
                      </p>
                    </div>
                  )}

                  {/* Standard Image Cards: Content container with solid dark backing so image does not clash with text */}
                  {card.type !== 'keywords' && (
                    <div className="relative z-10 p-4 pt-8 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-1">
                      <h3 className="text-base sm:text-lg font-bold font-display text-white leading-tight drop-shadow-md">
                        {isVi ? card.titleVi : card.titleEn}
                      </h3>
                      <p className="text-xs font-mono text-cyan-300 font-medium">
                        {isVi ? card.subtitleVi : card.subtitleEn}
                      </p>
                      {card.loglineVi && (
                        <p className="text-[11px] text-slate-300 line-clamp-2 pt-1 font-light leading-relaxed">
                          {isVi ? card.loglineVi : card.loglineEn}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Holographic Center Overlay */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Bottom Controls & Actions ── */}
      <div className="relative z-30 flex flex-col items-center gap-4 mt-2">
        {/* Navigation Arrows + Dots */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
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
                    ? 'w-8 h-2 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 shadow-md shadow-cyan-400/50'
                    : 'w-2 h-2 bg-white/25 hover:bg-white/50'
                }`}
                aria-label={`Jump to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 backdrop-blur-md"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            onClick={() => onNavigate?.('projects')}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600 text-slate-950 font-bold text-xs sm:text-sm hover:scale-105 active:scale-95 transition-all shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            <span>{isVi ? 'Khám Phá Dự Án' : 'Explore Projects'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onContactClick}
            className="px-5 py-2.5 rounded-full border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 hover:scale-105 transition-all backdrop-blur-md"
          >
            {isVi ? 'Liên Hệ' : 'Contact'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel3D;
