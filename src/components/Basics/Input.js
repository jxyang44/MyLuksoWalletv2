//input form for mint/transfer/permissions

import React from "react";

const Input = ({ fields, customFunc, buttonDescription, themeColor, themeText }) => {
  const handleChange = (e, i) => {
    fields[i].setValue(() => e.target.value);
  };

  return (
    <div className={`relative flex flex-row w-fit p-1 pb-2 border-2 border-gray-200 rounded-lg text-black bg-gradient-to-r ${themeColor}`}>
      <div className="flex flex-col">
        
      {fields.map((input, i) => {
        return (
          <div key={input + i}>
            <span className="text-sm font-medium text-white">{input.label}</span>
            <div className="flex flex-row">
              <input
                className="w-full mx-2 p-1 text-sm border-none focus:ring-0"
                type={input.type}
                placeholder={input.placeholder}
                value={input.value}
                onChange={(e)=>handleChange(e,i)}
                min={input.min}
                max={input.max}
                />
            </div>
          </div>
        );
      })}
      </div>
      <button
        className={`border-2 rounded-md self-center py-1 px-2 text-sm text-white hover:bg-slate-300 hover:${themeText} font-semibold`}
        onClick={customFunc}>
        {buttonDescription}
      </button>
    </div>
  );
};

export default Input;
