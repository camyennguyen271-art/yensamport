import React, { useState } from 'react';
import { Briefcase, ChevronDown, ChevronUp, Calendar, Building, Sparkles } from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  year: string;
  tagline: string;
  achievements: string[];
  metrics?: string;
  category: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'fpt-comms-2024',
    role: 'Communication Specialist',
    company: 'FPT Education',
    year: '2024',
    tagline: 'Strategic corporate communication, media PR events & audience growth',
    metrics: '+20% Audience Engagement Boost',
    category: 'Corporate Communications & PR',
    achievements: [
      'Developed and executed comprehensive communication strategies to effectively convey brand messages to target audiences across various platforms.',
      'Managed internal and external communications, including press releases, newsletters, and social media updates, ensuring consistent and aligned messaging.',
      'Collaborated with cross-functional teams to create content that resonated with both customers and stakeholders, boosting engagement and brand loyalty.',
      'Analyzed communication campaigns and provided actionable insights to optimize future strategies, contributing to a 20% increase in audience engagement.',
      'Organized and managed high-profile PR events, enhancing the company\'s visibility and reputation in the education industry.'
    ]
  },
  {
    id: 'mov-media-2022',
    role: 'Media & Event Manager',
    company: 'MOV Communications Joint Stock Company',
    year: '2022',
    tagline: 'Artist media strategies, entertainment public relations & tailored activations',
    category: 'Entertainment & Artist PR',
    achievements: [
      'Developed and executed media strategies for the company\'s artists, ensuring alignment with brand goals and audience engagement.',
      'Planned and organized tailored entertainment events and activations customized to client requirements.',
      'Enhanced the company\'s industry reputation, artist profile visibility, and client satisfaction metrics.'
    ]
  },
  {
    id: 'yanh-talent-2021',
    role: 'Talent Manager',
    company: 'Y Anh Film Joint Stock Company (Y An Film)',
    year: '2021',
    tagline: 'Influencer representation, contract negotiation & commercial campaigns',
    category: 'Talent & Influencer Management',
    achievements: [
      'Managed influencer activities, including commercial contract negotiations, creative content briefs, and campaign execution.',
      'Successfully secured advertising contracts for influencers, expanding commercial reach, brand sponsorships, and company revenue.'
    ]
  },
  {
    id: 'hayd-minishow-2021',
    role: 'Organizer & Event Producer',
    company: 'Hayd Minishow and Fanmeeting in Vietnam',
    year: '2021',
    tagline: 'International artist fanmeeting logistics, marketing & live concert operations',
    category: 'Live Concert Production',
    achievements: [
      'Successfully organized and managed the end-to-end logistics, marketing, and execution of the Hayd Minishow and Fanmeeting in Vietnam.',
      'Coordinated across international and local stakeholders, management agencies, and venue staff to deliver a seamless event experience for both fans and the artist.'
    ]
  },
  {
    id: 'fpt-admission-2018',
    role: 'Admission & Telesales Consultant',
    company: 'FPT University Ho Chi Minh City',
    year: '2018 – 2021',
    tagline: 'Student admissions advisory, enrollment strategy & consultative engagement',
    category: 'Admissions & Client Advisory',
    achievements: [
      'Provided three years of high-performing experience as an enrollment consultant and telesales representative, effectively advising and guiding prospective students through the university admission process.',
      'Contributed significantly to the university\'s institutional growth by consistently achieving enrollment targets and maintaining high customer satisfaction.'
    ]
  }
];

export const ExperienceSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('fpt-comms-2024');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">02 / PROFESSIONAL TIMELINE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            Work Experience
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          5 Key Appointments · Strategic Communications & Media Leadership
        </p>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {EXPERIENCES.map((item, index) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => toggleExpand(item.id)}
              className={`group glass-card rounded-2xl p-5 sm:p-7 transition-all duration-300 cursor-pointer border ${
                isExpanded
                  ? 'border-cyan-500/40 bg-slate-900/80 shadow-[0_10px_35px_-10px_rgba(6,182,212,0.15)]'
                  : 'border-white/10 hover:border-white/20 hover:bg-slate-900/50'
              }`}
            >
              {/* Card Header Row */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-4">
                  {/* Index / Accent indicator */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-cyan-300 shrink-0 group-hover:border-cyan-400/50 transition-colors">
                    0{index + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                      <span className="text-white font-semibold">{item.year}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400">{item.company}</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.category}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight mt-1 group-hover:text-cyan-200 transition-colors">
                      {item.role}
                    </h3>
                  </div>
                </div>

                {/* Right side: Key metric & Expand toggle */}
                <div className="flex items-center gap-3 self-end md:self-center">
                  {item.metrics && (
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 font-mono whitespace-nowrap">
                      {item.metrics}
                    </span>
                  )}
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Tagline summary */}
              <p className="text-xs sm:text-sm text-slate-300 mt-3 ml-0 md:ml-12 font-normal leading-relaxed">
                {item.tagline}
              </p>

              {/* Expanded Bullet Points from Official CV */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-white/10 ml-0 md:ml-12 space-y-2.5 transition-all">
                  <div className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">
                    Key Responsibilities & Deliverables
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {item.achievements.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
