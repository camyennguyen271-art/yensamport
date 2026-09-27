import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';
import { DEFAULT_SITE_DATA, FullSiteData, HeroData, AboutData, ExperienceItemData, ProjectItemData, SkillGroupData, ContactData, SocialLinkItem } from '../data/mockSiteData';

const LOCAL_STORAGE_KEY = 'yensam_site_data_v1';

interface SiteDataContextType {
  data: FullSiteData;
  savedData: FullSiteData;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isDirty: boolean;
  isLoading: boolean;
  isSaving: boolean;
  saveMessage: string | null;
  // Updates
  updateHero: (fields: Partial<HeroData>) => void;
  updateAbout: (fields: Partial<AboutData>) => void;
  updateExperienceItem: (id: string, updated: Partial<ExperienceItemData>) => void;
  addExperienceItem: (newItem: ExperienceItemData) => void;
  deleteExperienceItem: (id: string) => void;
  reorderExperiences: (startIndex: number, endIndex: number) => void;
  updateProjectItem: (id: string, updated: Partial<ProjectItemData>) => void;
  addProjectItem: (newItem: ProjectItemData) => void;
  deleteProjectItem: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  updateSkillItem: (id: string, updated: Partial<SkillGroupData>) => void;
  addSkillItem: (newItem: SkillGroupData) => void;
  deleteSkillItem: (id: string) => void;
  updateContact: (fields: Partial<ContactData>) => void;
  updateSocialLink: (id: string, updated: Partial<SocialLinkItem>) => void;
  addSocialLink: (newLink: SocialLinkItem) => void;
  deleteSocialLink: (id: string) => void;

  // Global Actions
  saveChanges: () => Promise<boolean>;
  discardChanges: () => void;
  uploadImage: (file: File) => Promise<string | null>;
  resetToDefault: () => void;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FullSiteData>(() => {
    try {
      const local = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (local) {
        return JSON.parse(local);
      }
    } catch (e) {
      console.error('Failed to load local storage site data', e);
    }
    return DEFAULT_SITE_DATA;
  });

  const [savedData, setSavedData] = useState<FullSiteData>(data);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Check if dirty
  const isDirty = JSON.stringify(data) !== JSON.stringify(savedData);

  // Load from Supabase on mount
  useEffect(() => {
    const loadFromSupabase = async () => {
      setIsLoading(true);
      try {
        let { data: result, error } = await supabase
          .from('site_content')
          .select('content_json')
          .eq('section_name', 'full_site')
          .maybeSingle();

        if (!result || !result.content_json) {
          const fallback = await supabase
            .from('site_content')
            .select('content_json')
            .limit(1)
            .maybeSingle();
          if (fallback.data) {
            result = fallback.data;
            error = null;
          }
        }

        if (!error && result && result.content_json) {
          const loaded = { ...DEFAULT_SITE_DATA, ...(result.content_json as FullSiteData) };
          setData(loaded);
          setSavedData(loaded);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loaded));
        } else {
          setSavedData(data);
        }
      } catch (err) {
        console.warn('Supabase fetch failed or table missing, using cached/default data', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadFromSupabase();
  }, []);

  // Update Hero
  const updateHero = (fields: Partial<HeroData>) => {
    setData(prev => ({
      ...prev,
      hero: { ...prev.hero, ...fields }
    }));
  };

  // Update About
  const updateAbout = (fields: Partial<AboutData>) => {
    setData(prev => ({
      ...prev,
      about: { ...prev.about, ...fields }
    }));
  };

  // Update Experience Item
  const updateExperienceItem = (id: string, updated: Partial<ExperienceItemData>) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(item => item.id === id ? { ...item, ...updated } : item)
    }));
  };

  const addExperienceItem = (newItem: ExperienceItemData) => {
    setData(prev => ({
      ...prev,
      experiences: [newItem, ...prev.experiences]
    }));
  };

  const deleteExperienceItem = (id: string) => {
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(item => item.id !== id)
    }));
  };

  const reorderExperiences = (startIndex: number, endIndex: number) => {
    setData(prev => {
      const list = [...prev.experiences];
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);
      return { ...prev, experiences: list };
    });
  };

  // Update Project Item
  const updateProjectItem = (id: string, updated: Partial<ProjectItemData>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(item => item.id === id ? { ...item, ...updated } : item)
    }));
  };

  const addProjectItem = (newItem: ProjectItemData) => {
    setData(prev => ({
      ...prev,
      projects: [newItem, ...prev.projects]
    }));
  };

  const deleteProjectItem = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(item => item.id !== id)
    }));
  };

  const reorderProjects = (startIndex: number, endIndex: number) => {
    setData(prev => {
      const list = [...prev.projects];
      const [removed] = list.splice(startIndex, 1);
      list.splice(endIndex, 0, removed);
      return { ...prev, projects: list };
    });
  };

  // Update Skill Item
  const updateSkillItem = (id: string, updated: Partial<SkillGroupData>) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(item => item.id === id ? { ...item, ...updated } : item)
    }));
  };

  const addSkillItem = (newItem: SkillGroupData) => {
    setData(prev => ({
      ...prev,
      skills: [...prev.skills, newItem]
    }));
  };

  const deleteSkillItem = (id: string) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter(item => item.id !== id)
    }));
  };

  // Update Contact
  const updateContact = (fields: Partial<ContactData>) => {
    setData(prev => ({
      ...prev,
      contact: { ...prev.contact, ...fields }
    }));
  };

  const updateSocialLink = (id: string, updated: Partial<SocialLinkItem>) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: (prev.contact.socialLinks || []).map(link => link.id === id ? { ...link, ...updated } : link)
      }
    }));
  };

  const addSocialLink = (newLink: SocialLinkItem) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: [...(prev.contact.socialLinks || []), newLink]
      }
    }));
  };

  const deleteSocialLink = (id: string) => {
    setData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: (prev.contact.socialLinks || []).filter(link => link.id !== id)
      }
    }));
  };

  // Save changes to Supabase & LocalStorage
  const saveChanges = async (): Promise<boolean> => {
    setIsSaving(true);
    setSaveMessage('Đang lưu thay đổi...');
    try {
      // Save locally
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

      // Save to Supabase site_content table
      const payload = {
        id: 1,
        section_name: 'full_site',
        content_json: data,
        updated_at: new Date().toISOString()
      };

      let { error } = await supabase
        .from('site_content')
        .upsert(payload, { onConflict: 'id' });

      // Fallback if onConflict id fails
      if (error) {
        const retry = await supabase
          .from('site_content')
          .upsert(payload);
        error = retry.error;
      }

      if (error) {
        console.warn('Supabase upsert returned error:', error);
        if (error.code === '42501') {
          setSaveMessage('⚠️ Lỗi Supabase RLS Policy (42501). Cần chạy SQL cấp quyền ghi cho anon role.');
        } else {
          setSaveMessage(`⚠️ Lỗi lưu Supabase: ${error.message}`);
        }
      } else {
        setSaveMessage('✅ Đã lưu thành công lên Server & Supabase!');
      }

      setSavedData(data);
      setTimeout(() => setSaveMessage(null), 5000);
      return !error;
    } catch (err: any) {
      console.error('Save failed', err);
      setSaveMessage('Đã lưu local. Lỗi Supabase: ' + (err.message || 'Error'));
      setSavedData(data);
      setTimeout(() => setSaveMessage(null), 5000);
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  // Discard changes
  const discardChanges = () => {
    setData(savedData);
  };

  // Reset to initial default
  const resetToDefault = () => {
    if (confirm('Bạn có chắc chắn muốn khôi phục dữ liệu về mặc định ban đầu?')) {
      setData(DEFAULT_SITE_DATA);
    }
  };

  // Upload image handler
  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage bucket 'images'
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.warn('Supabase storage upload error, fallback to Base64:', uploadError.message);
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      }

      const { data: publicUrlData } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Error uploading image', err);
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        data,
        savedData,
        isEditMode,
        setIsEditMode,
        isDirty,
        isLoading,
        isSaving,
        saveMessage,
        updateHero,
        updateAbout,
        updateExperienceItem,
        addExperienceItem,
        deleteExperienceItem,
        reorderExperiences,
        updateProjectItem,
        addProjectItem,
        deleteProjectItem,
        reorderProjects,
        updateSkillItem,
        addSkillItem,
        deleteSkillItem,
        updateContact,
        updateSocialLink,
        addSocialLink,
        deleteSocialLink,
        saveChanges,
        discardChanges,
        uploadImage,
        resetToDefault,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
