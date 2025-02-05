import { create } from "zustand";
import { supabase } from "../SupClient";

export const useCart = create((set, get) => ({
  cart: [],

  fetchcart: async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("cart")
      .select("*, barang(foto_barang)")
      .eq("id_user", userId);

    if (!error) {
      set({ cart: data });
    } else {
      console.error("Fetch error:", error);
    }
  },

  addtocart: async (item) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) return;

    const { cart } = get();
    const existingitem = cart.find((i) => i.id_produk === item.id_produk);

    if (existingitem) {
      const updateditem = {
        ...existingitem,
        jumlah: existingitem.jumlah + 1,
        harga: (existingitem.jumlah + 1) * item.harga,
      };

      const { error } = await supabase
        .from("cart")
        .update({ jumlah: updateditem.jumlah, harga: updateditem.harga })
        .eq("id", existingitem.id)
        .eq("id_user", userId);

      if (!error) {
        set((state) => ({
          cart: state.cart.map((cartitem) =>
            cartitem.id === existingitem.id ? updateditem : cartitem
          ),
        }));
      } else {
        console.error("Update error:", error);
      }
    } else {
      const newitem = {
        ...item,
        jumlah: 1,
        harga: item.harga,
        id_user: userId,
      };

      const { data, error } = await supabase.from("cart").insert([newitem]);
      if (!error && data) {
        set((state) => ({ cart: [...state.cart, data[0]] }));
      } else {
        console.error("Insert error:", error);
      }
    }
  },

  removeFromCart: async (id) => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) return;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id)
      .eq("id_user", userId);

    if (!error) {
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      }));
    } else {
      console.error("Delete error:", error);
    }
  },
}));
