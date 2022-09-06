//container in MLW DApp
//includes logic for flipping the wallet and the contents of the wallet

import React, { useEffect, useRef, useState } from "react";

import { WalletCover, WalletLeftProfile, WalletRightContents } from ".";
import { useStateContext } from "../../contexts/StateContext";
import { createErc725Instance, LSP3Schema } from "../../utils/luksoConfigs.js";
import buttonFront from "../../assets/MyLuksoWalletVisual/Button/button_front.svg";
import buttonBack from "../../assets/MyLuksoWalletVisual/Button/button_back.svg";
import containerTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
import buckleTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-texture.png";
//iterate through different styles

const WalletContainer = ({ walletAddress, walletMetadata }) => {
  const { setActiveMenu } = useStateContext();
  const [showInnerL, setShowInnerL] = useState(false); //toggle for inner/outer page of left side
  const [ownedAsset, setOwnedAsset] = useState(true);
  const [flipOpenL, setFlipOpenL] = useState(true); //animation for flipping left side
  const [assetType, setAssetType] = useState("LSP7");

  useEffect(() => {
    handleLeftBuckle();
    setActiveMenu(false);
  }, []);

  const binderContainer = `relative box-border opacity-100 w-1/2 border-4 border-slate-900 flex flex-col items-center justify-center bg-black xl:p-4 p-2`;
  const leftBinder = ` border-r-0 rounded-l-3xl rounded-r-md `;
  const rightBinder = ` border-l-0 rounded-r-3xl rounded-l-md `;
  const buckle = `flex flex-col justify-center xl:w-16 w-8 xl:h-20 h-12 border-2 bg-slate-700 
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

  const assetLoad = async () => {
    const profile = createErc725Instance(LSP3Schema, walletAddress);
    const result = await profile.fetchData(
      ownedAsset ? "LSP5ReceivedAssets[]" : "LSP12IssuedAssets[]"
    );
    return result.value;
  };

  return (
    <div
      className="mb-4 flex flex-col items-center justify-center"
      style={{ scrollbarWidth: "8px" }}
    >
      <div className="flex  w-[95%] flex-row xl:h-[75vh] md:h-[80vh] lg:h-[70vh]">
        <div
          className={`${binderContainer} ${leftBinder} ${
            flipOpenL ? " flipOpenL" : "flipCloseL"
          }`}
          style={{
            backgroundImage: `url(${containerTexture})`,
            backgroundColor: walletMetadata?.vaultColor,
          }}
        >
          {showInnerL ? (
            <>
              <div //left buckle closes vault
                className={
                  buckle +
                  leftBuckle +
                  ` transition duration-700 hover:translate-x-1`
                }
                onClick={handleLeftBuckle}
                style={{ backgroundImage: `url(${buckleTexture})` }}
              >
                <img src={buttonFront} className="w-6" />
                <div className="absolute z-10 w-fit translate-x-2 text-xs text-white opacity-50 transition duration-700 hover:translate-x-5 hover:opacity-100 xl:text-base ">
                  Close Wallet
                </div>
              </div>
              <WalletLeftProfile
                walletAddress={walletAddress}
                walletMetadata={walletMetadata}
              />{" "}
              {/* profile information, addresses, vaults */}
            </>
          ) : (
            <WalletCover
              flipFunction={handleLeftBuckle}
              walletMetadata={walletMetadata}
            /> //front wallet cover
          )}
        </div>
        <div
          className="flex h-[98%] w-2 justify-center self-center  rounded-md border-y-4 border-x-2 border-black bg-black xl:w-8"
          style={{
            backgroundImage: `url(${containerTexture})`,
            backgroundColor: walletMetadata?.vaultColor,
          }}
        >
          <div className="h-full w-3 bg-slate-700 bg-opacity-50"></div>
        </div>

        <div
          className={`${binderContainer} ${rightBinder}`}
          style={{
            backgroundImage: `url(${containerTexture})`,
            backgroundColor: walletMetadata?.vaultColor,
          }}
        >
          <div //right buckle
            className={
              buckle +
              rightBuckle +
              ` transition duration-700 hover:-translate-x-1`
            }
            style={{ backgroundImage: `url(${buckleTexture})` }}
          >
            <div className="relative flex flex-row items-center">
              <img src={buttonBack} className="w-6" />
              <div className="absolute text-right text-xs text-white opacity-50 xl:text-base">
                Toggle LSPs
              </div>
            </div>
            <div
              className="absolute z-10 flex h-full w-[400%] translate-x-2 flex-col justify-center rounded-l-xl border-2 border-slate-800 p-2 text-xs text-white 
                opacity-0 shadow-lg shadow-black transition duration-700 hover:h-[110%] hover:-translate-x-14 hover:opacity-100 xl:w-[200%] xl:text-base "
              style={{ backgroundImage: `url(${buckleTexture})` }}
            >
              {/* right buckle displays option to switch between LSP7, LSP8 and other */}
              <button
                className="w-full text-left hover:font-semibold hover:text-black"
                onClick={() => setAssetType("LSP7")}
              >
                LSP7 Assets
              </button>
              <button
                className="w-full text-left hover:font-semibold hover:text-black"
                onClick={() => setAssetType("LSP8")}
              >
                LSP8 Assets
              </button>
              <button
                className="w-full text-left hover:font-semibold hover:text-black"
                onClick={() => setAssetType("Other")}
              >
                Other Assets
              </button>
            </div>
          </div>
          {assetType === "LSP7" && (
            <WalletRightContents
              walletAddress={walletAddress}
              walletMetadata={walletMetadata}
              LSP={"LSP7"}
              ownedAsset={ownedAsset}
              setOwnedAsset={setOwnedAsset}
              assetLoad={assetLoad}
            />
          )}
          {assetType === "LSP8" && (
            <WalletRightContents
              walletAddress={walletAddress}
              walletMetadata={walletMetadata}
              LSP={"LSP8"}
              ownedAsset={ownedAsset}
              setOwnedAsset={setOwnedAsset}
              assetLoad={assetLoad}
            />
          )}
          {assetType === "Other" && (
            <div className="text-white">
              Under construction. Only LSP7 and LSP8 assets are supported at
              this time.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletContainer;
