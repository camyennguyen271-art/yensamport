import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText, ItemControls } from './admin/InlineEditHelpers';
import { ExperienceItemData } from '../data/mockSiteData';

export const ExperienceSection: React.FC = () => {
  const { language, t } = useI18n();
  const { data, updateExperienceItem, addExperienceItem, deleteExperienceItem, reorderExperiences, isEditMode } = useSiteData();
  const experiences = data.experiences;
  const isVi = language === 'vi';
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || 'fpt-comms-2024');

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const handleAddNewExperience = () => {
    const newId = `exp_${Date.now()}`;
    const newItem: ExperienceItemData = {
      id: newId,
      roleVi: 'Chuyên Viên Truyền Thông Mới',
      roleEn: 'New Communications Specialist',
      companyVi: 'Tên Công Ty / Tổ Chức',
      companyEn: 'Company / Organization',
      year: '2024 — Hiện tại',
      taglineVi: 'Mô tả ngắn gọn về vai trò và trách nhiệm',
      taglineEn: 'Short summary of role and achievements',
      categoryVi: 'Ngành Nghề',
      categoryEn: 'Category',
      metrics: '+15% Metric',
      achievementsVi: [
        'Trách nhiệm và thành tựu chính 1',
        'Trách nhiệm và thành tựu chính 2'
      ],
      achievementsEn: [
        'Key responsibility & deliverable 1',
        'Key responsibility & deliverable 2'
      ]
    };
    addExperienceItem(newItem);
    setExpandedId(newId);
  };

  return (
    <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
            {isVi ? '02 / HÀNH TRÌNH SỰ NGHIỆP' : '02 / PROFESSIONAL TIMELINE'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            {t('experience.title') || (isVi ? 'Kinh Nghiệm' : 'Work Experience')}
          </h2>
        </div>
        
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {isEditMode && (
            <button
              onClick={handleAddNewExperience}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm kinh nghiệm</span>
            </button>
          )}
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            {experiences.length} {isVi ? 'Cột mốc quan trọng' : 'Key Appointments'}
          </p>
        </div>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((item, index) => {
          const isExpanded = expandedId === item.id;
          const achievements = isVi ? item.achievementsVi : item.achievementsEn;

          return (
            <div
              key={item.id}
              className={`relative group glass-card rounded-2xl p-5 sm:p-7 transition-all duration-300 border ${
                isExpanded
                  ? 'border-cyan-500/40 bg-slate-900/80 shadow-[0_10px_35px_-10px_rgba(6,182,212,0.15)]'
                  : 'border-white/10 hover:border-white/20 hover:bg-slate-900/50'
              }`}
            >
              {/* Item Controls overlay in Edit Mode */}
              <ItemControls
                itemTitle="kinh nghiệm"
                canMoveUp={index > 0}
                canMoveDown={index < experiences.length - 1}
                onMoveUp={() => reorderExperiences(index, index - 1)}
                onMoveDown={() => reorderExperiences(index, index + 1)}
                onDelete={() => deleteExperienceItem(item.id)}
              />

              {/* Card Header Row */}
              <div 
                onClick={() => toggleExpand(item.id)}
                className="flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  {/* Index / Accent indicator */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 text-xs font-mono font-bold text-cyan-300 shrink-0 group-hover:border-cyan-400/50 transition-colors">
                    0{index + 1}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono" onClick={(e) => e.stopPropagation()}>
                      <span className="text-white font-semibold">
                        <InlineText
                          value={item.year}
                          onChange={(val) => updateExperienceItem(item.id, { year: val })}
                        />
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="text-cyan-400">
                        <InlineText
                          value={isVi ? item.companyVi : item.companyEn}
                          onChange={(val) => updateExperienceItem(item.id, isVi ? { companyVi: val } : { companyEn: val })}
                        />
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        <InlineText
                          value={isVi ? item.categoryVi : item.categoryEn}
                          onChange={(val) => updateExperienceItem(item.id, isVi ? { categoryVi: val } : { categoryEn: val })}
                        />
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight mt-1 group-hover:text-cyan-200 transition-colors" onClick={(e) => e.stopPropagation()}>
                      <InlineText
                        value={isVi ? item.roleVi : item.roleEn}
                        onChange={(val) => updateExperienceItem(item.id, isVi ? { roleVi: val } : { roleEn: val })}
                      />
                    </h3>
                  </div>
                </div>

                {/* Right side: Expand toggle */}
                <div className="flex items-center self-end md:self-center">
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Tagline summary */}
              <p className="text-xs sm:text-sm text-slate-300 mt-3 ml-0 md:ml-12 font-normal leading-relaxed">
                <InlineText
                  value={isVi ? item.taglineVi : item.taglineEn}
                  onChange={(val) => updateExperienceItem(item.id, isVi ? { taglineVi: val } : { taglineEn: val })}
                  multiline={true}
                />
              </p>

              {/* Expanded Bullet Points */}
              {isExpanded && (
                <div className="mt-5 pt-4 border-t border-white/10 ml-0 md:ml-12 space-y-2.5 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="text-xs uppercase font-mono tracking-wider text-slate-400">
                      {isVi ? 'Trách Nhiệm & Kết Quả' : 'Key Responsibilities & Deliverables'}
                    </div>
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => {
                          const key = isVi ? 'achievementsVi' : 'achievementsEn';
                          const currentList = item[key] || [];
                          updateExperienceItem(item.id, { [key]: [...currentList, 'Dòng mới...'] });
                        }}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                      >
                        <Plus className="w-3 h-3" /> Thêm Dòng
                      </button>
                    )}
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                    {(achievements || []).map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 leading-relaxed group/bullet">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                        <div className="flex-1">
                          <InlineText
                            value={bullet}
                            onChange={(val) => {
                              const key = isVi ? 'achievementsVi' : 'achievementsEn';
                              const updated = [...(item[key] || [])];
                              updated[bIdx] = val;
                              updateExperienceItem(item.id, { [key]: updated });
                            }}
                            multiline={true}
                          />
                        </div>
                        {isEditMode && (
                          <button
                            type="button"
                            onClick={() => {
                              const key = isVi ? 'achievementsVi' : 'achievementsEn';
                              const updated = (item[key] || []).filter((_, i) => i !== bIdx);
                              updateExperienceItem(item.id, { [key]: updated });
                            }}
                            className="text-rose-400 opacity-0 group-hover/bullet:opacity-100 transition-opacity p-0.5 hover:bg-rose-500/10 rounded"
                            title="Xóa dòng này"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
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

