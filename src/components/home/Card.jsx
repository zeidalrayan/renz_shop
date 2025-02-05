import { Link } from "react-router-dom";
import { useAuth } from "../../utils/store/useAuth";
import { useCart } from "../../utils/store/useCart";
import Swal from "sweetalert2"; // pastikan SweetAlert2 sudah terinstall

const Card = ({ nama_barang, foto_barang, harga, idProduct }) => {
  const { user } = useAuth();
  const { addtocart, fetchcart } = useCart();

  const tambahkeranjang = async () => {
    Swal.fire({
      title: "Loading...",
      text: "Sedang memproses penambahan ke keranjang",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await addtocart({
        id_user: user.id,
        id_produk: idProduct,
        nama_produk: nama_barang,
        jumlah: 1,
        harga: harga,
      });

      await fetchcart();
      Swal.close();

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Barang berhasil ditambahkan ke keranjang",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="bg-white shadow-md flex flex-col rounded-lg p-4 gap-8 w-64 h-full  max-md:w-56">
      <Link to={`/detail/${idProduct}`} className="flex flex-col flex-grow">
        <figure className="h-36 w-full">
          <img
            src={foto_barang}
            alt={nama_barang}
            className="w-full h-full object-cover rounded-md"
          />
        </figure>
        <div className="pt-4 flex-grow">
          <h2 className="text-lg font-semibold">{nama_barang}</h2>
          <p className="text-gray-700">{harga}</p>
        </div>
      </Link>
      {user ? (
        <button
          onClick={tambahkeranjang}
          class="bg-blue-600 flex gap-2 text-center items-center text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
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
          keranjang
        </button>
      ) : (
        <Link
          to={"/login"}
          className="bg-blue-600 flex gap-2 items-center justify-center text-white px-6 py-2 rounded-md hover:bg-blue-700 mt-2"
        >
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
        </Link>
      )}
    </div>
  );
};

export default Card;
