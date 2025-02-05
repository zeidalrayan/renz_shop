import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/store/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../utils/SupClient";
import { Header } from "../components/tailus/Header";
import { motion } from "framer-motion";

const EditProfile = () => {
  const user = useAuth();
  const [formEdit, setFormEdit] = useState({ avatar_url: "" });
  const [imagePrev, setImagePrev] = useState("");
  const [file, setFile] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.user.id)
        .single();
      if (data) {
        setFormEdit(data);
        setImagePrev(data.avatar_url);
      } else {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEdit({ ...formEdit, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setFile(file);
      setImagePrev(preview);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    try {
      if (file) {
        await supabase.storage.from("avatars").remove([formEdit.avatar_url]);
        const { data: uploadAvatar } = await supabase.storage
          .from("avatars")
          .upload(`logo/${file.name}`, file);
        if (uploadAvatar) {
          formEdit.avatar_url = `https://wciaxcvrseypqzeyfgjc.supabase.co/storage/v1/object/public/avatars/logo/${file.name}`;
        }
      }
      await supabase.from("profiles").update(formEdit).eq("id", user.user.id);
      Swal.fire({
        title: "Success",
        text: "Profile updated!",
        icon: "success",
      }).then(() => {
        navigate("/profile");
        window.location.reload();
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center p-5 bg-gray-100 dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-white dark:bg-gray-800 backdrop-blur-lg shadow-lg rounded-2xl p-6"
        >
          <form onSubmit={updateProfile} className="space-y-5">
            <div className="flex flex-col items-center">
              <img
                src={imagePrev || user.avatar_url}
                alt="Profile"
                className="size-32 rounded-full border-4 border-gray-300 dark:border-gray-700 shadow-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-3 text-sm text-gray-700 dark:text-gray-300"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm">
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                value={formEdit.full_name || user.full_name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 text-sm">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formEdit.email || user.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-1 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-lg bg-green-500 hover:bg-green-600 transition ${
                  loadingBtn && "opacity-50 cursor-not-allowed"
                }`}
                disabled={loadingBtn}
              >
                Save
              </button>
              <Link
                to="/profile"
                className="px-4 py-2 text-white rounded-lg bg-red-500 hover:bg-red-600 transition"
              >
                Back
              </Link>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default EditProfile;
