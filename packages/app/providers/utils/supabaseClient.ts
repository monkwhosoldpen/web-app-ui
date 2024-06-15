import { createClient } from "@supabase/supabase-js";
import { Nullable } from "typescript-nullable";

const supabaseUrl = 'https://swqtgkpmjabmsdnscdzv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cXRna3BtamFibXNkbnNjZHp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM5MjU3ODYsImV4cCI6MTk5OTUwMTc4Nn0.z2fKVrlyBS1Yo5WBsZvSXCXF1mG9Ii3WuNnpoIPDlFg';

export const supabase = createClient(
  Nullable.withDefault("", supabaseUrl),
  Nullable.withDefault("", supabaseAnonKey)
);

export const fromProfiles = () =>
  supabase.from<any["profiles"]>("profiles");
