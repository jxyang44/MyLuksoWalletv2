import React, { useState, useEffect, useRef } from "react";
import keyhole from "../../assets/Home/keyhole.png";

import { useStateContext } from "../../contexts/StateContext";
import { animateOnEntry } from "../../utils/animations";
const WhatisMyLuksoWallet = () => {
  const { scrollHeight } = useStateContext();
  const imgRef = useRef(null);
  const [persAnimation, setPersAnimation] = useState(false);
  const [learnMore, setLearnMore] = useState(false);
  useEffect(() => {
    animateOnEntry(imgRef, setPersAnimation, 0.5);
  }, [scrollHeight]);

  return (
    <div className="flex flex-row justify-between h-[calc(100vmin-100px)] w-full relative lg:px-32 px-8 metal-bg" id="whatismyluksowallet">
      <div className="absolute inset-0 bg-gradient-to-bl from-black via-sky-500 to-black rounded-lg blur-xl opacity-25 -z-10"></div>
      <div ref={imgRef} className={`flex justify-center items-center w-5/12 perspective-r ${persAnimation && "perspective-r-animation"}`}>
        <img src={keyhole} alt="Keyhole" />
      </div>
      <div className="flex flex-col justify-center gap-2 w-7/12 lg:ml-24 ml-12">
        <div className="lg:text-3xl text-2xl font-semibold text-sky-500 text-center">What is MyLuksoWallet</div>
        <div className="lg:text-xl text-xl lg:mt-2 text-center">
          <div className="lg:text-5xl text-2xl mb-2">A front-end tool to creatively manage and showcase your digital assets</div>
          {learnMore ? (
            <div className="relative lg:text-base md:text-sm my-4 mx-2 rounded-lg p-4 pt-6 border-2 border-slate-300 text-sky-500 bg-slate-800 bg-opacity-90">
              <p>
                <span className="italic text-blue-400 font-semibold">MyLuksoWallet</span> utilizes Lukso Standard Proposals (LSPs) to create a
                user-friendly experience for both Web3 newcomers and veterans alike. We abstract away the need to purchase cryptocurrency on an
                exchange, fund an account to pay gas fees, and manage cryptographic private keys, so that your transition into Web3 is smooth and
                seamless.
              </p>
              <br></br>
              <p>
                On the back-end, we also utilize asset metadata, received assets, key manager, vault management, and issued assets (respectively,
                LSP4-LSP6, LSP10, LSP12) for supporting functionality. Finally, in order for any of this to work, we also implement core Universal
                Profile functionality (LSP0-LSP3).
              </p>
              <br></br>
              <p>
                MyLuksoWallet aims to be an all-in-one service for your Lukso digital asset needs. We are still a new project so we are very excited
                to implement more functionality as the Lukso ecosystem grows! Please let us know if you have any questions or suggestions.
              </p>
              <button className="text-xs text-white absolute top-1 right-1" onClick={() => setLearnMore(false)}>
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="lg:text-2xl text-xl">
                View and mint tokens (LSP7) and customized NFTs (LSP8).
                <br></br>
                Transfer assets between vaults (LSP9) and more!
              </p>

              <button
                className="mt-10 bg-slate-800 rounded-lg p-4 border-2 bg-opacity-90 border-slate-300 text-sky-500 lg:text-2xl text-base font-semibold hover:text-slate-700 hover:bg-slate-300 -z-8"
                onClick={() => setLearnMore(true)}>
                📘 Learn More
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatisMyLuksoWallet;
