import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import CTA from "../components/home/CTA";
import Cardabout from "../components/Cardabout";
import Cardvision from "./Cardvision";
import Floatingbutton from "../components/tailus/Floatingbutton";
import Currentpage from "../components/Currentpage";

const Landing = () => {
  return (
    <>
      <Header />
      <main className=" mt-20">
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75 max-lg:mt-20">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://powercommerce.asia/wp-content/uploads/2023/11/Cara-Membuat-Toko-Online-di-Marketplace-1024x677.jpg')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div>
                  <h1 className="text-white font-semibold text-5xl">
                    Halaman Tentang kami
                  </h1>
                  <p className="mt-4 text-lg  text-gray-200 ">
                    Halaman akan menjelaskan tentang website toko online betapa
                    sangat mudah untuk di akses
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>
        <Floatingbutton />

        <Cardabout />

        <Cardvision />
        <Currentpage />
        <CTA />
      </main>
      <Footer />
    </>
  );
};
export default Landing;
