//component for holding step instructions in vault creation page

import React from "react";

const inputStyle =
  "shadow appearance-none border rounded w-full text-md py-1 px-2 m text-black leading-tight bg-black text-white";

const VaultStep = ({
  buttonText,
  buttonFunc,
  inputLabel1,
  inputValue1,
  inputLabel2,
  inputValue2,
}) => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <div className="flex w-11/12 flex-row-re items-center gap-2">
        <button
          className="group flex max-h-16 w-full items-center justify-between rounded-lg border border-sky-500 px-5 py-3 text-sky-500 hover:bg-sky-500"
          onClick={buttonFunc}
        >
          <span className="text-lg font-medium group-hover:text-white">
            {buttonText}
          </span>

          <span className="ml-4 flex-shrink-0 rounded-full border border-sky-500 bg-white p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </button>

        <div className="flex w-full flex-col justify-start px-3 ">
          {inputLabel1 && (
            <>
              <div className="block text-left text-sm font-bold text-slate-300">
                {inputLabel1}
              </div>
              <input
                className={inputStyle}
                type="text"
                value={inputValue1}
                placeholder={"N/A"}
                readOnly={true}
                onChange={() => {}}
              />
            </>
          )}
          {inputLabel2 && (
            <>
              <div className="mt-1 block text-left text-sm font-bold text-slate-300">
                {inputLabel2}
              </div>
              <input
                className={inputStyle}
                type="text"
                value={inputValue2}
                placeholder={"N/A"}
                readOnly={true}
                onChange={() => {}}
              />
            </>
          )}
        </div>
      </div>
      {/* <div className="mt-4 mb-8 w-full bg-slate-500 h-[1px]"></div> */}
    </div>
  );
};

export default VaultStep;
