import {createClient} from '@supabase/supabase-js';

const supabaseUrl =import.meta.env.VITE_SUPABASE_URL || "https://xukcbajpkolbflzlgpbh.supabase.co";
const supabaseKey =import.meta.env.VITE_SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1a2NiYWpwa29sYmZsemxncGJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyODg1ODksImV4cCI6MjA2Nzg2NDU4OX0.1RWwqbcKjeW996zdL8-gBURznJ4sqTGcGTDB1E9gWQI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;