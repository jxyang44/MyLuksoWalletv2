//container in MLW DApp
//includes logic for flipping the wallet and the contents of the wallet

import React, { useEffect, useRef, useState } from "react";

import { WalletCover, WalletContentsProfile, WalletContentsVault } from ".";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";

import buttonFront from "../../assets/MyLuksoWalletVisual/Button/button_front.svg";
import buttonBack from "../../assets/MyLuksoWalletVisual/Button/button_back.svg";
import containerTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
import buckleTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-texture.png";
//iterate through different styles
const WalletContainer = ({walletAddress}) => {
  const { setActiveMenu, UPColor } = useStateContext();
  const { currentAccount } = useProfileContext();
  const [showInnerL, setShowInnerL] = useState(false); //toggle for inner/outer page of left side
  const [showInnerR, setShowInnerR] = useState(true); //toggle for inner/outer page of right side

  const [flipOpenL, setFlipOpenL] = useState(false); //animation for flipping left side
  const [flipOpenR, setFlipOpenR] = useState(false); //animation for flipping right side

  useEffect(() => {
    handleLeft();
    setActiveMenu(false);
  }, []);

  //ring-slate-800 ring-8 ring-offset-slate-700 ring-offset-[2vmin]
  const binderContainer = `relative box-border opacity-100 w-1/2 border-4 border-slate-900 flex flex-col items-center justify-center p-4 bg-black`;
  const leftBinder = ` border-r-0 rounded-l-3xl rounded-r-md`;
  const rightBinder = ` border-l-0 rounded-r-3xl rounded-l-md`;
  const buckle = `flex flex-col justify-center w-16 h-20 border-2 bg-slate-700 
  border-slate-800 absolute shadow-black shadow-lg px-1 hover:shadow-slate-700 hover:border-slate-700 hover:text-white hover:bg-slate-600`;
  const leftBuckle = ` text-xl text-slate-800 items-end rounded-r-xl border-l-0 -left-2`;
  const rightBuckle = ` text-3xl text-slate-800 items-start rounded-l-xl border-r-0 -right-2 `;

  const handleRight = () => {
    //intentionally left blank
  };

  const handleLeft = () => {
    if (!showInnerL) {
      setFlipOpenL(true);
      setTimeout(() => {
        setShowInnerL(true);
      }, 2000 * 0.2); //swap sides during animation - reference: flipCloseL in MyLuksoWallet.css
      return;
    } else {
      setFlipOpenL(false);
      setTimeout(() => setShowInnerL(false), 3000 * 0.4); //swap sides during animation - reference: flipOpenL in MyLuksoWallet.css
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-8 my-10">
      <div className="w-5/6 h-[64vmin] flex flex-row">
        <div
          className={`${binderContainer} ${leftBinder} ${flipOpenL ? " flipOpenL" : "flipCloseL"}`}
          style={{ backgroundImage: `url(${containerTexture})` }}>
          {showInnerL ? (
            <>
              <div
                className={buckle + leftBuckle + ` hover:translate-x-1 transition duration-700`}
                onClick={handleLeft}
                style={{ backgroundColor: UPColor, backgroundImage: `url(${buckleTexture})` }}>
                <img src={buttonFront} className="w-6" />
                <div class="opacity-0 hover:opacity-100 transition duration-700 w-fit absolute translate-x-2 hover:translate-x-5 text-white z-10 ">
                  Close Wallet
                </div>
              </div>
              <WalletContentsProfile walletAddress={walletAddress} />
            </>
          ) : (
            <WalletCover flipFunction={handleLeft} />
          )}
        </div>
        <div
          className="h-[98%] self-center w-8 bg-black  border-black border-y-4 border-x-2 rounded-md flex justify-center"
          style={{ backgroundImage: `url(${containerTexture})` }}>
          <div className="h-full w-3 bg-slate-700 bg-opacity-50"></div>
        </div>

        <div
          className={`${binderContainer} ${rightBinder} ${flipOpenR ? " flipOpenR" : "flipCloseR"}`}
          style={{ backgroundImage: `url(${containerTexture})` }}>
          {showInnerR ? (
            <>
              <div
                className={buckle + rightBuckle}
                onClick={handleRight}
                style={{ backgroundImage: `url(${buckleTexture})` }}>
                <img src={buttonBack} className="w-6" />
              </div>
             
              {walletAddress === currentAccount ? <div>Universal Profile</div> : <WalletContentsVault walletAddress={walletAddress} />}
            </>
          ) : (
            <WalletCover flipFunction={handleRight} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletContainer;
