import React from "react";

const Comment = () => {
  return (
    <div class=" p-8 ">
      <h2 class="text-lg font-bold mb-4">Comments</h2>
      <div class="flex flex-col space-y-4">
        <div class=" dark:bg-slate-500 bg-gray-200 p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-bold">John Doe</h3>
          <p class="text-gray-700  dark:text-slate-100 text-sm mb-2">
            April 17, 2024
          </p>
          <p class="text-gray-700  dark:text-slate-100">
            Indomie Beef makanan favoritku aku sangat suka
          </p>
        </div>

        <form class=" dark:bg-slate-500 bg-gray-200 p-4 rounded-lg shadow-md">
          <div class="mb-4">
            <label
              class="block text-gray-700 dark:text-slate-100 font-bold mb-2"
              for="comment"
            >
              Ulasan
            </label>
            <textarea
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  dark:text-slate-100 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              rows="3"
              placeholder="Masukan Ulasan mu"
            ></textarea>
          </div>
          <button
            class="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Kirim
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comment;
