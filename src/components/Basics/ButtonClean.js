import React from "react";

const ButtonClean = ({ buttonText, buttonFunc, customStyle }) => {
  return (
    <button
      className={`whitespace-pre-line rounded-xl border-2 p-4 text-base font-semibold text-white hover:bg-slate-200 hover:text-slate-800 md:text-base xl:text-xl  ${customStyle}`}
      onClick={buttonFunc}
    >
      {buttonText}
    </button>
  );
};

export default ButtonClean;
