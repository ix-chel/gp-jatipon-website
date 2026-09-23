import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

// Provide fallback values so the app can at least render the UI (for visual QA).
export const supabase = createClient(
  supabaseUrl || 'https://yqfgobeakfzcqlndhlhk.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZmdvYmVha2Z6Y3FsbmRobGhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5OTI4NzYsImV4cCI6MjEwNTU2ODg3Nn0.Lzd7_X0V8m_vn84J0Eoc5C1MjhwN5c7Rjt0kgSOsINQ'
);
