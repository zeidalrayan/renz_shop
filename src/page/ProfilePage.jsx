import React from "react";
import { useAuth } from "../utils/store/useAuth";
import { Link, Navigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FaHistory } from "react-icons/fa";

const Profile = () => {
  const { full_name, loading, logout, email } = useAuth();

  const handlelogout = () => {
    logout();

    if (logout) {
      alert("logout berhasil");
      <Navigate to={"/"} />;
    } else {
      alert("logout gagal");
    }
  };

  if (loading) {
    return (
      <h2 className=" h-screen text-center  flex place-items-center">
        loading
      </h2>
    );
  }
  return (
    <div className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
              {full_name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{email}</p>
            <button className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
              Edit Profile
            </button>
          </div>
          <div className="md:w-2/3 md:pl-8">
            <Link>
              <h2 className=" flex place-items-center gap-1 border-b-2 mb-11">
                <FaHistory /> History
              </h2>
            </Link>

            <button
              onClick={handlelogout}
              className=" flex place-items-center gap-1 border-b-2 "
            >
              <MdLogout /> Log out
            </button>
            <button className="btn btn-info">Kembali</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
