import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

interface DockNavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onContactClick: () => void;
}

export const DockNavigation: React.FC<DockNavigationProps> = ({
  activeSection,
  onNavigate,
  onContactClick,
}) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
  ];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[94vw] sm:max-w-none">
      <nav 
        aria-label="Floating Navigation Dock"
        className="glass-dock rounded-full px-2.5 py-1.5 sm:px-4 sm:py-2 flex items-center gap-1 sm:gap-2 shadow-2xl transition-all duration-300"
      >
        {/* Logo / Monogram "YS" */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-800/90 hover:bg-slate-700 text-cyan-300 font-display font-extrabold text-xs sm:text-sm tracking-tighter border border-white/10 transition-all hover:scale-105 cursor-pointer shadow-inner shrink-0"
          title="Yến Sam - Back to Top"
        >
          YS
        </button>

        {/* Hairline vertical divider */}
        <div className="w-[1px] h-4 bg-white/15 mx-0.5 sm:mx-1 shrink-0" />

        {/* Nav Links */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/15 font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hairline vertical divider */}
        <div className="w-[1px] h-4 bg-white/15 mx-0.5 sm:mx-1 shrink-0" />

        {/* Highlighted CTA: "Contact Me" */}
        <button
          onClick={onContactClick}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white text-slate-950 hover:bg-cyan-50 font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:scale-105 active:scale-95 shrink-0 whitespace-nowrap"
        >
          <Mail className="w-3.5 h-3.5 text-slate-900" />
          <span>Contact Me</span>
        </button>
      </nav>
    </div>
  );
};
