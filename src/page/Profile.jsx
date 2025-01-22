import React from "react";
import { Link } from "react-router-dom";
import { FaHistory } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const Profile = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src="https://i.pravatar.cc/300"
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
              John Doe
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Software Developer
            </p>
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

            <h2 className=" flex place-items-center gap-1 border-b-2 ">
              <MdLogout /> Log out
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
