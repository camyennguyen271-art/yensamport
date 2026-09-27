import React, { useState } from 'react';
import { Plus, Trash2, Camera, X, ChevronLeft, ChevronRight, Layers, Image as ImageIcon, Sparkles, Upload, Link as LinkIcon, Check } from 'lucide-react';
import { useI18n } from '../lib/i18n';
import { useSiteData } from '../lib/SiteDataContext';
import { InlineText, InlineImage } from './admin/InlineEditHelpers';
import { GalleryAlbum, GalleryImage } from '../data/mockSiteData';

export const GallerySection: React.FC = () => {
  const { language, t } = useI18n();
  const isVi = language === 'vi';
  const { 
    data, 
    isEditMode, 
    updateGalleryAlbum, 
    addGalleryAlbum, 
    deleteGalleryAlbum, 
    addImageToAlbum, 
    updateImageInAlbum, 
    deleteImageFromAlbum,
    uploadImage
  } = useSiteData();

  const albums = data.galleryAlbums || [];
  const [activeAlbumId, setActiveAlbumId] = useState<string>(albums[0]?.id || 'album-led-stage-1');
  
  // Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Add Photo Modal State
  const [showAddImageModal, setShowAddImageModal] = useState<boolean>(false);
  const [newImgUrl, setNewImgUrl] = useState<string>('');
  const [newImgTitle, setNewImgTitle] = useState<string>('');
  const [newImgCaption, setNewImgCaption] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const activeAlbum = albums.find(a => a.id === activeAlbumId) || albums[0];

  const handleCreateAlbum = () => {
    const newId = `album_${Date.now()}`;
    const newAlbum: GalleryAlbum = {
      id: newId,
      titleVi: 'Album Visual LED Mới',
      titleEn: 'New Visual LED Album',
      categoryVi: 'Visual LED & Sân Khấu',
      categoryEn: 'Visual LED & Stage',
      descriptionVi: 'Mô tả album visual LED và hiệu ứng trình chiếu...',
      descriptionEn: 'Short description of this visual LED showcase album...',
      coverImage: '/src/assets/images/project_mv_showcase_1790314359425.jpg',
      images: [
        {
          id: `img_${Date.now()}_1`,
          url: '/src/assets/images/project_mv_showcase_1790314359425.jpg',
          title: 'Visual LED Showcase 1',
          caption: 'Hiệu ứng trình chiếu sân khấu 3D'
        }
      ]
    };
    addGalleryAlbum(newAlbum);
    setActiveAlbumId(newId);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadedUrl = await uploadImage(file);
    setUploading(false);

    if (uploadedUrl) {
      setNewImgUrl(uploadedUrl);
    }
  };

  const handleConfirmAddImage = () => {
    if (!newImgUrl.trim() || !activeAlbum) return;
    const newImg: GalleryImage = {
      id: `img_${Date.now()}`,
      url: newImgUrl.trim(),
      title: newImgTitle.trim() || 'Visual LED Photo',
      caption: newImgCaption.trim() || 'Thiết kế Visual LED sân khấu'
    };
    addImageToAlbum(activeAlbum.id, newImg);
    setNewImgUrl('');
    setNewImgTitle('');
    setNewImgCaption('');
    setShowAddImageModal(false);
  };

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-10">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            {isVi ? '04 / THƯ VIỆN VISUAL LED & SÂN KHẤU' : '04 / VISUAL LED & STAGE GALLERY'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display tracking-tight mt-1">
            Visual LED Portfolio
          </h2>
        </div>

        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {isEditMode && (
            <button
              type="button"
              onClick={handleCreateAlbum}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{isVi ? 'Thêm Album Mới' : 'Add New Album'}</span>
            </button>
          )}
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            {albums.length} {isVi ? 'Album Visual LED' : 'Visual Albums'}
          </p>
        </div>
      </div>

      {/* Album Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {albums.map((album) => {
          const isActive = album.id === activeAlbumId;
          const albumTitle = isVi ? album.titleVi : album.titleEn;
          const imgCount = (album.images || []).length;

          return (
            <div key={album.id} className="relative group/tab shrink-0">
              <button
                type="button"
                onClick={() => setActiveAlbumId(album.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold flex items-center gap-2.5 transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]'
                    : 'bg-slate-900/70 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <Layers className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>
                  <InlineText
                    value={albumTitle}
                    onChange={(val) => updateGalleryAlbum(album.id, isVi ? { titleVi: val } : { titleEn: val })}
                  />
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-slate-300">
                  {imgCount}
                </span>
              </button>

              {/* Delete album button in Edit Mode */}
              {isEditMode && albums.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Bạn có chắc chắn muốn xóa Album "${albumTitle}"?`)) {
                      deleteGalleryAlbum(album.id);
                      if (activeAlbumId === album.id) {
                        const remaining = albums.filter(a => a.id !== album.id);
                        if (remaining.length > 0) setActiveAlbumId(remaining[0].id);
                      }
                    }
                  }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover/tab:opacity-100 transition-opacity shadow-lg z-20 cursor-pointer"
                  title="Xóa album này"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Active Album Description Header */}
      {activeAlbum && (
        <div className="glass-card rounded-2xl p-5 mb-8 border border-white/10 bg-slate-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              <InlineText
                value={isVi ? activeAlbum.categoryVi : activeAlbum.categoryEn}
                onChange={(val) => updateGalleryAlbum(activeAlbum.id, isVi ? { categoryVi: val } : { categoryEn: val })}
              />
            </span>
            <span className="text-xs font-mono text-slate-400">
              {(activeAlbum.images || []).length} {isVi ? 'hình ảnh trình chiếu' : 'showcase items'}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
            <InlineText
              value={isVi ? activeAlbum.titleVi : activeAlbum.titleEn}
              onChange={(val) => updateGalleryAlbum(activeAlbum.id, isVi ? { titleVi: val } : { titleEn: val })}
            />
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <InlineText
              value={isVi ? (activeAlbum.descriptionVi || '') : (activeAlbum.descriptionEn || '')}
              onChange={(val) => updateGalleryAlbum(activeAlbum.id, isVi ? { descriptionVi: val } : { descriptionEn: val })}
              multiline={true}
              placeholder="Nhập mô tả album visual LED..."
            />
          </p>
        </div>
      )}

      {/* Visual LED Images Grid */}
      {activeAlbum && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeAlbum.images || []).map((img, idx) => (
            <div
              key={img.id}
              className="group relative glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(6,182,212,0.2)] flex flex-col justify-between"
            >
              {/* Image Box */}
              <div 
                className="relative aspect-video w-full overflow-hidden bg-slate-950 cursor-pointer"
                onClick={() => !isEditMode && setLightboxIndex(idx)}
              >
                <InlineImage
                  src={img.url}
                  alt={img.title || 'Visual LED photo'}
                  onChange={(newUrl) => updateImageInAlbum(activeAlbum.id, img.id, { url: newUrl })}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  buttonText="Sửa ảnh"
                />

                {/* Delete Photo Button in Edit Mode */}
                {isEditMode && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Bạn có chắc muốn xóa ảnh này khỏi album?')) {
                        deleteImageFromAlbum(activeAlbum.id, img.id);
                      }
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded-xl bg-rose-500/90 hover:bg-rose-600 text-white shadow-xl z-30 transition-all cursor-pointer opacity-0 group-hover:opacity-100"
                    title="Xóa ảnh này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}

                {!isEditMode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-xs text-cyan-300 font-mono flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" /> Click để xem phóng to
                    </span>
                  </div>
                )}
              </div>

              {/* Photo Title & Caption */}
              <div className="p-4 bg-slate-900/80 border-t border-white/5 space-y-1">
                <h4 className="text-sm font-bold text-white font-display">
                  <InlineText
                    value={img.title || ''}
                    onChange={(val) => updateImageInAlbum(activeAlbum.id, img.id, { title: val })}
                    placeholder="Tên ảnh / Visual LED..."
                  />
                </h4>
                <p className="text-xs text-slate-400">
                  <InlineText
                    value={img.caption || ''}
                    onChange={(val) => updateImageInAlbum(activeAlbum.id, img.id, { caption: val })}
                    placeholder="Mô tả bối cảnh visual..."
                  />
                </p>
              </div>
            </div>
          ))}

          {/* Add Image Button Card in Edit Mode */}
          {isEditMode && (
            <button
              type="button"
              onClick={() => setShowAddImageModal(true)}
              className="aspect-video w-full rounded-2xl border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-900/30 hover:bg-slate-900/60 transition-all flex flex-col items-center justify-center p-6 text-center group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 transition-colors">
                <Plus className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-cyan-300 group-hover:text-cyan-200">
                + Thêm Ảnh vào Album
              </span>
              <span className="text-[11px] text-slate-400 mt-1 font-mono">
                Tải ảnh từ máy tính hoặc dán URL
              </span>
            </button>
          )}
        </div>
      )}

      {/* Modal Add Image to Album */}
      {showAddImageModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5 text-left text-slate-100 relative">
            <button
              type="button"
              onClick={() => setShowAddImageModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
                <Camera className="w-5 h-5 text-cyan-400" />
                Thêm Ảnh vào Album "{isVi ? activeAlbum?.titleVi : activeAlbum?.titleEn}"
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tải ảnh mới từ thiết bị hoặc dán URL hình ảnh thiết kế Visual LED.
              </p>
            </div>

            {/* Preview Box */}
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center relative">
              {newImgUrl ? (
                <img src={newImgUrl} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-xs text-slate-500 font-mono">Chưa có đường dẫn ảnh</span>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center text-cyan-400 text-xs font-semibold">
                  Đang xử lý tải ảnh lên...
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Option 1: File Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                  1. TẢI ẢNH TỪ THIẾT BỊ / MÁY TÍNH
                </label>
                <label className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 border border-white/15 rounded-xl text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2 transition-all cursor-pointer">
                  <Upload className="w-4 h-4" />
                  <span>{uploading ? 'Đang tải...' : 'Chọn file ảnh từ thiết bị...'}</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </label>
              </div>

              {/* Option 2: Image URL */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
                  2. HOẶC DÁN ĐƯỜNG DẪN ẢNH (IMAGE URL)
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={newImgUrl}
                    onChange={(e) => setNewImgUrl(e.target.value)}
                    placeholder="https://example.com/visual-led-photo.jpg"
                    className="w-full bg-slate-950 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>

              {/* Title & Caption */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-mono">Tên ảnh Visual</label>
                  <input
                    type="text"
                    value={newImgTitle}
                    onChange={(e) => setNewImgTitle(e.target.value)}
                    placeholder="Masew Stage LED..."
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1 font-mono">Mô tả ngắn</label>
                  <input
                    type="text"
                    value={newImgCaption}
                    onChange={(e) => setNewImgCaption(e.target.value)}
                    placeholder="Visual lặp 3D..."
                    className="w-full bg-slate-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddImageModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmAddImage}
                disabled={!newImgUrl.trim()}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Xác nhận thêm ảnh</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Fullscreen Viewer */}
      {lightboxIndex !== null && activeAlbum && (
        <div 
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Header */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white z-20" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="text-xs font-mono text-cyan-400">
                {lightboxIndex + 1} / {(activeAlbum.images || []).length}
              </span>
              <h3 className="text-lg font-bold font-display">
                {activeAlbum.images[lightboxIndex]?.title || (isVi ? activeAlbum.titleVi : activeAlbum.titleEn)}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Center Image */}
          <div className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center my-auto" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeAlbum.images[lightboxIndex]?.url}
              alt={activeAlbum.images[lightboxIndex]?.title || 'Visual LED Photo'}
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl border border-white/10"
            />

            {/* Prev Button */}
            {lightboxIndex > 0 && (
              <button
                type="button"
                onClick={() => setLightboxIndex(prev => (prev !== null ? prev - 1 : 0))}
                className="absolute left-2 sm:left-4 p-3 rounded-full bg-black/60 hover:bg-cyan-500 text-white hover:text-slate-950 transition-all cursor-pointer shadow-2xl border border-white/10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* Next Button */}
            {lightboxIndex < (activeAlbum.images || []).length - 1 && (
              <button
                type="button"
                onClick={() => setLightboxIndex(prev => (prev !== null ? prev + 1 : 0))}
                className="absolute right-2 sm:right-4 p-3 rounded-full bg-black/60 hover:bg-cyan-500 text-white hover:text-slate-950 transition-all cursor-pointer shadow-2xl border border-white/10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Caption */}
          <div className="w-full max-w-3xl text-center z-20" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm text-slate-300 font-light">
              {activeAlbum.images[lightboxIndex]?.caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
