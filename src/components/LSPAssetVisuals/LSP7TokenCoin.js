//main component for visualizing LSP7 token coin

import React, { useEffect, useState } from "react";

import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { IPFS_GATEWAY, LSP4Schema, LSP7MintableContract } from "../../utils/luksoConfigs";
import { useSwipeable } from "react-swipeable";
import { Address,  OptionsPanel } from "..";
import { Name, Background ,MintLSP7Form, TransferLSP7Form} from "./LSP7Components";

const subFontStyle = ` font-bold font-['']`;
const defaultPanel = {
  //controls the mint/transfer/permissions panel
  mint: false,
  transfer: false,
  permissions: false, //TO-DO not implemented yet -for managing permissions on the token
};

const TokenCoin = ({ assetAddress, createToken }) => {
  const { currentAccount } = useProfileContext();
  const { getAssetMetadata, getAssetByKey, getTotalSupply, getBalanceOf } = useAssetsContext();
  const [assetName, setAssetName] = useState("");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [assetIcon, setAssetIcon] = useState("");
  const [assetImageFront, setAssetImageFront] = useState("");
  const [assetImageBack, setAssetImageBack] = useState("");
  const [assetMetadata, setAssetMetadata] = useState({});
  const [balanceOf, setBalanceOf] = useState("");
  const [creators, setCreators] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [isPanelActive, setIsPanelActive] = useState(defaultPanel); //for managing the active state of the mint/transfer/permissions panel
  const [flipAppear, setFlipAppear] = useState(false); //for flipping the coin
  const [flipDisappear, setFlipDisappear] = useState(false); //for flipping the coin
  const [front, setFront] = useState(true); //for flipping the coin

  //retrieve asset metadata from blockchain
  //TO-DO add logic to retrieve metadata through other means (nft address, etc.)
  useEffect(() => {
    if (!createToken && assetAddress) {
      getAssetByKey(assetAddress, LSP4Schema[1].key).then(res => setAssetName(res.value)); //name
      getAssetByKey(assetAddress, LSP4Schema[2].key).then(res => setAssetSymbol(res.value)); //symbol
      //getDecimals(assetAddress).then(res => console.log(res.value));
      getAssetMetadata(assetAddress).then(res => {
        //all other metadata
        setAssetMetadata(cur => ({ ...cur, ...res }));
        console.log("metadata results:", res, assetMetadata);
        res.icon && res.icon.length > 0 && setAssetIcon(res.icon[0]?.url?.replace("ipfs://", IPFS_GATEWAY)); 
        if (res.images && res.images[0] !== null && res.images.length > 0) {
          setAssetImageFront(res.images[0][0]?.url?.replace("ipfs://", IPFS_GATEWAY)); //defaults first image to front
          if (res.images.length > 1) setAssetImageBack(res.images[1][0]?.url?.replace("ipfs://", IPFS_GATEWAY)); //defaults second image to back
        }
        //TO-DO something with assets key if it exists
      });
      getTotalSupply(assetAddress).then(res => setTotalSupply(res));
      currentAccount && getBalanceOf(assetAddress, currentAccount).then(res => setBalanceOf(res));
    }
  }, []);

  //handles when user is using the CREATE token panel since there is no assetAddress to retrieve yet; user can visualize changes as they happen
  useEffect(() => {
    if (!createToken) return;
    setAssetName(createToken.tokenName);
    setAssetSymbol(createToken.tokenSymbol);
    setAssetIcon(createToken.tokenIconURL);
    setAssetImageFront(createToken.imageFrontURL);
    setAssetImageBack(createToken.imageBackURL);
    createToken.isCreator ? setCreators(currentAccount) : setCreators();
    setAssetMetadata({
      description: createToken.tokenDescription,
      backgroundColor: createToken.backgroundColor,
      textColor: createToken.textColor,
      //TO-DO add other fields later
    });
    setBalanceOf(createToken.mintAmount);
    setTotalSupply(createToken.mintAmount); //TO-DO change if using capped contract
  }, [createToken]);

  //flip animation
  const handleFlip = () => {
    if (flipDisappear == true || flipAppear == true) return;
    setFlipAppear(true);
    setTimeout(() => {
      setFlipAppear(false);
      setFlipDisappear(true);
      setFront(curr => !curr);
    }, 600);
    setTimeout(() => {
      setFlipDisappear(false);
    }, 1600);
  };

  //enables swipe to flip coin
  const handlers = useSwipeable({
    onSwipeStart: () => handleFlip(),
    preventScrollOnSwipe: true,
    trackMouse: true,
    //swipeDuration: 100
  });

  return (
    <div className={`w-[40vmax] aspect-square`} style={{ transformStyle: "preserve-3d", userDrag: "false" }} {...handlers}>
      {/* front of coin */}
      {front && (
        <div
          className={`font-['Arial'] cursor-default absolute w-[40vmax] aspect-square border-2 border-white top-0 rounded-full  
          flex flex-col shadow-lg shadow-white items-center justify-start ${flipAppear && "animate-coin-spin-appear"} ${
            flipDisappear && "animate-coin-spin-disappear"
          }`}
          style={{ transform: `translateZ(10px)`, backgroundColor: assetMetadata.backgroundColor, color: assetMetadata.textColor }}>
          <Background assetImage={assetImageFront} />
          <Name assetName={assetName} rotationOffset={0} />

          {assetIcon !== "" && (
            <div className={`absolute top-1/2 -translate-y-1/2 w-[30%] aspect-square flex justify-center items-center rounded-full opacity-50 p-2`}>
              <img src={assetIcon} className="w-full aspect-square select-none rounded-full" style={{ userDrag: "false" }}></img>
            </div>
          )}
          <div
            className="absolute flex flex-col items-center top-1/2 -translate-y-1/2 text-2xl w-[30%] aspect-square overflow-x-auto justify-center rounded-full text-center shadow-white shadow-lg"
            style={{ background: `radial-gradient(#AAA 20%, transparent, ${assetMetadata.backgroundColor})` }}>
            <p className="font-['Times'] text-3xl font-bold ">Owned</p>
            <p className="text-3xl mt-1 font-semibold brightness-50">{balanceOf}</p>
            <p className="text-2xl uppercase font-semibold brightness-50">{assetSymbol}</p>
          </div>
          <div className="absolute bottom-[16vmin] -translate-y-1/2 text-xl text-center brightness-25 bg-white rounded p-2 bg-opacity-50">
            👈Flip👉
          </div>
        </div>
      )}

      {/* back of coin */}
      {!front && (
        <div
          className={`w-[40vmax] aspect-square flex flex-col items-center justify-center rounded-full  ${flipAppear && "animate-coin-spin-appear"} ${
            flipDisappear && "animate-coin-spin-disappear"
          }`}
          style={{ transform: `translateZ(10px)`, backgroundColor: assetMetadata.backgroundColor, color: assetMetadata.textColor }}>
          <Background assetImage={assetImageBack} />
          <Name assetName={assetName} rotationOffset={0} />

          <div>
            {isPanelActive.permissions && <div className="animate-fadeInLeft">Permissions(TO-DO)</div>}
            {isPanelActive.mint && <MintLSP7Form assetAddress={assetAddress} contract={LSP7MintableContract} />}
            {isPanelActive.transfer && <TransferLSP7Form assetAddress={assetAddress} contract={LSP7MintableContract} balanceOf={balanceOf} />}
          </div>
          <OptionsPanel defaultPanel={defaultPanel} isPanelActive={isPanelActive} setIsPanelActive={setIsPanelActive} />

          <div className="flex flex-col italic font-bold text-xl z-10 text-center items-center overflow-x-auto w-4/6">
            <div className="flex gap-1">
              <span className={"text-xl not-italic" + subFontStyle}>Contract address:</span>
              <Address address={assetAddress} />
            </div>
            <div>
              <span className={"text-xl not-italic" + subFontStyle}>Total supply:</span>{" "}
              {totalSupply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {assetSymbol}
            </div>
            <div>
              <span className={"text-xl not-italic" + subFontStyle}>Your balance:</span> {balanceOf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
              {assetSymbol}
            </div>
            {assetMetadata.description && (
              <div>
                <span className={"text-xl not-italic" + subFontStyle}>Description:</span> {assetMetadata.description}
              </div>
            )}
            {creators && (
              <div>
                <span className={"text-xl not-italic" + subFontStyle}>Creators:</span> {creators}
              </div>
            )}
            {assetMetadata.links && (
              <div>
                <span className={"text-xl not-italic" + subFontStyle}>Links:</span> {assetMetadata.links}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TokenCoin;

// TO-DO for 3d coin

//  const middle = Array.from({ length: 9 }, (v, k) => k + 1);

// {middle.map(i => {
//   //middle of coin
//   return (
//     <div className={`w-[40vmax] aspect-square absolute top-0 bg-yellow-500 rounded-full ${
//       flipAppear && "animate-coin-spin-appear"
//     } ${flipDisappear && "animate-coin-spin-disappear"}`} style={{ transform: `translateZ(${i}px)` }}>
//       {/* insert bg image here */}
//     </div>
//   );
// })}
