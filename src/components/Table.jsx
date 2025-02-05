import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useCart } from "../utils/store/useCart";

const Table = ({ rowsPerPage = 5 }) => {
  const { fetchcart, cart, removeFromCart } = useCart();
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
    <div className="relative shadow-md flex flex-col justify-center items-center sm:rounded-lg  w-full">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 w-5">
            <tr>
              <th className="p-4 text-center">No</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3 text-center">Quantity</th>
              <th className="px-6 py-3 text-center">Price</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item, index) => (
              <tr
                key={item.id}
                className="bg-white border-b hover:bg-gray-50"
                style={{ marginBottom: "10px" }} // Menambah jarak antar baris
              >
                <td className="p-4 text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="flex items-center gap-4 px-6 py-4">
                  <img
                    src={item.barang.foto_barang}
                    alt={item.nama_produk}
                    className="w-24 h-16 rounded-md"
                  />
                  {item.nama_produk}
                </td>
                <td className="text-center px-6 py-4">{item.jumlah}</td>
                <td className="text-center text-blue-500 font-semibold px-6 py-4">
                  {item.harga.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </td>
                <td className="text-center px-6 py-4">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`btn btn-square ${
            currentPage === 1 ? "btn-disabled" : ""
          }`}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`btn btn-square ${
              currentPage === i + 1 ? "btn-active" : ""
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`btn btn-square ${
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
