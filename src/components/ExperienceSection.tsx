import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useI18n } from '../lib/i18n';

export const ExperienceSection: React.FC = () => {
  const { language, t } = useI18n();
  const isVi = language === 'vi';
  const [expandedId, setExpandedId] = useState<string | null>('fpt-comms-2024');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const EXPERIENCES = [
    {
      id: 'fpt-comms-2024',
      role: isVi ? 'Chuyên Viên Tổ Chức Sự Kiện, Kịch Bản & Truyền Thông' : 'Event Operations, Scriptwriting & Communication Executive',
      company: isVi ? 'Đại học FPT Cần Thơ' : 'FPT University Can Tho',
      year: '05/2024 — Hiện tại',
      tagline: isVi ? 'Quản lý sự kiện, viết kịch bản & truyền thông thương hiệu giáo dục' : 'Educational brand marketing, copywriting & full-cycle event production',
      category: isVi ? 'Truyền thông Giáo dục' : 'Education Communications',
      metrics: '+20% Engagement',
      achievements: isVi ? [
        'Lên kế hoạch và thực hiện các chiến lược truyền thông toàn diện để quảng bá các chương trình và sự kiện của trường.',
        'Quản lý truyền thông nội bộ và đối ngoại (thông cáo báo chí, bản tin, mạng xã hội) đảm bảo thông điệp nhất quán.',
        'Hợp tác với các nhóm liên chức năng để tạo nội dung thu hút khách hàng, tăng 20% lượng tương tác.',
        'Tổ chức và quản lý các sự kiện PR lớn, nâng cao uy tín của trường trong ngành giáo dục.'
      ] : [
        'Planned and executed comprehensive communication strategies to promote university programs and events.',
        'Managed internal and external communications, including press releases, newsletters, and social media updates, ensuring consistent and aligned messaging.',
        'Collaborated with cross-functional teams to create content that resonated with both customers and stakeholders, boosting engagement and brand loyalty.',
        'Analyzed communication campaigns and provided actionable insights to optimize future strategies, contributing to a 20% increase in audience engagement.',
        'Organized and managed high-profile PR events, enhancing the company\'s visibility and reputation in the education industry.'
      ]
    },
    {
      id: 'mov-media-2022',
      role: isVi ? 'Quản Lý Truyền Thông & Sự Kiện' : 'Media & Event Manager',
      company: 'MOV Communications',
      year: '2022',
      tagline: isVi ? 'Chiến lược truyền thông nghệ sĩ & PR giải trí' : 'Artist media strategies, entertainment public relations & tailored activations',
      category: isVi ? 'PR Giải Trí & Nghệ Sĩ' : 'Entertainment & Artist PR',
      achievements: isVi ? [
        'Xây dựng và thực thi chiến lược truyền thông cho nghệ sĩ, đảm bảo phù hợp với mục tiêu thương hiệu.',
        'Lên kế hoạch và tổ chức các sự kiện giải trí và hoạt động kích hoạt thương hiệu theo yêu cầu khách hàng.',
        'Nâng cao uy tín công ty, mức độ nhận diện nghệ sĩ và sự hài lòng của đối tác.'
      ] : [
        'Developed and executed media strategies for the company\'s artists, ensuring alignment with brand goals and audience engagement.',
        'Planned and organized tailored entertainment events and activations customized to client requirements.',
        'Enhanced the company\'s industry reputation, artist profile visibility, and client satisfaction metrics.'
      ]
    },
    {
      id: 'yanh-talent-2021',
      role: isVi ? 'Quản Lý Talent / KOLs' : 'Talent Manager',
      company: 'Y Anh Film Joint Stock Company',
      year: '2021',
      tagline: isVi ? 'Đại diện KOL, đàm phán hợp đồng & chiến dịch thương mại' : 'Influencer representation, contract negotiation & commercial campaigns',
      category: isVi ? 'Quản lý KOLs / Influencer' : 'Talent & Influencer Management',
      achievements: isVi ? [
        'Quản lý hoạt động của influencer, bao gồm đàm phán hợp đồng thương mại, định hướng nội dung và thực thi chiến dịch.',
        'Ký kết thành công các hợp đồng quảng cáo, mở rộng phạm vi thương mại, tài trợ và doanh thu công ty.'
      ] : [
        'Managed influencer activities, including commercial contract negotiations, creative content briefs, and campaign execution.',
        'Successfully secured advertising contracts for influencers, expanding commercial reach, brand sponsorships, and company revenue.'
      ]
    },
    {
      id: 'hayd-minishow-2021',
      role: isVi ? 'Nhà Sản Xuất & Tổ Chức Sự Kiện' : 'Organizer & Event Producer',
      company: 'Hayd Minishow in Vietnam',
      year: '2021',
      tagline: isVi ? 'Quản lý hậu cần, marketing & vận hành concert nghệ sĩ quốc tế' : 'International artist fanmeeting logistics, marketing & live concert operations',
      category: isVi ? 'Sản Xuất Concert Live' : 'Live Concert Production',
      achievements: isVi ? [
        'Tổ chức thành công và quản lý toàn bộ khâu hậu cần, marketing và vận hành sự kiện Hayd Minishow & Fanmeeting tại VN.',
        'Phối hợp với các đối tác trong nước và quốc tế, công ty quản lý nghệ sĩ để mang lại trải nghiệm hoàn hảo cho fan.'
      ] : [
        'Successfully organized and managed the end-to-end logistics, marketing, and execution of the Hayd Minishow and Fanmeeting in Vietnam.',
        'Coordinated across international and local stakeholders, management agencies, and venue staff to deliver a seamless event experience for both fans and the artist.'
      ]
    },
    {
      id: 'fpt-admission-2018',
      role: isVi ? 'Tư Vấn Tuyển Sinh & Telesales' : 'Admission & Telesales Consultant',
      company: 'Đại học FPT TP.HCM',
      year: '2018 — 2021',
      tagline: isVi ? 'Tư vấn tuyển sinh, chiến lược ghi danh & chăm sóc học sinh' : 'Student admissions advisory, enrollment strategy & consultative engagement',
      category: isVi ? 'Tuyển Sinh & Tư Vấn' : 'Admissions & Client Advisory',
      achievements: isVi ? [
        'Tư vấn và hướng dẫn sinh viên tương lai trong quá trình tuyển sinh với thành tích xuất sắc trong 3 năm.',
        'Góp phần đáng kể vào sự phát triển của trường thông qua việc đạt chỉ tiêu tuyển sinh và duy trì tỷ lệ hài lòng cao.'
      ] : [
        'Provided three years of high-performing experience as an enrollment consultant and telesales representative, effectively advising and guiding prospective students through the university admission process.',
        'Contributed significantly to the university\'s institutional growth by consistently achieving enrollment targets and maintaining high customer satisfaction.'
      ]
    }
  ];

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
            {isVi ? '02 / HÀNH TRÌNH SỰ NGHIỆP' : '02 / PROFESSIONAL TIMELINE'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            {t('experience.title') || (isVi ? 'Kinh Nghiệm' : 'Work Experience')}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          {isVi ? '5 Cột mốc quan trọng · Lãnh đạo Truyền thông & Chiến lược' : '5 Key Appointments · Strategic Communications & Media Leadership'}
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {EXPERIENCES.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => toggleExpand(item.id)}
              className={`group glass-card rounded-2xl p-5 sm:p-7 transition-all duration-300 cursor-pointer border ${
                isExpanded
                  ? 'border-cyan-500/40 bg-slate-900/80 shadow-[0_10px_35px_-10px_rgba(6,182,212,0.15)]'
                  : 'border-white/10 hover:border-white/20 hover:bg-slate-900/50'
              }`}
            >
              {/* Card Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-4">
                  {/* Index / Accent indicator */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-cyan-300 shrink-0 group-hover:border-cyan-400/50 transition-colors">
                    0{index + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                      <span className="text-white font-semibold">{item.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400">{item.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight mt-1 group-hover:text-cyan-200 transition-colors">
                      {item.role}
                    </h3>
                  </div>
                </div>

                {/* Right side: Key metric & Expand toggle */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  {item.metrics && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono whitespace-nowrap">
                      {item.metrics}
                    </span>
                  )}
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Tagline summary */}
              <p className="text-xs sm:text-sm text-slate-300 mt-3 ml-0 md:ml-12 font-normal leading-relaxed">
                {item.tagline}
              </p>

              {/* Expanded Bullet Points from Official CV */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-white/10 ml-0 md:ml-12 space-y-2.5 transition-all">
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
                    {isVi ? 'Trách Nhiệm & Kết Quả' : 'Key Responsibilities & Deliverables'}
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {item.achievements.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
