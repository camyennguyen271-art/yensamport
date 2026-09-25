import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

/**
 * Official TikTok Brand Icon with distinctive chromatic aberration (cyan/magenta offset)
 */
export const TikTokIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="TikTok">
    <path
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.08a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.05-.51z"
      fill="#00f2fe"
      transform="translate(-0.6, -0.5)"
      opacity="0.85"
    />
    <path
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.08a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.05-.51z"
      fill="#fe2c55"
      transform="translate(0.6, 0.5)"
      opacity="0.85"
    />
    <path
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.41a6.33 6.33 0 0 0-.85-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.08a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.05-.51z"
      fill="#ffffff"
    />
  </svg>
);

/**
 * Official Facebook Brand Icon
 */
export const FacebookIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Facebook">
    <circle cx="12" cy="12" r="12" fill="#1877F2" />
    <path
      d="M15.5 12.05h-2.35v7.95h-3.3v-7.95H7.7v-2.8h2.15V7.4c0-2.12 1.3-3.4 3.3-3.4 1 0 1.9.08 2.1.1v2.45h-1.45c-1.02 0-1.22.48-1.22 1.2v1.5h2.7l-.38 2.8z"
      fill="#ffffff"
    />
  </svg>
);

/**
 * Official Zalo Brand Icon with stylized bubble badge
 */
export const ZaloIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-label="Zalo">
    <rect width="32" height="32" rx="7" fill="#0068FF" />
    <text
      x="16"
      y="21"
      textAnchor="middle"
      fill="#ffffff"
      fontSize="13"
      fontWeight="900"
      fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
      letterSpacing="-0.5px"
    >
      Zalo
    </text>
  </svg>
);

/**
 * Official Instagram Brand Icon with rich multi-stop gradient
 */
export const InstagramIcon: React.FC<IconProps> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Instagram">
    <defs>
      <linearGradient id="ig-gradient-icon" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#4f5bd5" />
        <stop offset="30%" stopColor="#962fbf" />
        <stop offset="60%" stopColor="#d62976" />
        <stop offset="85%" stopColor="#fa7e1e" />
        <stop offset="100%" stopColor="#feda75" />
      </linearGradient>
    </defs>
    <rect width="20" height="20" x="2" y="2" rx="5.5" stroke="url(#ig-gradient-icon)" strokeWidth="2.2" />
    <circle cx="12" cy="12" r="4.2" stroke="url(#ig-gradient-icon)" strokeWidth="2.2" />
    <circle cx="17.2" cy="6.8" r="1.3" fill="url(#ig-gradient-icon)" />
  </svg>
);
