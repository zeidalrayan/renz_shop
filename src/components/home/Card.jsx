import { Link } from "react-router-dom";

const Card = ({ id, nama_barang, foto_barang, harga }) => {
  return (
    <div>
      <Link to={`/detail/${id}`}>
        <div className="card bg-base-100  shadow-xl size-64 max-md:size-60">
          <figure>
            <img
              src={foto_barang}
              alt={nama_barang}
              className="h-36 object-contain"
            />
          </figure>
          <div className=" px-8 pt-6 max-md:py-4 ">
            <h2 className=" max-md:text-lg font-semibold">{nama_barang}</h2>
            <p>{harga}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
