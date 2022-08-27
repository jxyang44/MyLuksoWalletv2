//component for holding step instructions in vault creation page

import React from "react";

const inputStyle =
  "shadow appearance-none border rounded w-full text-md py-1 px-2 m text-black leading-tight bg-black text-white";

const VaultStep = ({ buttonText, buttonFunc, inputLabel1, inputValue1, enabled1, inputLabel2, inputValue2, enabled2 }) => {
  return (
    <div className="flex flex-col items-center mb-10">
      <div className="flex flex-row items-center gap-2 w-11/12">
        <button
          className="w-full flex items-center justify-between px-5 py-3  text-sky-500 border border-sky-500 rounded-lg hover:bg-sky-500 max-h-16 group"
          onClick={buttonFunc}>
          <span className="text-lg font-medium group-hover:text-white">{buttonText}</span>

          <span className="flex-shrink-0 p-2 ml-4 bg-white border border-sky-500 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>

        <div className="w-full flex flex-col justify-start px-3 ">
          {inputLabel1 && (
            <>
              <div className="block text-slate-300 text-sm font-bold text-left">{inputLabel1}</div>
              <input className={inputStyle} type="text" value={inputValue1} placeholder={"N/A"} readOnly={!enabled1} onChange={()=>{}} />
            </>
          )}
          {inputLabel2 && (
            <>
              <div className="mt-1 block text-slate-300 text-sm font-bold text-left">{inputLabel2}</div>
              <input className={inputStyle} type="text" value={inputValue2} placeholder={"N/A"} readOnly={!enabled2} onChange={()=>{}} />
            </>
          )}
        </div>
      </div>
      {/* <div className="mt-4 mb-8 w-full bg-slate-500 h-[1px]"></div> */}
    </div>
  );
};

export default VaultStep;
