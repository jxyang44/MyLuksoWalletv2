//front wallet flap in MLW DApp

//TO-DO - customize cover image w/ NFT or user-selected image

import React, { useEffect, useState } from "react";
import vaultCover from "../../assets/MyLuksoWalletVisual/Wallet Signets/signet_vault_lock.svg";
import { Address } from "../../components";
// const reqSvgs = require.context("../../assets/MyLuksoWalletVisual/Wallet Signets/", true, /\.svg$/);
// const paths = reqSvgs.keys();

const WalletCover = ({ flipFunction, walletMetadata }) => {
  // const svgs = paths.map(path => reqSvgs(path));
  // const randomIndex = Math.floor(Math.random() * svgs.length);
  const [animateSpin, setAnimateSpin] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setAnimateSpin(false);
    }, 3000);
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center h-full w-full rounded-l-lg border-8 border-black  bg-opacity-20 relative token-topography scale-x-[-1] text-white`}
      onClick={flipFunction}>
      <div className="lg:text-6xl text-3xl mb-10">{walletMetadata.vaultName}</div>
      <img className={`w-1/2 h-1/2 ${animateSpin && "animate-closeVault"}`} src={vaultCover} />
      <div className="lg:text-xl text-base mt-10">{walletMetadata.vaultDescription}</div>
      <div className="lg:text-3xl text-xl rounded-lg border-2 py-1 px-2 bg-slate-800">
        <Address address={walletMetadata.vaultAddress} />
      </div>
    </div>
  );
};

export default WalletCover;
// <img className="w-full h-full" src={svgs[randomIndex]} />
