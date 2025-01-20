// Topic: Connecting Supabase With Our React App
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://wyvaelfsxsywibczrymk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dmFlbGZzeHN5d2liY3pyeW1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwNDYyMTIsImV4cCI6MjA1MDYyMjIxMn0.lQxKBVFVPcK7bcwxQ07zOX5FL3_aAXeKHbDhaHcE9Ag";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
