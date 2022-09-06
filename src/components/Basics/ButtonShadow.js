//button with gradient and shadow

import React, { useEffect, useState } from "react";

const ButtonShadow = ({
  buttonText,
  buttonFunc,
  buttonColor,
  buttonTextColor,
}) => {
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
        className={`flex h-12 w-44 max-w-xs items-center justify-center rounded-lg border-2 from-gray-100 transition-colors duration-100 ${buttonColor}
      hover:bg-gradient-to-t ${
        buttonPressed
          ? "bg-gradient-to-t opacity-70"
          : "bg-gradient-to-b shadow-md shadow-black/80 "
      }`}
        onClick={buttonFunc}
        onMouseDown={() => setButtonPressed(true)}
        onMouseUp={() => setButtonPressed(false)}
      >
        <p
          className={`text-sm font-bold xl:text-base ${
            buttonTextColor ? buttonTextColor : "text-black"
          } flex flex-row items-center whitespace-pre-line text-center`}
        >
          {buttonText}
        </p>
      </button>
    )
  );
};

export default ButtonShadow;
