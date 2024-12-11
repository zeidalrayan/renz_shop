import React, { useState } from "react";
import { Header } from "../components/tailus/Header";
import Allproduct from "../components/product/AllPRoduct";
import Footer from "../components/tailus/Footer";
import Sidebar from "../components/product/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/SupClient";
import ResponsivePage from "../components/product/Modal";
import { useMedia } from "use-media";
import { BlinkBlur } from "react-loading-indicators";

const PorductPage = () => {
  const [sortByName, setSortByName] = useState("");
  const [sortByPrice, setSortByPrice] = useState("");
  const [kategori, setKategori] = useState([]);
  const isSmallScreen = useMedia({ maxWidth: "1024px" });

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
        query = query.in("jenis_barang", kategori);
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data;
    },
  });

  return (
    <>
      <Header />
      <main className="m-4 lg:flex max-lg:flex-col">
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

        <Allproduct product={product} />
      </main>
      <Footer />
    </>
  );
};

export default PorductPage;
