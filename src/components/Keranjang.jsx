import React, { useEffect } from "react";
import { useCart } from "../utils/store/useCart";
import { Header } from "./tailus/Header";
import Footer from "./tailus/Footer";

const Keranjang = () => {
  const { fetchcart, cart } = useCart();

  useEffect(() => {
    fetchcart();
  }, [fetchcart]);

  return (
    <>
      <Header />
      <div className="flex flex-col place-items-center my-24">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-16">Keranjang</h2>

        {/* Items */}
        <div className=" flex justify-center flex-wrap gap-8  ">
          {cart?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between rounded-lg bg-white w-72 h-auto shadow-md p-6"
            >
              {/* Product Info */}
              <div className=" flex-col flex gap-4">
                <img
                  src={item.barang.foto_barang}
                  alt=""
                  className=" w-full h-32 bg-cover"
                />
                <h2 className="text-lg font-medium text-gray-800 mb-2">
                  {item.nama_produk}
                </h2>
                <div className=" flex gap-6">
                  <p className="text-gray-600 text-sm mb-2">x{item.jumlah}</p>
                  <p className="text-blue-500 font-semibold text-sm">
                    {item.harga.toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Footer */}
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
      </div>
      <Footer />
    </>
  );
};

export default Keranjang;
