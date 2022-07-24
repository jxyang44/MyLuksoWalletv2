import React from "react";

import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { shortenAddress } from "../utils/shortenAddress";

const CryptoCard = () => {
  return (
    
    <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress("0x567188dE1eE4dA1a45D45192fca340A5e2A86D37")}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Lukso
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
           
           
          </div>
        </div>
    
  )
}

export default CryptoCard