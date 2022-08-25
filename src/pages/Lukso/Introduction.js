import React, { useState, useEffect, useRef } from "react";
import lukso from "../../assets/Logos/Lukso_Original/LUKSO_2022_WORDMARK-01.png";
import { useStateContext } from "../../contexts/StateContext";
import { animateOnEntry } from "../../utils/animations";
const Introduction = () => {
  const { scrollHeight } = useStateContext();
  const imgRef = useRef(null);
  const [persAnimation, setPersAnimation] = useState(false);

  useEffect(() => {
    animateOnEntry(imgRef, setPersAnimation);
  }, [scrollHeight]);

  return (
    <div className="flex flex-row justify-between h-[calc(100vmin-100px)] w-full gap-10 relative lg:px-32 px-8">
      <div className="flex flex-col justify-center gap-1 w-1/2 lg:px-4">
        <div className="text-sky-300 lg:text-4xl text-2xl font-semibold italic">What is LUKSO?</div>

        <div className="lg:text-base text-sm mt-4 tracking-wide text-white">
          <p className="bg-black rounded p-4 bg-opacity-50">
            "LUKSO is a next generation EVM blockchain based on Casper PoS that will revolutionize the way brands, creators and users interact in Web3
            and with blockchain technology in the New Creative Economy. LUKSO was founded by Fabian Vogelsteller and Marjorie Hernandez. Fabian is a
            former Lead DApp Developer at Ethereum and author of ERC20 and web3.js - both of which are the foundation for today’s DeFi and NFT
            protocols. Marjorie Hernandez is an innovation and product expert who previously created and managed EY's Digital Innovation Lab in
            Berlin."
          </p>
          <p className="text-right">
            <a className="font-semibold text-blue-400 hover:text-blue-300" href="https://lukso.network/faq" rel="noreferrer" target="_blank">
              📘 https://lukso.network/faq
            </a>
          </p>
        </div>
      </div>

      <div ref={imgRef} className={`flex justify-center items-center w-1/2 perspective-l ${persAnimation && "perspective-l-animation"}`}>
        <img className="py-10 px-2 bg-gradient-to-br from-sky-400 via-sky-200 rounded-lg bg-opacity-40" src={lukso} alt="Lukso Logo" />
      </div>
    </div>
  );
};

export default Introduction;
