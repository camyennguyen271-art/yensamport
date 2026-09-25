/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { DockNavigation } from './components/DockNavigation';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import { Mail, Download, Sparkles } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  // IntersectionObserver for tracking active section
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
      
      {/* Top Bar Contract (Strict 3-zone standard) */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#030611]/80 border-b border-white/[0.08] px-4 sm:px-8 py-3.5 flex items-center justify-between transition-all">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#"
          className="text-sm sm:text-base font-extrabold tracking-tight text-white font-display hover:text-cyan-300 transition-colors whitespace-nowrap"
        >
          YẾN SAM <span className="text-cyan-400 font-mono text-xs font-normal">/ MEDIA SPECIALIST</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#experience" className="hover:text-white transition-colors">Experience</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-cyan-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
            title="Export Single HTML File"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Single HTML</span>
          </button>
          
          <button
            onClick={handleContactClick}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white hover:bg-cyan-100 rounded-full transition-all cursor-pointer whitespace-nowrap shadow-sm hover:scale-105"
          >
            Contact
          </button>
        </div>
      </header>

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onContactClick={handleContactClick}
          onNavigate={handleNavigate}
        />

        {/* About Section */}
        <AboutSection />

        {/* Work Experience Section */}
        <ExperienceSection />

        {/* Key Projects Section */}
        <ProjectsSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Contact Section */}
        <ContactSection
          onExportHtml={() => setIsExportModalOpen(true)}
        />
      </main>

      {/* Floating Capsule Dock (Bottom) */}
      <DockNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onContactClick={handleContactClick}
      />

      {/* Standalone Single HTML Export Modal */}
      <ExportHtmlModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
