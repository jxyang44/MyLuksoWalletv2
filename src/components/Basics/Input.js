import React from "react";

const Input = ({ field, placeholder, type, value, setValue, customFunc, buttonDescription, themeColor, themeText }) => {
  const handleChange = e => {
    setValue(() => e.target.value);
  };

  return (
    <label
      className={`relative block w-fit p-1 pr-4 pb-2 border-2 border-gray-200 rounded-lg text-black bg-gradient-to-r ${themeColor}`}
      for={field}>
      <span className="text-sm font-medium text-white" for={field}>
        {" "}
        {field}
      </span>
      <div className="flex flex-row">
        <input
          className="w-full mx-2 p-1 text-md border-none focus:ring-0"
          id={field}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
        <button
          className={`border-2 rounded-md py-1 px-2 text-white hover:bg-slate-300 hover:${themeText} font-semibold`}
          onClick={customFunc}>
          {" "}
          {buttonDescription}
        </button>
      </div>
    </label>
  );
};

export default Input;
