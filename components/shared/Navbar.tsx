import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-[65px] fixed top-0 left-0 bg-white px-10 flex items-center justify-between">
      <div>
        <Image src={"/Logo.svg"} alt="Logo" width={105} height={40} />
      </div>
    </nav>
  );
};

export default Navbar;
