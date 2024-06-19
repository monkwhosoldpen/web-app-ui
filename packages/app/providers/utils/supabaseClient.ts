import { createClient } from "@supabase/supabase-js";
import { Nullable } from "typescript-nullable";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(
  Nullable.withDefault("", supabaseUrl),
  Nullable.withDefault("", supabaseAnonKey)
);

export const fromProfiles = (): any =>
  supabase.from("profiles");
