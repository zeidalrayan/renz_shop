import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/tailus/Footer";
import { Header } from "../components/tailus/Header";

const Register = () => {
  return (
    <>
      <Header />
      <div class="m-auto xl:container px-12 sm:px-0 mx-auto">
        <div class="mx-auto h-full sm:w-max">
          <div class="m-auto  py-12">
            <div class="mt-12 rounded-3xl border  bg-gray-50 dark:border-gray-700 dark:bg-gray-800 -mx-6 sm:-mx-10 p-8 sm:p-10">
              <h3 class="text-2xl font-semibold text-gray-700 dark:text-white">
                Create Your Account
              </h3>

              <form action="" class="mt-10 space-y-8 dark:text-white">
                <div>
                  <div class="relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="email"
                      placeholder="Your email or user name"
                      class="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                    />
                  </div>
                </div>

                <div class="flex flex-col items-end">
                  <div class="w-full relative before:absolute before:bottom-0 before:h-0.5 before:left-0 before:origin-right focus-within:before:origin-left before:right-0 before:scale-x-0 before:m-auto before:bg-sky-400 dark:before:bg-sky-800 focus-within:before:!scale-x-100 focus-within:invalid:before:bg-red-400 before:transition before:duration-300">
                    <input
                      id=""
                      type="Your password"
                      placeholder="Your Password"
                      class="w-full bg-transparent pb-3  border-b border-gray-300 dark:placeholder-gray-300 dark:border-gray-600 outline-none  invalid:border-red-400 transition"
                    />
                  </div>
                  <div className="">
                    <Link to={"/login"}>
                      <button type="reset" class="-mr-3 w-max p-3">
                        <span class="text-sm tracking-wide text-sky-600 dark:text-sky-400">
                          I have account
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>

                <div>
                  <button class="w-full rounded-full bg-sky-500 dark:bg-sky-400 h-11 flex items-center justify-center px-6 py-3 transition hover:bg-sky-600 focus:bg-sky-600 active:bg-sky-800">
                    <span class="text-base font-semibold text-white dark:text-gray-900">
                      Register
                    </span>
                  </button>
                  <button
                    href="#"
                    type="reset"
                    class="-ml-3 w-max p-3"
                  ></button>
                </div>
              </form>
            </div>
            <div class="border-t pt-12 text-gray-500 dark:border-gray-800">
              <div class="space-x-4 text-center">
                <span>&copy; Tailus</span>
                <a
                  href="#"
                  class="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                >
                  Contact
                </a>
                <a
                  href="#"
                  class="text-sm hover:text-sky-900 dark:hover:text-gray-300"
                >
                  Privacy & Terms
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
