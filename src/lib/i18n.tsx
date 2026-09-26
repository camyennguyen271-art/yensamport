import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from './supabase';

interface TranslationMap {
  [key: string]: { vi: string; en: string };
}

interface I18nContextProps {
  language: 'vi' | 'en';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

// Default translations (fallback) for core UI strings
const DEFAULT_TRANSLATIONS: TranslationMap = {
  'nav.about': { vi: 'Giới thiệu', en: 'About' },
  'nav.experience': { vi: 'Kinh nghiệm', en: 'Experience' },
  'nav.projects': { vi: 'Dự án', en: 'Projects' },
  'nav.skills': { vi: 'Kỹ năng', en: 'Skills' },
  'nav.contact': { vi: 'Liên hệ', en: 'Contact' },
  'header.title': { vi: 'YẾN SAM', en: 'YEN SAM' },
  'hero.cta': { vi: 'Liên hệ & Cộng tác', en: 'Contact & Collaborate' },
  'hero.viewWork': { vi: 'Xem Kinh Nghiệm', en: 'View Work Experience' },
  'hero.viewProjects': { vi: 'Khám Phá Dự Án', en: 'Explore Key Projects' },
  'hero.scrollToExplore': { vi: 'Cuộn để khám phá', en: 'Scroll to Explore' },
  'hero.emailCopied': { vi: 'Đã sao chép Email!', en: 'Email Copied!' },
  'about.title': { vi: 'Giới Thiệu', en: 'About Me' },
  'experience.title': { vi: 'Kinh Nghiệm', en: 'Experience' },
  'projects.title': { vi: 'Dự Án Nổi Bật', en: 'Featured Projects' },
  'projects.viewAll': { vi: 'Xem tất cả', en: 'View All' },
  'skills.title': { vi: 'Kỹ Năng', en: 'Skills' },
  'contact.title': { vi: 'Liên Hệ', en: 'Contact' },
  'contact.subtitle': { vi: 'Kết nối với tôi', en: 'Get in touch' },
  'footer.copyright': { vi: '© 2024 Yến Sam. Tất cả quyền được bảo lưu.', en: '© 2024 Yen Sam. All rights reserved.' },
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'vi' | 'en'>(
    (localStorage.getItem('lang') as 'vi' | 'en') || 'vi'
  );
  const [translations, setTranslations] = useState<TranslationMap>(DEFAULT_TRANSLATIONS);

  const toggleLanguage = () => {
    const newLang = language === 'vi' ? 'en' : 'vi';
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  useEffect(() => {
    const fetchTranslations = async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('content_json')
        .eq('section_name', 'i18n')
        .single();
      if (!error && data && data.content_json) {
        setTranslations({ ...DEFAULT_TRANSLATIONS, ...(data.content_json as TranslationMap) });
      }
    };
    fetchTranslations();
  }, []);

  const t = (key: string) => {
    const entry = translations[key];
    if (entry) return entry[language] || entry['vi'];
    // fallback to key if missing
    return key;
  };

  return (
    <I18nContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
