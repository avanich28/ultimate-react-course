// Topic: Connecting Supabase With Our React App
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://sycmhowhjburigblhtbn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5Y21ob3doamJ1cmlnYmxodGJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA1NDk5NDEsImV4cCI6MjAxNjEyNTk0MX0.wBL5ztE9P43no_wetMVcwWfCpbVPXFCrfM8mEAJXZWs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
