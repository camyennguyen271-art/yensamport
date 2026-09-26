import React, { useState } from 'react';

export const Admin: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Thông tin đăng nhập không chính xác');
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
          <h1 className="text-3xl font-bold text-white font-display">Bảng điều khiển Admin</h1>
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all text-sm font-medium text-white"
          >
            Đăng xuất
          </button>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-xl">
          <h2 className="text-xl font-bold text-white mb-4">Xin chào, Admin!</h2>
          <p className="text-slate-400 mb-6 leading-relaxed">
            Dữ liệu của website hiện tại đang được cấu hình cứng (hardcoded) trong các file mã nguồn như <code className="text-cyan-400 bg-cyan-400/10 px-1.5 py-0.5 rounded">src/components/ProjectsSection.tsx</code>. 
            Để có thể chỉnh sửa hình ảnh và dữ liệu trực tiếp từ trang Admin này, bạn cần thực hiện việc di chuyển dữ liệu vào cơ sở dữ liệu (ví dụ: Supabase) và tạo các API để lấy/cập nhật dữ liệu.
          </p>
          <div className="bg-cyan-950/30 border border-cyan-500/20 rounded-xl p-5">
            <h3 className="font-semibold text-cyan-300 mb-2">Các bước tiếp theo cần làm:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
              <li>Tạo các bảng (tables) trong Supabase để lưu trữ Projects, Experience, v.v.</li>
              <li>Di chuyển dữ liệu hình ảnh lên Storage của Supabase.</li>
              <li>Cập nhật các Component React để gọi dữ liệu từ Supabase thay vì dùng mảng có sẵn.</li>
              <li>Xây dựng form nhập liệu tại trang Admin này để thêm/sửa/xóa (CRUD) dữ liệu vào Supabase.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
