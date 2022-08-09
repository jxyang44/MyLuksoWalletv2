import React, { useState } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { IPFS_GATEWAY } from "../../utils/ERC725Config";
import { Address, LYXBalanceFuncs } from "../../components";
const borderSpin = ` before:content-'' before:block before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 
  before:rounded-full`;
const [borderSpinOuter, borderSpinInner] = [
  ` before:-m-3 before:border-l-purple-600 before:border-l-8 before:border-r-pink-600 before:border-r-4 before:animate-spin-CCW-5`,
  ` before:-m-1 before:border-sky-600 before:border-r-4 before:border-b-4 before:animate-spin-CW-5`,
];
const subFontStyle = `text-transparent bg-clip-text bg-gradient-to-bl from-white to-slate-300`;
const randomBackgrounds = [
  "token-wavy",
  "token-isometric",
  "token-topography",
  "token-glamorous",
  "token-signal",
  "token-diagonal-lines",
];
const defaultPanel = {
  mint: false,
  transfer: false,
  permissions: false,
};

const WalletProfile = () => {
  const [isPanelActive, setIsPanelActive] = useState(defaultPanel);
  const { currentAccount, isProfileLoaded, pendingProfileJSONMetadata, setPendingProfileJSONMetadata, maxImageIndex } =
    useProfileContext();
  const { accountBalance } = useAssetsContext();
  return (
    <div className="flex justify-center p-1 h-full w-5/6">
      <div
        className={`relative p-3 justify-end items-start flex-col rounded-xl w-full aspect-[1.8] bg-slate-700 text-white ring-2`}>
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex justify-between items-start text-lg text-neutral-100 mix-blend-lighten">
            <div className="flex flex-col h-full w-3/4">
              <p
                className={
                  "font-bold text-3xl mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-tl from-white via-blue-500 to-white drop-shadow-3xl shadow-black hover:bg-gradient-to-tr"
                }>
                {pendingProfileJSONMetadata.name}
              </p>
              <div className="text-sm">
                <div className="flex flex-col">
                  <LYXBalanceFuncs />
                  <span className="flex gap-1">
                    UP Address: <Address address={currentAccount} left={6} right={6} />
                  </span>
                  <p className="mt-3 mr-4 w-11/12 break-words">
                    {pendingProfileJSONMetadata.description.substring(0, 80)}{" "}
                    {pendingProfileJSONMetadata.description.length >= 80 && "..."}
                  </p>
                </div>
              </div>
            </div>
            <div className={`relative w-3/12 flex justify-center items-center rounded-md border-2 border-slate-200`}>
              {pendingProfileJSONMetadata.profileImage.length > 0 && (
                <img
                  className="rounded"
                  src={pendingProfileJSONMetadata.profileImage[
                    maxImageIndex(pendingProfileJSONMetadata.profileImage, 100)
                  ].url?.replace("ipfs://", IPFS_GATEWAY)}></img>
              )}
            </div>
          </div>

          <div className="flex justify-end items-end">
            <div className="flex flex-row gap-1 scale-90 text-lg bg-black bg-opacity-80 rounded-lg p-1">
              |
              <button
                className="text-red-500 hover:text-white"
                onClick={() => setIsPanelActive({ ...defaultPanel, permissions: !isPanelActive.permissions })}>
                {" "}
                Permissions{" "}
              </button>
              |
              <button
                className="text-green-500 hover:text-white"
                onClick={() => setIsPanelActive({ ...defaultPanel, mint: !isPanelActive.mint })}>
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

export default WalletProfile;
