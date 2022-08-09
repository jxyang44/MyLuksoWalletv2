import React, { useEffect } from "react";

import { BsChevronCompactLeft, BsChevronCompactRight} from "react-icons/bs";
import { WalletTokenCard, WalletProfile } from "../../components";
import "./Wallet.css";
import { useStateContext } from "../../contexts/StateContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import { AiOutlineWallet } from "react-icons/ai";



const Wallet = () => {
  const { setActiveMenu } = useStateContext();
  const { isProfileLoaded } = useProfileContext();

  useEffect(() => {
    setActiveMenu(false);
  }, []);

  const binderContainer = `box-border opacity-100 w-1/2 from-slate-700 to-slate-500
    border-8  border-dashed border-slate-900 
    ring-slate-800 ring-8 ring-offset-slate-700 ring-offset-[2vmin]
    flex flex-col items-center justify-center p-4`;
  const leftBinder = `border-r-0 rounded-l-3xl mr-6 rounded-r-sm bg-gradient-to-tr gap-2`;
  const rightBinder = `border-l-0 rounded-r-3xl ml-6 rounded-l-sm bg-gradient-to-bl`;
  const profileContainer = "mt-6 w-5/6 h-1/2 rounded-xl border-slate-800 border-4 bg-gray-500 flex";
  const tokenPurse = `my-2 w-full bg-slate-600 border-4 border-slate-500 rounded-b-3xl shadow-lg envelope`;




  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



  return (
  
<div className="flex flex-col justify-center items-center mx-10 gap-10 mt-10">

      <div className="w-5/6 h-[60vmin] flex flex-row">
        <div className={binderContainer + leftBinder}>
         
          <div className={profileContainer}>
            <div className="w-full m-2 bg-white border-black border-2 flex flex-row justify-center items-center relative">
              {!isProfileLoaded && (
                <div class="absolute inset-0 glassmorphism blur-lg bg-white grayscale opacity-100"></div>
              )}
              <BsChevronCompactLeft />
              <WalletProfile />
              <BsChevronCompactRight />
            </div>
            
          </div>
          <div className="flex flex-row m-2 justify-center gap-2 w-5/6 h-1/2">
            <div className={tokenPurse}>
                
            </div>
            <div className={tokenPurse}>

            </div>
          </div>
          
        </div>
        <div className="h-100% -translate-y-[0.5%] w-8 bg-slate-600 contrast-75 border-slate-800 border-4 rounded-sm flex justify-center -z-10">
          <div className="h-full w-3 bg-slate-700"></div>
        </div>

        <div className={binderContainer + rightBinder}>
          <WalletTokenCard />
          <WalletTokenCard />
          <WalletTokenCard />
          <WalletTokenCard assetAddress={"0x7cf1e07F395BD61D6e609633D34a2063234a6aAD"} />
          
        </div>
      </div>
      
      <div className="flex flex-row w-1/2 justify-center items-center border-4 border-white rounded-xl shadow-white shadow-md bg-slate-700 h-[20vmin]">
        <div className="text-white text-[3rem]">
            <BsChevronCompactLeft />
        </div>
        <div className="text-[8rem] text-white flex flex-row justify-around w-full">
            <AiOutlineWallet />
            <AiOutlineWallet />
            <AiOutlineWallet />
        </div>
        <div className="text-white text-[3rem] font-bold">
            <BsChevronCompactRight />
        </div>
      </div>
    </div> 
    
  );
};

export default Wallet;
