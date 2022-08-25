//front profile flap in MLW DApp

import React from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { useProfileContext } from "../../contexts/ProfileContext";
import { WalletProfileCard, WalletPermissions } from ".";
import { useStateContext } from "../../contexts/StateContext";
import walletTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
const WalletLeftProfile = ({walletAddress}) => {
  const { isProfileLoaded } = useProfileContext();
  const { UPColor, UPTextColor } = useStateContext();
  const profileContainer = "mt-6 h-1/2 rounded-xl border-slate-800 border-4 bg-gray-500 flex ";

  return (
    <div className=" flex flex-col justify-center items-center border-2 rounded-lg border-slate-700 border-dashed w-full h-full my-1 lg:px-4"
    style={{ backgroundColor:UPColor, color: UPTextColor, backgroundImage: `url(${walletTexture})`}}>
       <div className={`absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 rounded-lg blur opacity-25 -z-10`} ></div>
      <div className={profileContainer}>
        <div className="w-full bg-white border-black border flex flex-row justify-center items-center relative rounded-md mx-10 my-2" >
          <div className="absolute inset-0 glassmorphism blur-lg bg-white grayscale opacity-100"></div>
         
          <WalletProfileCard />
  
        </div>
      </div>
      <WalletPermissions walletAddress={walletAddress}/>
    </div>
  );
};

export default WalletLeftProfile;
