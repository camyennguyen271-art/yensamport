import React from 'react';
import { GraduationCap, Sparkles, Compass, Target, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">01 / CANDIDATE DOSSIER</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            About Yến Sam
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          Ho Chi Minh City, Vietnam · camyen.nguyen.271@gmail.com
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Narrative & Philosophy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              A Holistic Connector at the Intersection of Media, Strategy & Production
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              I am an <strong className="text-white font-semibold">ambivert</strong> who is proactive, friendly, and highly motivated. I thrive in dynamic environments where I can continuously expand my knowledge and acquire high-impact experience.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              My superpower lies in <strong className="text-cyan-300 font-semibold">connecting different aspects of work</strong>—from artist storytelling and MV direction to data-driven PR analytics and large-scale youth events—contributing to a well-rounded, holistic approach to creative problem-solving.
            </p>

            {/* Core Values / Work Ethic Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase font-mono text-cyan-400 font-semibold">Proactivity</span>
                <span className="text-xs text-slate-300">Initiates forward momentum across cross-functional media projects.</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase font-mono text-rose-400 font-semibold">Ambivert Balance</span>
                <span className="text-xs text-slate-300">Blends empathetic stakeholder relations with deep analytical focus.</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase font-mono text-amber-400 font-semibold">Holistic Vision</span>
                <span className="text-xs text-slate-300">Unifies concept, production, PR dissemination, and measurable ROI.</span>
              </div>
            </div>
          </div>

          {/* Impact Stats Grid (Unboxed Clean Typography) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display tabular-nums">
                +20%
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Audience Engagement Boost</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-display tabular-nums">
                10+
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Contests & Youth Events</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-display tabular-nums">
                3+
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Directed Music Videos</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display tabular-nums">
                4+ Yrs
              </div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Media & Talent Track Record</div>
            </div>
          </div>
        </div>

        {/* Right Column: Education History & Academic Background (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-display tracking-tight">
                Education History
              </h3>
            </div>

            {/* University 1 */}
            <div className="space-y-1.5 relative pl-4 border-l-2 border-cyan-500/40">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>2018 – 2022</span>
                <span className="text-cyan-400 font-medium">HO CHI MINH CITY</span>
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                FPT UNIVERSITY
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Multimedia Communications Student
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                Foundations in mass communications, digital media strategies, campaign management, broadcast storytelling, and interactive systems.
              </p>
            </div>

            {/* University 2 (Exchange) */}
            <div className="space-y-1.5 relative pl-4 border-l-2 border-rose-500/40">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>2019 – 2020</span>
                <span className="text-rose-400 font-medium">MALAYSIA</span>
              </div>
              <h4 className="text-base font-bold text-white tracking-tight">
                MULTIMEDIA UNIVERSITY (MMU)
              </h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Multimedia Communications Exchange Student
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                International academic immersion in multicultural communication, visual arts technology, and cross-border creative production.
              </p>
            </div>
          </div>

          {/* Quick Quote / Philosophy Card */}
          <div className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/20 via-slate-900/40 to-slate-950/70">
            <p className="text-xs italic text-slate-300 leading-relaxed">
              "Connecting disparate disciplines into one cohesive narrative makes work meaningful, impactful, and unforgettable for the audience."
            </p>
            <div className="mt-3 text-right">
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400">— Yến Sam</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
