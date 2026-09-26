import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, MapPin } from 'lucide-react';
import { TikTokIcon, FacebookIcon, ZaloIcon, InstagramIcon } from './SocialIcons';
import { supabase } from '../lib/supabase';
import { useI18n } from '../lib/i18n';

// Fallback socials just in case
export const SOCIAL_LINKS = [
  {
    id: 'tiktok',
    label: 'TikTok',
    handle: '@yensam.media',
    href: 'https://www.tiktok.com/@yensam.media',
    Icon: TikTokIcon,
    color: 'from-[#010101] to-[#1a1a2e]',
    hoverBorder: 'hover:border-[#fe2c55]/50',
    accent: '#fe2c55',
    description: 'Nội dung sáng tạo & hậu trường',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    handle: 'Yến Sam - Media',
    href: 'https://www.facebook.com/yensam.media',
    Icon: FacebookIcon,
    color: 'from-[#0a1628] to-[#0d1f3c]',
    hoverBorder: 'hover:border-[#1877F2]/50',
    accent: '#1877F2',
    description: 'Cập nhật dự án mới nhất',
  },
  {
    id: 'zalo',
    label: 'Zalo',
    handle: 'Nguyễn Thị Cẩm Yến',
    href: 'https://zalo.me/0000000000',
    Icon: ZaloIcon,
    color: 'from-[#001a3a] to-[#00112b]',
    hoverBorder: 'hover:border-[#0068FF]/50',
    accent: '#0068FF',
    description: 'Liên hệ nhanh',
  }
];

export const ContactSection: React.FC = () => {
  const { language, t } = useI18n();
  const isVi = language === 'vi';
  const [copied, setCopied] = useState(false);
  const [socials, setSocials] = useState<any[]>(SOCIAL_LINKS);

  useEffect(() => {
    const fetchSocials = async () => {
      const { data, error } = await supabase.from('site_content').select('*').eq('section_name', 'footer').single();
      if (!error && data && data.content_json && Array.isArray(data.content_json.socials)) {
        // Map icon based on id
        const iconMap: Record<string, any> = { tiktok: TikTokIcon, facebook: FacebookIcon, zalo: ZaloIcon, instagram: InstagramIcon };
        const colorMap: Record<string, any> = {
          tiktok: { color: 'from-[#010101] to-[#1a1a2e]', border: 'hover:border-[#fe2c55]/50', accent: '#fe2c55' },
          facebook: { color: 'from-[#0a1628] to-[#0d1f3c]', border: 'hover:border-[#1877F2]/50', accent: '#1877F2' },
          zalo: { color: 'from-[#001a3a] to-[#00112b]', border: 'hover:border-[#0068FF]/50', accent: '#0068FF' },
          instagram: { color: 'from-[#2e0916] to-[#1a0515]', border: 'hover:border-[#E1306C]/50', accent: '#E1306C' }
        };

        const parsed = data.content_json.socials.map((s: any) => ({
          ...s,
          Icon: iconMap[s.id] || Mail,
          color: colorMap[s.id]?.color || 'from-slate-900 to-slate-950',
          hoverBorder: colorMap[s.id]?.border || 'hover:border-cyan-400/50',
          accent: colorMap[s.id]?.accent || '#22d3ee'
        }));
        setSocials(parsed);
      }
    };
    fetchSocials();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('camyen.nguyen.271@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
            {isVi ? '05 / KẾT NỐI TRỰC TIẾP' : '05 / DIRECT INQUIRY'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            {t('contact.title') || (isVi ? 'Kết Nối & Hợp Tác' : 'Let\'s Connect & Collaborate')}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          {isVi ? 'Sẵn Sàng Cho Các Dự Án Media, PR & Sự Kiện Mới' : 'Ready for Strategic Media, PR & Production Challenges'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
                {isVi ? 'Liên Hệ Trực Tiếp' : 'Reach Out Directly'}
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-1">
                Nguyễn Thị Cẩm Yến
              </h3>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Media Specialist · Creative Producer · Talent Lead
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/90 border border-white/10 space-y-2">
              <div className="text-xs font-mono text-slate-400">{isVi ? 'Email Trực Tiếp' : 'Official Direct Email'}</div>
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
                      <span>{isVi ? 'Đã copy!' : 'Copied!'}</span>
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

            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{isVi ? 'TP. Hồ Chí Minh, Việt Nam (On-site & Hybrid)' : 'Ho Chi Minh City, Vietnam (Available for On-site & Hybrid)'}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-emerald-300 font-medium">
                  {isVi ? 'Sẵn sàng tham gia các dự án & công việc mới' : 'Currently Available for Select Media Engagements & Projects'}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="mailto:camyen.nguyen.271@gmail.com?subject=Inquiry%20regarding%20Media%20Specialist%20Role%20/%20Project"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-cyan-50 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{isVi ? 'Soạn Email Mới' : 'Open in Email App'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                {isVi ? 'Kết Nối Trên Mạng Xã Hội' : 'Connect on Social Media'}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {isVi ? 'Theo dõi hành trình sáng tạo của Yến Sam' : 'Follow the creative journey of Yen Sam'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socials.map(({ id, label, handle, href, Icon, color, hoverBorder, accent, description }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br ${color} border border-white/10 ${hoverBorder} transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95 cursor-pointer overflow-hidden`}
                  style={{ '--accent': accent } as React.CSSProperties}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 30% 50%, ${accent}22, transparent 70%)` }}
                  />

                  <div className="relative shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

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

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {isVi ? 'Phản hồi trong vòng 24 giờ' : 'Response within 24 hours'}
              </span>
              <a
                href="mailto:camyen.nguyen.271@gmail.com"
                className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isVi ? 'Gửi Email' : 'Send Email'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <div>
          {isVi ? `© ${new Date().getFullYear()} NGUYỄN THỊ CẨM YẾN (Yến Sam) · All Rights Reserved` : `© ${new Date().getFullYear()} NGUYEN THI CAM YEN (Yen Sam) · All Rights Reserved`}
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
