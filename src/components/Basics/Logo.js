//MyLuksoWallet logo

import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../assets/Logos/MLW_logo_color.svg";
const Logo = ({ customFunc, customProps }) => {
  return (
    <Link to="/" onClick={customFunc} className={`flex gap-1 items-center text-blue-500 hover:text-blue-400 ${customProps}`}>
      <LogoSVG className="w-8 h-8 stroke-white" />
      <span
        className="text-xl py-1 pr-3 tracking-tight font-bold text-transparent bg-clip-text 
        bg-gradient-to-tl from-white via-blue-500 to-white drop-shadow-3xl shadow-black
        hover:bg-gradient-to-tr">
        MyLuksoWallet
      </span>
    </Link>
  );
};

export default Logo;
