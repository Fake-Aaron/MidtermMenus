import { supabase } from "./supabase";

export async function getMenus() {
  const { data, error } = await supabase.from("Menu").select("*");

  if (error) {
    console.error("Error fetching menus:", error);
    return [];
  }

  // Convert storage path to public URL
  const { data: files } = await supabase.storage.from("menu-images").list();

  const publicBaseUrl = "https://ujalzmyeryxdoqeggrvp.supabase.co/storage/v1/object/public/menu-images/";

  const menusWithUrl = data.map((item) => ({
    ...item,
    image_url: item.image_url
      ? item.image_url.startsWith("http")
        ? item.image_url
        : `${publicBaseUrl}${item.image_url}`
      : null,
  }));

  return menusWithUrl;
}
