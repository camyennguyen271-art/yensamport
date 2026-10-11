import React, { useEffect } from 'react';
import { useSiteData } from '../lib/SiteDataContext';

// Inject print + page styles once
const PRINT_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700&display=swap');

  * { box-sizing: border-box; }

  @page {
    size: A4;
    margin: 12mm 14mm;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: #fff !important;
    font-family: 'Inter', sans-serif;
    color: #1a1a2e;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  #pdf-print-btn {
    display: flex;
  }
  @media print {
    #pdf-print-btn { display: none !important; }
    .pdf-page-break { page-break-before: always; }
    .no-break { page-break-inside: avoid; }
  }
`;

function injectStyles() {
  if (document.getElementById('pdf-view-styles')) return;
  const style = document.createElement('style');
  style.id = 'pdf-view-styles';
  style.textContent = PRINT_STYLES;
  document.head.appendChild(style);
}

// Color palette
const NAVY = '#0f1b35';
const ACCENT = '#7c3aed'; // purple-700
const ACCENT2 = '#0ea5e9'; // sky-500
const LIGHT_BG = '#f8f9fc';
const BORDER = '#e2e8f0';
const TEXT_MUTED = '#64748b';
const TEXT_BODY = '#334155';

export function PDFView() {
  const { data } = useSiteData();
  const { hero, about, experiences, projects, skills, contact } = data;

  useEffect(() => {
    injectStyles();
    // Reset any global dark-mode styles applied by GalaxyBackground
    document.body.style.background = '#fff';
    document.body.style.color = '#1a1a2e';
    return () => {
      document.body.style.background = '';
      document.body.style.color = '';
    };
  }, []);

  const featuredProjects = projects.filter(p => p.featured);
  const mvProjects = projects.filter(p => p.category === 'mv');
  const leadProjects = projects.filter(p => p.category === 'lead').slice(0, 6);

  return (
    <div style={{ background: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>

      {/* ── PRINT BUTTON (screen only) ── */}
      <div
        id="pdf-print-btn"
        style={{
          position: 'fixed', top: 16, right: 16, zIndex: 9999,
          display: 'flex', gap: 8,
        }}
      >
        <button
          onClick={() => window.print()}
          style={{
            background: ACCENT, color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 20px', fontSize: 14,
            fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(124,58,237,0.4)',
          }}
        >
          🖨️ Lưu PDF
        </button>
        <a
          href="/"
          style={{
            background: NAVY, color: '#fff', border: 'none',
            borderRadius: 8, padding: '10px 16px', fontSize: 14,
            fontWeight: 600, cursor: 'pointer', textDecoration: 'none',
            display: 'flex', alignItems: 'center',
          }}
        >
          ← Website
        </a>
      </div>

      {/* ════════════════════════════════════════
          PAGE 1 — HEADER / HERO
      ════════════════════════════════════════ */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 40px 0' }}>

        {/* Header Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          gap: 32, paddingBottom: 32,
          borderBottom: `3px solid ${ACCENT}`,
        }}>
          {/* LEFT: Name + Title + Contact */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.2em',
              color: ACCENT, textTransform: 'uppercase', marginBottom: 6,
            }}>
              Portfolio · Media Specialist
            </div>
            <h1 style={{
              margin: '0 0 4px',
              fontSize: 36, fontWeight: 900, lineHeight: 1.1,
              color: NAVY, fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.5px',
            }}>
              {hero.titleVi || hero.title}
            </h1>
            <div style={{
              fontSize: 16, fontWeight: 600, color: ACCENT2,
              marginBottom: 16, letterSpacing: '0.05em',
            }}>
              Yến Sam · Media Specialist
            </div>

            {/* Tagline */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16,
            }}>
              {['🎬 Đạo diễn sản xuất MV', '📡 Lãnh đạo truyền thông', '🎯 Quản lý dự án sáng tạo'].map(t => (
                <span key={t} style={{
                  fontSize: 11, fontWeight: 600, padding: '3px 10px',
                  borderRadius: 20, background: `${ACCENT}15`, color: ACCENT,
                  border: `1px solid ${ACCENT}30`,
                }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {[
                { icon: '✉', text: contact.email || hero.email },
                { icon: '📍', text: 'TP. Hồ Chí Minh, Việt Nam' },
                { icon: '🌐', text: 'yensam-sam-633b.vercel.app' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ fontSize: 12, color: TEXT_MUTED, display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ width: 16, textAlign: 'center' }}>{icon}</span>
                  <span style={{ color: TEXT_BODY, fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Portrait */}
          <div style={{
            width: 130, height: 155, flexShrink: 0,
            borderRadius: 12, overflow: 'hidden',
            border: `3px solid ${ACCENT}`,
            boxShadow: `0 8px 32px rgba(124,58,237,0.25)`,
          }}>
            <img
              src={hero.imageUrl}
              alt="Yến Sam"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0, margin: '24px 0',
          background: NAVY, borderRadius: 12, overflow: 'hidden',
        }}>
          {about.stats.map((stat, i) => (
            <div key={stat.id} style={{
              padding: '16px 12px', textAlign: 'center',
              borderRight: i < 3 ? `1px solid rgba(255,255,255,0.1)` : 'none',
            }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 4, fontWeight: 500 }}>
                {stat.labelVi}
              </div>
            </div>
          ))}
        </div>

        {/* ── ABOUT SECTION ── */}
        <SectionHeader title="Về Yến Sam" subtitle="HỒ SƠ ỨNG VIÊN" accent={ACCENT} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
          <div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: TEXT_BODY, margin: 0 }}>
              {about.paragraph1Vi}
            </p>
          </div>
          <div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: TEXT_BODY, margin: 0 }}>
              {about.paragraph2Vi?.split('\n\n')[0]}
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28 }}>
          {about.coreValues.map((cv, i) => {
            const colors = [ACCENT, '#e11d48', '#d97706'];
            return (
              <div key={cv.id} style={{
                padding: '14px 16px', borderRadius: 10,
                background: LIGHT_BG, border: `2px solid ${colors[i]}30`,
                borderTop: `3px solid ${colors[i]}`,
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: colors[i], marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {cv.titleVi}
                </div>
                <div style={{ fontSize: 11, color: TEXT_BODY, lineHeight: 1.5 }}>
                  {cv.descVi}
                </div>
              </div>
            );
          })}
        </div>

        {/* Education */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
          {about.education.map(edu => (
            <div key={edu.id} style={{
              padding: '12px 16px', borderRadius: 10,
              background: LIGHT_BG,
              borderLeft: `3px solid ${ACCENT2}`,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: ACCENT2, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {edu.period} · {edu.locationVi}
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, margin: '3px 0' }}>
                {edu.school}
              </div>
              <div style={{ fontSize: 11, color: TEXT_BODY }}>{edu.degreeVi}</div>
            </div>
          ))}
        </div>

        {/* ── EXPERIENCE SECTION ── */}
        <SectionHeader title="Kinh Nghiệm Làm Việc" subtitle="WORK EXPERIENCE" accent={ACCENT} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
          {experiences.map((exp, i) => (
            <div
              key={exp.id}
              className="no-break"
              style={{
                display: 'grid', gridTemplateColumns: '140px 1fr',
                gap: 16, padding: '14px 16px',
                background: i % 2 === 0 ? LIGHT_BG : '#fff',
                borderRadius: 10,
                border: `1px solid ${BORDER}`,
                borderLeft: `4px solid ${i === 0 ? ACCENT : i === 1 ? '#0ea5e9' : i === 2 ? '#10b981' : '#f59e0b'}`,
              }}
            >
              {/* Left: Year + Category */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TEXT_MUTED, marginBottom: 2 }}>
                  {exp.year}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, color: '#fff',
                  background: i === 0 ? ACCENT : i === 1 ? '#0ea5e9' : i === 2 ? '#10b981' : '#f59e0b',
                  borderRadius: 4, padding: '2px 6px', display: 'inline-block',
                }}>
                  {exp.categoryVi}
                </div>
              </div>

              {/* Right: Role + Company + Achievements */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 2 }}>
                  {exp.roleVi}
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: ACCENT, marginBottom: 6 }}>
                  {exp.companyVi}
                </div>
                <div style={{ fontSize: 11, color: TEXT_BODY, lineHeight: 1.5 }}>
                  {exp.taglineVi}
                </div>
                {exp.achievementsVi.slice(0, 2).map((a, ai) => (
                  <div key={ai} style={{ fontSize: 11, color: TEXT_BODY, lineHeight: 1.5, marginTop: 3, paddingLeft: 12, position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 2, color: ACCENT, fontWeight: 700 }}>·</span>
                    {a}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ════════════════════════════════════════
          PAGE 2 — PROJECTS
      ════════════════════════════════════════ */}
      <div className="pdf-page-break" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 40px 0' }}>

        {/* MV Projects */}
        <SectionHeader title="Dự Án Nổi Bật — Music Video" subtitle="MV PRODUCTION" accent={ACCENT} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {mvProjects.slice(0, 3).map(proj => (
            <ProjectCard key={proj.id} proj={proj} accent={ACCENT} textBody={TEXT_BODY} textMuted={TEXT_MUTED} navy={NAVY} border={BORDER} />
          ))}
        </div>

        {mvProjects.length > 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 32 }}>
            {mvProjects.slice(3).map(proj => (
              <ProjectCard key={proj.id} proj={proj} accent={ACCENT} textBody={TEXT_BODY} textMuted={TEXT_MUTED} navy={NAVY} border={BORDER} />
            ))}
          </div>
        )}

        {/* Lead / Event Projects */}
        <SectionHeader title="Dự Án Lãnh Đạo Truyền Thông" subtitle="MEDIA LEADERSHIP" accent={ACCENT2} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 32 }}>
          {leadProjects.map(proj => (
            <ProjectCard key={proj.id} proj={proj} accent={ACCENT2} textBody={TEXT_BODY} textMuted={TEXT_MUTED} navy={NAVY} border={BORDER} />
          ))}
        </div>

        {/* ── SKILLS SECTION ── */}
        <SectionHeader title="Năng Lực Chuyên Môn" subtitle="CORE SKILLS" accent={ACCENT} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 32 }}>
          {skills.map((skill, i) => {
            const colors = [ACCENT, ACCENT2, '#10b981', '#f59e0b', '#e11d48', '#8b5cf6'];
            const c = colors[i % colors.length];
            return (
              <div
                key={skill.id}
                className="no-break"
                style={{
                  padding: '14px 16px', borderRadius: 10,
                  background: LIGHT_BG, border: `1px solid ${BORDER}`,
                  borderTop: `3px solid ${c}`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 2 }}>
                  {skill.nameVi}
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, color: c, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                  {skill.categoryVi}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {skill.highlightsVi.slice(0, 3).map((h, hi) => (
                    <div key={hi} style={{ fontSize: 10.5, color: TEXT_BODY, lineHeight: 1.4, paddingLeft: 10, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 1, color: c, fontWeight: 700 }}>·</span>
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          borderTop: `2px solid ${ACCENT}`,
          paddingTop: 16,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginBottom: 40,
        }}>
          <div style={{ fontSize: 12, color: TEXT_MUTED }}>
            <span style={{ fontWeight: 700, color: NAVY }}>NGUYỄN THỊ CẨM YẾN (YẾN SAM)</span>
            {' · '}Media Specialist · MV Production Director
          </div>
          <div style={{ fontSize: 11, color: TEXT_MUTED }}>
            {contact.email} · yensam-sam-633b.vercel.app
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Helper Components ──

function SectionHeader({ title, subtitle, accent }: { title: string; subtitle: string; accent: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{ width: 4, height: 24, background: accent, borderRadius: 2, flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {subtitle}
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#0f1b35', lineHeight: 1.2 }}>
          {title}
        </div>
      </div>
      <div style={{ flex: 1, height: 1, background: `${accent}30`, marginLeft: 8 }} />
    </div>
  );
}

interface ProjectCardProps {
  proj: {
    id: string; title: string; titleVi?: string;
    image: string; roleVi?: string; role: string;
    categoryLabelVi?: string; categoryLabel: string;
    year: string; organization: string;
    descriptionVi?: string; description: string;
    tagsVi?: string[]; tags: string[];
  };
  accent: string; textBody: string; textMuted: string; navy: string; border: string;
}

function ProjectCard({ proj, accent, textBody, textMuted, navy, border }: ProjectCardProps) {
  const title = proj.titleVi || proj.title;
  const role = proj.roleVi || proj.role;
  const cat = proj.categoryLabelVi || proj.categoryLabel;
  const desc = proj.descriptionVi || proj.description;
  const tags = (proj.tagsVi || proj.tags).slice(0, 3);

  return (
    <div className="no-break" style={{
      borderRadius: 10, overflow: 'hidden',
      border: `1px solid ${border}`,
      background: '#fff',
    }}>
      {/* Image */}
      <div style={{ height: 110, overflow: 'hidden', background: '#e2e8f0' }}>
        <img
          src={proj.image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      {/* Content */}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 9, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
          {cat} · {proj.year}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: navy, lineHeight: 1.3, marginBottom: 2 }}>
          {title}
        </div>
        <div style={{ fontSize: 10, fontWeight: 600, color: '#64748b', marginBottom: 5 }}>
          {role}
        </div>
        <div style={{ fontSize: 10, color: textBody, lineHeight: 1.4, marginBottom: 6 }}>
          {desc.length > 100 ? desc.substring(0, 100) + '...' : desc}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {tags.map(t => (
            <span key={t} style={{
              fontSize: 9, padding: '2px 6px', borderRadius: 4,
              background: `${accent}10`, color: accent,
              border: `1px solid ${accent}25`, fontWeight: 600,
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
