//front wallet flap in MLW DApp

//TO-DO - style more, allow user to customize cover image w/ NFT

import React from "react";
const reqSvgs = require.context("../../assets/MyLuksoWalletVisual/Wallet Signets/", true, /\.svg$/);
const paths = reqSvgs.keys();

const WalletCover = ({flipFunction}) => {
  const svgs = paths.map(path => reqSvgs(path));
  const randomIndex = Math.floor(Math.random() * svgs.length);

  return (
    <div className={`flex flex-col h-full w-full rounded-l-lg border-8 border-black  bg-opacity-20 relative token-topography `} onClick={flipFunction}>
      <img className="w-full h-full" src={svgs[randomIndex]} />
    </div>
  );
};

export default WalletCover;
