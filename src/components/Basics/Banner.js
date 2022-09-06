//basic banner for page headers

import React from "react";
import { ButtonShadow } from "..";
import { ReactComponent as LuksoLogoInner } from "../../assets/Logos/Lukso_Modified/lukso_logo_inner.svg";
import { ReactComponent as LuksoLogoOuter } from "../../assets/Logos/Lukso_Modified/lukso_logo_outer.svg";

const Banner = ({
  colorFrom,
  title,
  subtitle,
  buttonText,
  buttonFunc,
  buttonColor,
  buttonTextColor,
}) => {
  return (
    <div
      className={`mb-10 flex h-36 flex-row items-center justify-between bg-gradient-to-r p-8 ${colorFrom}`}
    >
      <div className="flex items-center gap-4">
        <LuksoLogoOuter className="absolute h-16 w-16 md:h-24 md:w-24 animate-spin-CCW-20 fill-white stroke-white stroke-[9]" />
        <LuksoLogoInner className="absolute h-16 w-16 md:h-24 md:w-24 animate-spin-CW-10 fill-white stroke-white stroke-[11]" />
        <div className="ml-28 flex flex-col text-left text-white">
          <h3 className="font-secondary w-fit bg-gradient-to-l from-white to-pink-100 bg-clip-text text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-transparent xl:text-4xl">
            {title}
          </h3>
          <p className="font-secondary w-fit whitespace-pre-line bg-gradient-to-l from-teal-100 to-teal-300 bg-clip-text text-sm lg:text-base font-semibold tracking-wide text-transparent xl:text-xl">
            {subtitle}
          </p>
        </div>
      </div>
      <div className="hidden md:block md:mr-8 justify-self-end">
        <ButtonShadow
          buttonText={buttonText}
          buttonFunc={buttonFunc}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
        />
      </div>
    </div>
  );
};

export default Banner;
