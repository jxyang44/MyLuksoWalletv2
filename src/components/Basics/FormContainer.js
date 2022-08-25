import React from "react";

const FormContainer = ({ children, title, subtitle, mainOverride, textOverride }) => {
  return (
    <div className={`max-w-2xl w-[50vw] border-2 shadow-md rounded-lg px-8 pt-2 pb-8 mb-4 bg-slate-800 border-sky-400 shadow-sky-400 rounded-tl-none ${mainOverride}`}>
      <div className=" pb-1 mb-5 border-b-4 border-white">
        <div className={`font-semibold text-2xl ${textOverride ?? "text-sky-400"}`}>{title}</div>
        <div className="text-white italic">{subtitle}</div>
      </div>
      {children}
    </div>
  );
};

export default FormContainer;
