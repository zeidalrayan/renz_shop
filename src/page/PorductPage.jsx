import React, { useEffect, useState } from "react";
import { Header } from "../components/tailus/Header";
import Allproduct from "../components/product/AllPRoduct";
import Footer from "../components/tailus/Footer";
import Sidebar from "../components/product/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupClient";
import ResponsivePage from "../components/product/Modal";
import { useMedia } from "use-media";
import Floatingbutton from "../components/tailus/Floatingbutton";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PorductPage = () => {
  const [sortByName, setSortByName] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [kategori, setKategori] = useState([]);
  const isSmallScreen = useMedia({ maxWidth: "1024px" });
  const [searchquery, setsearchquery] = useState("");

  const [selectParam, setSelectedParam] = useSearchParams();

  const [searchProduk, setsearchProduk] = useState(
    selectParam.get("search") || ""
  );
  const paramsData = {
    kategori: selectParam.getAll("k"),

    search: selectParam.get("search"),
  };
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", sortByName, sortByPrice, kategori],
    queryFn: async () => {
      let query = supabase.from("barang").select();

      if (sortByPrice === "termahal") {
        query = query.order("harga", { ascending: false });
      } else if (sortByPrice === "termurah") {
        query = query.order("harga", { ascending: true });
      }

      if (sortByName === "A-Z") {
        query = query.order("nama_barang", { ascending: true });
      } else if (sortByName === "Z-A") {
        query = query.order("nama_barang", { ascending: false });
      }

      if (kategori.length > 0) {
        query = query.in("jenis_barang", paramsData.kategori);
      }

      if (searchquery) {
        query = query.ilike("nama_barang", `%${paramsData.search}%`);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });

  console.log(product?.length);

  useEffect(() => {
    const params = {
      ...Object.fromEntries(selectParam),
      search: searchProduk,
    };
    if (!searchProduk) delete params.search;
    setSelectedParam(params);
  }, [searchProduk, setsearchProduk]);

  return (
    <>
      <Helmet>
        {searchProduk ? (
          <title>{`pencarian -${selectParam.get("search")}`}</title>
        ) : (
          <title>{`List produk - ${product?.length}`}</title>
        )}
        <meta
          name="description"
          content="Product Page menyediakan bahan-bahan yang kalian butuhkan"
        />
        <meta name="keywords" content="toko online, barang murah" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      </Helmet>
      <Header />
      <main className="m-4 lg:flex max-lg:flex-col mt-24">
        {isSmallScreen ? (
          <ResponsivePage
            setSortByName={setSortByName}
            setSortByPrice={setSortByPrice}
            setKategori={setKategori}
          />
        ) : (
          <Sidebar
            setSortByName={setSortByName}
            setSortByPrice={setSortByPrice}
            setKategori={setKategori}
          />
        )}

        <Allproduct
          product={product}
          searchProduk={searchProduk}
          setsearchProduk={setsearchProduk}
          isLoading={isLoading}
        />
        <Floatingbutton />
      </main>
      <Footer />
    </>
  );
};

export default PorductPage;
