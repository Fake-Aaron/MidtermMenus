import { create } from "zustand";
import { supabase } from "../lib/supabase";


type User = {
  id: string;
  email?: string | null;
} | null;

type UserStore = {
  user: User;
  setUser: (user: User) => void;
  fetchUser: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const { data } = await supabase.auth.getUser();
    set({ user: data.user ? { id: data.user.id, email: data.user.email } : null });
  },
}));