import React from "react";
import { useAuth } from "../utils/store/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../components/tailus/Header";
import { Helmet } from "react-helmet-async";

export default function ProfilePage() {
  const { full_name, avatar_url, email, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Logout berhasil");
    navigate("/");
  };

  return (
    <div className="">
      <Helmet>
        <title>{`Profil - ${full_name}`}</title>
      </Helmet>
      <Header />
      <div className="h-screen  flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden p-6 transition-colors">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Profile
            </h2>
          </div>
          <div className="flex flex-col items-center text-center">
            <img
              src={avatar_url}
              alt="Profile"
              className="size-24 rounded-full border-4 border-gray-300 dark:border-gray-600"
            />
            <h5 className="text-lg font-semibold text-gray-800 dark:text-white mt-4">
              {full_name}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>
            <div className="mt-4 flex gap-4">
              <Link
                to="/editprofile"
                className="px-4 py-2 text-sm font-medium bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-500 dark:hover:bg-blue-400 transition"
              >
                Edit Profile
              </Link>
              <Link
                to={"/history"}
                className="px-4 py-2 text-sm font-medium bg-green-600 dark:bg-green-500 text-white rounded-lg hover:bg-green-500 dark:hover:bg-green-400 transition"
              >
                History
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-500 dark:hover:bg-red-400 transition"
              >
                Log Out
              </button>
              <Link
                to="/"
                className="px-4 py-2 text-white rounded-lg bg-red-500 hover:bg-red-600 transition"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
