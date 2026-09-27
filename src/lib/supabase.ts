import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://umcffywhiiwznyxsmpnr.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtY2ZmeXdoaWl3em55eHNtcG5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAyMzU2NjEsImV4cCI6MjEwNTgxMTY2MX0.FByX1hAFp-XIjBZycVIYv1F0sg2ZvxnVjciF89GDvBs';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL as string || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string || '').trim();

// Ensure key starts with valid Supabase JWT prefix 'eyJ' and has sufficient length
const supabaseUrl = (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) ? rawUrl : DEFAULT_SUPABASE_URL;
const supabaseAnonKey = (rawKey.startsWith('eyJ') && rawKey.length > 50) ? rawKey : DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// === TYPE DEFINITIONS ===

export interface ContactMessage {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

// === CONTACT MESSAGES ===

/**
 * Lưu tin nhắn liên hệ vào bảng contact_messages
 */
export async function saveContactMessage(data: Omit<ContactMessage, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('contact_messages')
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result as ContactMessage;
}

/**
 * Lấy danh sách tin nhắn liên hệ (dành cho admin)
 */
export async function getContactMessages() {
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as ContactMessage[];
}
