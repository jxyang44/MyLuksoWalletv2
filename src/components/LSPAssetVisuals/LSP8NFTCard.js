//component for visualizing NFT card

import React, { useEffect, useState } from "react";

import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { IPFS_GATEWAY, LSP4Schema } from "../../utils/ERC725Config";
import { Address, ButtonShadow, Input, Alert, MintForm } from "..";

const borderSpin = ` before:content-'' before:block before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 
  before:rounded-full`;
const [borderSpinOuter, borderSpinInner, animateOuter, animateInner] = [
  ` before:-m-3 before:border-l-purple-600 before:border-l-8 before:border-r-pink-600 before:border-r-4`,
  ` before:-m-1 before:border-sky-600 before:border-r-4 before:border-b-4`,
  ` before:animate-spin-CCW-5`,
  ` before:animate-spin-CW-5`,
];
const subFontStyle = ` font-bold text-transparent bg-clip-text bg-gradient-to-bl from-white to-slate-300`;
const randomBackgrounds = ["token-wavy", "token-isometric", "token-topography", "token-glamorous", "token-signal", "token-diagonal-lines"];
const defaultPanel = {
  mint: false,
  transfer: false,
  permissions: false,
};

const NFTCardFull = ({ assetAddress }) => {
  const { currentAccount } = useProfileContext();
  const { getAssetMetadata, getAssetByKey, getTotalSupply, getBalanceOf } = useAssetsContext();
  const [assetName, setAssetName] = useState("");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [assetMetadata, setAssetMetadata] = useState("");
  const [balanceOf, setBalanceOf] = useState("");
  const [assetIcon, setAssetIcon] = useState("");
  const [assetImageFront, setAssetImageFront] = useState("");
  const [assetImageBack, setAssetImageBack] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [creators, setCreators] = useState("");

  const [isPanelActive, setIsPanelActive] = useState(defaultPanel);
  const [background, setBackGround] = useState(randomBackgrounds[Math.floor(Math.random() * randomBackgrounds.length)]);

  useEffect(() => {
    getAssetByKey(assetAddress, LSP4Schema[1].key).then(res => setAssetName(res.value));
    getAssetByKey(assetAddress, LSP4Schema[2].key).then(res => setAssetSymbol(res.value));
    getAssetMetadata(assetAddress).then(res => {
      setAssetMetadata(cur => ({ ...cur, ...res }));
      //console.log("metadata results:", res, res.backgroundColor, assetMetadata);
      if (res.icon && res.icon.length > 0) {
        setAssetIcon(res.icon[0]?.url?.replace("ipfs://", IPFS_GATEWAY));
      }
      if (res.images && res.images.length > 0) {
        setAssetImageFront(res.images[0][0]?.url?.replace("ipfs://", IPFS_GATEWAY)); //defaults first image to front
        setAssetImageBack(res.images[0][1]?.url?.replace("ipfs://", IPFS_GATEWAY)); //defaults second image to back
      }
      //TO-DO something with assets key if it exists
      //place icon/picture/asset somewhere
      console.log(res); //do something with assetmetadata if there are more fields (check array first, check typeof)
    });
    getTotalSupply(assetAddress).then(res => setTotalSupply(res));
    currentAccount && getBalanceOf(assetAddress, currentAccount).then(res => setBalanceOf(res));
  
  }, []);

  //bg idea: https://dribbble.com/shots/5784934-Gradients-and-textures-for-cryptocurrency-project/attachments/1247671?mode=media
  //add features for color mask: currently black-purple-pink
  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div
        className={`relative p-5 pr-7 flex justify-end items-start flex-col rounded-xl aspect-[1.618] w-full my-5 text-white bg-black bg-opacity-20 ring-2 ${background}`}>
        <div className="absolute -inset-1 bg-gradient-to-br from-black via-purple-600 to-pink-600 rounded-lg blur opacity-25 "></div>
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex justify-between items-start text-lg text-neutral-100 mix-blend-lighten">
            <div className="flex flex-col h-full">
              <div className={"italic font-bold text-4xl mb-1 text-white"}>
                {assetName} ({assetSymbol})
              </div>
              <div className="italic font-semibold text-xl">
                <div className="flex gap-1">
                  <span className={"text-lg not-italic" + subFontStyle}>Contract address:</span>
                  <Address address={assetAddress} />
                </div>
                <div>
                  <span className={"text-lg not-italic" + subFontStyle}>Total supply:</span> {totalSupply} {assetSymbol}
                </div>
                <div>
                  <span className={"text-lg not-italic" + subFontStyle}>Your balance:</span> {balanceOf} {assetSymbol}
                </div>
              </div>
            </div>
            {/* fix opacity of image */}
            <div
              className={`relative w-3/12 aspect-square flex justify-center items-center rounded-full ${borderSpin} ${borderSpinOuter} ${
                assetImageFront && animateOuter
              }`}>
              <div
                className={`w-full relative p-4 aspect-square rounded-full flex justify-center items-center ${borderSpin} ${borderSpinInner} ${
                  assetImageFront && animateInner
                }`}>
                {assetImageFront ? (
                  <div className="relative before:content-'' before:absolute before:backdrop-opacity-0 saturate-200 backdrop-saturate-0">
                    <img src={assetImageFront}></img>
                  </div>
                ) : (
                  <div>No images detected</div>
                )}
              </div>
            </div>
          </div>

          <div>
            {isPanelActive.permissions && <div className="animate-fadeInLeft">permissions</div>}
            {isPanelActive.mint && <MintForm assetAddress={assetAddress} />}
            {isPanelActive.transfer && <div className="animate-fadeInLeft">transfer</div>}
          </div>

          <div className="flex justify-between items-end">
            <div className="rounded-lg p-3 w-2/6 h-full overflow-y-scroll bg-black bg-opacity-80">
              <div className="underline text-slate-400 font-semibold">Asset Metadata (TO-DO)</div>
              {/* {Object.keys(assetMetadata).map(obj => {
                return (
                  <>
                    {!(assetMetadata[obj] === "" || (assetMetadata[obj] && !assetMetadata[obj].length)) && (
                      <div className="text-sm text-slate-300 mix-blend-lighten">
                        {obj}: {assetMetadata[obj] && assetMetadata[obj].map(item => item).join(", ")}
                      </div>
                    )}
                  </>
                );
              })} */}
            </div>

            <div className="flex flex-row gap-1 scale-90 text-lg bg-black bg-opacity-80 rounded-lg p-1">
              |
              <button
                className="text-red-500 hover:text-white"
                onClick={() => setIsPanelActive({ ...defaultPanel, permissions: !isPanelActive.permissions })}>
                {" "}
                Permissions{" "}
              </button>
              |
              <button className="text-green-500 hover:text-white" onClick={() => setIsPanelActive({ ...defaultPanel, mint: !isPanelActive.mint })}>
                {" "}
                Mint{" "}
              </button>
              |
              <button
                className="text-blue-500 hover:text-white"
                onClick={() => setIsPanelActive({ ...defaultPanel, transfer: !isPanelActive.transfer })}>
                {" "}
                Transfer{" "}
              </button>
              |
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCardFull;
