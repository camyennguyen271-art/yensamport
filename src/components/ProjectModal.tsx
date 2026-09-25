import React from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Film, Mic, Award, Code2 } from 'lucide-react';

export interface ProjectItem {
  id: string;
  title: string;
  role: string;
  category: 'mv' | 'lead' | 'sublead' | 'podcast';
  categoryLabel: string;
  year: string;
  organization: string;
  description: string;
  deliverables: string[];
  image?: string;
  tags: string[];
  featured?: boolean;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-slate-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.organization}</span>
            <span aria-hidden="true">·</span>
            <span className="text-rose-400">{project.categoryLabel}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            {project.title}
          </h3>

          <div className="inline-block px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300">
            Role: {project.role}
          </div>
        </div>

        {/* Optional Showcase Image */}
        {project.image && (
          <div className="mt-5 rounded-2xl overflow-hidden border border-white/15 aspect-video w-full relative">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        )}

        {/* Project Description */}
        <div className="mt-6 space-y-4">
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1.5">Overview</h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">Key Highlights & Deliverables</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {project.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-2">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">Competencies & Domains</h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
              {project.tags.map((tag, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Nguyễn Thị Cẩm Yến · Media Portfolio</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Close Viewer
          </button>
        </div>
      </div>
    </div>
  );
};
