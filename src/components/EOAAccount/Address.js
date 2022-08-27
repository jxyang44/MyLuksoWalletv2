//formatting for contract address
//adds copy address function, link to block explorer, and shortening address text
//TO-DO fix hover animation so that it doesn't cover too much of the text

import React from "react";
import { AiOutlineFileSearch, AiOutlineCopy } from "react-icons/ai";
const Address = ({ address, left, right }) => {
 
  const shortenAddress = (address, start, end) => {
    return `${address.slice(0, start)}...${address.slice(address.length - end)}`;
  };


  return (
    <div className="flex flex-row items-center gap-2">
      <button className="text-blue-400 flex flex-row justify-end items-center hover:text-blue-50" onClick={() => navigator.clipboard.writeText(address)}>
        {address && address.length > 20 ? shortenAddress(address, left || 14, right || 7) : address}
        <AiOutlineCopy />
        <div className="opacity-0 hover:opacity-100 transition duration-300 w-fit absolute hover:translate-x-3 hover:translate-y-5 text-white z-10 text-xs">Copy Address</div>
      </button>
      <a
        className="hover:text-blue-50 text-blue-400 flex flex-row justify-end"
        href={`https://explorer.execution.l16.lukso.network/address/${address}/transactions`}
        target="_blank">
        <AiOutlineFileSearch />
        {/* <div class="opacity-20 border-2 border-red hover:opacity-100 transition duration-300 w-1 h-1 -translate-x-3 absolute hover:translate-x-2 hover:translate-y-4 text-white z-10 text-xs">Explorer</div> */}
      </a>
    </div>
  );
};

export default Address;
