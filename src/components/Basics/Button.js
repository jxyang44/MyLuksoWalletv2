import React from "react";

const Button = ({ buttonText, buttonFunc }) => {
  return (
    buttonText !== "" && (
      <button
        className="rounded-lg border-2 border-black bg-gradient-to-r from-blue-700 to-blue-500 px-3 py-2 
        text-sm font-semibold text-sky-100 transition-colors  hover:border-white  hover:from-teal-500  hover:to-teal-700 
        hover:text-white hover:shadow-xl xl:text-lg"
        onClick={buttonFunc}
      >
        {buttonText}
      </button>
    )
  );
};

export default Button;
