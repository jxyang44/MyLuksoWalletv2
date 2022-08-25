import React from "react";
import { ReactComponent as LuksoLogoFill } from "../../assets/Logos/Lukso_Modified/lukso_logo_fill.svg";

const StepDot = ({ dotRef }) => {
  const scrollToView = () => {
    dotRef.current.scrollIntoView({behavior: "smooth"});
  };
  return (
    <div className="flex justify-center  rounded-full p-2 shadow-sky-500 shadow-inner">
      {/* <div className="fixed h-80 w-3 border-l-2 border-r-2 border-white bg-gradient-to-b from-pink-300 via-sky-300 to-pink-300 -z-10 -translate-y-24"></div> */}
      <LuksoLogoFill className="w-28 h-28 stroke-[3] fill-sky-500 stroke-black cursor-pointer animate-spin-CW-10" onClick={scrollToView} />
    </div>
  );
};

export default StepDot;
