import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Sparkles, MapPin, MessageSquare, Download, CheckCircle2 } from 'lucide-react';

interface ContactSectionProps {
  onExportHtml?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onExportHtml }) => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Media & Event Project Collaboration',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('camyen.nguyen.271@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setFormSubmitted(true);
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

        {/* Right Column: Interactive Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10">
            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-950/70 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">
                  Message Prepared!
                </h3>
                <p className="text-slate-300 text-sm max-w-md leading-relaxed">
                  Thank you for reaching out, <strong className="text-white">{formData.name || 'Friend'}</strong>. A direct email draft has been generated for Yến Sam at <code className="text-cyan-300 font-mono text-xs">camyen.nguyen.271@gmail.com</code>.
                </p>
                <div className="pt-2 flex gap-3">
                  <a
                    href={`mailto:camyen.nguyen.271@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Hi Yến Sam,\n\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`)}`}
                    className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-200 transition-colors"
                  >
                    Confirm & Send via Email
                  </a>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-slate-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                  >
                    Edit Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-white font-display">
                  Send a Direct Message
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Johnson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Collaboration Focus
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                  >
                    <option value="Media Strategy & PR Campaign">Media Strategy & PR Campaign</option>
                    <option value="Event, Contest & Hackathon Leadership">Event, Contest & Hackathon Leadership</option>
                    <option value="Creative MV Direction & AI Prompting">Creative MV Direction & AI Prompting</option>
                    <option value="Talent & Artist Representation">Talent & Artist Representation</option>
                    <option value="Full-Time / Contract Position">Full-Time / Contract Position</option>
                    <option value="General Inquiry / Networking">General Inquiry / Networking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your vision, timeline, or scope of collaboration..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-white/10 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    Direct reply within 24 hours
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 active:scale-95"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            )}
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
