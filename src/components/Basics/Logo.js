//MyLuksoWallet logo

import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/Logos/MLW_logo_color.svg";
const Logo = ({ customFunc, customProps }) => {
  return (
    <Link
      to="/"
      onClick={customFunc}
      className={`flex items-center gap-1 text-blue-500 hover:text-blue-400 ${customProps}`}
    >
      <LogoSVG className="h-8 w-8 stroke-white" />
      <span
        className="drop-shadow-3xl bg-gradient-to-tl from-white via-blue-500 to-white bg-clip-text py-1 
        pr-3 text-lg md:text-xl font-bold tracking-tight text-transparent shadow-black
        hover:bg-gradient-to-tr"
      >
        MyLuksoWallet
      </span>
    </Link>
  );
};

export default Logo;
