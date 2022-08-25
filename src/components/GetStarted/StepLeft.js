import React, { useState, useRef } from "react";
import { ButtonClean, StepDot } from "../";

const StepLeft = ({ title, subtitle, text, buttonText, buttonFunc, button2Text, button2Func, customStyle1 }) => {
  const [isTextActive, setIsTextActive] = useState(false);
  const dotRef = useRef();
  return (
    <div ref={dotRef} className="flex flex-row w-full justify-start items-center lg:gap-24 md:gap-8">
      <div
        className={`flex justify-left items-center flex-row pr-6 py-12 w-5/6 border-2 rounded-xl border-white bg-gradient-to-br from-slate-900 to-slate-800`}>
        <div className={`flex flex-col gap-4 items-left ml-6 + w-[20%]`}>
          <ButtonClean buttonText={buttonText} buttonFunc={buttonFunc} customStyle={"px-2 py-3 lg:w-[10vmax] w-[12max]"} />
          {button2Text && (
            <ButtonClean buttonText={button2Text} buttonFunc={button2Func} customStyle={"px-2 py-2 lg:w-[10vmax] w-[12max] font-normal text-base contrast-50"} />
          )}
        </div>

        <div className={`flex flex-col text-white items-start text-left mr-6 w-[80%]  ${isTextActive ? "ml-4" : customStyle1}`}>
          <h3 className="text-3xl font-bold text-sky-500 mb-2">{title}</h3>
          <p className="lg:text-xl text-lg font-semibold mb-4">{subtitle}</p>
          {isTextActive ? (
            <ul className="mt-2">
              {text.map((item, index) => {
                return (
                  <li className="mb-2" key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          ) : (
            <button
              className="mt-2 bg-slate-800 rounded-lg p-2 border-2 bg-opacity-90 border-slate-300 text-sky-500 font-semibold hover:text-slate-700 hover:bg-slate-300 "
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
