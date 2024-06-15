import { createClient } from "@supabase/supabase-js";
import { Nullable } from "typescript-nullable";

const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3cXRna3BtamFibXNkbnNjZHp2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4MzkyNTc4NiwiZXhwIjoxOTk5NTAxNzg2fQ.hXMkLVvY_XrRpsmM9KNnUzb28waGlF8jGUMlfD5B0eE';
const supabaseUrl = 'https://swqtgkpmjabmsdnscdzv.supabase.co';

export const supabaseServiceClient = createClient(
  Nullable.withDefault("", supabaseUrl),
  Nullable.withDefault("", supabaseServiceKey)
);
