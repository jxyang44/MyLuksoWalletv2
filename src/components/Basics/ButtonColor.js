import React from "react";

const ButtonColor = ({ buttonText, buttonFunc, customStyle }) => {
  return (
    <button
      className={`focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none ${
        customStyle ?? "bg-gray-500 hover:bg-gray-700"
      }`}
      onClick={buttonFunc}
    >
      {buttonText}
    </button>
  );
};

export default ButtonColor;
