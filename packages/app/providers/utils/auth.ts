import { supabase } from './supabaseClient';

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error.message);
}
