import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../contexts/StateContext";
import { animateOnEntry } from "../../utils/animations";
import {BsChatQuoteFill} from "react-icons/bs";
const QuoteBox = ({title,quote,source,image}) => {
  const { scrollHeight } = useStateContext();
  const imgRef = useRef(null);
  const [persAnimation, setPersAnimation] = useState(false);

  useEffect(() => {
    animateOnEntry(imgRef, setPersAnimation, 1);
  }, [scrollHeight]);

  return (
    <div className="flex flex-row justify-between w-full gap-10 relative lg:px-32 px-8 h-[50vh]">
      <div className="flex flex-col justify-center gap-1 w-1/2 lg:px-4">
        <div className="text-sky-500 lg:text-3xl text-2xl font-semibold italic flex flex-row justify-between gap-4">{title} <BsChatQuoteFill/></div>

        <div className="lg:text-sm text-xs mt-4 tracking-wide text-white">
          <p className="border-y border-y-gray-500 py-8 px-12 bg-opacity-50">
          “ {quote} ”
          </p>
          <p className="text-right mt-4">
            <a className="font-semibold text-blue-400 hover:text-blue-300" href={source} rel="noreferrer" target="_blank">
              📘 {source}
            </a>
          </p>
        </div>
      </div>

      <div ref={imgRef} className={`flex justify-center items-center w-1/2 perspective-l ${persAnimation && "perspective-l-animation"}`}>
        <img className="py-10 px-2 bg-gradient-to-br from-sky-400 via-sky-200 rounded-lg bg-opacity-40" src={image} alt="Lukso Logo" />
      </div>
    </div>
  );
};

export default QuoteBox;
