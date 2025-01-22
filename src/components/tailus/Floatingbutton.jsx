import React from "react";
import { Link } from "react-router-dom";

const Floatingbutton = () => {
  return (
    <Link
      to={"https://wa.me/+6282262746488 text=halo,+apa+yang bisa +dobantu"}
      className="fixed bottom-6 right-10 flex items-center bg-green-600  rounded-xl pr-6 z-40 text-black dark:text-white"
    >
      <img
        src="https://static.vecteezy.com/system/resources/previews/018/930/564/non_2x/whatsapp-logo-whatsapp-icon-whatsapp-transparent-free-png.png"
        className=" size-20"
        alt="whatsapp"
      />

      <p>Hubungi kami</p>
    </Link>
  );
};

export default Floatingbutton;
