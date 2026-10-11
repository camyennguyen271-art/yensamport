import React, { useState, useEffect, useRef } from 'react';
import { useI18n } from '../lib/i18n';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, ArrowRight, Film } from 'lucide-react';

interface Scene {
  id: string;
  duration: number; // in milliseconds
  tagVi: string;
  tagEn: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  quoteVi?: string;
  quoteEn?: string;
  image: string;
  accent: string;
  glow: string;
  keywords?: string[];
}

const PORTRAIT_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790476859491_lrkwz.jpg';
const MV_GIAIDIEU_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-giai-dieu-viet-nam-minh.jpg';
const HACKATHON_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/1790480293325_1mi92.jpg';
const MV_AI_IMG = 'https://umcffywhiiwznyxsmpnr.supabase.co/storage/v1/object/public/images/uploads/project_mv-ai-bon-voyaige.jpg';

const SCENES: Scene[] = [
  {
    id: 'intro',
    duration: 5000,
    tagVi: '01 / ĐẠO DIỄN SÁNG TẠO',
    tagEn: '01 / CREATIVE DIRECTOR',
    titleVi: 'NGUYỄN THỊ CẨM YẾN',
    titleEn: 'NGUYEN THI CAM YEN',
    subtitleVi: 'YẾN SAM · MEDIA SPECIALIST',
    subtitleEn: 'YEN SAM · MEDIA SPECIALIST',
    quoteVi: 'Biến tầm nhìn sáng tạo thành những dự án truyền thông để đời.',
    quoteEn: 'Transforming visionary ideas into unforgettable media milestones.',
    image: PORTRAIT_IMG,
    accent: 'from-cyan-400 via-blue-500 to-indigo-600',
    glow: 'rgba(6, 182, 212, 0.45)',
  },
  {
    id: 'identity',
    duration: 4500,
    tagVi: '02 / NĂNG LỰC CỐT LÕI',
    tagEn: '02 / CORE CAPABILITIES',
    titleVi: 'VISUAL STORYTELLING',
    titleEn: 'VISUAL STORYTELLING',
    subtitleVi: 'KẾT NỐI CẢM XÚC BẰNG HÌNH ẢNH & ÂM THANH',
    subtitleEn: 'CONNECTING EMOTIONS THROUGH CINEMATIC SIGHT & SOUND',
    keywords: [
      'Đạo Diễn MV',
      'Motion Graphics',
      'Media Strategy',
      'Creative Leadership',
      'AI Prompting',
      'Sân Khấu 3D LED',
      'Event Direction'
    ],
    image: PORTRAIT_IMG,
    accent: 'from-rose-500 via-pink-500 to-amber-500',
    glow: 'rgba(244, 63, 94, 0.4)',
  },
  {
    id: 'mv-giai-dieu',
    duration: 5500,
    tagVi: '03 / DỰ ÁN TIÊU BIỂU · TRIỆU VIEW',
    tagEn: '03 / FEATURED WORK · MILLION VIEWS',
    titleVi: 'GIAI ĐIỆU VIỆT NAM MÌNH',
    titleEn: 'GIAI DIEU VIET NAM MINH',
    subtitleVi: 'MV ÂM NHẠC TRUYỀN THỐNG KẾT HỢP HIỆN ĐẠI feat. MASEW',
    subtitleEn: 'CULTURAL ANTHEM MEETS CONTEMPORARY SOUND feat. MASEW',
    quoteVi: 'Lan tỏa tinh thần tự hào dân tộc qua ngôn ngữ hình ảnh trẻ trung, giàu năng lượng.',
    quoteEn: 'Empowering Vietnamese cultural heritage through high-energy modern visuals.',
    image: MV_GIAIDIEU_IMG,
    accent: 'from-amber-400 via-orange-500 to-rose-600',
    glow: 'rgba(245, 158, 11, 0.45)',
  },
  {
    id: 'fpt-hackathon',
    duration: 5000,
    tagVi: '04 / QUẢN TRỊ TRUYỀN THÔNG TOÀN QUỐC',
    tagEn: '04 / NATIONWIDE MEDIA CAMPAIGN',
    titleVi: 'FPT EDU HACKATHON 2024',
    titleEn: 'FPT EDU HACKATHON 2024',
    subtitleVi: 'TRƯỞNG BAN TRUYỀN THÔNG · SỰ KIỆN CÔNG NGHỆ QUỐC GIA',
    subtitleEn: 'HEAD OF COMMUNICATIONS · NATIONAL TECH COMPETITION',
    quoteVi: 'Quy tụ hàng ngàn tài năng trẻ với chiến dịch phủ sóng đa kênh mạnh mẽ.',
    quoteEn: 'Connecting thousands of young innovators through multi-channel viral reach.',
    image: HACKATHON_IMG,
    accent: 'from-emerald-400 via-teal-500 to-cyan-600',
    glow: 'rgba(16, 185, 129, 0.45)',
  },
  {
    id: 'mv-ai',
    duration: 5000,
    tagVi: '05 / CÔNG NGHỆ MỚI & TƯƠNG LAI',
    tagEn: '05 / FRONTIER AI & INNOVATION',
    titleVi: 'MV AI "BON VOYAI-GE"',
    titleEn: 'AI MV "BON VOYAI-GE"',
    subtitleVi: 'TIÊN PHONG ỨNG DỤNG GENERATIVE AI TRONG SẢN XUẤT MV',
    subtitleEn: 'PIONEERING GENERATIVE AI IN MUSIC VIDEO PRODUCTION',
    quoteVi: 'Phá vỡ giới hạn sáng tạo thị giác với công nghệ trí tuệ nhân tạo.',
    quoteEn: 'Redefining the creative visual boundaries with generative artificial intelligence.',
    image: MV_AI_IMG,
    accent: 'from-violet-400 via-purple-500 to-pink-500',
    glow: 'rgba(168, 85, 247, 0.45)',
  },
];

interface HeroProps {
  onContactClick?: () => void;
  onNavigate?: (section: string) => void;
}

export const HeroCarousel3D: React.FC<HeroProps> = ({ onContactClick, onNavigate }) => {
  const { language } = useI18n();
  const isVi = language === 'vi';

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const progressAnimRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const currentScene = SCENES[currentIdx];

  // Control timeline progress
  useEffect(() => {
    if (!isPlaying) {
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
      return;
    }

    startTimeRef.current = Date.now() - (progress / 100) * currentScene.duration;

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min((elapsed / currentScene.duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        setCurrentIdx((prev) => (prev + 1) % SCENES.length);
        setProgress(0);
        startTimeRef.current = Date.now();
      } else {
        progressAnimRef.current = requestAnimationFrame(tick);
      }
    };

    progressAnimRef.current = requestAnimationFrame(tick);

    return () => {
      if (progressAnimRef.current) cancelAnimationFrame(progressAnimRef.current);
    };
  }, [currentIdx, isPlaying, currentScene.duration]);

  const goToScene = (index: number) => {
    setCurrentIdx(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  const handleNext = () => {
    goToScene((currentIdx + 1) % SCENES.length);
  };

  const handlePrev = () => {
    goToScene((currentIdx - 1 + SCENES.length) % SCENES.length);
  };

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#02040a] text-white flex flex-col justify-between overflow-hidden select-none border-b border-white/[0.08]">
      {/* ── Background Backdrop Layers with Ken Burns effect ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {SCENES.map((scene, i) => (
          <div
            key={scene.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              i === currentIdx ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <img
              src={scene.image}
              alt={scene.titleVi}
              className={`w-full h-full object-cover object-center scale-105 transition-transform duration-[6000ms] ease-out ${
                i === currentIdx ? 'scale-115 translate-y-[-2%]' : 'scale-100'
              }`}
              style={{ filter: 'brightness(0.32) saturate(1.25) blur(1px)' }}
            />
            {/* Film Grain & Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-[#02040a]/70 to-[#02040a]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,4,10,0.85)_100%)]" />
          </div>
        ))}

        {/* Ambient Color Spotlight */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[120px] transition-all duration-1000 pointer-events-none opacity-40"
          style={{ backgroundColor: currentScene.glow }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full blur-[140px] transition-all duration-1000 pointer-events-none opacity-30"
          style={{ backgroundColor: currentScene.glow }}
        />
      </div>

      {/* ── Top Cinematic Bar (Timecode & Badge) ── */}
      <div className="relative z-20 w-full px-6 sm:px-12 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <Film className="w-3.5 h-3.5" />
            <span>CINEMATIC SHOWREEL</span>
          </div>
          <span className="text-xs font-mono text-slate-400 tracking-wider">
            SCENE 0{currentIdx + 1} / 0{SCENES.length}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 text-xs font-mono flex items-center gap-1.5 text-white transition-all hover:scale-105 active:scale-95"
            title={isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
          </button>
          <button
            onClick={() => goToScene(0)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 backdrop-blur-md border border-white/10 text-slate-300 hover:text-white transition-all"
            title="Xem lại từ đầu"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Main Dynamic Stage (Center Motion Display) ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-12 py-10 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Kinetic Typography & Copywriting */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2">
            <span
              className={`text-xs sm:text-sm font-mono font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-md bg-gradient-to-r ${currentScene.accent} text-slate-950 shadow-lg`}
            >
              {isVi ? currentScene.tagVi : currentScene.tagEn}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.1] drop-shadow-2xl">
            {isVi ? currentScene.titleVi : currentScene.titleEn}
          </h1>

          <p className="text-base sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-400 font-display tracking-wide">
            {isVi ? currentScene.subtitleVi : currentScene.subtitleEn}
          </p>

          {/* Quotes or Keywords */}
          {currentScene.quoteVi && (
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light border-l-2 border-cyan-400 pl-4 py-1 italic max-w-xl">
              "{isVi ? currentScene.quoteVi : currentScene.quoteEn}"
            </p>
          )}

          {currentScene.keywords && (
            <div className="flex flex-wrap gap-2 pt-2">
              {currentScene.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 font-medium backdrop-blur-md transition-colors"
                >
                  ✦ {kw}
                </span>
              ))}
            </div>
          )}

          {/* Interactive CTAs */}
          <div className="flex items-center gap-4 pt-4 flex-wrap">
            <button
              onClick={() => onNavigate?.('projects')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 font-extrabold text-xs sm:text-sm tracking-wide uppercase shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <span>{isVi ? 'Khám Phá Toàn Bộ Dự Án' : 'Explore All Works'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onContactClick}
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all hover:scale-105"
            >
              {isVi ? 'Hợp Tác / Liên Hệ' : 'Get In Touch'}
            </button>
          </div>
        </div>

        {/* Right Column: 3D Holographic Card Display with Parallax Float */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-72 sm:w-80 h-96 sm:h-[26rem] rounded-3xl overflow-hidden p-2 bg-gradient-to-br from-white/20 via-white/5 to-white/0 backdrop-blur-xl border border-white/20 shadow-2xl group transition-all duration-700 hover:scale-105">
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img
                src={currentScene.image}
                alt={currentScene.titleVi}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase block mb-1">
                  HIGHLIGHT CLIP
                </span>
                <p className="text-sm font-bold text-white leading-tight">
                  {isVi ? currentScene.titleVi : currentScene.titleEn}
                </p>
                <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                  {isVi ? currentScene.subtitleVi : currentScene.subtitleEn}
                </p>
              </div>

              {/* Glowing Corner Badge */}
              <div className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-white/20 text-cyan-300">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Timeline Scrubber (Video Player Bar) ── */}
      <div className="relative z-20 w-full px-6 sm:px-12 pb-8">
        {/* Progress Bar Segments */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-4">
          {SCENES.map((scene, i) => {
            const isPast = i < currentIdx;
            const isCurrent = i === currentIdx;
            const fillWidth = isPast ? '100%' : isCurrent ? `${progress}%` : '0%';

            return (
              <button
                key={scene.id}
                onClick={() => goToScene(i)}
                className="group flex flex-col text-left focus:outline-none"
              >
                {/* Track */}
                <div className="w-full h-1.5 sm:h-2 rounded-full bg-white/15 overflow-hidden relative mb-1.5">
                  <div
                    className={`h-full transition-all duration-100 ${
                      isCurrent
                        ? `bg-gradient-to-r ${scene.accent}`
                        : isPast
                        ? 'bg-white/80'
                        : 'bg-transparent'
                    }`}
                    style={{ width: fillWidth }}
                  />
                </div>
                {/* Scene Label on Desktop */}
                <span className="hidden md:inline text-[11px] font-mono text-slate-400 group-hover:text-white transition-colors truncate">
                  0{i + 1} {isVi ? scene.titleVi : scene.titleEn}
                </span>
              </button>
            );
          })}
        </div>

        {/* Navigation Arrows on mobile */}
        <div className="flex md:hidden items-center justify-between text-xs text-slate-400 font-mono">
          <button onClick={handlePrev} className="px-3 py-1 rounded bg-white/10 text-white">
            ← PREV
          </button>
          <span>{currentIdx + 1} / {SCENES.length}</span>
          <button onClick={handleNext} className="px-3 py-1 rounded bg-white/10 text-white">
            NEXT →
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel3D;
