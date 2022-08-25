import React from "react";
import { ButtonShadow } from "..";
import { ReactComponent as LuksoLogoInner } from "../../assets/Logos/Lukso_Modified/lukso_logo_inner.svg";
import { ReactComponent as LuksoLogoOuter } from "../../assets/Logos/Lukso_Modified/lukso_logo_outer.svg";

const Banner = ({ colorFrom, title, subtitle, buttonText, buttonFunc, buttonColor, buttonTextColor }) => {
  return (
    <div className={`flex justify-between items-center flex-row h-36 p-8 mb-10 bg-gradient-to-r ${colorFrom}`}>
      <div className="flex items-center gap-4">
        <LuksoLogoOuter className="absolute w-24 h-24 stroke-[9] fill-white stroke-white animate-spin-CCW-20" />
        <LuksoLogoInner className="absolute w-24 h-24 stroke-[11] fill-white stroke-white animate-spin-CW-10" />
        <div className="ml-28 flex flex-col text-left text-white">
          <h3 className="w-fit lg:text-4xl text-xl tracking-tight font-extrabold font-secondary text-transparent bg-clip-text bg-gradient-to-l pr-40 from-white to-pink-100">
            {title}
          </h3>
          <p className="w-fit lg:text-xl text-base tracking-wide font-semibold font-secondary whitespace-pre-line text-transparent bg-clip-text bg-gradient-to-l pr-40 from-teal-100 to-teal-300">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="mr-8 justify-self-end">
        <ButtonShadow buttonText={buttonText} buttonFunc={buttonFunc} buttonColor={buttonColor} buttonTextColor={buttonTextColor} />
      </div>
    </div>
  );
};

export default Banner;
