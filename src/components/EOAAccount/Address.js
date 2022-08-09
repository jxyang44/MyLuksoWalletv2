import React from "react";
import { AiOutlineFileSearch, AiOutlineCopy } from "react-icons/ai";

const Address = ({ address, left, right }) => {
  const shortenAddress = (address, start, end) => {
    return `${address.slice(0, start)}...${address.slice(address.length - end)}`;
  };

  return (
    <div className="flex flex-row items-center gap-1">
      <button
        className="text-blue-600 flex flex-row items-center hover:text-blue-300"
        onClick={() => navigator.clipboard.writeText(address)}>
        {address && address.length > 20 ? shortenAddress(address, left || 14, right || 7) : address}
        <AiOutlineCopy />
      </button>
      <a
        className="hover:text-blue-300 text-blue-600 text-lg"
        href={`https://explorer.execution.l16.lukso.network/address/${address}/transactions`}
        target="_blank">
        <AiOutlineFileSearch />
      </a>
    </div>
  );
};

export default Address;
