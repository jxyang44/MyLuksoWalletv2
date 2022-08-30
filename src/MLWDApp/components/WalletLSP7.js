//LSP7 mini token - holds logic for expanding the image, dragging and dropping

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { LSP7MintableContract } from "../../utils/luksoConfigs";
import { Address } from "../../components";
import { Name, Background } from "../../components/LSPAssetVisuals/LSP7Components";
import { useDrag } from "react-dnd";
import "../MyLuksoWallet.css";
import swal from "sweetalert";

//@param walletAddress address of the vault or UP that the token is in
//@param index index of the asset in array of LSP7 assets
//@param assets array of JSONs for each asset - {address, isSelected, assetName, assetSymbol, assetIcon, assetImage1, backgroundColor, textColor, balanceOf}
//@param LSP should always be "LSP7"
//@param isCurrentlySelected is the asset currently clicked
//@param does something when asset is currently clicked
const WalletLSP7 = ({ walletAddress, index, assets, setAssets, LSP, isCurrentlySelected, handleSelected }) => {
  const { currentAccount } = useProfileContext();
  const { transferLSP7 } = useAssetsContext();

  const [{ opacity }, drag] = useDrag(
    //from react-dnd (drag and drop)
    () => ({
      type: LSP, //identifies the drag type as "LSP7"
      item: ` ${assets[index].address} `, //drag item name
      end(item, monitor) {
        //fires when item is dropped
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          if (dropResult.name === walletAddress) return swal(`"${assets[index].assetName}" (${assets[index].address}) is already in this wallet!`); //if user drags and drops item into the wallet it is already in
          swal(`Would you like to transfer "${assets[index].assetName}" (${assets[index].address}) from ${walletAddress} to ${dropResult.name}?`, {
            buttons: true,
          }).then(res => {
            if (res)
              swal(`You currently own ${assets[index].balanceOf} ${assets[index].assetSymbol}.`, "How much would you like to transfer?", {
                content: "input",
              }).then(input => {
                if (!input) return swal("", "No input provided.", "error");
                const valueNum = Number(input);
                if (!valueNum) return swal("", "Input must be numeric.", "error");
                if (valueNum <= 0) return swal("", "Input must be a positive number.", "error");
                if (valueNum > Number(assets[index].balanceOf)) return swal("", "Transfer quantity exceeds your current balance.", "error");
                //console.log(assets[index].address, valueNum, dropResult.name, LSP7MintableContract, walletAddress, assets[index].balanceOf);
                transferLSP7(
                  //calls transfer function on contract
                  assets[index].address, //asset contract address
                  valueNum, //value to transfer
                  dropResult.name, //address to transfer asset to
                  LSP7MintableContract, //for contract abi
                  walletAddress, //current wallet address
                  assets[index].balanceOf, //balance of asset
                  walletAddress === currentAccount ? false : true //bool to store if walletAddress is a vault UP (currentAccount = UP address)
                );
              });
          });
        }
      },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1, //change opacity of token if it is being dragged
      }),
    }),
    [assets[index].address]
  );

  return (
    <>
      <div //this div handles selected animation
        className={`relative w-12 ${!isCurrentlySelected && "opacity-0"}`}
        onClick={handleSelected}>
        <div //attach drag to this div
          className={`w-[40vmax] aspect-square relative ${assets[index].isSelected ? "selected-coin" : "tilted-coin"}`}
          ref={drag}
          style={{ opacity }}>
          <div
            className={`font-['Arial'] cursor-default absolute w-[40vmax] aspect-square border-2 border-white top-0 rounded-full  
        flex flex-col shadow-lg shadow-white items-center justify-start bg-black`}
            style={{ backgroundColor: assets[index]?.backgroundColor, color: assets[index]?.textColor }}>
            <Background assetImage={assets[index].assetImage1} />
            <Name assetName={assets[index].assetName} rotationOffset={-70} />

            {assets[index].assetIcon !== "" && (
              <div className={`absolute top-1/2 -translate-y-1/2 w-[50%] aspect-square flex justify-center items-center rounded-full opacity-50 p-2`}>
                <img src={assets[index].assetIcon} className="w-full aspect-square select-none rounded-full"></img>
              </div>
            )}

            <div
              className="absolute flex flex-col items-center top-1/2 -translate-y-1/2 text-2xl w-[50%] aspect-square overflow-x-auto justify-center rounded-full text-center shadow-white shadow-lg"
              style={{ background: `radial-gradient(#AAA 20%, transparent, ${assets[index]?.backgroundColor})` }}>
              <p className="font-['Times'] xl:text-4xl lg:text-3xl md:text-2xl text-md font-bold ">Owned</p>
              {assets[index].balanceOf && (
                <p
                  className={`mt-1 font-semibold break-all brightness-50 ${
                    assets[index].balanceOf.length < 5 ? "text-8xl" : assets[index].balanceOf.length < 10 ? "text-3xl" : "text-xl"
                  }`}>
                  {assets[index].balanceOf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  {/* TO-DO need to fix formatting on this */}
                </p>
              )}
              <p className="text-3xl uppercase font-semibold brightness-50">{assets[index].assetSymbol}</p>
            </div>
          </div>
          {assets[index].isSelected && (
            <div className="absolute -top-14 right-1/2 translate-x-1/2 text-4xl">
              <Address address={assets[index].address} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletLSP7;
