import React, { useState } from 'react';
import { ProjectItem, ProjectModal } from './ProjectModal';
import { Youtube, Plus } from 'lucide-react';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText, InlineImage, ItemControls } from './admin/InlineEditHelpers';
import { ProjectItemData } from '../data/mockSiteData';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);

  const { data, updateProjectItem, addProjectItem, deleteProjectItem, reorderProjects, isEditMode } = useSiteData();
  const projects = data.projects;

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

  const handleAddNewProject = () => {
    const newId = `proj_${Date.now()}`;
    const newItem: ProjectItemData = {
      id: newId,
      title: 'Tên Dự Án Mới',
      role: 'Producer / Director',
      category: 'mv',
      categoryLabel: 'Music Video & Creative',
      year: '2024',
      organization: 'FPT Education / Media Production',
      featured: true,
      image: '/src/assets/images/project_mv_showcase_1790314359425.jpg',
      youtubeUrl: '',
      description: 'Mô tả dự án ngắn gọn và ấn tượng...',
      deliverables: ['Giao nộp 1', 'Giao nộp 2'],
      tags: ['Creative Producing', 'Media Campaign']
    };
    addProjectItem(newItem);
  };

  return (
    <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">03 / CURATED SHOWCASE</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            Key Projects
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {isEditMode && (
            <button
              type="button"
              onClick={handleAddNewProject}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm dự án</span>
            </button>
          )}
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            {projects.length} Productions & Creative Releases
          </p>
        </div>
      </div>

      {/* Category Filter Controls */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-900/80 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar mb-10 max-w-full">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
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
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="relative group glass-card rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.2)]"
          >
            {/* Item Controls for Edit Mode */}
            <ItemControls
              itemTitle="dự án"
              canMoveUp={index > 0}
              canMoveDown={index < projects.length - 1}
              onMoveUp={() => reorderProjects(index, index - 1)}
              onMoveDown={() => reorderProjects(index, index + 1)}
              onDelete={() => deleteProjectItem(project.id)}
            />

            {/* Optional Top Visual Banner */}
            {project.image ? (
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <InlineImage
                  src={project.image}
                  alt={project.title}
                  onChange={(newSrc) => updateProjectItem(project.id, { image: newSrc })}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
                {project.featured && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase text-cyan-300 pointer-events-none">
                    Featured
                  </span>
                )}
                {project.youtubeUrl && !isEditMode && (
                  <div 
                    onClick={() => setActiveProject(project as ProjectItem)}
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#FF0000]/90 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Youtube className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ) : project.youtubeUrl ? (
              <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-900 to-[#1a0000] flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#FF0000] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Youtube className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mt-1">Xem trên YouTube</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
              </div>
            ) : null}

            {/* Card Body */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mb-2">
                  <span className="text-cyan-400 font-medium">
                    <InlineText
                      value={project.year}
                      onChange={(val) => updateProjectItem(project.id, { year: val })}
                    />
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    <InlineText
                      value={project.categoryLabel}
                      onChange={(val) => updateProjectItem(project.id, { categoryLabel: val })}
                    />
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors">
                  <InlineText
                    value={project.title}
                    onChange={(val) => updateProjectItem(project.id, { title: val })}
                  />
                </h3>

                <p className="text-xs font-semibold text-rose-300 mt-1 font-mono">
                  <InlineText
                    value={project.role}
                    onChange={(val) => updateProjectItem(project.id, { role: val })}
                  />
                </p>

                <p className="text-xs text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
                  <InlineText
                    value={project.description}
                    onChange={(val) => updateProjectItem(project.id, { description: val })}
                    multiline={true}
                  />
                </p>
              </div>

              {/* Card Footer */}
              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                <div className="text-[11px] text-slate-400 font-mono truncate max-w-[75%]">
                  <InlineText
                    value={(project.tags || []).slice(0, 3).join(' · ')}
                    onChange={(val) => updateProjectItem(project.id, { tags: val.split('·').map(t => t.trim()) })}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(project as ProjectItem)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  Chi tiết →
                </button>
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
