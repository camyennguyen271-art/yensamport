import React, { useState } from 'react';
import { MessageSquare, BarChart3, Workflow, Lightbulb, Radio, Cpu, Users2, Sparkles } from 'lucide-react';

interface SkillGroup {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  level: string;
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'communication',
    name: 'Communication Skills',
    category: 'Core Competency',
    icon: MessageSquare,
    level: 'Expert',
    description: 'Mastery in strategic corporate communication, PR releases, internal/external stakeholder alignment, and compelling storytelling.',
    highlights: [
      'Strategic corporate communications at FPT Education',
      'Press release copywriting & media kit design',
      'Cross-platform brand messaging consistency',
      'Crisis communication & audience sentiment tuning'
    ]
  },
  {
    id: 'project-management',
    name: 'Project Management',
    category: 'Operational Leadership',
    icon: Workflow,
    level: 'Advanced',
    description: 'End-to-end orchestration of national tournaments, multi-department budgets, tight production schedules, and cross-functional teams.',
    highlights: [
      'Full lifecycle management of F-EXP \'N BEYOND Podcast',
      'Supervision of media sub-teams across 8+ national competitions',
      'Resource & timeline planning for multi-day live camps',
      'Stakeholder coordination between artists, sponsors & crew'
    ]
  },
  {
    id: 'analytical',
    name: 'Analytical Skills',
    category: 'Data & Optimization',
    icon: BarChart3,
    level: 'Advanced',
    description: 'Extracting actionable metrics from communication campaigns to measurably drive reach, retention, and audience conversion.',
    highlights: [
      '+20% Audience engagement boost optimization',
      'Social media telemetry & organic virality analysis',
      'Post-contest performance audits & reporting',
      'Audience demographic profiling & channel attribution'
    ]
  },
  {
    id: 'problem-solving',
    name: 'Problem-Solving Skills',
    category: 'Ambivert Agility',
    icon: Lightbulb,
    level: 'Expert',
    description: 'Connecting different aspects of work for a holistic, resilient approach to unforeseen production, stage, or media roadblocks.',
    highlights: [
      'Holistic approach connecting creative vision with logistics',
      'Rapid live event troubleshooting during national hackathons',
      'Adaptable ambivert negotiation bridging introverts & extroverts',
      'Multi-stakeholder international diplomacy (Vietnam - Malaysia)'
    ]
  },
  {
    id: 'media-knowledge',
    name: 'Media & Communication Knowledge',
    category: 'Domain Mastery',
    icon: Radio,
    level: 'Expert',
    description: 'Deep theoretical and hands-on domain fluency across mass communications, digital platforms, broadcast systems, and viral trends.',
    highlights: [
      'Music video creative production & on-set direction',
      'Artist & influencer talent management (MOV & Y An Film)',
      'Broadcast livestream operations for esports & tech finals',
      'Vietnamese entertainment ecosystem & PR connections'
    ]
  },
  {
    id: 'creative-ai',
    name: 'Creative Direction & AI Prompting',
    category: 'Modern Innovation',
    icon: Cpu,
    level: 'Pioneer',
    description: 'Directing cutting-edge visual narratives, combining traditional filmmaking with generative AI prompt engineering for groundbreaking music videos.',
    highlights: [
      'Prompt engineering for generative AI music video ("AI Bon Voyaige")',
      'Art direction, color grading & aesthetic treatment',
      'Music producer collaboration (Masew, independent artists)',
      'Viral short-form video concepting (TikTok, Reels, Shorts)'
    ]
  }
];

export const SkillsSection: React.FC = () => {
  const [activeSkillId, setActiveSkillId] = useState<string>('communication');

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">04 / EXPERTISE MATRIX</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            Skills & Capabilities
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          Core Proficiencies Grounded in Real-World Impact
        </p>
      </div>

      {/* Grid of Skill Cards with Interactive Hover */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_GROUPS.map((skill) => {
          const Icon = skill.icon;
          const isSelected = activeSkillId === skill.id;

          return (
            <div
              key={skill.id}
              onClick={() => setActiveSkillId(skill.id)}
              className={`group glass-card rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-cyan-400/50 bg-slate-900/90 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)]'
                  : 'border-white/10 hover:border-white/25 hover:bg-slate-900/60'
              }`}
            >
              <div>
                {/* Header row: Icon & level */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    {skill.category}
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-cyan-200 transition-colors">
                  {skill.name}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                  Proven Experience
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {skill.highlights.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
