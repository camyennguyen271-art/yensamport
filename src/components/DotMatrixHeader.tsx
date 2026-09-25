import React, { useMemo, useState } from 'react';

// 5x7 dot matrix font definitions for characters
const CHAR_MAP: Record<string, number[][]> = {
  'M': [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  'E': [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  'D': [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  'I': [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  'A': [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  'S': [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  'P': [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  'C': [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
  ],
  'L': [
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  'T': [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  'R': [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
    [1, 0, 0, 0, 1],
  ],
  'O': [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  'V': [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
  ' ': [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]
};

interface DotMatrixHeaderProps {
  text?: string;
  className?: string;
}

export const DotMatrixHeader: React.FC<DotMatrixHeaderProps> = ({
  text = 'MEDIA SPECIALIST',
  className = '',
}) => {
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Compute characters and their dot matrices
  const words = useMemo(() => {
    return text.toUpperCase().split(' ');
  }, [text]);

  return (
    <div className={`w-full overflow-hidden select-none py-3 px-2 ${className}`}>
      <div 
        className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-10 gap-y-3 mx-auto"
        onMouseEnter={() => setHoveredWord('active')}
        onMouseLeave={() => setHoveredWord(null)}
      >
        {words.map((word, wordIndex) => (
          <div key={`word-${wordIndex}`} className="flex items-center gap-2 sm:gap-3.5">
            {word.split('').map((char, charIndex) => {
              const matrix = CHAR_MAP[char] || CHAR_MAP[' '];
              return (
                <div
                  key={`char-${charIndex}`}
                  className="flex flex-col gap-[3px] sm:gap-[4px] md:gap-[5px] group/char transition-transform duration-300 hover:scale-110"
                >
                  {matrix.map((row, rowIndex) => (
                    <div
                      key={`row-${rowIndex}`}
                      className="flex gap-[3px] sm:gap-[4px] md:gap-[5px]"
                    >
                      {row.map((dot, dotIndex) => (
                        <span
                          key={`dot-${dotIndex}`}
                          className={`w-[2.5px] h-[2.5px] sm:w-[3.5px] sm:h-[3.5px] md:w-[4.5px] md:h-[4.5px] lg:w-[5px] lg:h-[5px] rounded-full transition-all duration-300 ${
                            dot === 1
                              ? 'bg-slate-100 shadow-[0_0_6px_rgba(255,255,255,0.85)] group-hover/char:bg-cyan-300 group-hover/char:shadow-[0_0_10px_rgba(56,189,248,0.9)]'
                              : 'bg-white/[0.04]'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Subtext dot ticker hint */}
      <div className="flex items-center justify-center gap-2 mt-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-400 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
        <span>PORTFOLIO ARCHIVE · NGUYỄN THỊ CẨM YẾN</span>
      </div>
    </div>
  );
};
