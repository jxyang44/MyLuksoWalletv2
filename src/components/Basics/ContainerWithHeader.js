import React from "react";

const ContainerWithHeader = ({ title, subtitle, children }) => {
  return (
    <div className={`mx-8 my-16 flex flex-col items-center md:mx-32`}>
      <div className="text-center text-4xl font-semibold text-sky-500">{title}</div>
      <div className="mb-4 text-center text-2xl text-white">{subtitle}</div>
      {children}
    </div>
  );
};

export default ContainerWithHeader;
