import React from "react";

const ButtonColor = ({ buttonText, buttonFunc, customStyle }) => {
  return (
    <button
      className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
        customStyle ?? "bg-gray-500 hover:bg-gray-700"
      }`}
      onClick={buttonFunc}>
      {buttonText}
    </button>
  );
};

export default ButtonColor;
