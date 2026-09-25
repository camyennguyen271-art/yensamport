import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Sparkles } from 'lucide-react';
import { generateSingleHtmlString } from '../utils/exportSingleHtml';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const htmlCode = generateSingleHtmlString();

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'yen_sam_media_specialist_portfolio.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[88vh] flex flex-col glass-card rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-slate-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Standalone Single-File Production HTML
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Self-contained HTML with inline &lt;style&gt; and &lt;script&gt;
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Code Preview Pane */}
        <div className="flex-1 my-4 overflow-hidden rounded-xl bg-slate-900 border border-white/10 relative">
          <pre className="p-4 text-xs font-mono text-slate-300 h-64 sm:h-80 overflow-y-auto leading-relaxed select-all">
            {htmlCode}
          </pre>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <span className="text-xs text-slate-400 font-mono">
            {Math.round(htmlCode.length / 1024)} KB · Ready for zero-dependency hosting
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied HTML!' : 'Copy Code'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-xs font-bold text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download .html File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
