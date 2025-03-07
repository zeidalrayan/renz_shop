import React, { useEffect } from "react";
import { useCart } from "../utils/store/useCart";
import { Header } from "./tailus/Header";
import { Link, useNavigate } from "react-router-dom";
import Table from "./Table";
import { Helmet } from "react-helmet-async";

const Keranjang = () => {
  const { fetchcart, cart, handlePayment } = useCart();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchcart();
  }, [fetchcart]);

  return (
    <>
      <Helmet>
        <title>Keranjang{cart.length > 0 ? `-${cart.length}` : ""}</title>
      </Helmet>
      <Header />
      <div className="flex flex-col gap-6 place-items-center my-24">
        <h2 className="text-4xl font-bold mb-16">Keranjang</h2>
        <Table rowsPerPage={5} />
        <div className="mt-6 p-3 border border-gray-200 bg-blue-50 rounded-lg w-72">
          <h3 className="text-xl font-bold">Total:</h3>
          <p className="text-lg text-blue-500 font-semibold">
            {cart
              .reduce((acc, item) => acc + item.harga, 0)
              .toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })}
          </p>
        </div>
        <div className="flex gap-6">
          <button className="btn btn-error" onClick={handleBack}>
            Kembali
          </button>
          <button className="btn btn-info w-24" onClick={() => handlePayment()}>
            Beli
          </button>
        </div>
      </div>
    </>
  );
};

export default Keranjang;
