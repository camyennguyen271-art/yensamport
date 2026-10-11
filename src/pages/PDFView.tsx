import React, { useEffect, useState } from 'react';
import { useSiteData } from '../lib/SiteDataContext';

const PRINT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700&display=swap');
  * { box-sizing: border-box; }
  @page { size: A4; margin: 12mm 14mm; }
  html, body {
    margin: 0; padding: 0;
    background: #fff !important;
    font-family: 'Inter', sans-serif;
    color: #1a1a2e;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  #pdf-print-btn { display: flex; }
  @media print {
    #pdf-print-btn { display: none !important; }
    .pdf-page-break  { break-before: page !important; page-break-before: always !important; }
    .no-break        { break-inside: avoid !important; page-break-inside: avoid !important; }
    /* Prevent section header orphan at page bottom */
    .section-hdr     { break-after: avoid !important; page-break-after: avoid !important; }
    /* Keep header together with immediate next sibling */
    .section-hdr + * { break-before: avoid !important; page-break-before: avoid !important; }
  }
`;

function injectStyles() {
  if (document.getElementById('pdf-view-styles')) return;
  const style = document.createElement('style');
  style.id = 'pdf-view-styles';
  style.textContent = PRINT_STYLES;
  document.head.appendChild(style);
}

const NAVY     = '#0f1b35';
const ACCENT   = '#7c3aed';
const ACCENT2  = '#0ea5e9';
const LIGHT_BG = '#f8f9fc';
const BORDER   = '#e2e8f0';
const TEXT_MUTED = '#64748b';
const TEXT_BODY  = '#334155';

type Lang = 'vi' | 'en';

export function PDFView() {
  const { data } = useSiteData();
  const { hero, about, experiences, projects, skills, contact } = data;
  const [lang, setLang] = useState<Lang>('vi');

  useEffect(() => {
    injectStyles();
    document.body.style.background = '#fff';
    document.body.style.color = '#1a1a2e';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
    };
  }, []);

  const vi = lang === 'vi';
  const mvProjects   = projects.filter(p => p.category === 'mv');
  const leadProjects = projects.filter(p => p.category === 'lead').slice(0, 6);

  const TAGLINES_VI = ['🎬 Đạo diễn sản xuất MV', '📡 Lãnh đạo truyền thông', '🎯 Quản lý dự án sáng tạo'];
  const TAGLINES_EN = ['🎬 MV Production Director', '📡 Media Leadership', '🎯 Creative Project Manager'];

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOOLBAR (screen only) ── */}
      <div id="pdf-print-btn" style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: `2px solid ${ACCENT}`, fontSize: 13, fontWeight: 700 }}>
          <button onClick={() => setLang('vi')} style={{ padding: '8px 14px', border: 'none', cursor: 'pointer', background: vi ? ACCENT : '#fff', color: vi ? '#fff' : ACCENT, transition: 'all 0.2s' }}>🇻🇳 VI</button>
          <button onClick={() => setLang('en')} style={{ padding: '8px 14px', border: 'none', cursor: 'pointer', background: !vi ? ACCENT : '#fff', color: !vi ? '#fff' : ACCENT, transition: 'all 0.2s' }}>🇬🇧 EN</button>
        </div>
        <button onClick={() => window.print()} style={{ background: ACCENT, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(124,58,237,0.4)' }}>
          🖨️ {vi ? 'Lưu PDF' : 'Save PDF'}
        </button>
        <a href="/" style={{ background: NAVY, color: '#fff', borderRadius: 8, padding: '10px 16px', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>← Website</a>
      </div>

      {/* ══════════════════════════════════════════
          TRANG 1 — HEADER + ABOUT + EDUCATION
      ══════════════════════════════════════════ */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px 0' }}>

        {/* Header */}
        <div className="no-break" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, paddingBottom: 28, borderBottom: `3px solid ${ACCENT}`, marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: ACCENT, textTransform: 'uppercase', marginBottom: 6 }}>
              Portfolio · Media Specialist
            </div>
            <h1 style={{ margin: '0 0 4px', fontSize: 34, fontWeight: 900, lineHeight: 1.1, color: NAVY, fontFamily: "'Playfair Display', serif", letterSpacing: '-0.5px' }}>
              {vi ? (hero.titleVi || hero.title) : (hero.titleEn || hero.title)}
            </h1>
            <div style={{ fontSize: 15, fontWeight: 600, color: ACCENT2, marginBottom: 14, letterSpacing: '0.05em' }}>
              {vi ? 'Yến Sam · Media Specialist' : 'Yen Sam · Media Specialist'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {(vi ? TAGLINES_VI : TAGLINES_EN).map(t => (
                <span key={t} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, background: `${ACCENT}15`, color: ACCENT, border: `1px solid ${ACCENT}30` }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <ContactRow icon="✉" text={contact.email || hero.email} />
              <ContactRow icon="📍" text={vi ? 'TP. Hồ Chí Minh, Việt Nam' : 'Ho Chi Minh City, Vietnam'} />
            </div>
          </div>
          <div style={{ width: 130, height: 155, flexShrink: 0, borderRadius: 12, overflow: 'hidden', border: `3px solid ${ACCENT}`, boxShadow: '0 8px 32px rgba(124,58,237,0.25)' }}>
            <img src={hero.imageUrl} alt="Yến Sam" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
          </div>
        </div>

        {/* Stats */}
        <div className="no-break" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 28, background: NAVY, borderRadius: 12, overflow: 'hidden' }}>
          {about.stats.map((stat, i) => (
            <div key={stat.id} style={{ padding: '14px 12px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontWeight: 500 }}>{vi ? stat.labelVi : stat.labelEn}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <SectionHeader title={vi ? 'Về Yến Sam' : 'About Yến Sam'} subtitle={vi ? 'HỒ SƠ ỨNG VIÊN' : 'CANDIDATE PROFILE'} accent={ACCENT} />
        <div className="no-break" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 18 }}>
          <p style={{ fontSize: 12.5, lineHeight: 1.7, color: TEXT_BODY, margin: 0 }}>{vi ? about.paragraph1Vi : about.paragraph1En}</p>
          <p style={{ fontSize: 12.5, lineHeight: 1.7, color: TEXT_BODY, margin: 0 }}>{vi ? (about.paragraph2Vi?.split('\n\n')[0] ?? '') : about.paragraph2En}</p>
        </div>

        {/* Core Values */}
        <div className="no-break" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
          {about.coreValues.map((cv, i) => {
            const cols = [ACCENT, '#e11d48', '#d97706'];
            return (
              <div key={cv.id} style={{ padding: '12px 14px', borderRadius: 10, background: LIGHT_BG, border: `1px solid ${cols[i]}30`, borderTop: `3px solid ${cols[i]}` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: cols[i], marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{vi ? cv.titleVi : cv.titleEn}</div>
                <div style={{ fontSize: 11, color: TEXT_BODY, lineHeight: 1.5 }}>{vi ? cv.descVi : cv.descEn}</div>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <div className="no-break" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 8 }}>
          {about.education.map(edu => (
            <div key={edu.id} style={{ padding: '11px 14px', borderRadius: 10, background: LIGHT_BG, borderLeft: `3px solid ${ACCENT2}` }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: ACCENT2, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{edu.period} · {vi ? edu.locationVi : edu.locationEn}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: '3px 0' }}>{edu.school}</div>
              <div style={{ fontSize: 11, color: TEXT_BODY }}>{vi ? edu.degreeVi : edu.degreeEn}</div>
            </div>
          ))}
        </div>

      </div>

      {/* ══════════════════════════════════════════
          TRANG 2 — KINH NGHIỆM + MV PROJECTS
      ══════════════════════════════════════════ */}
      <div className="pdf-page-break" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 40px 0' }}>

        <SectionHeader title={vi ? 'Kinh Nghiệm Làm Việc' : 'Work Experience'} subtitle={vi ? 'WORK EXPERIENCE' : 'PROFESSIONAL HISTORY'} accent={ACCENT} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {experiences.map((exp, i) => {
            const cols = [ACCENT, '#0ea5e9', '#10b981', '#f59e0b', '#e11d48'];
            const c = cols[i % cols.length];
            return (
              <div key={exp.id} className="no-break" style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 14, padding: '13px 15px', background: i % 2 === 0 ? LIGHT_BG : '#fff', borderRadius: 10, border: `1px solid ${BORDER}`, borderLeft: `4px solid ${c}` }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_MUTED, marginBottom: 4 }}>{exp.year}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: '#fff', background: c, borderRadius: 4, padding: '2px 6px', display: 'inline-block' }}>{vi ? exp.categoryVi : exp.categoryEn}</div>
                </div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: NAVY, marginBottom: 2 }}>{vi ? exp.roleVi : exp.roleEn}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: ACCENT, marginBottom: 4 }}>{vi ? exp.companyVi : exp.companyEn}</div>
                  <div style={{ fontSize: 11, color: TEXT_BODY, lineHeight: 1.5, marginBottom: 3 }}>{vi ? exp.taglineVi : exp.taglineEn}</div>
                  {(vi ? exp.achievementsVi : exp.achievementsEn).slice(0, 2).map((a, ai) => (
                    <div key={ai} style={{ fontSize: 11, color: TEXT_BODY, lineHeight: 1.5, marginTop: 2, paddingLeft: 12, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 2, color: c, fontWeight: 700 }}>·</span>
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* MV Projects — 3 cột hàng 1 */}
        <SectionHeader title={vi ? 'Dự Án Nổi Bật — Music Video' : 'Featured Projects — Music Video'} subtitle="MV PRODUCTION" accent={ACCENT} />
        <div className="no-break" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
          {mvProjects.slice(0, 3).map(proj => (
            <ProjectCard key={proj.id} proj={proj} lang={lang} accent={ACCENT} textBody={TEXT_BODY} navy={NAVY} border={BORDER} />
          ))}
        </div>
        {mvProjects.length > 3 && (
          <div className="no-break" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 8 }}>
            {mvProjects.slice(3).map(proj => (
              <ProjectCard key={proj.id} proj={proj} lang={lang} accent={ACCENT} textBody={TEXT_BODY} navy={NAVY} border={BORDER} />
            ))}
          </div>
        )}

      </div>

      {/* ══════════════════════════════════════════
          TRANG 3 — LEAD PROJECTS + SKILLS
      ══════════════════════════════════════════ */}
      <div className="pdf-page-break" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 40px 0' }}>

        <SectionHeader title={vi ? 'Dự Án Lãnh Đạo Truyền Thông' : 'Media Leadership Projects'} subtitle={vi ? 'MEDIA LEADERSHIP' : 'EVENT & CAMPAIGN MANAGEMENT'} accent={ACCENT2} />
        <div className="no-break" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
          {leadProjects.map(proj => (
            <ProjectCard key={proj.id} proj={proj} lang={lang} accent={ACCENT2} textBody={TEXT_BODY} navy={NAVY} border={BORDER} />
          ))}
        </div>

        <SectionHeader title={vi ? 'Năng Lực Chuyên Môn' : 'Core Competencies'} subtitle={vi ? 'CORE SKILLS' : 'PROFESSIONAL SKILLS'} accent={ACCENT} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 32 }}>
          {skills.map((skill, i) => {
            const cols = [ACCENT, ACCENT2, '#10b981', '#f59e0b', '#e11d48', '#8b5cf6'];
            const c = cols[i % cols.length];
            return (
              <div key={skill.id} className="no-break" style={{ padding: '13px 15px', borderRadius: 10, background: LIGHT_BG, border: `1px solid ${BORDER}`, borderTop: `3px solid ${c}` }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 2 }}>{vi ? skill.nameVi : skill.nameEn}</div>
                <div style={{ fontSize: 10, fontWeight: 600, color: c, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 5 }}>{vi ? skill.categoryVi : skill.categoryEn}</div>
                {(vi ? skill.highlightsVi : skill.highlightsEn).slice(0, 3).map((h, hi) => (
                  <div key={hi} style={{ fontSize: 10.5, color: TEXT_BODY, lineHeight: 1.4, paddingLeft: 10, position: 'relative', marginTop: 2 }}>
                    <span style={{ position: 'absolute', left: 1, color: c, fontWeight: 700 }}>·</span>{h}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="no-break" style={{ borderTop: `2px solid ${ACCENT}`, paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 12, color: TEXT_MUTED }}>
            <span style={{ fontWeight: 700, color: NAVY }}>{vi ? 'NGUYỄN THỊ CẨM YẾN (YẾN SAM)' : 'NGUYEN THI CAM YEN (YEN SAM)'}</span>
            {' · '}{vi ? 'Media Specialist · Đạo diễn sản xuất MV' : 'Media Specialist · MV Production Director'}
          </div>
          <div style={{ fontSize: 11, color: TEXT_MUTED }}>{contact.email}</div>
        </div>

      </div>
    </div>
  );
}

// ── Section Header (gắn className section-hdr để CSS print apply) ──
function SectionHeader({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return (
    <div className="section-hdr" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
      <div style={{ width: 4, height: 24, background: accent, borderRadius: 2, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{subtitle}</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0f1b35', lineHeight: 1.2 }}>{title}</div>
      </div>
      <div style={{ flex: 1, height: 1, background: `${accent}30`, marginLeft: 8 }} />
    </div>
  );
}

// ── Contact Row ──
function ContactRow({ icon, text }: { icon: string; text: string }) {
  return (
    <div style={{ fontSize: 12, color: TEXT_MUTED, display: 'flex', gap: 6, alignItems: 'center' }}>
      <span style={{ width: 16, textAlign: 'center' }}>{icon}</span>
      <span style={{ color: TEXT_BODY, fontWeight: 500 }}>{text}</span>
    </div>
  );
}

// ── Project Card ──
interface ProjectCardProps {
  proj: {
    id: string; title: string; titleVi?: string; titleEn?: string;
    image: string; roleVi?: string; roleEn?: string; role: string;
    categoryLabelVi?: string; categoryLabelEn?: string; categoryLabel: string;
    year: string;
    descriptionVi?: string; descriptionEn?: string; description: string;
    tagsVi?: string[]; tagsEn?: string[]; tags: string[];
  };
  lang: Lang;
  accent: string; textBody: string; navy: string; border: string;
}

function ProjectCard({ proj, lang, accent, textBody, navy, border }: ProjectCardProps) {
  const vi = lang === 'vi';
  const title = vi ? (proj.titleVi || proj.title) : (proj.titleEn || proj.title);
  const role  = vi ? (proj.roleVi  || proj.role)  : (proj.roleEn  || proj.role);
  const cat   = vi ? (proj.categoryLabelVi || proj.categoryLabel) : (proj.categoryLabelEn || proj.categoryLabel);
  const desc  = vi ? (proj.descriptionVi || proj.description) : (proj.descriptionEn || proj.description);
  const tags  = (vi ? (proj.tagsVi || proj.tags) : (proj.tagsEn || proj.tags)).slice(0, 3);
  const shortDesc = desc.length > 95 ? desc.substring(0, 95) + '...' : desc;

  return (
    <div className="no-break" style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid ${border}`, background: '#fff' }}>
      <div style={{ height: 100, overflow: 'hidden', background: '#e2e8f0' }}>
        <img src={proj.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
      </div>
      <div style={{ padding: '9px 11px' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{cat} · {proj.year}</div>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: navy, lineHeight: 1.3, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 10, fontWeight: 600, color: TEXT_MUTED, marginBottom: 4 }}>{role}</div>
        <div style={{ fontSize: 10, color: textBody, lineHeight: 1.4, marginBottom: 5 }}>{shortDesc}</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {tags.map(t => (
            <span key={t} style={{ fontSize: 8.5, padding: '2px 5px', borderRadius: 4, background: `${accent}10`, color: accent, border: `1px solid ${accent}25`, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
