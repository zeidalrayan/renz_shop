import React from "react";
import { useCounter } from "../utils/store/useCounter";

const Counter = () => {
  const { count, nama } = useCounter();

  return (
    <div>
      <h2>counter app</h2>
      <ButtonKurang />
      <h2>{count}</h2>

      <ButtonTambah />
      <p>{nama}</p>
    </div>
  );
};

export default Counter;

const ButtonKurang = () => {
  const { btnKurang } = useCounter();
  return (
    <div>
      <button onClick={btnKurang}>Kurang</button>
    </div>
  );
};

const ButtonTambah = () => {
  const { btnTambah } = useCounter();
  return (
    <div>
      <button onClick={btnTambah}>Tambah</button>
    </div>
  );
};
