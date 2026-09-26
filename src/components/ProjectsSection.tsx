import React, { useState, useEffect } from 'react';
import { ProjectItem, ProjectModal } from './ProjectModal';
import { Youtube } from 'lucide-react';
import { supabase } from '../lib/supabase';

const HARDCODED_PROJECTS: ProjectItem[] = [
  // Creative / MV
  {
    id: 'mv-ai-bon-voyaige',
    title: 'MV "AI Bon Voyaige"',
    role: 'Producer, Director, Creative, Prompt Engineer',
    category: 'mv',
    categoryLabel: 'Music Video & AI Direction',
    year: '2024',
    organization: 'Creative & Digital Production',
    featured: true,
    image: '/src/assets/images/project_mv_showcase_1790314359425.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // TODO: thay link thật
    description: 'Groundbreaking generative AI music video combining high-concept art direction with cutting-edge prompt engineering and cinematic production workflows.',
    deliverables: [
      'Engineered detailed visual prompt matrices for AI visual generative engines.',
      'Directed full creative narrative, color grading, storyboarding, and video editing.',
      'Synchronized multi-track audio scoring with AI visuals for cohesive pacing.'
    ],
    tags: ['AI Prompt Engineering', 'Directing', 'Music Video Production', 'Creative Concept']
  },
  {
    id: 'mv-slay-your-way',
    title: 'MV "Slay Your Way"',
    role: 'Producer, Director, Creative',
    category: 'mv',
    categoryLabel: 'Music Video & Creative Direction',
    year: '2024',
    organization: 'FPT Education / Media Production',
    featured: true,
    image: '/src/assets/images/project_event_stage_1790314370784.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // TODO: thay link thật
    description: 'High-energy youth anthem music video promoting self-expression, modern style, and campus culture across Vietnam.',
    deliverables: [
      'Led the full pre-production, filming schedule, set design, and creative directing.',
      'Managed artist rehearsals, costume aesthetics, and multi-camera crew operations.',
      'Achieved viral social spread and high positive sentiment across youth audiences.'
    ],
    tags: ['Directing', 'Production Management', 'Viral Media', 'Youth Culture']
  },
  {
    id: 'mv-giai-dieu-viet-nam-minh',
    title: 'MV "Giai Điệu Việt Nam Mình" feat Masew',
    role: 'Producer, Creative',
    category: 'mv',
    categoryLabel: 'Music Video & Artist Collab',
    year: '2023 - 2024',
    organization: 'National Music Collaboration',
    image: '/src/assets/images/project_mv_showcase_1790314359425.jpg',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // TODO: thay link thật
    description: 'Special musical collaboration with acclaimed Vietnamese producer Masew, harmonizing traditional folk motifs with contemporary electronic beats.',
    deliverables: [
      'Coordinated creative alignment between headline music producer Masew and brand themes.',
      'Produced visual campaign assets, press teasers, and promotional rollouts.',
      'Delivered widespread press coverage across top Vietnamese entertainment portals.'
    ],
    tags: ['Masew Collaboration', 'Creative Producing', 'Traditional Meets Modern', 'PR Campaign']
  },

  // Podcasts
  {
    id: 'f-exp-podcast',
    title: 'F-EXP \'N BEYOND Experience Podcast',
    role: 'Project Manager',
    category: 'podcast',
    categoryLabel: 'Original Audio Series',
    year: '2023 - 2024',
    organization: 'FPT Education',
    description: 'In-depth experience podcast series bringing authentic discussions with industry pioneers, creative talents, and student leaders.',
    deliverables: [
      'Led end-to-end podcast project management from guest curation to distribution.',
      'Managed audio recording engineering, episode scripting, and social soundbites.',
      'Established multi-platform distribution across Spotify, YouTube, and Apple Podcasts.'
    ],
    tags: ['Project Management', 'Podcast Production', 'Audio Storytelling', 'Guest Curation']
  },

  // Media Leader
  {
    id: 'fpt-hackathon-2024',
    title: 'FPT Edu Hackathon Technology Contest 2024',
    role: 'Media Leader',
    category: 'lead',
    categoryLabel: 'National Technology Contest',
    year: '2024',
    organization: 'FPT Education',
    featured: true,
    image: '/src/assets/images/project_event_stage_1790314370784.jpg',
    description: 'Nationwide technology tournament challenging hundreds of top engineering and AI student teams across all FPT Education campuses.',
    deliverables: [
      'Headed all media planning, broadcast livestreams, and tech press releases.',
      'Spearheaded real-time competition updates, mentor spotlights, and finale recap videos.',
      'Coordinated on-ground media teams, press interview booths, and sponsor exposure.'
    ],
    tags: ['Media Leader', 'Hackathon', 'Tech PR', 'Livestream Operations']
  },
  {
    id: 'nihongoeng-2023',
    title: 'FPT Edu NihongoEng Language Contest 2023',
    role: 'Media Leader',
    category: 'lead',
    categoryLabel: 'Dual-Language Academic Contest',
    year: '2023',
    organization: 'FPT Education',
    description: 'Premier bilingual Japanese & English speaking and debate contest for higher education students nationwide.',
    deliverables: [
      'Crafted comprehensive cross-channel communication strategy targeting bilingual students.',
      'Drove record contestant registrations through interactive campus ambassadorship.',
      'Managed post-event media coverage and international cultural relations.'
    ],
    tags: ['Media Leader', 'Language Contest', 'Cross-Cultural PR', 'Audience Growth']
  },

  // Media Sub-Leader
  {
    id: 'fescamp-4',
    title: 'FES-CAMP 4: Thang Âm Việt',
    role: 'Media Sub-Leader',
    category: 'sublead',
    categoryLabel: 'Cultural Music Camp',
    year: '2023',
    organization: 'FPT Education',
    description: 'Large-scale experiential student camp honoring traditional Vietnamese musical heritage through modern workshops and live performances.',
    deliverables: [
      'Supervised the media operational sub-unit, visual identity distribution, and camp daily recaps.',
      'Created engaging TikTok and Reels series capturing youth interactions with ethnic instruments.'
    ],
    tags: ['Media Sub-Leader', 'Traditional Music', 'Experiential Camp', 'Short-form Video']
  },
  {
    id: 'biz-talent-2023',
    title: 'FPT Edu Biz Talent Economics Contest 2023',
    role: 'Media Sub-Leader',
    category: 'sublead',
    categoryLabel: 'Business & Economics Tournament',
    year: '2023',
    organization: 'FPT Education',
    description: 'High-stakes business case competition testing innovative economic models and entrepreneurial feasibility among university students.',
    deliverables: [
      'Produced contest promotional assets, case study highlight reels, and jury interviews.',
      'Handled media coordination across business media channels.'
    ],
    tags: ['Media Sub-Leader', 'Business Case', 'Corporate Media']
  },
  {
    id: 'got-talent-2024',
    title: 'FPT Edu Got Talent 2024',
    role: 'Media Sub-Leader',
    category: 'sublead',
    categoryLabel: 'Performing Arts Competition',
    year: '2024',
    organization: 'FPT Education',
    description: 'Grand performing arts championship featuring music, dance, and theatrical acts from contestants nationwide.',
    deliverables: [
      'Coordinated media buzz, vote campaigns, contestant showcase profiles, and gala coverage.',
      'Drove massive online audience participation via voting micro-sites.'
    ],
    tags: ['Media Sub-Leader', 'Performing Arts', 'Audience Voting', 'Event PR']
  },
  {
    id: 'ftc-vietnam',
    title: 'FIRST Tech Challenge (FTC) in Vietnam 2023-2024',
    role: 'Media Sub-Leader',
    category: 'sublead',
    categoryLabel: 'Global Robotics Competition',
    year: '2023 - 2024',
    organization: 'FIRST Global & FPT Education',
    description: 'Vietnam national qualifier for the world-renowned FIRST Tech Challenge robotics championship for young innovators.',
    deliverables: [
      'Promoted robotics and STEM education through compelling team video profiles and live coverage.',
      'Bridged international FIRST branding guidelines with Vietnamese youth audience channels.'
    ],
    tags: ['Robotics STEM', 'Media Sub-Leader', 'International Standard']
  },
  {
    id: 'color-up-2024',
    title: 'FPT Edu Color Up Graphic Design Contest 2024',
    role: 'Media Sub-Leader',
    category: 'sublead',
    categoryLabel: 'Design & Visual Arts Contest',
    year: '2024',
    organization: 'FPT Education',
    description: 'The largest annual creative arts and graphic design contest in FPT Education, showcasing digital painting, branding, and motion design.',
    deliverables: [
      'Directed exhibition media walk-throughs, designer features, and award gala coverage.',
      'Curated high-contrast design showcase reels celebrating student creators.'
    ],
    tags: ['Graphic Design', 'Visual Arts', 'Media Sub-Leader']
  },
  {
    id: 'tich-tich-tinh-tang',
    title: 'Traditional Music Contest "Tích Tịch Tình Tang" 2024',
    role: 'Media Sub-Leader',
    category: 'sublead',
    categoryLabel: 'Traditional Vietnamese Music',
    year: '2024',
    organization: 'FPT Education',
    description: 'National festival celebrating traditional Vietnamese ethnic instruments and melodies played by the modern youth generation.',
    deliverables: [
      'Orchestrated multi-platform cultural PR campaign bridging youth passion with ancestral heritage.',
      'Achieved strong broadcast and press pickup praising cultural preservation.'
    ],
    tags: ['Traditional Instruments', 'Cultural Heritage', 'Media Sub-Leader']
  }
];

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [projects, setProjects] = useState<ProjectItem[]>(HARDCODED_PROJECTS);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        // Map data from Supabase to match the structure
        const dbProjects = data.map((item: any) => ({
          ...item,
          categoryLabel: item.category_label,
          youtubeUrl: item.youtube_url,
          tags: item.tags || [],
          deliverables: item.deliverables || []
        }));
        
        // Merge DB projects at the top, avoiding duplicates by id
        const dbIds = new Set(dbProjects.map((p: any) => p.id));
        const filteredHardcoded = HARDCODED_PROJECTS.filter(p => !dbIds.has(p.id));
        
        setProjects([...dbProjects, ...filteredHardcoded]);
      }
    };
    fetchProjects();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'mv', label: 'Music Videos & Creative' },
    { id: 'lead', label: 'Media Leadership' },
    { id: 'sublead', label: 'Competitions & Camps' },
    { id: 'podcast', label: 'Original Podcasts' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">03 / CURATED SHOWCASE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            Key Projects
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-2 sm:mt-0 font-mono">
          12+ Productions, National Contests & Creative Releases
        </p>
      </div>

      {/* Category Filter Controls (Single-line Interactive Segmented Bar) */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar mb-10 max-w-full">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-white text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveProject(project)}
            className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-cyan-400/40 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.2)]"
          >
            {/* Optional Top Visual Banner */}
            {project.image && (
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                {project.featured && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-cyan-300">
                    Featured
                  </span>
                )}
                {/* YouTube badge overlay */}
                {project.youtubeUrl && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#FF0000]/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* YouTube-only banner (no image) */}
            {!project.image && project.youtubeUrl && (
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-900 to-[#1a0000] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Youtube className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-1">Xem trên YouTube</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
            )}

            {/* Card Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Unboxed Metadata (Zero-Pill Discipline) */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                  <span className="text-cyan-400 font-medium">{project.year}</span>
                  <span aria-hidden="true">·</span>
                  <span>{project.categoryLabel}</span>
                </div>

                <h3 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs font-semibold text-rose-300 mt-1 font-mono">
                  {project.role}
                </p>

                <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Unboxed tags with dot separators */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-mono truncate max-w-[80%]">
                  {project.tags.slice(0, 2).join(' · ')}
                </div>
                <span className="text-xs font-semibold text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                  View →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
