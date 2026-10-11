import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Camera, Edit3, Trash2, ArrowUp, ArrowDown, Link, Upload, Check, X } from 'lucide-react';
import { useSiteData } from '../../lib/SiteDataContext';

// ==================== 1. INLINE TEXT EDITOR ====================
interface InlineTextProps {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  multiline?: boolean;
  placeholder?: string;
}

export const InlineText: React.FC<InlineTextProps> = ({
  value,
  onChange,
  className = '',
  as: Component = 'span',
  multiline = false,
  placeholder = 'Nhấp để sửa...',
}) => {
  const { isEditMode } = useSiteData();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      if (inputRef.current instanceof HTMLInputElement || inputRef.current instanceof HTMLTextAreaElement) {
        inputRef.current.selectionStart = inputRef.current.value.length;
      }
    }
  }, [isEditing]);

  if (!isEditMode) {
    return <Component className={className}>{value || placeholder}</Component>;
  }

  const handleBlur = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onChange(tempValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleBlur();
    } else if (e.key === 'Escape') {
      setTempValue(value);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return multiline ? (
      <textarea
        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-slate-900/95 text-white border-2 border-cyan-400 rounded-lg p-2 focus:outline-none shadow-xl z-30 transition-all ${className}`}
        rows={4}
      />
    ) : (
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={tempValue}
        onChange={(e) => setTempValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`w-full bg-slate-900/95 text-white border-2 border-cyan-400 rounded-md px-2 py-0.5 focus:outline-none shadow-md z-30 transition-all ${className}`}
      />
    );
  }

  return (
    <Component
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      title="Click để chỉnh sửa nội dung"
      className={`relative group/inline cursor-pointer transition-all duration-200 outline-none hover:outline hover:outline-2 hover:outline-dashed hover:outline-cyan-400 hover:outline-offset-2 rounded px-0.5 ${className}`}
    >
      {value || <span className="text-slate-500 italic">{placeholder}</span>}
      <span className="opacity-0 group-hover/inline:opacity-100 transition-opacity absolute -top-3 -right-3 bg-cyan-500 text-slate-950 p-1 rounded-full text-[10px] shadow-md z-20 pointer-events-none">
        <Edit3 className="w-2.5 h-2.5" />
      </span>
    </Component>
  );
};

// ==================== 2. INLINE IMAGE EDITOR (PORTAL MODAL) ====================
interface InlineImageProps {
  src: string;
  alt: string;
  onChange: (newSrc: string) => void;
  className?: string;
  buttonText?: string;
}

export const InlineImage: React.FC<InlineImageProps> = ({
  src,
  alt,
  onChange,
  className = '',
  buttonText = 'Thay đổi ảnh',
}) => {
  const { isEditMode, uploadImage } = useSiteData();
  const [modalOpen, setModalOpen] = useState(false);
  const [urlInput, setUrlInput] = useState(src);
  const [uploading, setUploading] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewSrc(src);
    setUrlInput(src);
    setHasError(false);
  }, [src]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadedUrl = await uploadImage(file);
    setUploading(false);

    if (uploadedUrl) {
      setPreviewSrc(uploadedUrl);
      setUrlInput(uploadedUrl);
      setHasError(false);
    }
  };

  const handleSaveImage = () => {
    onChange(urlInput);
    setHasError(false);
    setModalOpen(false);
  };

  const isFbExpired = (previewSrc || src || '').includes('fbcdn.net');

  // Fallback visual when image fails to load
  const renderFallback = () => (
    <div className={`relative flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/40 border border-white/10 text-center p-4 ${className.includes('h-full') ? 'h-full' : 'min-h-[160px]'} ${className.includes('w-full') ? 'w-full' : ''}`}>
      <Camera className="w-8 h-8 text-cyan-400/60 mb-2" />
      <span className="text-xs font-semibold text-slate-300 font-display line-clamp-1">{alt || 'Yến Sam Portfolio'}</span>
      <span className="text-[10px] text-cyan-400/80 font-mono mt-0.5">Visual Showcase</span>
    </div>
  );

  const modalContent = modalOpen ? (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) setModalOpen(false);
      }}
    >
      <div className="bg-slate-900 border border-white/20 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5 text-left text-slate-100 relative z-[100000]">
        <button
          type="button"
          onClick={() => setModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Camera className="w-5 h-5 text-cyan-400" />
            Cập nhật Hình ảnh
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Chọn file từ thiết bị để lưu trữ vĩnh viễn trên Supabase Storage.
          </p>
        </div>

        {/* Informative Guidance Banner */}
        <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-200 leading-relaxed">
          💡 <strong>Mẹo lưu ảnh vĩnh viễn:</strong> Hãy dùng tùy chọn <strong>"1. Tải ảnh từ thiết bị"</strong> để lưu trực tiếp vào Supabase Storage. Link ảnh từ Facebook sẽ tự hết hạn sau 2 tuần.
        </div>

        {/* Preview Box */}
        <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center relative">
          {urlInput && !hasError ? (
            <img 
              src={urlInput} 
              alt="Preview" 
              onError={() => setHasError(true)}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4">
              <Camera className="w-8 h-8 text-cyan-400/50 mb-2" />
              <span className="text-xs text-slate-400">{hasError ? 'Ảnh link cũ đã hết hạn (403)' : 'Chưa có hình ảnh'}</span>
            </div>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-xs flex items-center justify-center text-cyan-400 text-xs font-semibold">
              Đang tải ảnh lên Supabase Storage...
            </div>
          )}
        </div>

        {/* Upload or Link options */}
        <div className="space-y-4">
          {/* File Upload Button */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
              1. TẢI ẢNH TỪ THIẾT BỊ / MÁY TÍNH (KHUYÊN DÙNG - LƯU VĨNH VIỄN)
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-xs font-bold text-slate-950 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Upload className="w-4 h-4 text-slate-950" />
              <span>{uploading ? 'Đang xử lý tải lên Supabase...' : 'Chọn file ảnh từ máy tính (Upload Supabase)...'}</span>
            </button>
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5 font-mono">
              2. HOẶC DÁN ĐƯỜNG DẪN ẢNH (IMAGE URL)
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Link className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setPreviewSrc(e.target.value);
                    setHasError(false);
                  }}
                  placeholder="https://your-domain.com/image.jpg"
                  className="w-full bg-slate-950 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={handleSaveImage}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Xác nhận ảnh</span>
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if (!isEditMode) {
    if (hasError || !src) {
      return renderFallback();
    }
    return (
      <img 
        src={src} 
        alt={alt} 
        onError={() => setHasError(true)} 
        className={className} 
      />
    );
  }

  // If in Edit Mode and image has error / expired link
  if (hasError) {
    return (
      <div 
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true);
        }}
        className={`relative flex flex-col items-center justify-center bg-slate-950/95 border-2 border-dashed border-amber-500/50 hover:border-cyan-400 text-center p-4 cursor-pointer group/err transition-all ${className.includes('h-full') ? 'h-full' : 'min-h-[160px]'} ${className.includes('w-full') ? 'w-full' : ''}`}
      >
        <Camera className="w-7 h-7 text-amber-400 mb-2 group-hover/err:scale-110 transition-transform" />
        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full mb-2">
          {isFbExpired ? '⚠️ Ảnh Facebook đã hết hạn (403)' : '⚠️ Ảnh chưa tải được'}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
          className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Tải ảnh mới lên Supabase</span>
        </button>
        {modalOpen && createPortal(modalContent, document.body)}
      </div>
    );
  }

  return (
    <div className={`relative group/image overflow-hidden ${className.includes('h-full') ? 'h-full' : ''} ${className.includes('w-full') ? 'w-full' : ''}`}>
      <img 
        src={previewSrc || src} 
        alt={alt} 
        onError={() => setHasError(true)}
        className={className} 
      />
      
      {/* Overlay Hover Edit Button */}
      <div 
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true);
        }}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover/image:opacity-100 transition-all duration-300 flex items-center justify-center z-20 p-2 border-2 border-dashed border-cyan-400 rounded-lg cursor-pointer"
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setModalOpen(true);
          }}
          className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-2xl flex items-center gap-2 transform group-hover/image:scale-105 transition-all cursor-pointer pointer-events-auto"
        >
          <Camera className="w-4 h-4" />
          <span>{buttonText}</span>
        </button>
      </div>

      {modalOpen && createPortal(modalContent, document.body)}
    </div>
  );
};

// ==================== 3. ITEM CONTROL ACTION BAR ====================
interface ItemControlsProps {
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  canMoveUp?: boolean;
  canMoveDown?: boolean;
  itemTitle?: string;
}

export const ItemControls: React.FC<ItemControlsProps> = ({
  onMoveUp,
  onMoveDown,
  onEdit,
  onDelete,
  canMoveUp = true,
  canMoveDown = true,
  itemTitle = 'thẻ',
}) => {
  const { isEditMode } = useSiteData();

  if (!isEditMode) return null;

  return (
    <div className="absolute top-2 right-2 z-50 flex items-center gap-1 bg-slate-950/90 border border-cyan-500/40 rounded-xl p-1 shadow-xl backdrop-blur-md transition-opacity">
      {onMoveUp && canMoveUp && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onMoveUp(); }}
          title="Di chuyển lên trước"
          className="p-1.5 text-slate-300 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      )}
      {onMoveDown && canMoveDown && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onMoveDown(); }}
          title="Di chuyển xuống dưới"
          className="p-1.5 text-slate-300 hover:text-cyan-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      )}
      {onEdit && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          title={`Sửa ${itemTitle}`}
          className="p-1.5 text-slate-300 hover:text-amber-300 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      )}
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Bạn có chắc muốn xóa ${itemTitle} này?`)) {
              onDelete();
            }
          }}
          title={`Xóa ${itemTitle}`}
          className="p-1.5 text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 rounded-lg transition-colors cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
