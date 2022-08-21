import React, { useEffect, useState } from "react";

const ButtonShadow = ({ buttonText, buttonFunc, buttonColor, buttonTextColor }) => {
  const [buttonPressed, setButtonPressed] = useState(false);

  useEffect(() => {
    if (buttonPressed == false) return;
    setTimeout(() => {
      setButtonPressed(false);
    }, 5000); //visual release of button after 5 seconds if user releases pointer outside of button
  }, [buttonPressed]);

  return (
    buttonText !== "" && (
      <button
        className={`flex justify-center items-center border-2 rounded-lg transition-colors duration-100 from-gray-100 max-w-xs w-44 h-12 ${buttonColor}
      hover:bg-gradient-to-t ${
        buttonPressed ? "bg-gradient-to-t opacity-70" : "bg-gradient-to-b shadow-md shadow-black/80 "
      }`}
        onClick={buttonFunc}
        onMouseDown={() => setButtonPressed(true)}
        onMouseUp={() => setButtonPressed(false)}>
        <p
          className={`font-bold text-18 ${
            buttonTextColor ? buttonTextColor : "text-black"
          } flex flex-row items-center text-center`}>
          {" "}
          {buttonText}{" "}
        </p>
      </button>
    )
  );
};

export default ButtonShadow;
