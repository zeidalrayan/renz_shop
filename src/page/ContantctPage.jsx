import React from "react";
import { Header } from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import { Helmet } from "react-helmet-async";

const ContactPage = () => {
  return (
    <section class="bg-white dark:bg-gray-900 mt-6">
      <Helmet>
        <title>Hubungi Kami</title>
      </Helmet>
      <Header />
      <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md max-lg:mt-24">
        <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Kontak
        </h2>
        <p class="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          silahkan berikan saran atau kritik untuk memberikan website yang
          terbaik
        </p>
        <form action="#" class="space-y-8">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email anda
            </label>
            <input
              type="email"
              id="email"
              class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@gmail.com"
              required
            />
          </div>

          <div class="sm:col-span-2">
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              pesan
            </label>
            <textarea
              id="message"
              rows="6"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Berikan pesan"
            ></textarea>
          </div>
          <button
            type="submit"
            class="btn btn-primary py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Kirim pesan
          </button>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default ContactPage;
