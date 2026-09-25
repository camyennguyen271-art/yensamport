import React, { useState } from 'react';
import { Mail, Copy, Check, MapPin, Download } from 'lucide-react';
import { TikTokIcon, FacebookIcon, ZaloIcon, InstagramIcon } from './SocialIcons';

interface ContactSectionProps {
  onExportHtml?: () => void;
}

const SOCIAL_LINKS = [
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@yensam.media',
    href: 'https://www.tiktok.com/@yensam.media',
    Icon: TikTokIcon,
    color: 'from-[#010101] to-[#1a1a2e]',
    hoverBorder: 'hover:border-[#fe2c55]/50',
    hoverText: 'hover:text-white',
    accent: '#fe2c55',
    description: 'Nội dung sáng tạo & hậu trường sản xuất',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'Yến Sam - Media',
    href: 'https://www.facebook.com/yensam.media',
    Icon: FacebookIcon,
    color: 'from-[#0a1628] to-[#0d1f3c]',
    hoverBorder: 'hover:border-[#1877F2]/50',
    hoverText: 'hover:text-white',
    accent: '#1877F2',
    description: 'Cập nhật dự án & sự kiện mới nhất',
  },
  {
    id: 'zalo',
    label: 'Zalo',
    handle: 'Nguyễn Thị Cẩm Yến',
    href: 'https://zalo.me/0000000000',
    Icon: ZaloIcon,
    color: 'from-[#001a3a] to-[#00112b]',
    hoverBorder: 'hover:border-[#0068FF]/50',
    hoverText: 'hover:text-white',
    accent: '#0068FF',
    description: 'Liên hệ nhanh qua Zalo',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@yensam.creative',
    href: 'https://www.instagram.com/yensam.creative',
    Icon: InstagramIcon,
    color: 'from-[#1a0a2e] to-[#2d0a1f]',
    hoverBorder: 'hover:border-[#d62976]/50',
    hoverText: 'hover:text-white',
    accent: '#fa7e1e',
    description: 'Visual storytelling & creative portfolio',
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ onExportHtml }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('camyen.nguyen.271@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-36">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">05 / DIRECT INQUIRY</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            Let's Connect & Collaborate
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          Ready for Strategic Media, PR & Production Challenges
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct contact info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">Reach Out Directly</span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Nguyễn Thị Cẩm Yến
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Media Specialist · Creative Producer · Talent Lead
              </p>
            </div>

            {/* Email Box with 1-Click Copy */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
              <div className="text-xs font-mono text-slate-400">Official Direct Email</div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-bold text-white truncate font-mono">
                  camyen.nguyen.271@gmail.com
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Location & Status */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Ho Chi Minh City, Vietnam (Available for On-site & Hybrid)</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-emerald-300 font-medium">Currently Available for Select Media Engagements & Projects</span>
              </div>
            </div>

            {/* Direct Mailto Button */}
            <div className="pt-2">
              <a
                href="mailto:camyen.nguyen.271@gmail.com?subject=Inquiry%20regarding%20Media%20Specialist%20Role%20/%20Project"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-cyan-50 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Open in Email App</span>
              </a>
            </div>
          </div>

          {/* Quick Technical Single-File Bundle Card */}
          {onExportHtml && (
            <div className="p-4 rounded-xl border border-white/10 bg-slate-900/40 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-white font-mono">Single-File Production HTML</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Standalone self-contained portfolio bundle</div>
              </div>
              <button
                onClick={onExportHtml}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export HTML</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Social Media Links (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Kết Nối Trên Mạng Xã Hội
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Theo dõi hành trình sáng tạo của Yến Sam
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOCIAL_LINKS.map(({ id, label, handle, href, Icon, color, hoverBorder, accent, description }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`social-link-${id}`}
                  className={`group relative flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${color} border border-white/10 ${hoverBorder} transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95 cursor-pointer overflow-hidden`}
                  style={{ '--accent': accent } as React.CSSProperties}
                >
                  {/* Subtle glow on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${accent}22, transparent 70%)` }}
                  />

                  {/* Icon container */}
                  <div className="relative shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <div className="relative flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-display">{label}</span>
                      <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                    <div className="text-xs font-mono mt-0.5 truncate" style={{ color: accent }}>{handle}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-1">{description}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick CTA */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Phản hồi trong vòng 24 giờ
              </span>
              <a
                href="mailto:camyen.nguyen.271@gmail.com"
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Gửi Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Footer */}
      <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <div>
          © {new Date().getFullYear()} NGUYỄN THỊ CẨM YẾN (Yến Sam) · All Rights Reserved
        </div>
        <div className="flex items-center gap-4">
          <span className="text-cyan-400">Media Specialist</span>
          <span>·</span>
          <span>FPT University Alumna</span>
          <span>·</span>
          <span>Ho Chi Minh City</span>
        </div>
      </footer>
    </section>
  );
};
