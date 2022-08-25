//container in MLW DApp
//includes logic for flipping the wallet and the contents of the wallet

import React, { useEffect, useRef, useState } from "react";

import { WalletCover, WalletLeftProfile, WalletRightContents } from ".";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";

import buttonFront from "../../assets/MyLuksoWalletVisual/Button/button_front.svg";
import buttonBack from "../../assets/MyLuksoWalletVisual/Button/button_back.svg";
import containerTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
import buckleTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-texture.png";
//iterate through different styles
const WalletContainer = ({walletAddress, walletMetadata}) => {
  const { setActiveMenu, UPColor } = useStateContext();
  const { currentAccount } = useProfileContext();
  const [showInnerL, setShowInnerL] = useState(false); //toggle for inner/outer page of left side
  
  const [flipOpenL, setFlipOpenL] = useState(false); //animation for flipping left side
  const [assetType, setAssetType] = useState("LSP7")

  useEffect(() => {
    handleLeftBuckle();
    setActiveMenu(false);
  }, []);

  //ring-slate-800 ring-8 ring-offset-slate-700 ring-offset-[2vmin]
  const binderContainer = `relative box-border opacity-100 w-1/2 border-4 border-slate-900 flex flex-col items-center justify-center bg-black lg:p-4 p-2`;
  const leftBinder = ` border-r-0 rounded-l-3xl rounded-r-md `;
  const rightBinder = ` border-l-0 rounded-r-3xl rounded-l-md `;
  const buckle = `flex flex-col justify-center lg:w-16 w-8 lg:h-20 h-12 border-2 bg-slate-700 
  border-slate-800 absolute shadow-black shadow-lg px-1 hover:shadow-slate-700 hover:border-slate-700 hover:text-white hover:bg-slate-600 z-10`;
  const leftBuckle = ` text-xl text-slate-800 items-end rounded-r-xl border-l-0 -left-2`;
  const rightBuckle = ` text-3xl text-slate-800 items-start rounded-l-xl border-r-0 -right-2 `;


  const handleLeftBuckle = () => {
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

  const handleRightBuckle = () =>{

  }

  return (
    <div className="flex flex-col justify-center items-center mb-4">
      <div className="w-[95%] h-[80vmin] flex flex-row">
        <div
          className={`${binderContainer} ${leftBinder} ${flipOpenL ? " flipOpenL" : "flipCloseL"}`}
          style={{ backgroundImage: `url(${containerTexture})`, backgroundColor:walletMetadata.vaultColor }}>
          {showInnerL ? (
            <>
              <div
                className={buckle + leftBuckle + ` hover:translate-x-1 transition duration-700`}
                onClick={handleLeftBuckle}
                style={{ backgroundImage: `url(${buckleTexture})` }}>
                <img src={buttonFront} className="w-6" />
                <div className="opacity-0 hover:opacity-100 transition duration-700 w-fit absolute lg:text-base text-xs translate-x-2 hover:translate-x-5 text-white z-10 ">
                  Close Wallet
                </div>
              </div>
              <WalletLeftProfile walletAddress={walletAddress} />
            </>
          ) : (
            <WalletCover flipFunction={handleLeftBuckle} walletMetadata={walletMetadata} />
          )}
        </div>
        <div
          className="h-[98%] self-center lg:w-8 w-2 bg-black  border-black border-y-4 border-x-2 rounded-md flex justify-center"
          style={{ backgroundImage: `url(${containerTexture})`, backgroundColor:walletMetadata.vaultColor }}>
          <div className="h-full w-3 bg-slate-700 bg-opacity-50"></div>
        </div>

        <div
          className={`${binderContainer} ${rightBinder}`}
          style={{ backgroundImage: `url(${containerTexture})`, backgroundColor:walletMetadata.vaultColor}}>
          
          
              <div
                className={buckle + rightBuckle + ` hover:-translate-x-1 transition duration-700`}
                onClick={handleRightBuckle}
                style={{backgroundImage: `url(${buckleTexture})` }}>
                <img src={buttonBack} className="w-6" />
                <div className="flex flex-col justify-center border-2 p-2 shadow-black shadow-lg border-slate-800 lg:w-[200%] w-[400%] rounded-l-xl h-full opacity-0 hover:opacity-100 
                transition duration-700 lg:text-base text-xs absolute translate-x-2 hover:-translate-x-14 hover:h-[110%] text-white z-10 "
                style={{ backgroundImage: `url(${buckleTexture})` }}>
                 
                 <button className="w-full text-left hover:text-black hover:font-semibold" onClick={()=>setAssetType("LSP7")}>LSP7 Assets</button>
                 <button className="w-full text-left hover:text-black hover:font-semibold" onClick={()=>setAssetType("LSP8")}>LSP8 Assets</button>
                 <button className="w-full text-left hover:text-black hover:font-semibold" onClick={()=>setAssetType("Other")}>Other Assets</button>
                </div>
              </div>
             
              {assetType ==="LSP7" && <WalletRightContents walletAddress={walletAddress} walletMetadata={walletMetadata} LSP={"LSP7"}/>}
              {assetType ==="LSP8" && <WalletRightContents walletAddress={walletAddress} walletMetadata={walletMetadata} LSP={"LSP8"}/>}
              {assetType ==="Other" && <div className="text-white">Under construction. Only LSP7 and LSP8 assets are supported at this time.</div>}
          
          
        </div>
      </div>
    </div>
  );
};

export default WalletContainer;
