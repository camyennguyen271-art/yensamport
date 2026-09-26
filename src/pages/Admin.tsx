import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Image as ImageIcon, FileText, User, Briefcase, Code, LogOut, Plus, Trash2, Edit3, Settings, Share2, RefreshCw, X, Globe, Save, Eye } from 'lucide-react';
import { HARDCODED_PROJECTS } from '../components/ProjectsSection';
import { SOCIAL_LINKS } from '../components/ContactSection';

const EMPTY_FORM = {
  id: '', title: '', role: '', category: 'mv', category_label: '',
  year: '', organization: '', description: '', youtube_url: '',
  image: '', featured: false, tags: '' as string, deliverables: '' as string
};

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('projects');

  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({...EMPTY_FORM});
  const [isEditMode, setIsEditMode] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      setIsLoggedIn(true);
      setError('');
      fetchProjects();
    } else {
      setError('Thông tin đăng nhập không chính xác');
    }
  };

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (!error) setProjects(data || []);
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xoá dự án này?')) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  const handleEditProject = (p: any) => {
    setIsEditMode(true);
    setForm({
      id: p.id || '',
      title: p.title || '',
      role: p.role || '',
      category: p.category || 'mv',
      category_label: p.category_label || '',
      year: p.year || '',
      organization: p.organization || '',
      description: p.description || '',
      youtube_url: p.youtube_url || '',
      image: p.image || '',
      featured: p.featured || false,
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : (p.tags || ''),
      deliverables: Array.isArray(p.deliverables) ? p.deliverables.join('\n') : (p.deliverables || ''),
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setForm({...EMPTY_FORM});
    setIsEditMode(false);
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.title) return alert('Thiếu ID hoặc Title');

    const payload = {
      ...form,
      tags: form.tags ? form.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [],
      deliverables: form.deliverables ? form.deliverables.split('\n').map((d: string) => d.trim()).filter(Boolean) : [],
    };

    if (isEditMode) {
      const { error } = await supabase.from('projects').update(payload).eq('id', form.id);
      if (error) {
        alert('Lỗi cập nhật: ' + error.message);
      } else {
        alert('✅ Cập nhật dự án thành công!');
      }
    } else {
      const { error } = await supabase.from('projects').insert([payload]);
      if (error) {
        alert('Lỗi: ' + error.message);
      } else {
        alert('✅ Thêm dự án thành công!');
      }
    }
    resetForm();
    fetchProjects();
  };

  const syncHardcodedProjects = async () => {
    if (!confirm('Hành động này sẽ đồng bộ toàn bộ dự án mẫu vào Database (bỏ qua dự án đã có). Tiếp tục?')) return;

    setIsLoading(true);
    let successCount = 0;

    for (const p of HARDCODED_PROJECTS) {
      const { data } = await supabase.from('projects').select('id').eq('id', p.id).single();
      if (!data) {
        await supabase.from('projects').insert([{
          id: p.id,
          title: p.title,
          role: p.role,
          category: p.category,
          category_label: p.categoryLabel,
          year: p.year,
          organization: p.organization || '',
          description: p.description,
          youtube_url: p.youtubeUrl || '',
          featured: p.featured || false,
          image: p.image || '',
          tags: p.tags,
          deliverables: p.deliverables
        }]);
        successCount++;
      }
    }

    setIsLoading(false);
    fetchProjects();
    alert(`Đồng bộ thành công ${successCount} dự án mới vào Database!`);
  };

  // ==================== LOGIN SCREEN ====================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#030611] flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
              <Settings className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-8 text-center font-display tracking-tight">Yensamport Admin</h1>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all placeholder:text-slate-600"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-rose-400 text-sm font-medium bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white hover:bg-cyan-50 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] mt-2"
            >
              Đăng nhập hệ thống
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==================== TABS ====================
  const TABS = [
    { id: 'projects', label: 'Quản lý Dự án', icon: LayoutDashboard },
    { id: 'hero', label: 'Phần Hero', icon: FileText },
    { id: 'footer', label: 'Mạng Xã Hội', icon: Share2 },
    { id: 'i18n', label: 'Song ngữ (i18n)', icon: Globe },
    { id: 'about', label: 'Giới thiệu', icon: User },
    { id: 'experience', label: 'Kinh nghiệm', icon: Briefcase },
  ];

  // ==================== MAIN DASHBOARD ====================
  return (
    <div className="min-h-screen bg-[#030611] text-slate-300 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-white/10 flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white font-display tracking-tight flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            Yensamport
          </h1>
          <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <a href="/" target="_blank" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all text-sm font-medium mb-2">
            <Eye className="w-4 h-4" /> Xem website
          </a>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 flex h-screen overflow-hidden">
        
        {/* Editor Area (Left Pane) */}
        <div className="w-[55%] overflow-y-auto p-8 border-r border-white/10">
          <header className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white font-display">
                {TABS.find(t => t.id === activeTab)?.label}
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Chỉnh sửa và cập nhật nội dung website
              </p>
            </div>
          </header>

        {/* ==================== PROJECTS TAB ==================== */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-8">
            {/* Form */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl h-fit">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {isEditMode ? (
                    <><Edit3 className="w-5 h-5 text-amber-400" /> Chỉnh Sửa Dự Án</>
                  ) : (
                    <><Plus className="w-5 h-5 text-cyan-400" /> Thêm Dự Án Mới</>
                  )}
                </h3>
                {isEditMode && (
                  <button onClick={resetForm} className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-lg transition-all flex items-center gap-1">
                    <X className="w-3 h-3" /> Huỷ
                  </button>
                )}
              </div>

              {isEditMode && (
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 mb-4 text-xs text-amber-300">
                  Đang chỉnh sửa: <strong className="text-amber-200">{form.id}</strong>
                </div>
              )}

              <form onSubmit={handleSubmitProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">ID Key (đồng bộ với website)</label>
                  <input type="text" required value={form.id} onChange={e => setForm({...form, id: e.target.value})}
                    disabled={isEditMode}
                    className={`w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors ${isEditMode ? 'opacity-60 cursor-not-allowed' : ''}`} />
                  <p className="text-[10px] text-slate-500 mt-0.5">Ví dụ: mv-ai-bon-voyaige, mv-slay-your-way</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tên Dự Án (Title)</label>
                  <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Vai trò (Role)</label>
                  <input type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Danh mục</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors">
                      <option value="mv">MV</option>
                      <option value="lead">Lead</option>
                      <option value="sublead">Sub-lead</option>
                      <option value="podcast">Podcast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Năm</label>
                    <input type="text" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Nhãn danh mục (Category Label)</label>
                  <input type="text" value={form.category_label} onChange={e => setForm({...form, category_label: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tổ chức (Organization)</label>
                  <input type="text" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Mô tả (Description)</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">YouTube URL</label>
                  <input type="text" value={form.youtube_url} onChange={e => setForm({...form, youtube_url: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Đường dẫn hình ảnh (Image URL)</label>
                  <input type="text" value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Tags (phân cách bằng dấu phẩy)</label>
                  <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="AI, Directing, Production" className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Deliverables (mỗi dòng 1 mục)</label>
                  <textarea rows={3} value={form.deliverables} onChange={e => setForm({...form, deliverables: e.target.value})} placeholder="Mỗi dòng là 1 deliverable" className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors"></textarea>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} id="featured-check" className="accent-cyan-400" />
                  <label htmlFor="featured-check" className="text-xs text-slate-400">Đánh dấu nổi bật (Featured)</label>
                </div>

                <button type="submit" className={`w-full font-bold py-2.5 rounded-lg transition-all mt-2 shadow-lg ${
                  isEditMode
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                }`}>
                  {isEditMode ? '💾 Cập Nhật Dự Án' : '➕ Lưu Dự Án Mới'}
                </button>
              </form>
            </div>

            {/* Project List */}
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col h-[500px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-cyan-400" /> Danh Sách Trong DB ({projects.length})
                </h3>
                <div className="flex gap-2">
                  <button onClick={syncHardcodedProjects} className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 px-3 py-1.5 rounded-lg border border-emerald-500/20 text-emerald-400 font-medium transition-colors flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> Đồng bộ Dự án mẫu
                  </button>
                  <button onClick={fetchProjects} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-white/10 text-white font-medium transition-colors">
                    Làm mới
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {isLoading ? (
                  <div className="text-center py-10 text-slate-400">Đang tải dữ liệu...</div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-950/50 rounded-xl border border-white/5 border-dashed">
                    Chưa có dự án nào trong Database. Hãy bấm nút "Đồng bộ Dự án mẫu" để nạp dự án hiện có!
                  </div>
                ) : (
                  projects.map(p => (
                    <div key={p.id} className="bg-slate-950 border border-white/5 p-4 rounded-xl flex justify-between items-start group hover:border-cyan-500/30 transition-all shadow-sm">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-white font-bold text-base">{p.title}</h4>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{p.year}</span>
                          {p.featured && <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">⭐ Featured</span>}
                        </div>
                        <p className="text-[11px] text-cyan-400/70 font-mono mt-1 truncate">KEY: {p.id}</p>
                        <p className="text-xs text-cyan-400 font-mono mt-0.5">{p.role}</p>
                        <p className="text-sm text-slate-400 mt-2 line-clamp-2 pr-4">{p.description}</p>
                        {p.tags && Array.isArray(p.tags) && p.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {p.tags.slice(0, 4).map((tag: string, i: number) => (
                              <span key={i} className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/20">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 ml-2 shrink-0">
                        <button
                          onClick={() => handleEditProject(p)}
                          className="text-slate-500 hover:text-amber-400 bg-slate-900 hover:bg-amber-500/10 p-2 rounded-lg transition-all border border-white/5"
                          title="Sửa dự án"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-slate-500 hover:text-rose-400 bg-slate-900 hover:bg-rose-500/10 p-2 rounded-lg transition-all border border-white/5"
                          title="Xoá"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ==================== HERO TAB ==================== */}
        {activeTab === 'hero' && <HeroEditor />}

        {/* ==================== FOOTER / SOCIAL TAB ==================== */}
        {activeTab === 'footer' && <FooterEditor />}

        {/* ==================== I18N TAB ==================== */}
        {activeTab === 'i18n' && <I18nEditor />}

        {/* ==================== PLACEHOLDER TABS ==================== */}
        {(activeTab !== 'projects' && activeTab !== 'hero' && activeTab !== 'footer' && activeTab !== 'i18n') && (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center text-center h-[50vh]">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border border-white/5 shadow-inner mb-6">
              {React.createElement(TABS.find(t => t.id === activeTab)?.icon || Settings, { className: "w-10 h-10 text-cyan-400/50" })}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Đang phát triển</h3>
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
              Tính năng chỉnh sửa nội dung cho phần <strong>{TABS.find(t => t.id === activeTab)?.label}</strong> đang được xây dựng. Để kích hoạt tính năng này, cần khởi tạo bảng tương ứng trên Supabase trước.
            </p>
          </div>
        )}

        </div>

        {/* Live Preview Area (Right Pane) */}
        <div className="w-[45%] h-full bg-[#030611] relative">
          <div className="absolute top-0 left-0 w-full p-2 bg-slate-900 border-b border-white/10 flex justify-between items-center z-10">
            <span className="text-xs font-mono text-cyan-400 pl-2">Live Website Preview</span>
            <button onClick={() => {
              const iframe = document.getElementById('preview-iframe') as HTMLIFrameElement;
              if (iframe) iframe.src = iframe.src;
            }} className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded border border-white/10 transition-colors">
              Refresh Preview
            </button>
          </div>
          <iframe 
            id="preview-iframe"
            src="/" 
            className="w-full h-full border-none pt-10"
            title="Website Preview"
          />
        </div>

      </div>
    </div>
  );
};

// ==================== HERO EDITOR ====================
const HeroEditor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [heroData, setHeroData] = useState({
    title: 'NGUYỄN THỊ CẨM YẾN',
    subtitle: 'YẾN SAM · MEDIA SPECIALIST',
    tagline: 'Proactive · Friendly · Motivated Ambivert',
    description: 'Connecting strategic communication, viral media production, and artist management through a holistic, creative problem-solving approach.',
    email: 'camyen.nguyen.271@gmail.com',
    imageUrl: '/src/assets/images/hero_yen_portrait_1790314347035.jpg'
  });

  useEffect(() => {
    const fetchHero = async () => {
      const { data, error } = await supabase.from('site_content').select('*').eq('section_name', 'hero').single();
      if (!error && data && data.content_json) {
        setHeroData(data.content_json);
      }
    };
    fetchHero();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('site_content').upsert({
      id: 'hero',
      section_name: 'hero',
      content_json: heroData,
      updated_at: new Date().toISOString()
    });

    if (error) {
      alert('Chưa lưu được. Vui lòng kiểm tra quyền hoặc tạo bảng site_content trước.\nChi tiết lỗi: ' + error.message);
    } else {
      alert('✅ Lưu thành công vào Database!');
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl max-w-5xl">
      <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
        <span>Chỉnh sửa Nội dung Trang Chủ (Hero Section)</span>
        <span className="text-xs font-normal text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">Bảng: site_content</span>
      </h3>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tiêu đề chính (Tên)</label>
              <input type="text" required value={heroData.title} onChange={e => setHeroData({...heroData, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tiêu đề phụ (Phía trên tên)</label>
              <input type="text" required value={heroData.subtitle} onChange={e => setHeroData({...heroData, subtitle: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Tagline (Định vị bản thân)</label>
              <input type="text" required value={heroData.tagline} onChange={e => setHeroData({...heroData, tagline: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Đoạn văn mô tả (Description)</label>
              <textarea rows={4} required value={heroData.description} onChange={e => setHeroData({...heroData, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none transition-colors"></textarea>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Email Liên Hệ</label>
              <input type="email" required value={heroData.email} onChange={e => setHeroData({...heroData, email: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Đường dẫn hình ảnh (URL)</label>
              <input type="text" required value={heroData.imageUrl} onChange={e => setHeroData({...heroData, imageUrl: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:border-cyan-400 outline-none transition-colors mb-2" />
            </div>
            <div className="bg-[#030611] rounded-xl border border-white/10 p-4 h-72 flex items-center justify-center overflow-hidden relative shadow-inner">
              {heroData.imageUrl ? (
                <img src={heroData.imageUrl} alt="Preview" className="w-full h-full object-cover rounded-lg shadow-2xl opacity-90 filter contrast-105" />
              ) : (
                <span className="text-slate-500 text-sm font-mono">Chưa có ảnh (Preview Image)</span>
              )}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button type="submit" disabled={loading} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50">
            {loading ? 'Đang lưu...' : '💾 Lưu Thay Đổi Trang Chủ'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ==================== FOOTER / SOCIAL EDITOR ====================
const FooterEditor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [socials, setSocials] = useState<any[]>(
    SOCIAL_LINKS.map(s => ({
      id: s.id,
      label: s.label,
      handle: s.handle,
      href: s.href,
      description: s.description
    }))
  );

  useEffect(() => {
    const fetchFooter = async () => {
      const { data, error } = await supabase.from('site_content').select('*').eq('section_name', 'footer').single();
      if (!error && data && data.content_json && Array.isArray(data.content_json.socials)) {
        setSocials(data.content_json.socials);
      }
    };
    fetchFooter();
  }, []);

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...socials];
    updated[index][field] = value;
    setSocials(updated);
  };

  const addSocial = () => {
    setSocials([...socials, { id: '', label: '', handle: '', href: '', description: '' }]);
  };

  const removeSocial = (index: number) => {
    if (confirm('Xoá mạng xã hội này?')) {
      setSocials(socials.filter((_, i) => i !== index));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('site_content').upsert({
      id: 'footer',
      section_name: 'footer',
      content_json: { socials },
      updated_at: new Date().toISOString()
    });

    if (error) {
      alert('Lỗi: ' + error.message);
    } else {
      alert('✅ Lưu mạng xã hội thành công!');
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl max-w-5xl">
      <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
        <span>Chỉnh sửa Liên Kết Mạng Xã Hội (Footer)</span>
        <span className="text-xs font-normal text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">Bảng: site_content</span>
      </h3>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {socials.map((social, idx) => (
            <div key={idx} className="bg-slate-950 p-5 rounded-xl border border-white/10 space-y-3 relative">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-cyan-400 capitalize">{social.id || `Mạng xã hội #${idx + 1}`}</h4>
                <button type="button" onClick={() => removeSocial(idx)} className="text-rose-400/50 hover:text-rose-400 transition-colors" title="Xoá">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">ID (key)</label>
                <input type="text" required value={social.id} onChange={e => handleChange(idx, 'id', e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none" placeholder="tiktok, facebook, zalo..." />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tên hiển thị (Label)</label>
                <input type="text" required value={social.label} onChange={e => handleChange(idx, 'label', e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Handle (Tên tài khoản)</label>
                <input type="text" required value={social.handle} onChange={e => handleChange(idx, 'handle', e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Đường link (URL)</label>
                <input type="url" required value={social.href} onChange={e => handleChange(idx, 'href', e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Mô tả ngắn</label>
                <input type="text" required value={social.description} onChange={e => handleChange(idx, 'description', e.target.value)} className="w-full bg-slate-900 border border-white/5 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none" />
              </div>
            </div>
          ))}
        </div>

        <button type="button" onClick={addSocial} className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
          <Plus className="w-4 h-4" /> Thêm mạng xã hội mới
        </button>

        <div className="pt-6 border-t border-white/10">
          <button type="submit" disabled={loading} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50">
            {loading ? 'Đang lưu...' : '💾 Lưu Thay Đổi Footer'}
          </button>
        </div>
      </form>
    </div>
  );
};

// ==================== I18N EDITOR ====================
const I18nEditor: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [translations, setTranslations] = useState<{key: string; vi: string; en: string}[]>([
    { key: 'nav.about', vi: 'Giới thiệu', en: 'About' },
    { key: 'nav.experience', vi: 'Kinh nghiệm', en: 'Experience' },
    { key: 'nav.projects', vi: 'Dự án', en: 'Projects' },
    { key: 'nav.skills', vi: 'Kỹ năng', en: 'Skills' },
    { key: 'nav.contact', vi: 'Liên hệ', en: 'Contact' },
    { key: 'hero.cta', vi: 'Liên hệ & Cộng tác', en: 'Contact & Collaborate' },
    { key: 'hero.viewProjects', vi: 'Xem Dự Án', en: 'View Projects' },
    { key: 'about.title', vi: 'Giới Thiệu', en: 'About Me' },
    { key: 'experience.title', vi: 'Kinh Nghiệm', en: 'Experience' },
    { key: 'projects.title', vi: 'Dự Án Nổi Bật', en: 'Featured Projects' },
    { key: 'skills.title', vi: 'Kỹ Năng', en: 'Skills' },
    { key: 'contact.title', vi: 'Liên Hệ', en: 'Contact' },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('site_content').select('*').eq('section_name', 'i18n').single();
      if (!error && data && data.content_json) {
        // Convert object map to array
        const map = data.content_json as Record<string, { vi: string; en: string }>;
        const arr = Object.entries(map).map(([key, val]) => ({ key, vi: val.vi, en: val.en }));
        if (arr.length > 0) setTranslations(arr);
      }
    };
    fetch();
  }, []);

  const handleChange = (index: number, field: 'vi' | 'en', value: string) => {
    const updated = [...translations];
    updated[index][field] = value;
    setTranslations(updated);
  };

  const addRow = () => {
    setTranslations([...translations, { key: '', vi: '', en: '' }]);
  };

  const removeRow = (index: number) => {
    setTranslations(translations.filter((_, i) => i !== index));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Convert array to object map
    const map: Record<string, { vi: string; en: string }> = {};
    translations.forEach(t => {
      if (t.key) map[t.key] = { vi: t.vi, en: t.en };
    });

    const { error } = await supabase.from('site_content').upsert({
      id: 'i18n',
      section_name: 'i18n',
      content_json: map,
      updated_at: new Date().toISOString()
    });

    if (error) {
      alert('Lỗi: ' + error.message);
    } else {
      alert('✅ Lưu bản dịch thành công!');
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl max-w-5xl">
      <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4 flex items-center justify-between">
        <span className="flex items-center gap-2"><Globe className="w-5 h-5 text-cyan-400" /> Quản lý Bản Dịch Song Ngữ</span>
        <span className="text-xs font-normal text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">Bảng: site_content (key: i18n)</span>
      </h3>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Header */}
        <div className="grid grid-cols-[200px_1fr_1fr_40px] gap-3 text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
          <span>Key</span>
          <span>🇻🇳 Tiếng Việt</span>
          <span>🇬🇧 English</span>
          <span></span>
        </div>

        {/* Rows */}
        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
          {translations.map((t, idx) => (
            <div key={idx} className="grid grid-cols-[200px_1fr_1fr_40px] gap-3 items-center">
              <input type="text" value={t.key} onChange={e => { const u = [...translations]; u[idx].key = e.target.value; setTranslations(u); }} placeholder="nav.about" className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-cyan-300 font-mono focus:border-cyan-400 outline-none" />
              <input type="text" value={t.vi} onChange={e => handleChange(idx, 'vi', e.target.value)} placeholder="Tiếng Việt" className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none" />
              <input type="text" value={t.en} onChange={e => handleChange(idx, 'en', e.target.value)} placeholder="English" className="bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none" />
              <button type="button" onClick={() => removeRow(idx)} className="text-slate-600 hover:text-rose-400 transition-colors p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={addRow} className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1">
          <Plus className="w-4 h-4" /> Thêm key mới
        </button>

        <div className="pt-6 border-t border-white/10">
          <button type="submit" disabled={loading} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50">
            {loading ? 'Đang lưu...' : '💾 Lưu Bản Dịch'}
          </button>
        </div>
      </form>
    </div>
  );
};
