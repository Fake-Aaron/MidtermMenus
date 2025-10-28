//for zustand x supabase
import { create } from "zustand";
import { supabase } from "./supabase";

interface MenuItem {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  image_url?: string;
}

interface MenuState {
  menu: MenuItem[];
  fetchMenu: () => Promise<void>;
  addMenuItem: (item: Omit<MenuItem, "id">) => Promise<void>;
  updateMenuItem: (id: number, item: Partial<MenuItem>) => Promise<void>;
  deleteMenuItem: (id: number) => Promise<void>;
}

export const useMenuStore = create<MenuState>((set, get) => ({
  menu: [],

  fetchMenu: async () => {
    const { data, error } = await supabase.from("Menu").select("*");
    if (error) console.error(error);
    else set({ menu: data || [] });
  },

  addMenuItem: async (item) => {
    const { data, error } = await supabase.from("Menu").insert(item).select();
    if (error) console.error(error);
    else set({ menu: [...get().menu, ...(data || [])] });
  },

  updateMenuItem: async (id, item) => {
    const { error } = await supabase.from("Menu").update(item).eq("id", id);
    if (error) console.error(error);
    else get().fetchMenu();
  },

  deleteMenuItem: async (id) => {
    const { error } = await supabase.from("Menu").delete().eq("id", id);
    if (error) console.error(error);
    else set({ menu: get().menu.filter((m) => m.id !== id) });
  },
}));
