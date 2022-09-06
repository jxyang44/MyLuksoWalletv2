import React, { useState, useEffect, useRef } from "react";
import { useStateContext } from "../../contexts/StateContext";
import { animateOnEntry } from "../../utils/animations";
import { BsChatQuoteFill } from "react-icons/bs";
const QuoteBox = ({ title, quote, source, image }) => {
  const { scrollHeight } = useStateContext();
  const imgRef = useRef(null);
  const [persAnimation, setPersAnimation] = useState(false);

  useEffect(() => {
    animateOnEntry(imgRef, setPersAnimation, 1);
  }, [scrollHeight]);

  return (
    <div className="relative flex md:h-[50vh] w-full flex-col-reverse md:flex-row justify-between gap-10 px-8 lg:pr-16 xl:px-32">
      <div className="flex md:w-1/2 flex-col justify-center gap-1 lg:px-4">
        <div className="flex flex-row justify-between gap-4 text-2xl font-semibold italic text-sky-500 lg:text-3xl">
          {title} <BsChatQuoteFill />
        </div>

        <div className="mt-4 text-sm tracking-wide text-white">
          <p className="border-y border-y-gray-500 bg-opacity-50 py-8 px-12">
            “ {quote} ”
          </p>
          <p className="mt-4 text-right">
            <a
              className="font-semibold text-blue-400 hover:text-blue-300"
              href={source}
              rel="noreferrer"
              target="_blank"
            >
              📘 {source}
            </a>
          </p>
        </div>
      </div>

      <div
        ref={imgRef}
        className={`perspective-l flex md:w-1/2 items-center justify-center cursor-zoom-in ${
          persAnimation && "perspective-l-animation"
        }`} onClick={() => window.open(image)}
      >
        <img
          className="rounded-lg bg-opacity-40 bg-gradient-to-br from-sky-400 via-sky-200 py-10 px-2"
          src={image}
          alt="Lukso Image"
        />
      </div>
    </div>
  );
};

export default QuoteBox;
