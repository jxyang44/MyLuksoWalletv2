//container for forms

import React from "react";

const FormContainer = ({
  children,
  title,
  subtitle,
  mainOverride,
  textOverride,
}) => {
  return (
    <div
      className={`mb-4 md:w-[50vw] w-[90vw] max-w-2xl rounded-lg rounded-tl-none border-2 border-sky-400 bg-slate-800 px-8 pt-2 pb-8 shadow-md animate-fadeInLeft shadow-sky-400 ${mainOverride}`}
    >
      <div className=" mb-5 border-b-4 border-white pb-1">
        <div
          className={`text-2xl font-semibold ${textOverride ?? "text-sky-400"}`}
        >
          {title}
        </div>
        <div className="italic text-white">{subtitle}</div>
      </div>
      {children}
    </div>
  );
};

export default FormContainer;
