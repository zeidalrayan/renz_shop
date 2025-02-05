import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart";
import { FaShoppingCart } from "react-icons/fa";
import Theme from "../diasy/Theme";

export const Header = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <div>
      <header>
        <input
          type="checkbox"
          name="hbr"
          id="hbr"
          className="hbr peer"
          hidden
          aria-hidden="true"
        />
        <nav className="fixed top-0 z-20 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur navbar shadow-md shadow-gray-600/5 peer-checked:navbar-active  md:bg-transparent dark:shadow-none">
          <div className="xl:container m-auto px-6 md:px-12 w-full">
            <div className="w-full flex flex-wrap items-center justify-between gap-6 md:py-3 md:gap-0">
              <div className="w-full flex justify-between lg:w-auto">
                <a
                  href="#"
                  aria-label="logo"
                  className="flex space-x-2 items-center"
                >
                  <span className="text-base font-bold text-gray-600 dark:text-white">
                    Renz Shop
                  </span>
                </a>
                <label
                  htmlFor="hbr"
                  className="peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden ml-auto"
                >
                  <div
                    aria-hidden="true"
                    className="m-auto h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                  <div
                    aria-hidden="true"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-gray-900 dark:bg-gray-300 transition duration-300"
                  ></div>
                </label>
              </div>
              <div className="navmenu hidden w-full flex-wrap justify-end max-lg:place-items-center items-center mb-16 space-y-8 p-6 lg:space-y-0 lg:p-0 lg:m-0 lg:flex md:flex-nowrap lg:bg-transparent lg:w-7/12 lg:shadow-none dark:shadow-none dark:border-gray-700 lg:border-0">
                <div className="text-gray-600 max-lg:text-black dark:text-gray-300 lg:pr-4">
                  <ul className="space-y-6 capitalize tracking-wide font-medium text-base lg:flex lg:space-y-0">
                    <Link to={"/"}>
                      <li>
                        <a
                          href="#"
                          className={`${
                            location.pathname === "/" ? "text-sky-600 " : ""
                          }block md:px-4 transition hover:text-sky-600 dark:hover:text-primaryLight`}
                        >
                          <span>Home</span>
                        </a>
                      </li>
                    </Link>
                    <li>
                      <Link
                        to={"/about"}
                        className={`${
                          location.pathname === "/about" ? "text-sky-600 " : ""
                        }block md:px-4 transition hover:text-sky-600 dark:hover:text-primaryLight`}
                      >
                        <span>about</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/product"}
                        className={`${
                          location.pathname === "/product"
                            ? "text-sky-600 "
                            : ""
                        }block md:px-4 transition hover:text-sky-600 dark:hover:text-primaryLight`}
                      >
                        <span>product</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/contac"}
                        className={`${
                          location.pathname === "/contac" ? "text-sky-600 " : ""
                        }block md:px-4 transition hover:text-sky-600 dark:hover:text-primaryLight`}
                      >
                        <span>contact</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="w-full items-center gap-7 place-items-center space-y-2 border-primary/10 dark:border-gray-500 border-gray-800 flex flex-col sm:flex-row lg:space-y-0 md:w-max lg:border-l ml-5 max-lg:ml-0">
                  {user ? (
                    <>
                      <a
                        href="#"
                        className="relative ml-4 max-lg:ml-0 flex h-9 max-lg:mb-4 items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full max-md:w-1/5 before:bg-sky-700 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                      >
                        <Link to={"/welcome"}>
                          <span className="relative text-sm font-semibold dark:text-white text-white">
                            Profile
                          </span>
                        </Link>
                      </a>
                      <Link to={"/keranjang"} className="relative">
                        <FaShoppingCart className="text-2xl" />
                        {cart.length > 0 && (
                          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                            {cart.length}
                          </span>
                        )}
                      </Link>
                    </>
                  ) : (
                    <a
                      href="#"
                      className="relative ml-4 max-lg:ml-0 flex h-9 max-lg:mb-4 items-center justify-center sm:px-6 before:absolute before:inset-0 before:rounded-full max-md:w-1/5 before:bg-sky-700 dark:before:bg-primaryLight before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95"
                    >
                      <Link to={"/login"}>
                        <span className="relative text-sm font-semibold dark:text-white text-white">
                          Login
                        </span>
                      </Link>
                    </a>
                  )}
                  <Theme />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
