import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    if (error) {
      console.error(error);
    } else {
      setProjects(data || []);
    }
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
    const { error } = await supabase.from('projects').insert([
      { 
        id: form.id, 
        title: form.title, 
        role: form.role,
        category: form.category,
        category_label: form.category_label,
        year: form.year,
        organization: form.organization,
        description: form.description,
        youtube_url: form.youtube_url
      }
    ]);
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
        <div className="bg-slate-900 border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-rose-400 text-sm font-medium bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
                {error}
              </div>
            )}

            <button 
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2.5 rounded-xl transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] mt-4"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030611] text-slate-300 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold text-white font-display">Quản lý Dự Án (Projects)</h1>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm font-medium text-white"
          >
            Đăng xuất
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Thêm Mới */}
          <div className="lg:col-span-1 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl h-fit">
            <h2 className="text-xl font-bold text-white mb-4">Thêm Dự Án Mới</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">ID (vd: mv-ai-bon-voyaige)</label>
                <input type="text" required value={form.id} onChange={e => setForm({...form, id: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Tên Dự Án (Title)</label>
                <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Vai trò (Role)</label>
                <input type="text" value={form.role} onChange={e => setForm({...form, role: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Danh mục (ID)</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white">
                    <option value="mv">MV</option>
                    <option value="lead">Lead</option>
                    <option value="sublead">Sub-lead</option>
                    <option value="podcast">Podcast</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Năm</label>
                  <input type="text" value={form.year} onChange={e => setForm({...form, year: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Nhãn danh mục (Category Label)</label>
                <input type="text" value={form.category_label} onChange={e => setForm({...form, category_label: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Tổ chức (Organization)</label>
                <input type="text" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">YouTube URL</label>
                <input type="text" value={form.youtube_url} onChange={e => setForm({...form, youtube_url: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Mô tả (Description)</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-sm text-white"></textarea>
              </div>
              
              <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 rounded-lg transition-all mt-2">
                Tạo Dự Án
              </button>
            </form>
          </div>

          {/* Danh sách */}
          <div className="lg:col-span-2 bg-slate-900 border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Danh Sách Dự Án ({projects.length})</h2>
              <button onClick={fetchProjects} className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-white/10">Làm mới</button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-10 text-slate-400">Đang tải dữ liệu...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-10 text-slate-500 bg-slate-950 rounded-xl border border-white/5">
                Chưa có dự án nào. Vui lòng thêm mới bên trái.
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {projects.map(p => (
                  <div key={p.id} className="bg-slate-950 border border-white/5 p-4 rounded-xl flex justify-between items-start group hover:border-cyan-500/30 transition-all">
                    <div>
                      <h3 className="text-white font-bold text-lg">{p.title} <span className="text-xs font-mono text-cyan-400 ml-2">{p.year}</span></h3>
                      <p className="text-xs text-rose-300 font-mono mt-1">{p.role}</p>
                      <p className="text-sm text-slate-400 mt-2 line-clamp-2">{p.description}</p>
                      <div className="flex gap-2 mt-3">
                        <span className="text-[10px] px-2 py-0.5 bg-white/5 rounded-full border border-white/10">{p.category_label}</span>
                        {p.youtube_url && <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full border border-red-500/20">YouTube</span>}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(p.id)}
                      className="text-slate-500 hover:text-red-400 bg-white/5 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                      title="Xoá"
                    >
                      Xoá
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
