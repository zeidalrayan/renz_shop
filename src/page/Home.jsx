import React from "react";

import Hero from "../components/home/Hero";
import { Header } from "../components/tailus/Header";

import ChooseUS from "../components/home/ChooseUs";
import Support from "../components/home/Support";
import CTA from "../components/home/CTA";
import Footer from "../components/tailus/Footer";
import ProductList from "../components/home/productlist";

const Home = () => {
  return (
    <>
      <Header />
      <div className="m-5">
        <Hero />
        <ProductList />
        <ChooseUS />
        <Support />
      </div>
      <CTA />
      <Footer />
    </>
  );
};

export default Home;
