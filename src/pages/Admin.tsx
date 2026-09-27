import React, { useState, useEffect } from 'react';
import { useSiteData } from '../lib/SiteDataContext';
import { useI18n } from '../lib/i18n';
import { TopAdminToolbar } from '../components/admin/TopAdminToolbar';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { SkillsSection } from '../components/SkillsSection';
import { ContactSection } from '../components/ContactSection';
import { DockNavigation } from '../components/DockNavigation';
import { Lock, Mail, Key, Sparkles, ArrowRight } from 'lucide-react';

const ADMIN_SESSION_KEY = 'yensam_admin_authenticated';

export const Admin: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const { t, language, toggleLanguage } = useI18n();
  const { isEditMode, setIsEditMode } = useSiteData();
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    if (isAuthenticated) {
      setIsEditMode(true);
    }
  }, [isAuthenticated, setIsEditMode]);

  useEffect(() => {
    const sectionIds = ['about', 'experience', 'projects', 'skills', 'contact'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.3 }
        );
        observer.observe(el);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleContactClick = () => {
    handleNavigate('contact');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'camyen.nguyen.271@gmail.com';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Yenntc2701';

    if (email.trim() === adminEmail && password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      setLoginError('');
      setIsEditMode(true);
    } else {
      setLoginError('Email hoặc Mật khẩu không chính xác.');
    }
  };

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      setIsAuthenticated(false);
      localStorage.removeItem(ADMIN_SESSION_KEY);
      setIsEditMode(false);
    }
  };

  // ==================== LOGIN SCREEN ====================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#030611] text-white flex items-center justify-center p-4 selection:bg-cyan-500/30">
        <div className="w-full max-w-md bg-slate-900/90 border border-white/15 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-rose-500"></div>

          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-300 mb-4 shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-extrabold font-display tracking-tight text-white">
              Admin Visual Editor
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Đăng nhập để chỉnh sửa trực tiếp nội dung website Yến Sam
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center font-medium animate-in fade-in">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Email quản trị
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="camyen.nguyen.271@gmail.com"
                  className="w-full bg-slate-950 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                Mật khẩu
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-950 border border-white/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all cursor-pointer mt-6"
            >
              <span>Vào trang quản trị Inline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-4 border-t border-white/10 text-center">
            <a
              href="/"
              className="text-xs text-slate-400 hover:text-cyan-300 transition-colors font-mono"
            >
              ← Quay lại trang chủ công khai
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ==================== VISUAL EDITOR INTERFACE ====================
  return (
    <div className="min-h-screen bg-[#030611] text-[#E2E8F0] selection:bg-cyan-500/30 selection:text-white relative pb-20">
      
      {/* 1. TOP FIXED ADMIN TOOLBAR */}
      <TopAdminToolbar
        onLogout={handleLogout}
        onAddProject={() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onAddExperience={() => {
          const el = document.getElementById('experience');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Mode Status Banner Notification when in Edit Mode */}
      {isEditMode && (
        <div className="bg-cyan-950/80 border-b border-cyan-500/30 py-1.5 px-4 text-center text-xs font-mono text-cyan-300 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Đang ở Chế độ Chỉnh sửa Trực tiếp (Inline Edit Mode). Rê chuột vào chữ hoặc hình ảnh để sửa!</span>
        </div>
      )}

      {/* 2. SITE MAIN CONTENT (Visual Editor context) */}
      <main className={isEditMode ? 'ring-1 ring-cyan-500/20' : ''}>
        <HeroSection
          onContactClick={handleContactClick}
          onNavigate={handleNavigate}
        />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>

      {/* Bottom Dock Navigation */}
      <DockNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onContactClick={handleContactClick}
      />
    </div>
  );
};
