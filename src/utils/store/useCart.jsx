import { create } from "zustand";
import { supabase } from "../SupClient";
import axios from "axios";

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

  incrementitem: async (id) => {
    const { cart } = get();
    const item = cart.find((i) => i.id === id);
    if (item) {
      const updateditem = {
        ...item,
        jumlah: item.jumlah + 1,
        harga: (item.jumlah + 1) * (item.harga / item.jumlah),
      };
      const { error } = await supabase
        .from("cart")
        .update({ jumlah: updateditem.jumlah, harga: updateditem.harga })
        .eq("id", id);
      if (!error) {
        set((state) => ({
          cart: state.cart.map((cartitem) =>
            cartitem.id === id ? updateditem : cartitem
          ),
        }));
      }
    }
  },
  decrementitem: async (id) => {
    const { cart, removeFromCart } = get();
    const item = cart.find((i) => i.id === id);
    if (item) {
      if (item) {
        if (item.jumlah === 1) {
          if (window.confirm("apakah anda ingin menghapus nya")) {
            await removeFromCart(id);
          }
        } else {
          const updateditem = {
            ...item,
            jumlah: item.jumlah - 1,
            harga: (item.jumlah - 1) * (item.harga / item.jumlah),
          };
          const { error } = await supabase
            .from("cart")
            .update({ jumlah: updateditem.jumlah, harga: updateditem.harga })
            .eq("id", id);
          if (!error) {
            set((state) => ({
              cart: state.cart.map((cartitem) =>
                cartitem.id === id ? updateditem : cartitem
              ),
            }));
          }
        }
      }
    }
  },

  handlePayment: async () => {
    const { cart } = get(); // Ambil data cart dari Zustand
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Error fetching user:", userError);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    // Fetch user profile data
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("full_name, email") // Ambil field yang diperlukan
      .eq("id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching profile data:", profileError);
      return;
    }

    if (cart.length === 0) {
      alert("Keranjang masih kosong!");
      return;
    }

    // Persiapkan item details
    const itemDetails = cart.map((item) => ({
      id: item.id_produk,
      name: item.nama_produk,
      price: item.harga / item.jumlah, // Harga satuan
      quantity: item.jumlah,
    }));

    // Hitung total harga
    const totalPrice = itemDetails.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order_id = `ORDER-${Date.now()}-${userId.slice(0, 5)}`; // Generate order ID

    const checkoutData = {
      transaction_details: {
        order_id: order_id,
        gross_amount: totalPrice,
      },
      item_details: itemDetails,
      customer_details: {
        first_name: profileData.full_name || "Customer",
        email: profileData.email,
      },
    };

    try {
      const response = await fetch(
        "https://midtrans-six.vercel.app/api/payment/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(checkoutData),
          mode: "cors",
        }
      );

      const result = await response.json();

      if (result.snapToken) {
        window.snap.pay(result.snapToken, {
          onSuccess: async function () {
            // Hapus cart setelah pembayaran berhasil
            await supabase.from("cart").delete().eq("id_user", userId);
            set({ cart: [] });

            // **Simpan data ke history**
            const historyData = cart.map((item) => ({
              user_id: userId,
              order_id: order_id,
              gross_amount: item.harga, // Harga total per item
              id_produk: item.id_produk, // ID produk dari cart
              quantity: item.jumlah,
            }));

            // Insert ke tabel history
            const { error: historyError } = await supabase
              .from("history")
              .insert(historyData);

            if (historyError) {
              console.error("Error logging payment history:", historyError);
            } else {
              console.log("Payment history logged successfully.");
              window.location.href = "/history"; // Redirect ke halaman history
            }
          },
          onPending: function (result) {
            console.log("pending", result);
          },
          onError: function (result) {
            console.log("error", result);
          },
        });
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  },

  fetchhistorypayment: async (orderid) => {
    try {
      const respone = await axios.get(
        `http://localhost:5000/api/payment/payment-status/${orderid}`
      );
      console.log(respone.data);
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  },
}));
