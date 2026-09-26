import React, { useState, useEffect } from 'react';
import { useI18n } from '../lib/i18n';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { SkillsSection } from '../components/SkillsSection';
import { ContactSection } from '../components/ContactSection';
import { DockNavigation } from '../components/DockNavigation';

export const Home: React.FC = () => {
  const { t, language, toggleLanguage } = useI18n();
  const [activeSection, setActiveSection] = useState<string>('about');

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

  return (
    <div className="min-h-screen bg-[#030611] text-[#E2E8F0] selection:bg-cyan-500/30 selection:text-white relative">
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#030611]/80 border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        <a 
          href="#"
          className="text-sm sm:text-base font-extrabold tracking-tight text-white font-display hover:text-cyan-300 transition-colors whitespace-nowrap"
        >
          YẾN SAM <span className="text-cyan-400 font-mono text-xs font-normal">/ MEDIA SPECIALIST</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a>
          <a href="#experience" className="hover:text-white transition-colors">{t('nav.experience')}</a>
          <a href="#projects" className="hover:text-white transition-colors">{t('nav.projects')}</a>
          <a href="#skills" className="hover:text-white transition-colors">{t('nav.skills')}</a>
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleContactClick}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-cyan-100 rounded-full transition-all cursor-pointer whitespace-nowrap shadow-sm hover:scale-105"
          >
            {t('nav.contact')}
          </button>
          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="ml-3 px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-200 rounded-full hover:bg-slate-700 flex items-center gap-2 border border-white/10 transition-colors"
          >
            {language === 'vi' ? '🇻🇳 VIE' : '🇬🇧 ENG'}
          </button>

        </div>
      </header>

      <main>
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

      <DockNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onContactClick={handleContactClick}
      />
    </div>
  );
};
