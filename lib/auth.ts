// lib/auth.ts
import { supabase } from "./supabase";

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error };
  return { user: data.user };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error };
  return { user: data.user };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error("Logout error:", error.message);
}
