import React from "react";

import Hero from "../components/home/Hero";
import { Header } from "../components/tailus/Header";

import ChooseUS from "../components/home/ChooseUs";
import Support from "../components/home/Support";
import CTA from "../components/home/CTA";
import Footer from "../components/tailus/Footer";
import ProductList from "../components/home/productlist";
import Floatingbutton from "../components/tailus/Floatingbutton";
import Currentpage from "../components/Currentpage";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Home" />
      </Helmet>
      <Header />
      <div className="m-5 mt-20">
        <Hero />
        <ProductList />
        <ChooseUS />

        <Support />
        <Floatingbutton />
      </div>

      <CTA />
      <Footer />
    </>
  );
};

export default Home;
