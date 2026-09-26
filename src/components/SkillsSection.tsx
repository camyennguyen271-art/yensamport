import React, { useState } from 'react';
import { MessageSquare, BarChart3, Workflow, Lightbulb, Radio, Cpu, Users2, Sparkles } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const SkillsSection: React.FC = () => {
  const { language, t } = useI18n();
  const isVi = language === 'vi';
  const [activeSkillId, setActiveSkillId] = useState<string>('communication');

  const SKILL_GROUPS = [
    {
      id: 'communication',
      name: isVi ? 'Kỹ Năng Giao Tiếp' : 'Communication Skills',
      category: isVi ? 'Năng Lực Cốt Lõi' : 'Core Competency',
      icon: MessageSquare,
      description: isVi 
        ? 'Làm chủ truyền thông chiến lược, thông cáo PR, sự thống nhất của các bên liên quan và nghệ thuật kể chuyện cuốn hút.'
        : 'Mastery in strategic corporate communication, PR releases, internal/external stakeholder alignment, and compelling storytelling.',
      highlights: isVi ? [
        'Truyền thông chiến lược tại FPT Education',
        'Viết thông cáo báo chí & thiết kế media kit',
        'Đồng nhất thông điệp thương hiệu đa nền tảng',
        'Truyền thông khủng hoảng & định hướng dư luận'
      ] : [
        'Strategic corporate communications at FPT Education',
        'Press release copywriting & media kit design',
        'Cross-platform brand messaging consistency',
        'Crisis communication & audience sentiment tuning'
      ]
    },
    {
      id: 'project-management',
      name: isVi ? 'Quản Lý Dự Án' : 'Project Management',
      category: isVi ? 'Lãnh Đạo Vận Hành' : 'Operational Leadership',
      icon: Workflow,
      description: isVi
        ? 'Tổ chức toàn diện các giải đấu quốc gia, quản lý ngân sách liên phòng ban, lịch trình sản xuất chặt chẽ và đội ngũ liên chức năng.'
        : 'End-to-end orchestration of national tournaments, multi-department budgets, tight production schedules, and cross-functional teams.',
      highlights: isVi ? [
        'Quản lý vòng đời Podcast F-EXP \'N BEYOND',
        'Giám sát các team media qua hơn 8 cuộc thi toàn quốc',
        'Lập kế hoạch nhân sự & timeline cho chuỗi sự kiện',
        'Điều phối giữa nghệ sĩ, nhà tài trợ & ekip sản xuất'
      ] : [
        'Full lifecycle management of F-EXP \'N BEYOND Podcast',
        'Supervision of media sub-teams across 8+ national competitions',
        'Resource & timeline planning for multi-day live camps',
        'Stakeholder coordination between artists, sponsors & crew'
      ]
    },
    {
      id: 'analytical',
      name: isVi ? 'Kỹ Năng Phân Tích' : 'Analytical Skills',
      category: isVi ? 'Dữ Liệu & Tối Ưu' : 'Data & Optimization',
      icon: BarChart3,
      description: isVi
        ? 'Trích xuất các chỉ số thực tế từ chiến dịch truyền thông để tối ưu hóa phạm vi tiếp cận, tỷ lệ giữ chân và tỷ lệ chuyển đổi khán giả.'
        : 'Extracting actionable metrics from communication campaigns to measurably drive reach, retention, and audience conversion.',
      highlights: isVi ? [
        'Tối ưu hóa tăng 20% mức độ tương tác của khán giả',
        'Phân tích đo lường mạng xã hội & độ phủ tự nhiên',
        'Báo cáo & kiểm toán hiệu suất sau chiến dịch',
        'Lập hồ sơ nhân khẩu học & phân bổ kênh truyền thông'
      ] : [
        '+20% Audience engagement boost optimization',
        'Social media telemetry & organic virality analysis',
        'Post-contest performance audits & reporting',
        'Audience demographic profiling & channel attribution'
      ]
    },
    {
      id: 'problem-solving',
      name: isVi ? 'Kỹ Năng Giải Quyết Vấn Đề' : 'Problem-Solving Skills',
      category: isVi ? 'Sự Linh Hoạt' : 'Ambivert Agility',
      icon: Lightbulb,
      description: isVi
        ? 'Kết nối các khía cạnh công việc để tạo ra phương pháp tiếp cận toàn diện, xử lý các sự cố sản xuất, sân khấu hoặc truyền thông một cách linh hoạt.'
        : 'Connecting different aspects of work for a holistic, resilient approach to unforeseen production, stage, or media roadblocks.',
      highlights: isVi ? [
        'Tiếp cận toàn diện kết nối tầm nhìn sáng tạo và hậu cần',
        'Xử lý sự cố trực tiếp nhanh chóng tại các cuộc thi hackathon',
        'Đàm phán linh hoạt làm cầu nối giữa người hướng nội & hướng ngoại',
        'Ngoại giao quốc tế đa bên (Việt Nam - Malaysia)'
      ] : [
        'Holistic approach connecting creative vision with logistics',
        'Rapid live event troubleshooting during national hackathons',
        'Adaptable ambivert negotiation bridging introverts & extroverts',
        'Multi-stakeholder international diplomacy (Vietnam - Malaysia)'
      ]
    },
    {
      id: 'media-knowledge',
      name: isVi ? 'Kiến Thức Truyền Thông' : 'Media & Communication Knowledge',
      category: isVi ? 'Chuyên Môn Sâu' : 'Domain Mastery',
      icon: Radio,
      description: isVi
        ? 'Nền tảng lý thuyết và thực tiễn vững chắc về truyền thông đại chúng, nền tảng số, hệ thống phát sóng và xu hướng viral.'
        : 'Deep theoretical and hands-on domain fluency across mass communications, digital platforms, broadcast systems, and viral trends.',
      highlights: isVi ? [
        'Sản xuất MV sáng tạo & đạo diễn hiện trường',
        'Quản lý nghệ sĩ & KOLs (MOV & Y An Film)',
        'Vận hành livestream phát sóng cho chung kết eSports',
        'Hiểu biết sâu sắc hệ sinh thái giải trí Việt Nam & PR'
      ] : [
        'Music video creative production & on-set direction',
        'Artist & influencer talent management (MOV & Y An Film)',
        'Broadcast livestream operations for esports & tech finals',
        'Vietnamese entertainment ecosystem & PR connections'
      ]
    },
    {
      id: 'creative-ai',
      name: isVi ? 'Đạo Diễn Sáng Tạo & AI' : 'Creative Direction & AI Prompting',
      category: isVi ? 'Đổi Mới Hiện Đại' : 'Modern Innovation',
      icon: Cpu,
      description: isVi
        ? 'Đạo diễn các câu chuyện hình ảnh đột phá, kết hợp làm phim truyền thống với kỹ thuật prompting AI để tạo ra các MV âm nhạc độc đáo.'
        : 'Directing cutting-edge visual narratives, combining traditional filmmaking with generative AI prompt engineering for groundbreaking music videos.',
      highlights: isVi ? [
        'Kỹ sư Prompt cho MV âm nhạc AI ("AI Bon Voyaige")',
        'Đạo diễn nghệ thuật, chỉnh màu & xử lý thẩm mỹ',
        'Hợp tác cùng nhà sản xuất âm nhạc (Masew, Indie)',
        'Lên ý tưởng video ngắn viral (TikTok, Reels, Shorts)'
      ] : [
        'Prompt engineering for generative AI music video ("AI Bon Voyaige")',
        'Art direction, color grading & aesthetic treatment',
        'Music producer collaboration (Masew, independent artists)',
        'Viral short-form video concepting (TikTok, Reels, Shorts)'
      ]
    }
  ];

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
            {isVi ? '04 / MA TRẬN CHUYÊN MÔN' : '04 / EXPERTISE MATRIX'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            {t('skills.title') || (isVi ? 'Kỹ Năng' : 'Skills & Capabilities')}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          {isVi ? 'Các năng lực cốt lõi mang lại hiệu quả thực tế' : 'Core Proficiencies Grounded in Real-World Impact'}
        </p>
      </div>

      {/* Grid of Skill Cards with Interactive Hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_GROUPS.map((skill) => {
          const Icon = skill.icon;
          const isSelected = activeSkillId === skill.id;

          return (
            <div
              key={skill.id}
              onClick={() => setActiveSkillId(skill.id)}
              className={`group glass-card rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-cyan-400/50 bg-slate-900/90 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)]'
                  : 'border-white/10 hover:border-white/25 hover:bg-slate-900/60'
              }`}
            >
              <div>
                {/* Header row: Icon & level */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-cyan-200 transition-colors">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                  {isVi ? 'Kinh Nghiệm Thực Tế' : 'Proven Experience'}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {skill.highlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
