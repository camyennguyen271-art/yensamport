import React from 'react';
import { GraduationCap } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText } from './admin/InlineEditHelpers';

export const AboutSection: React.FC = () => {
  const { language, t } = useI18n();
  const { data, updateAbout } = useSiteData();
  const about = data.about;
  const isVi = language === 'vi';

  return (
    <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
            <InlineText
              value={isVi ? about.candidateDossierVi : about.candidateDossierEn}
              onChange={(val) => updateAbout(isVi ? { candidateDossierVi: val } : { candidateDossierEn: val })}
            />
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            <InlineText
              value={isVi ? about.titleVi : about.titleEn}
              onChange={(val) => updateAbout(isVi ? { titleVi: val } : { titleEn: val })}
            />
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          <InlineText
            value={isVi ? about.locationEmailVi : about.locationEmailEn}
            onChange={(val) => updateAbout(isVi ? { locationEmailVi: val } : { locationEmailEn: val })}
          />
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Narrative & Philosophy (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
              <InlineText
                value={isVi ? about.headingVi : about.headingEn}
                onChange={(val) => updateAbout(isVi ? { headingVi: val } : { headingEn: val })}
                multiline={true}
              />
            </h3>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <InlineText
                value={isVi ? about.paragraph1Vi : about.paragraph1En}
                onChange={(val) => updateAbout(isVi ? { paragraph1Vi: val } : { paragraph1En: val })}
                multiline={true}
              />
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              <InlineText
                value={isVi ? about.paragraph2Vi : about.paragraph2En}
                onChange={(val) => updateAbout(isVi ? { paragraph2Vi: val } : { paragraph2En: val })}
                multiline={true}
              />
            </p>

            {/* Core Values / Work Ethic Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10">
              {about.coreValues.map((cv, idx) => (
                <div key={cv.id || idx} className="flex flex-col gap-1">
                  <span className={`text-xs uppercase font-mono ${cv.color} font-semibold`}>
                    <InlineText
                      value={isVi ? cv.titleVi : cv.titleEn}
                      onChange={(val) => {
                        const updated = [...about.coreValues];
                        updated[idx] = { ...cv, [isVi ? 'titleVi' : 'titleEn']: val };
                        updateAbout({ coreValues: updated });
                      }}
                    />
                  </span>
                  <span className="text-xs text-slate-300">
                    <InlineText
                      value={isVi ? cv.descVi : cv.descEn}
                      onChange={(val) => {
                        const updated = [...about.coreValues];
                        updated[idx] = { ...cv, [isVi ? 'descVi' : 'descEn']: val };
                        updateAbout({ coreValues: updated });
                      }}
                      multiline={true}
                    />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
            {about.stats.map((st, idx) => (
              <div key={st.id || idx}>
                <div className={`text-2xl sm:text-3xl font-extrabold ${st.color} font-display tabular-nums`}>
                  <InlineText
                    value={st.value}
                    onChange={(val) => {
                      const updated = [...about.stats];
                      updated[idx] = { ...st, value: val };
                      updateAbout({ stats: updated });
                    }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1 font-medium">
                  <InlineText
                    value={isVi ? st.labelVi : st.labelEn}
                    onChange={(val) => {
                      const updated = [...about.stats];
                      updated[idx] = { ...st, [isVi ? 'labelVi' : 'labelEn']: val };
                      updateAbout({ stats: updated });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education History & Academic Background (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white font-display tracking-tight">
                {isVi ? 'Lịch Sử Học Vấn' : 'Education History'}
              </h3>
            </div>

            {/* Education list */}
            {about.education.map((edu, idx) => (
              <div key={edu.id || idx} className={`space-y-1.5 relative pl-4 border-l-2 ${edu.color.includes('rose') ? 'border-rose-500/40' : 'border-cyan-500/40'}`}>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>
                    <InlineText
                      value={edu.period}
                      onChange={(val) => {
                        const updated = [...about.education];
                        updated[idx] = { ...edu, period: val };
                        updateAbout({ education: updated });
                      }}
                    />
                  </span>
                  <span className={edu.color.includes('rose') ? 'text-rose-400 font-medium' : 'text-cyan-400 font-medium'}>
                    <InlineText
                      value={isVi ? edu.locationVi : edu.locationEn}
                      onChange={(val) => {
                        const updated = [...about.education];
                        updated[idx] = { ...edu, [isVi ? 'locationVi' : 'locationEn']: val };
                        updateAbout({ education: updated });
                      }}
                    />
                  </span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  <InlineText
                    value={edu.school}
                    onChange={(val) => {
                      const updated = [...about.education];
                      updated[idx] = { ...edu, school: val };
                      updateAbout({ education: updated });
                    }}
                  />
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  <InlineText
                    value={isVi ? edu.degreeVi : edu.degreeEn}
                    onChange={(val) => {
                      const updated = [...about.education];
                      updated[idx] = { ...edu, [isVi ? 'degreeVi' : 'degreeEn']: val };
                      updateAbout({ education: updated });
                    }}
                  />
                </p>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  <InlineText
                    value={isVi ? edu.descVi : edu.descEn}
                    onChange={(val) => {
                      const updated = [...about.education];
                      updated[idx] = { ...edu, [isVi ? 'descVi' : 'descEn']: val };
                      updateAbout({ education: updated });
                    }}
                    multiline={true}
                  />
                </p>
              </div>
            ))}
          </div>

          {/* Quick Quote / Philosophy Card */}
          <div className="p-5 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/20 via-slate-900/40 to-slate-950/70">
            <p className="text-xs italic text-slate-300 leading-relaxed">
              <InlineText
                value={isVi ? about.quoteVi : about.quoteEn}
                onChange={(val) => updateAbout(isVi ? { quoteVi: val } : { quoteEn: val })}
                multiline={true}
              />
            </p>
            <div className="mt-3 text-right">
              <span className="text-[11px] font-mono tracking-wider uppercase text-cyan-400">
                — <InlineText
                  value={about.quoteAuthor}
                  onChange={(val) => updateAbout({ quoteAuthor: val })}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

