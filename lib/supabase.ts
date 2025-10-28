import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ujalzmyeryxdoqeggrvp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqYWx6bXllcnl4ZG9xZWdncnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwMDg4MTUsImV4cCI6MjA3NjU4NDgxNX0.DPoDbeVe8ggzsL97-rMRaoLoOCfWQohCOJVPka7spSg";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

        