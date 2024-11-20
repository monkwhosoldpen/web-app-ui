import { useContext } from 'react';
import { supabase } from 'app/providers/utils/supabaseClient';

export function useSupabase() {
  return { supabase };
} 