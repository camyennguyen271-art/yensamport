import React from 'react';
import { useSiteData } from '../../lib/SiteDataContext';
import { useI18n } from '../../lib/i18n';
import { Eye, Edit3, Save, RotateCcw, LogOut, Check, AlertCircle, Globe, RefreshCw, Layout, Layers, Plus } from 'lucide-react';

interface TopAdminToolbarProps {
  onLogout: () => void;
  onAddProject?: () => void;
  onAddExperience?: () => void;
}

export const TopAdminToolbar: React.FC<TopAdminToolbarProps> = ({
  onLogout,
  onAddProject,
  onAddExperience,
}) => {
  const {
    isEditMode,
    setIsEditMode,
    isDirty,
    isSaving,
    saveMessage,
    saveChanges,
    discardChanges,
    resetToDefault,
  } = useSiteData();

  const { language, toggleLanguage } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-cyan-500/30 px-3 sm:px-6 py-2.5 shadow-2xl transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Branding & Unsaved Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-cyan-950 to-blue-950 px-3 py-1.5 rounded-full border border-cyan-500/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
              Visual Editor
            </span>
          </div>

          {/* Unsaved Changes Badge */}
          {isDirty ? (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-medium animate-pulse">
              <AlertCircle className="w-3 h-3 text-amber-400" />
              Chưa lưu thay đổi
            </span>
          ) : (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium">
              <Check className="w-3 h-3 text-emerald-400" />
              Đã lưu tất cả
            </span>
          )}

          {/* Toast / Save Message */}
          {saveMessage && (
            <span className="text-xs font-semibold text-cyan-300 bg-cyan-950/90 border border-cyan-400/40 px-3 py-1 rounded-lg animate-in fade-in">
              {saveMessage}
            </span>
          )}
        </div>

        {/* Center: Mode Switcher (Preview vs Edit) */}
        <div className="flex items-center bg-slate-900 border border-white/15 p-1 rounded-full shadow-inner">
          <button
            type="button"
            onClick={() => setIsEditMode(false)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              !isEditMode
                ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem trước</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditMode(true)}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              isEditMode
                ? 'bg-cyan-500 text-slate-950 shadow-md scale-105'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Chỉnh sửa</span>
          </button>
        </div>

        {/* Right Actions: Save, Discard, Language, Logout */}
        <div className="flex items-center gap-2">

          {/* Quick Add buttons if provided */}
          {isEditMode && (
            <div className="hidden lg:flex items-center gap-1.5 pr-2 border-r border-white/10">
              {onAddProject && (
                <button
                  type="button"
                  onClick={onAddProject}
                  className="px-2.5 py-1.5 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Dự án
                </button>
              )}
              {onAddExperience && (
                <button
                  type="button"
                  onClick={onAddExperience}
                  className="px-2.5 py-1.5 text-[11px] font-medium bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Kinh nghiệm
                </button>
              )}
            </div>
          )}

          {/* Save Changes Button */}
          <button
            type="button"
            onClick={() => saveChanges()}
            disabled={isSaving || !isDirty}
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
              isDirty
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:from-cyan-400 hover:to-blue-500 scale-105 shadow-cyan-500/25'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            {isSaving ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Đang lưu...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Lưu thay đổi</span>
              </>
            )}
          </button>

          {/* Discard Changes Button */}
          {isDirty && (
            <button
              type="button"
              onClick={discardChanges}
              title="Khôi phục trạng thái đã lưu trước đó"
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center gap-1 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Hủy bỏ</span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            title="Chuyển đổi ngôn ngữ để chỉnh sửa"
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 text-slate-200 rounded-full hover:bg-slate-700 flex items-center gap-1.5 border border-white/10 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'vi' ? 'VIE' : 'ENG'}</span>
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={onLogout}
            title="Đăng xuất khỏi trang Admin"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-full transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
