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
    <div
      className="metal-bg relative flex w-full md:h-screen md:flex-row flex-col justify-between py-8 px-8 xl:px-32 xl:gap-24"
      id="whatismyluksowallet"
    >
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-bl from-black via-sky-500 to-black opacity-25 blur-xl"></div>
      <div
        ref={imgRef}
        className={`hidden perspective-r md:flex md:w-5/12 items-center justify-center ${
          persAnimation && "perspective-r-animation"
        }`}
      >
        <img src={keyhole} alt="Keyhole" />
      </div>
      <div className="flex md:w-7/12 flex-col justify-center md:text-center text-left gap-2">
        <div className="text-4xl  md:text-2xl font-semibold text-sky-500 xl:text-3xl">
          What is MyLuksoWallet
        </div>
        <div className=" text-xl xl:mt-2 xl:text-xl">
          <div className="mb-2 text-xl md:text-2xl xl:text-5xl">
            A front-end tool to creatively manage and showcase your digital
            assets
          </div>
          {learnMore ? (
            <div className="relative my-4 mx-2 rounded-lg border-2 border-slate-300 bg-slate-800 bg-opacity-90 p-4 pt-6 text-sky-500 text-base md:text-sm xl:text-base">
              <p>
                <span className="font-semibold italic text-blue-400">
                  MyLuksoWallet
                </span>{" "}
                utilizes Lukso Standard Proposals (LSPs) to create a
                user-friendly experience for both Web3 newcomers and veterans
                alike. We abstract away the need to purchase cryptocurrency on
                an exchange, fund an account to pay gas fees (pending
                implementation), and manage cryptographic private keys, so that
                your transition into Web3 is smooth and seamless.
              </p>
              <br></br>
              <p>
                On the back-end, we also utilize asset metadata, received
                assets, key manager, vault management, and issued assets
                (respectively, LSP4-LSP6, LSP10, LSP12) for supporting
                functionality. Finally, in order for any of this to work, we
                also implement core Universal Profile functionality (LSP0-LSP3).
              </p>
              <br></br>
              <p>
                MyLuksoWallet aims to be an all-in-one service for your core
                Lukso digital asset needs. We are still a new project so we are
                very excited to implement more functionality as the Lukso
                ecosystem grows! At this point, we welcome any feedback so
                please reach out to us if you have any questions or suggestions.
              </p>
              <button
                className="absolute top-1 right-1 text-xs text-white"
                onClick={() => setLearnMore(false)}
              >
                Close
              </button>
            </div>
          ) : (
            <>
              <p className="text-base md:text-xl xl:text-2xl">
                View and mint tokens (LSP7) and customized NFTs (LSP8).
                <br></br>
                Transfer assets between vaults (LSP9) and more!
              </p>

              <button
                className="-z-8 mt-10 rounded-lg border-2 border-slate-300 bg-slate-800 bg-opacity-90 p-4 text-base font-semibold text-sky-500 hover:bg-slate-300 hover:text-slate-700 xl:text-2xl"
                onClick={() => setLearnMore(true)}
              >
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
