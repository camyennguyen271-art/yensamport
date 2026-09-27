import React, { useState } from 'react';
import { X, CheckCircle2, Youtube, Plus, Trash2, Link as LinkIcon, Camera } from 'lucide-react';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText, InlineImage } from './admin/InlineEditHelpers';

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
  youtubeUrl?: string;
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

/** Extract YouTube video ID from various YouTube URL formats */
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { isEditMode, updateProjectItem } = useSiteData();
  const [showUrlEdit, setShowUrlEdit] = useState(false);

  if (!project) return null;

  const ytId = project.youtubeUrl ? getYouTubeId(project.youtubeUrl) : null;

  return (
    <div 
      className="fixed inset-0 z-[9000] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-slate-950/95 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer z-20"
          title="Đóng xem chi tiết"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
            <span>
              <InlineText
                value={project.year}
                onChange={(val) => updateProjectItem(project.id, { year: val })}
              />
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <InlineText
                value={project.organization}
                onChange={(val) => updateProjectItem(project.id, { organization: val })}
              />
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-rose-400 font-semibold">
              <InlineText
                value={project.categoryLabel}
                onChange={(val) => updateProjectItem(project.id, { categoryLabel: val })}
              />
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            <InlineText
              value={project.title}
              onChange={(val) => updateProjectItem(project.id, { title: val })}
            />
          </h3>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-xs font-mono text-cyan-300">
            <span>Role:</span>
            <InlineText
              value={project.role}
              onChange={(val) => updateProjectItem(project.id, { role: val })}
            />
          </div>
        </div>

        {/* YouTube Edit Controls in Edit Mode */}
        {isEditMode && (
          <div className="mt-4 p-3 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-xs text-cyan-300 font-mono font-semibold">
              <span className="flex items-center gap-1.5">
                <Youtube className="w-4 h-4 text-red-500" />
                Cài đặt Link YouTube Video
              </span>
              <button
                type="button"
                onClick={() => setShowUrlEdit(!showUrlEdit)}
                className="text-cyan-400 hover:text-white underline text-[11px]"
              >
                {showUrlEdit ? 'Đóng' : 'Sửa link YouTube'}
              </button>
            </div>

            {(showUrlEdit || !project.youtubeUrl) && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  value={project.youtubeUrl || ''}
                  onChange={(e) => updateProjectItem(project.id, { youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className="flex-1 bg-slate-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            )}
          </div>
        )}

        {/* YouTube Embed / Main Media Box */}
        {ytId ? (
          <div className="mt-5 rounded-2xl overflow-hidden border border-white/15 aspect-video w-full relative bg-black shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?rel=0&modestbranding=1`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : project.image ? (
          <div className="mt-5 rounded-2xl overflow-hidden border border-white/15 aspect-video w-full relative shadow-lg">
            <InlineImage
              src={project.image}
              alt={project.title}
              onChange={(newSrc) => updateProjectItem(project.id, { image: newSrc })}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>
        ) : isEditMode ? (
          <div className="mt-5 p-6 rounded-2xl border-2 border-dashed border-cyan-500/40 bg-slate-900/50 flex flex-col items-center justify-center text-center">
            <Camera className="w-8 h-8 text-cyan-400 mb-2" />
            <p className="text-xs text-slate-300 font-medium mb-3">Chưa có ảnh banner hoặc video YouTube cho dự án này</p>
            <InlineImage
              src="/src/assets/images/project_mv_showcase_1790314359425.jpg"
              alt={project.title}
              onChange={(newSrc) => updateProjectItem(project.id, { image: newSrc })}
              className="hidden"
            />
          </div>
        ) : null}

        {/* YouTube external link button */}
        {project.youtubeUrl && !isEditMode && (
          <a
            href={project.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF0000]/15 border border-[#FF0000]/30 text-[#FF4444] hover:bg-[#FF0000]/25 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Youtube className="w-4 h-4" />
            <span>Xem trên YouTube</span>
          </a>
        )}

        {/* Project Description & Details */}
        <div className="mt-6 space-y-5">
          <div>
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1.5">Mô tả dự án (Overview)</h4>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              <InlineText
                value={project.description}
                onChange={(val) => updateProjectItem(project.id, { description: val })}
                multiline={true}
              />
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400">Kết quả & Giao nộp chính (Deliverables)</h4>
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => {
                    const currentList = project.deliverables || [];
                    updateProjectItem(project.id, { deliverables: [...currentList, 'Hạng mục giao nộp mới...'] });
                  }}
                  className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono cursor-pointer"
                >
                  <Plus className="w-3 h-3" /> Thêm Dòng
                </button>
              )}
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {(project.deliverables || []).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 group/deliv">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <InlineText
                      value={item}
                      onChange={(val) => {
                        const updated = [...(project.deliverables || [])];
                        updated[idx] = val;
                        updateProjectItem(project.id, { deliverables: updated });
                      }}
                      multiline={true}
                    />
                  </div>
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (project.deliverables || []).filter((_, i) => i !== idx);
                        updateProjectItem(project.id, { deliverables: updated });
                      }}
                      className="text-rose-400 opacity-0 group-hover/deliv:opacity-100 transition-opacity p-1 hover:bg-rose-500/10 rounded cursor-pointer"
                      title="Xóa dòng này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div className="pt-2 border-t border-white/10">
            <h4 className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2">Thẻ Kỹ Năng / Từ Khóa (Tags)</h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-300 font-mono">
              <InlineText
                value={(project.tags || []).join(' · ')}
                onChange={(val) => {
                  const updatedTags = val.split('·').map(t => t.trim()).filter(Boolean);
                  updateProjectItem(project.id, { tags: updatedTags });
                }}
                placeholder="Tag1 · Tag2 · Tag3"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Nguyễn Thị Cẩm Yến · Visual Portfolio</span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-bold bg-white text-slate-950 hover:bg-cyan-100 transition-colors cursor-pointer shadow-md"
          >
            Đóng bảng xem
          </button>
        </div>
      </div>
    </div>
  );
};
