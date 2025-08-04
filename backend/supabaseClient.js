// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yyrqzxspabdkyvkzribe.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5cnF6eHNwYWJka3l2a3pyaWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyODQ4NzMsImV4cCI6MjA2OTg2MDg3M30.J7918M_1ky8L3Hffb7MPnvEhKSETOFA2USZXgDk2tK0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
