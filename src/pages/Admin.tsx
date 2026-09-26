import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Image as ImageIcon, FileText, User, Briefcase, Code, LogOut, Plus, Trash2, Edit3, Settings } from 'lucide-react';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeTab, setActiveTab] = useState('projects');
  
  // Projects state
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    id: '', title: '', role: '', category: 'mv', category_label: '', 
    year: '', organization: '', description: '', youtube_url: ''
  });

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

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.id || !form.title) return alert('Thiếu ID hoặc Title');
    const { error } = await supabase.from('projects').insert([{ ...form }]);
    if (error) {
      alert('Lỗi: ' + error.message);
    } else {
      alert('Thêm thành công!');
      fetchProjects();
      setForm({
        id: '', title: '', role: '', category: 'mv', category_label: '', 
        year: '', organization: '', description: '', youtube_url: ''
      });
    }
  };

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

  const TABS = [
    { id: 'projects', label: 'Quản lý Dự án', icon: LayoutDashboard },
    { id: 'hero', label: 'Phần Hero', icon: FileText },
    { id: 'about', label: 'Giới thiệu', icon: User },
    { id: 'experience', label: 'Kinh nghiệm', icon: Briefcase },
    { id: 'images', label: 'Thư viện ảnh', icon: ImageIcon },
  ];

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
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-all text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Đăng xuất
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
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

        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Form */}
            <div className="xl:col-span-1 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl h-fit">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" /> Thêm Dự Án Mới
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">ID (vd: mv-ai-1)</label>
                  <input type="text" required value={form.id} onChange={e => setForm({...form, id: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors" />
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
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Danh mục (ID)</label>
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
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Mô tả (Description)</label>
                  <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-400 outline-none transition-colors"></textarea>
                </div>
                
                <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-lg transition-all mt-2 shadow-lg shadow-cyan-500/20">
                  Lưu Dự Án
                </button>
              </form>
            </div>

            {/* List */}
            <div className="xl:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col h-[calc(100vh-140px)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-cyan-400" /> Danh Sách ({projects.length})
                </h3>
                <button onClick={fetchProjects} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-white/10 text-white font-medium transition-colors">
                  Làm mới
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                {isLoading ? (
                  <div className="text-center py-10 text-slate-400">Đang tải dữ liệu...</div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 bg-slate-950/50 rounded-xl border border-white/5 border-dashed">
                    Chưa có dự án nào trong Database.
                  </div>
                ) : (
                  projects.map(p => (
                    <div key={p.id} className="bg-slate-950 border border-white/5 p-4 rounded-xl flex justify-between items-start group hover:border-cyan-500/30 transition-all shadow-sm">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-white font-bold text-base">{p.title}</h4>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">{p.year}</span>
                        </div>
                        <p className="text-xs text-cyan-400 font-mono mt-1">{p.role}</p>
                        <p className="text-sm text-slate-400 mt-2 line-clamp-2 pr-4">{p.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-slate-500 hover:text-white bg-slate-900 hover:bg-slate-800 p-2 rounded-lg transition-all border border-white/5" title="Sửa">
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

        {/* Hero Edit Tab */}
        {activeTab === 'hero' && (
          <HeroEditor />
        )}

        {/* Placeholder cho các tab khác */}
        {(activeTab !== 'projects' && activeTab !== 'hero') && (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-xl flex flex-col items-center justify-center text-center h-[60vh]">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center border border-white/5 shadow-inner mb-6">
              {React.createElement(TABS.find(t => t.id === activeTab)?.icon || Settings, { className: "w-10 h-10 text-cyan-400/50" })}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Đang phát triển</h3>
            <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
              Tính năng chỉnh sửa nội dung cho phần <strong>{TABS.find(t => t.id === activeTab)?.label}</strong> đang được xây dựng. Để kích hoạt tính năng này, cần khởi tạo bảng tương ứng trên Supabase trước.
            </p>
            <div className="mt-8 bg-cyan-950/30 border border-cyan-500/20 p-4 rounded-xl text-left max-w-xl">
              <p className="text-sm text-cyan-300 font-mono mb-2">Bạn phải chạy mã SQL sau trong tab SQL Editor của Supabase để tạo bảng:</p>
              <pre className="text-xs text-slate-300 bg-slate-950 p-3 rounded-lg overflow-x-auto border border-white/5">
{`CREATE TABLE site_content (
  id TEXT PRIMARY KEY,
  section_name TEXT NOT NULL,
  content_json JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cho phép tất cả" ON site_content FOR ALL USING (true);
`}
              </pre>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// Component con để quản lý riêng việc sửa Hero
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
      alert('Chưa lưu được. Vui lòng chạy lệnh SQL tạo bảng site_content (xem gợi ý ở tab About) trước!\nChi tiết lỗi: ' + error.message);
    } else {
      alert('Lưu thành công vào Database!');
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
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Để đổi ảnh, hãy upload ảnh lên Supabase Storage hoặc lấy link URL (imgur, web) dán vào đây.
              </p>
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
          <button type="submit" disabled={loading} className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 flex items-center gap-2">
            {loading ? 'Đang lưu...' : 'Lưu Thay Đổi Trang Chủ'}
          </button>
          
          <p className="text-xs text-slate-400 max-w-sm text-right">
            Lưu ý: Bạn phải tạo bảng <code className="text-cyan-400">site_content</code> trong Supabase trước thì mới có thể lưu được dữ liệu.
          </p>
        </div>
      </form>
    </div>
  );
};
