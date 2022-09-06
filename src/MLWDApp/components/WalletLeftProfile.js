//front profile flap in MLW DApp

import React from "react";
import { WalletProfileCard, WalletPermissions } from ".";
import { useStateContext } from "../../contexts/StateContext";
import walletTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
const WalletLeftProfile = ({ walletAddress, walletMetadata }) => {
  const { UPColor, UPTextColor } = useStateContext();
  const profileContainer = "mt-6 h-1/2 rounded-xl border-slate-800 border-4 bg-gray-500 flex w-full";

  return (
    <div
      className=" my-1 flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-700 px-2 xl:px-4"
      style={{
        backgroundColor: UPColor,
        color: UPTextColor,
        backgroundImage: `url(${walletTexture})`,
      }}>
      {/* background color and text set based on My Universal Profile Page */}
      <div className={`absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 opacity-25 blur`}></div>
      <div className={profileContainer}>
        <div className="relative my-2 flex items-center justify-center rounded-md border border-black bg-white md:mx-4 lg:mx-10">
          <div className="glassmorphism absolute inset-0 bg-white opacity-100 blur-lg grayscale"></div>
          <WalletProfileCard /> {/* universal profile */}
        </div>
      </div>
      <WalletPermissions walletAddress={walletAddress} walletMetadata={walletMetadata} />{" "}
      {/* UP permissioned addresses and vault/UP generic address information */}
    </div>
  );
};

export default WalletLeftProfile;
