import { create } from "zustand";
import { supabase } from "../SupClient";

export const useAuth = create((set, get) => ({
  user: null,
  auth: false,
  full_name: "",
  role: "",
  avatar_url: null,
  email: "",
  loading: true,

  register: async (full_name, email, password, avatar) => {
    try {
      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signUpError) {
        console.error("Sign-up error:", signUpError.message);
        set({ loading: false });
        return;
      }

      await supabase.auth.signOut();
      const userId = signUpData?.user?.id;
      if (!userId) {
        console.error("User ID not found after sign-up.");
        set({ loading: false });
        return;
      }

      let avatarUrl = null;
      if (avatar) {
        const { data: uploadedImage, error: uploadError } =
          await supabase.storage
            .from("avatars")
            .upload(`logo/${avatar.name}`, avatar, {
              cacheControl: "3600",
              upsert: true,
            });

        if (uploadError) {
          console.error("Avatar upload error:", uploadError.message);
          set({ loading: false });
          return;
        }

        avatarUrl = supabase.storage
          .from("avatars")
          .getPublicUrl(`logo/${avatar.name}`).data.publicUrl;
      }

      const { error: upsertError } = await supabase.from("profiles").upsert([
        {
          id: userId,
          full_name,
          email,
          avatar_url: avatarUrl,
        },
      ]);

      if (upsertError) {
        console.error("Upsert profile error:", upsertError.message);
        set({ loading: false });
        return;
      }

      set({
        user: null,
        auth: false,
        full_name,
        email,
        avatar_url: avatarUrl,
        loading: false,
      });

      console.log("Registration successful. Please log in.");
    } catch (error) {
      console.error("Unexpected registration error:", error);
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    try {
      set({ loading: true });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        set({ loading: false });
        return Promise.reject(error.message);
      }

      set({
        user: data.user,
        auth: true,
        loading: false,
      });

      console.log("Login successful:", data.user);
      return Promise.resolve(data.user);
    } catch (error) {
      console.error("Unexpected login error:", error);
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Logout error:", error.message);
        return;
      }

      set({
        user: null,
        auth: false,
      });
      console.log("Logout successful.");
    } catch (error) {
      console.error("Unexpected logout error:", error);
    }
  },

  fetchUser: async () => {
    try {
      set({ loading: true });
      const { data } = await supabase.auth.getUser();
      const { user: currentUser } = data;

      console.log("Fetched current user:", currentUser);

      if (currentUser) {
        set({ user: currentUser, auth: true });
        await get().fetchUserdata(currentUser.id);
      } else {
        set({ loading: false });
      }
    } catch (error) {
      console.error("Fetch user error:", error);
      set({ loading: false });
    }
  },

  fetchUserdata: async (userId) => {
    try {
      if (!userId) {
        console.error("fetchUserdata called with invalid userId:", userId);
        return;
      }

      console.log("Fetching user data for ID:", userId);

      const { data: userData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId);

      if (error) {
        console.error("Error fetching user data:", error.message);
        return;
      }

      if (userData && userData.length > 0) {
        set({
          full_name: userData[0].full_name,
          email: userData[0].email,
          avatar_url: userData[0].avatar_url,
          loading: false,
        });
        console.log("User data fetched successfully:", userData[0]);
      } else {
        console.warn("No user data found for ID:", userId);
      }
    } catch (error) {
      console.error("Unexpected error fetching user data:", error);
      set({ loading: false });
    }
  },
}));
