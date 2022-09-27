import React from "react";
import { MdOutlineNewReleases } from "react-icons/md";
import {RiExchangeFundsLine} from 'react-icons/ri'
import {FaHandshake} from 'react-icons/fa'
import {IoIosRocket} from 'react-icons/io'
const TOCData = [
  { icon: <IoIosRocket />, title: "First of a Kind" },
  { icon: <MdOutlineNewReleases />, title: "Featured Creators" },
  { icon: <RiExchangeFundsLine />, title: "Trade and Share" },
  { icon: <FaHandshake />, title: "Partnership" },
];

const TOC = () => {
  return (
    <div className="flex flex-row gap-10 justify-center w-full">
      {TOCData.map((item, i) => {
        return (
          <button
            className="bg-gradient-to-tl from-slate-700 to-slate-800 flex flex-row w-1/4 items-center gap-2 rounded-2xl border border-gray-800 px-2 py-6 text-base md:text-lg lg:text-xl xl:text-2xl shadow-xl transition hover:border-sky-500/10 hover:shadow-sky-500/10 hover:bg-gradient-to-br"
            key={item + i}>
            <div className="flex w-1/4 items-center justify-center text-3xl text-slate-200">{item.icon}</div>
            <div className="w-3/4 text-left">{item.title}</div>
          </button>
        );
      })}
    </div>
  );
};

export default TOC;
