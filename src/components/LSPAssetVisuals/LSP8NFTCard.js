//component for visualizing LSP8 cards
//TO-DO the design is a proto-type and the code is not finished. The idea is very similar to LSP7TokenCoin.js

import React, { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import {
  IPFS_GATEWAY,
  LSP4Schema,
  LSP8MintableContract,
  web3Provider,
} from "../../utils/luksoConfigs";
import { Address, OptionsPanel } from "..";
import { MintLSP8Form, TransferLSP8Form } from "./LSP8Components";

const borderSpin = ` before:content-'' before:block before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 
  before:rounded-full`;
const [borderSpinOuter, borderSpinInner, animateOuter, animateInner] = [
  ` before:-m-3 before:border-l-purple-600 before:border-l-8 before:border-r-pink-600 before:border-r-4`,
  ` before:-m-1 before:border-sky-600 before:border-r-4 before:border-b-4`,
  ` before:animate-spin-CCW-5`,
  ` before:animate-spin-CW-5`,
];
const subFontStyle = ` font-bold text-transparent bg-clip-text bg-gradient-to-bl from-white to-slate-300 xl:text-base text-sm not-italic `;
// const randomBackgrounds = ["token-wavy", "token-isometric", "token-topography", "token-glamorous", "token-signal", "token-diagonal-lines"];
const defaultPanel = {
  mint: false,
  transfer: false,
  permissions: false,
};

const NFTCardFull = ({ assetAddress, createToken }) => {
  const { currentAccount, web3Window } = useProfileContext();
  const {
    getAssetMetadata,
    getAssetByKey,
    getTotalSupply,
    getBalanceOf,
    getTokenIdsOf,
  } = useAssetsContext();
  const [assetName, setAssetName] = useState("");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [assetMetadata, setAssetMetadata] = useState("");
  const [balanceOf, setBalanceOf] = useState("");
  const [assetIcon, setAssetIcon] = useState("");
  const [assetImageFront, setAssetImageFront] = useState("");
  const [assetImageBack, setAssetImageBack] = useState("");
  const [tokenIDs, setTokenIDs] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [creators, setCreators] = useState("");
  const [isPanelActive, setIsPanelActive] = useState(defaultPanel); //for managing the active state of the mint/transfer/permissions panel
  const [background, setBackGround] = useState("token-topography");
  const [isExtraInfoActive, setIsExtraInfoActive] = useState(true); //for managing the active state of additional metadata panel
  // const [background, setBackGround] = useState(randomBackgrounds[Math.floor(Math.random() * randomBackgrounds.length)]);

  useEffect(() => {
    if (!createToken && assetAddress) {
      getAssetByKey(assetAddress, LSP4Schema[1].key).then((res) =>
        setAssetName(res.value)
      );
      getAssetByKey(assetAddress, LSP4Schema[2].key).then((res) =>
        setAssetSymbol(res.value)
      );
      getTokenIdsOf(assetAddress, currentAccount).then((res) => {
        const formattedList = res
          .map((id) => {
            return web3Provider.utils.toUtf8(id.toString());
          })
          .join(", ");
        setTokenIDs(formattedList);
      });
      getAssetMetadata(assetAddress).then((res) => {
        setAssetMetadata((cur) => ({ ...cur, ...res }));
        //console.log("metadata results:", res, res.backgroundColor, assetMetadata);
        if (res.icon && res.icon.length > 0) {
          setAssetIcon(res.icon[0]?.url?.replace("ipfs://", IPFS_GATEWAY));
        }
        if (res.images && res.images[0] !== null && res.images.length > 0) {
          setAssetImageFront(
            res.images[0][0]?.url?.replace("ipfs://", IPFS_GATEWAY)
          );
          if (res.images.length > 1)
            setAssetImageBack(
              res.images[1][0]?.url?.replace("ipfs://", IPFS_GATEWAY)
            );
        }
        //TO-DO something with assets key if it exists
      });
      getTotalSupply(assetAddress).then((res) =>
        setTotalSupply(web3Provider.utils.toWei(res.toString()))
      );
      currentAccount &&
        getBalanceOf(assetAddress, currentAccount).then((res) =>
          setBalanceOf(web3Provider.utils.toWei(res.toString()))
        );
    }
  }, []);

  //handles when user is using the CREATE token panel since there is no assetAddress to retrieve yet; user can visualize changes as they happen
  useEffect(() => {
    if (!createToken) return;
    setAssetName(createToken.tokenName);
    setAssetSymbol(createToken.tokenSymbol);
    setAssetIcon(createToken.tokenIconURL);
    setTokenIDs([createToken.tokenID]);
    setAssetImageFront(createToken.imageFrontURL);
    setAssetImageBack(createToken.imageBackURL);
    createToken.isCreator ? setCreators(currentAccount) : setCreators();
    setAssetMetadata({
      description: createToken.tokenDescription,
      backgroundColor: createToken.backgroundColor,
      textColor: createToken.textColor,
    });
    setBalanceOf(1);
    setTotalSupply(1); //TO-DO change if using capped
  }, [createToken]);

  return (
    <div className="flex w-full flex-col items-center justify-start">
      <div
        className={`relative my-5 flex aspect-[1.618] w-full flex-col items-start justify-end rounded-xl bg-opacity-25 p-2 ring-2 ${background}`}
        style={{
          color: assetMetadata.textColor,
          backgroundColor: assetMetadata.backgroundColor,
        }}
      >
        <div className="absolute -inset-1 -z-10 rounded-lg opacity-25 blur"></div>

        <div className="absolute left-1/2 bottom-1/2 flex h-28 w-28 -translate-x-1/2 translate-y-1/2 items-center justify-center text-center xl:h-48 xl:w-48">
          {assetImageBack && <img src={assetImageBack}></img>}
        </div>

        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex items-start justify-between text-lg">
            <div className="flex h-full flex-col">
              <div
                className={
                  "mb-1 text-2xl font-bold italic contrast-200 xl:text-4xl"
                }
              >
                {assetName} - {assetSymbol}
              </div>
              <div className="text-xl font-semibold italic">
                <div className="flex gap-1">
                  <span className={subFontStyle}>Contract address:</span>
                  <Address address={assetAddress} />
                </div>

                <div className="mt-2 h-16 w-16 xl:h-24 xl:w-24">
                  <img src={assetIcon}></img>
                </div>
              </div>
            </div>
            {/* fix opacity of image */}
            <div
              className={`relative mt-2 mr-2 flex aspect-square w-3/12 items-center justify-center rounded-full xl:mt-4 xl:mr-4 ${borderSpin} ${borderSpinOuter} ${
                assetImageFront && animateOuter
              }`}
            >
              <div
                className={`relative flex aspect-square w-full items-center justify-center rounded-full p-4 ${borderSpin} ${borderSpinInner} ${
                  assetImageFront && animateInner
                }`}
              >
                {assetImageFront && (
                  <div className="before:content-'' relative before:absolute before:backdrop-opacity-0">
                    <img src={assetImageFront}></img>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            {isPanelActive.permissions && (
              <div className="animate-fadeInLeft">permissions</div>
            )}
            {isPanelActive.mint && (
              <MintLSP8Form
                assetAddress={assetAddress}
                contract={LSP8MintableContract}
              />
            )}
            {isPanelActive.transfer && (
              <TransferLSP8Form
                assetAddress={assetAddress}
                contract={LSP8MintableContract}
                balanceOf={balanceOf}
              />
            )}
          </div>

          <div className="flex items-end justify-between">
            {isExtraInfoActive ? (
              <div className="relative h-24 w-3/6 overflow-y-auto rounded-lg bg-slate-800 p-1 text-xs text-white xl:h-32 xl:text-sm">
                <div>
                  <span className={subFontStyle}>Description:</span>{" "}
                  {assetMetadata.description}
                </div>
                <div>
                  <span className={subFontStyle}>Your tokens IDs:</span>{" "}
                  {tokenIDs}
                </div>
                <div>
                  <span className={subFontStyle}>Total supply:</span>{" "}
                  {totalSupply} {assetSymbol}
                </div>
                <div>
                  <span className={subFontStyle}>Your balance:</span>{" "}
                  {balanceOf} {assetSymbol}
                </div>
                <div>
                  <span className={subFontStyle}>Creators:</span> {creators}
                </div>
                <button
                  className="absolute top-0 right-0 text-xl text-white"
                  onClick={() => setIsExtraInfoActive(false)}
                >
                  <MdKeyboardArrowDown />
                </button>
              </div>
            ) : (
              <button
                className="rounded-lg bg-black bg-opacity-80 py-1 px-2 text-sm text-white xl:text-base"
                onClick={() => setIsExtraInfoActive(true)}
              >
                Show more
              </button>
            )}

            <OptionsPanel
              defaultPanel={defaultPanel}
              isPanelActive={isPanelActive}
              setIsPanelActive={setIsPanelActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCardFull;
