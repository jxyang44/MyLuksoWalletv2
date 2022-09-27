import React from "react";
import { ButtonClean } from "../../components/";
const FeaturedMainItem = ({ title, description, button, buttonFunc, image }) => {
  return (
    <div className="mb-10 ml-[16.67%] flex h-[700px] w-4/6 flex-row rounded-xl border border-gray-500 shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10">
      <div
        className="flex w-5/12 flex-col items-center justify-evenly gap-2 rounded-l-xl border border-gray-800 bg-gradient-to-tl from-slate-700 to-slate-800 px-10 hover:bg-gradient-to-br">
        <div>
          <div className="mb-2 text-4xl font-semibold xl:text-5xl">{title}</div>
          <div className="text-slate-300">{description}</div>
        </div>
        <div className="">
          <ButtonClean buttonText={button} buttonFunc={buttonFunc} customStyle={"px-12"} />
        </div>
      </div>
      <div className="w-7/12 ">
        <img src={image} className="h-full w-full rounded-r-xl object-cover" />
      </div>
    </div>
  );
};

export default FeaturedMainItem;
