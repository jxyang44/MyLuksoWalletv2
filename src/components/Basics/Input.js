//input form for mint/transfer/permissions

import React from "react";

const Input = ({
  fields,
  customFunc,
  buttonDescription,
  themeColor,
  themeText,
}) => {
  const handleChange = (e, i) => {
    fields[i].setValue(() => e.target.value);
  };

  return (
    <div
      className={`relative flex w-fit flex-row rounded-lg border-2 border-gray-200 bg-gradient-to-r p-1 pb-2 text-black ${themeColor}`}
    >
      <div className="flex flex-col">
        {fields.map((input, i) => {
          return (
            <div key={input + i}>
              <span className="text-sm font-medium text-white">
                {input.label}
              </span>
              <div className="flex flex-row">
                <input
                  className="mx-2 w-full border-none p-1 text-sm focus:ring-0"
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChange={(e) => handleChange(e, i)}
                  min={input.min}
                  max={input.max}
                />
              </div>
            </div>
          );
        })}
      </div>
      <button
        className={`self-center rounded-md border-2 py-1 px-2 text-sm text-white hover:bg-slate-300 hover:${themeText} font-semibold`}
        onClick={customFunc}
      >
        {buttonDescription}
      </button>
    </div>
  );
};

export default Input;
