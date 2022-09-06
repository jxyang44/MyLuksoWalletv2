//react logo animation for get started page
import React from "react";
import { ReactComponent as LuksoLogoFill } from "../../assets/Logos/Lukso_Modified/lukso_logo_fill.svg";

const StepDot = ({ dotRef }) => {
  const scrollToView = () => {
    dotRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="hidden justify-center rounded-full p-2 shadow-inner shadow-sky-500 md:flex">
      {/* <div className="fixed h-80 w-3 border-l-2 border-r-2 border-white bg-gradient-to-b from-pink-300 via-sky-300 to-pink-300 -z-10 -translate-y-24"></div> */}
      <LuksoLogoFill
        className="h-28 w-28 animate-spin-CW-10 cursor-pointer fill-sky-500 stroke-black stroke-[3]"
        onClick={scrollToView}
      />
    </div>
  );
};

export default StepDot;
