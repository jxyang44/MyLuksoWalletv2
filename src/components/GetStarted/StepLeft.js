import React, { useRef } from "react";
import { Button_Shadow, StepDot } from "../";

const StepLeft = ({
  title,
  subtitle,
  text,
  buttonText,
  buttonFunc,
  buttonColor,
  buttonTextColor,
  button2Text,
  button2Func,
  button2Color,
  button2TextColor,
}) => {
  const dotRef = useRef();
  return (
    <div ref={dotRef} className="flex flex-row justify-end items-center">
      <div className="flex flex-row w-5/6 justify-start">
        <div
          className={`flex justify-between items-center flex-row h-64 px-4 my-5 w-5/6 border-4 rounded-xl border-teal-200`}>
          <div className="flex flex-col gap-4 mr-16 ml-8">
            <Button_Shadow
              buttonText={buttonText}
              buttonFunc={buttonFunc}
              buttonColor={buttonColor}
              buttonTextColor={buttonTextColor}
            />
            {button2Text && (
              <Button_Shadow
                buttonText={button2Text}
                buttonFunc={button2Func}
                buttonColor={button2Color}
                buttonTextColor={button2TextColor}
              />
            )}
          </div>

          <div className="flex flex-col text-white items-start text-left">
            <h3 className="w-fit text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-pink-50 via-pink-100 to-pink-200">
              {title}
            </h3>
            <p className="w-fit text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-l from-teal-100 to-teal-300">
              {subtitle}
            </p>
            <ul className="text-md mt-2 list-disc list-inside">
              {text.map((item, index) => {
                return (
                  <li className="leading-tight" key={index}>
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <StepDot dotRef={dotRef} />
    </div>
  );
};

export default StepLeft;
