import React, { useState } from 'react';
import { Mail, Copy, Check, MapPin, Plus, Trash2, Globe, ExternalLink } from 'lucide-react';
import { TikTokIcon, FacebookIcon, ZaloIcon, InstagramIcon } from './SocialIcons';
import { useI18n } from '../lib/i18n';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText, ItemControls } from './admin/InlineEditHelpers';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  TikTok: TikTokIcon,
  Facebook: FacebookIcon,
  Zalo: ZaloIcon,
  Instagram: InstagramIcon,
  Mail: Mail,
  Globe: Globe,
};

export const ContactSection: React.FC = () => {
  const { language, t } = useI18n();
  const { data, updateContact, updateSocialLink, addSocialLink, deleteSocialLink, isEditMode } = useSiteData();
  const contact = data.contact;
  const socialLinks = contact.socialLinks || [];
  const isVi = language === 'vi';
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email || 'camyen.nguyen.271@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddSocialLink = () => {
    const newId = `soc_${Date.now()}`;
    addSocialLink({
      id: newId,
      name: 'Mạng Xã Hội Mới',
      handle: '@yensam.media',
      url: 'https://example.com',
      icon: 'Globe',
      descriptionVi: 'Mô tả kênh mạng xã hội',
      descriptionEn: 'Social channel description'
    });
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
            {isVi ? '05 / KẾT NỐI TRỰC TIẾP' : '05 / DIRECT INQUIRY'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            <InlineText
              value={isVi ? contact.titleVi : contact.titleEn}
              onChange={(val) => updateContact(isVi ? { titleVi: val } : { titleEn: val })}
            />
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          <InlineText
            value={isVi ? contact.subtitleVi : contact.subtitleEn}
            onChange={(val) => updateContact(isVi ? { subtitleVi: val } : { subtitleEn: val })}
          />
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
                  <InlineText
                    value={contact.email}
                    onChange={(val) => updateContact({ email: val })}
                  />
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
                <span>
                  <InlineText
                    value={isVi ? contact.addressVi : contact.addressEn}
                    onChange={(val) => updateContact(isVi ? { addressVi: val } : { addressEn: val })}
                  />
                </span>
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
                href={`mailto:${contact.email}?subject=Inquiry%20regarding%20Media%20Specialist%20Role`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-950 hover:bg-cyan-50 font-bold text-xs sm:text-sm transition-all duration-200 shadow-md cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>{isVi ? 'Soạn Email Mới' : 'Open in Email App'}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Social Links */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {isVi ? 'Kết Nối Trên Mạng Xã Hội' : 'Connect on Social Media'}
                </h3>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  {isVi ? 'Theo dõi hành trình sáng tạo của Yến Sam' : 'Follow the creative journey of Yen Sam'}
                </p>
              </div>

              {isEditMode && (
                <button
                  type="button"
                  onClick={handleAddSocialLink}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1 shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm kênh</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {socialLinks.map((item) => {
                const IconComponent = ICON_MAP[item.icon] || Globe;
                const desc = isVi ? (item.descriptionVi || 'Nội dung sáng tạo') : (item.descriptionEn || 'Social content');

                return (
                  <div
                    key={item.id}
                    className="group relative flex items-center gap-4 p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:scale-[1.02] shadow-md overflow-hidden"
                  >
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => deleteSocialLink(item.id)}
                        className="absolute top-2 right-2 p-1 text-rose-400 hover:text-rose-200 bg-rose-500/20 hover:bg-rose-500/30 rounded-lg transition-colors z-20 cursor-pointer"
                        title="Xóa kênh này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="relative shrink-0 w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <div className="relative flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-white font-display">
                          <InlineText
                            value={item.name}
                            onChange={(val) => updateSocialLink(item.id, { name: val })}
                          />
                        </span>
                        {!isEditMode && (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white">
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>

                      <div className="text-xs font-mono text-cyan-400 mt-0.5 truncate">
                        <InlineText
                          value={item.handle}
                          onChange={(val) => updateSocialLink(item.id, { handle: val })}
                        />
                      </div>

                      {isEditMode && (
                        <div className="text-[10px] font-mono text-slate-500 truncate mt-0.5">
                          Link: <InlineText value={item.url} onChange={(val) => updateSocialLink(item.id, { url: val })} />
                        </div>
                      )}

                      <div className="text-[11px] text-slate-400 mt-1 leading-tight line-clamp-1">
                        <InlineText
                          value={desc}
                          onChange={(val) => updateSocialLink(item.id, isVi ? { descriptionVi: val } : { descriptionEn: val })}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                {isVi ? 'Phản hồi trong vòng 24 giờ' : 'Response within 24 hours'}
              </span>
              <a
                href={`mailto:${contact.email}`}
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
