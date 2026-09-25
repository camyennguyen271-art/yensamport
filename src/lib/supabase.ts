import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are missing. Check .env.local');
}

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
