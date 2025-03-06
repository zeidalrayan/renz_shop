import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../utils/SupClient";
import { Header } from "../components/tailus/Header";
import Footer from "../components/tailus/Footer";
import Comment from "../components/detail/Comment";
import useFormatRupiah from "../components/formatRupiah";
import moment from "moment";
import "moment/locale/id"; // Import locale Indonesia
import { BlinkBlur } from "react-loading-indicators";
import { Helmet } from "react-helmet-async";

const Detail = () => {
  const formatDate = (dateString) => {
    return moment(dateString).locale("id").format("dddd, D MMMM YYYY");
  };
  const { formatrupiah } = useFormatRupiah();
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("barang")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching product:", error);
      } else {
        setProduct(data);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className=" w-full h-screen flex place-items-center justify-center ">
        {" "}
        <BlinkBlur color="#25a4de" size="medium" text="Loading" textColor="" />
      </div>
    );

  return (
    <div className="">
      <Helmet>
        <title>{`Renz shop - ${product?.nama_barang}`}</title>
      </Helmet>
      <Header />
      <div className="  px-4 ">
        <div className="flex  max-lg:mt-16  flex-col  ">
          <div className=" flex max-md:flex-col pt-11 h-1/2 place-items-center">
            {/* Product Images */}
            <div className=" w-full h-1/2 flex justify-center  md:w-1/2 px-4 ">
              <img
                src={product.foto_barang}
                alt={product.nama_barang}
                className="w-1/2 h-1/2 object-contain  mb-8"
              />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 px-4">
              <p className=" mb-4">{formatDate(product.created_at)}</p>
              <h2 className="text-3xl max-md:text-2xl font-bold mb-2 ">
                {product.nama_barang}
              </h2>
              <p className="text-gray-600 mb-4 dark:text-slate-100">
                {product.jenis_barang}
              </p>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2 max-md:text-xl">
                  {formatrupiah(product.harga)}
                </span>
              </div>

              <p className="text-gray-700 mb-6  dark:text-slate-100">
                {product.deskripsi}
              </p>

              <div class="mb-6 flex gap-6">
                <div className="flex flex-col">
                  <label
                    for="quantity"
                    class=" text-sm  font-medium text-gray-700  dark:text-slate-100 mb-1"
                  >
                    Quantity:
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value="1"
                    class="w-12 text-center rounded-md border-gray-300  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <p className=" text-gray-700  dark:text-slate-100">
                  Stok:
                  <br />
                  {product.stok}
                </p>
              </div>

              <div class="flex space-x-4 mb-6">
                <button class="bg-blue-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  + keranjang
                </button>
                <button class="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                  Favorite
                </button>
              </div>
            </div>
          </div>
          <Comment />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Detail;
