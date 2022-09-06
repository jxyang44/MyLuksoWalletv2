//step section component for get started page

import React, { useState, useRef } from "react";
import { ButtonClean, StepDot } from "../";

const StepLeft = ({ title, subtitle, text, buttonText, buttonFunc, button2Text, button2Func, customStyle1 }) => {
  const [isTextActive, setIsTextActive] = useState(false);
  const dotRef = useRef();
  return (
    <div ref={dotRef} className="flex w-full flex-row items-center justify-start gap-4 md:gap-8 xl:gap-24">
      <div
        className={`justify-left flex w-full flex-row items-center rounded-xl border-2 border-white py-6 pr-6 md:w-5/6 md:py-12 ${
          isTextActive ? "bg-gradient-to-bl from-slate-900 to-slate-700" : " backdrop-blur-md backdrop-contrast-75"
        }`}>
        <div className={`items-left + ml-6 flex flex-col gap-4 xl:w-[20%] `}>
          <ButtonClean buttonText={buttonText} buttonFunc={buttonFunc} customStyle={"px-2 py-3 xl:w-[10vmax] md:w-[12vmax] w-[30vw]"} />
          {button2Text && (
            <ButtonClean
              buttonText={button2Text}
              buttonFunc={button2Func}
              customStyle={"px-2 py-2 xl:w-[10vmax] md:w-[12vmax] w-[30vw] font-normal text-base contrast-50"}
            />
          )}
        </div>

        <div className={`mr-6 ml-4 flex flex-col items-start text-left text-white xl:w-[80%] ${isTextActive ? "mr-0" : customStyle1}`}>
          <h3 className="text-2xl font-bold text-sky-500 md:mb-2 md:text-3xl">{title}</h3>
          <p className="mb-4 text-base font-semibold md:text-lg xl:text-xl">{subtitle}</p>
          {isTextActive ? (
            <ul className="mt-2">
              {text.map((item, index) => {
                return (
                  <li className="mb-2 text-sm md:text-base" key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          ) : (
            <button
              className="mt-2 rounded-lg border-2 border-slate-300 bg-slate-800 bg-opacity-90 p-2 font-semibold text-sky-500 hover:bg-slate-300 hover:text-slate-700 "
              onClick={() => setIsTextActive(true)}>
              📘 Learn More
            </button>
          )}
        </div>
      </div>
      {!isTextActive && <StepDot dotRef={dotRef} />}
    </div>
  );
};

export default StepLeft;
