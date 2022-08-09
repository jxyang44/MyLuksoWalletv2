import React from "react";
import { ReactComponent as LuksoLogoFill } from "../../assets/lukso_logo_fill.svg";

const StepDot = ({ dotRef }) => {
  const scrollToView = () => {
    dotRef.current.scrollIntoView();
  };
  return (
    <div className="flex w-1/4 justify-center ">
      <div className="fixed h-80 w-3 border-l-2 border-r-2 border-white bg-gradient-to-b from-pink-300 via-sky-300 to-pink-300 -z-10 -translate-y-24"></div>
      <LuksoLogoFill
        className="w-20 h-20 stroke-[1] fill-pink-100 stroke-white cursor-pointer animate-spin-CW-10"
        onClick={scrollToView}
      />
    </div>
  );
};

export default StepDot;
