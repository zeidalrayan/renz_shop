import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useCart } from "../utils/store/useCart";

const Table = ({ rowsPerPage = 5 }) => {
  const { fetchcart, cart, removeFromCart, decrementitem, incrementitem } =
    useCart();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchcart();
  }, [fetchcart]);

  const deleteItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This item will be removed from your cart!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        Swal.fire("Deleted!", "The item has been removed.", "success");
      }
    });
  };

  const totalItems = cart.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const paginatedItems = cart.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto w-full p-4">
      <table className="table w-full border border-gray-200 rounded-lg text-sm md:text-base">
        {/* head */}
        <thead className="">
          <tr>
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-left">Quantity</th>
            <th className="p-2 text-left">Price</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="p-2 flex items-center gap-3">
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={item.barang.foto_barang}
                    alt={item.nama_produk}
                  />
                </div>
                <span className="font-semibold">{item.nama_produk}</span>
              </td>
              <td className="p-2">
                <button
                  className="btn btn-primary "
                  onClick={() => decrementitem(item.id)}
                >
                  -
                </button>
                <span className="badge badge-ghost text-xs md:text-sm">
                  {item.jumlah}
                </span>
                <button
                  className="btn btn-primary "
                  onClick={() => incrementitem(item.id)}
                >
                  +
                </button>
              </td>
              <td className="p-2 text-blue-500 font-semibold">
                {item.harga.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </td>
              <td className="p-2">
                <button
                  onClick={() => deleteItem(item.id)}
                  className="btn btn-ghost btn-xs md:btn-sm text-red-500"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`btn btn-sm ${currentPage === 1 ? "btn-disabled" : ""}`}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`btn btn-sm ${
              currentPage === i + 1 ? "btn-active" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`btn btn-sm ${
            currentPage === totalPages ? "btn-disabled" : ""
          }`}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
