import React, { useState } from 'react';
import { MessageSquare, BarChart3, Workflow, Lightbulb, Radio, Cpu, Sparkles } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText } from './admin/InlineEditHelpers';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  MessageSquare,
  Workflow,
  BarChart3,
  Lightbulb,
  Radio,
  Cpu,
  Sparkles,
};

export const SkillsSection: React.FC = () => {
  const { language, t } = useI18n();
  const { data, updateSkillItem } = useSiteData();
  const skills = data.skills;
  const isVi = language === 'vi';
  const [activeSkillId, setActiveSkillId] = useState<string>(skills[0]?.id || 'communication');

  return (
    <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
            {isVi ? '04 / MA TRẬN CHUYÊN MÔN' : '04 / EXPERTISE MATRIX'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            {t('skills.title') || (isVi ? 'Kỹ Năng' : 'Skills & Capabilities')}
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          {isVi ? 'Các năng lực cốt lõi mang lại hiệu quả thực tế' : 'Core Proficiencies Grounded in Real-World Impact'}
        </p>
      </div>

      {/* Grid of Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => {
          const IconComponent = ICON_MAP[skill.iconName] || MessageSquare;
          const isSelected = activeSkillId === skill.id;
          const highlights = isVi ? skill.highlightsVi : skill.highlightsEn;

          return (
            <div
              key={skill.id}
              onClick={() => setActiveSkillId(skill.id)}
              className={`relative group glass-card rounded-2xl p-6 flex flex-col justify-between border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'border-cyan-400/50 bg-slate-900/90 shadow-[0_10px_30px_-10px_rgba(6,182,212,0.25)]'
                  : 'border-white/10 hover:border-white/25 hover:bg-slate-900/60'
              }`}
            >
              <div>
                {/* Header row: Icon & level */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/50 border border-cyan-500/30 flex items-center justify-center text-cyan-300 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                    <InlineText
                      value={isVi ? skill.categoryVi : skill.categoryEn}
                      onChange={(val) => updateSkillItem(skill.id, isVi ? { categoryVi: val } : { categoryEn: val })}
                    />
                  </span>
                </div>

                {/* Skill Name */}
                <h3 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-cyan-200 transition-colors">
                  <InlineText
                    value={isVi ? skill.nameVi : skill.nameEn}
                    onChange={(val) => updateSkillItem(skill.id, isVi ? { nameVi: val } : { nameEn: val })}
                  />
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  <InlineText
                    value={isVi ? skill.descriptionVi : skill.descriptionEn}
                    onChange={(val) => updateSkillItem(skill.id, isVi ? { descriptionVi: val } : { descriptionEn: val })}
                    multiline={true}
                  />
                </p>
              </div>

              {/* Highlights */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="text-[11px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                  {isVi ? 'Kinh Nghiệm Thực Tế' : 'Proven Experience'}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(highlights || []).slice(0, 4).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <div className="flex-1 leading-snug">
                        <InlineText
                          value={item}
                          onChange={(val) => {
                            const key = isVi ? 'highlightsVi' : 'highlightsEn';
                            const updated = [...(skill[key] || [])];
                            updated[idx] = val;
                            updateSkillItem(skill.id, { [key]: updated });
                          }}
                        />
                      </div>
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
