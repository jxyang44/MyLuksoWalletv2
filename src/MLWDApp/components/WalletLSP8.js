//LSP8 mini card - holds logic for expanding the image, dragging and dropping
//refer to WalletLSP7 for comments - the logic is similar

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { LSP8MintableContract } from "../../utils/luksoConfigs";
import { Address } from "../../components";
import { useDrag } from "react-dnd";
import "../MyLuksoWallet.css";
import swal from "sweetalert";

const WalletLSP8 = ({ walletAddress, index, assets, setAssets, LSP, isCurrentlySelected, handleSelected }) => {
  const { currentAccount } = useProfileContext();
  const { transferLSP8 } = useAssetsContext();

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: LSP,
      item: ` ${assets[index].address} `,
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          if (dropResult.name === walletAddress) return swal(`"${assets[index].assetName}" (${assets[index].address}) is already in this wallet!`);
          swal(`Would you like to transfer "${assets[index].assetName}" (${assets[index].address}) from ${walletAddress} to ${dropResult.name}?`, {
            buttons: true,
          }).then(res => {
            if (res) {
              swal(`You currently own the tokenIds: (${assets[index].tokenIDsOf}).`, "Which token would you like to transfer?", {
                content: "input",
              }).then(input => {
                if (!input) return swal("", "No input provided.", "error");
                transferLSP8(
                  assets[index].address,
                  input,
                  dropResult.name,
                  LSP8MintableContract,
                  walletAddress,
                  assets[index].balanceOf,
                  walletAddress === currentAccount ? false : true
                );
              });
            }
          });
        }
      },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [assets[index].address]
  );

  return (
    <>
      <div className={`relative w-12 ${!isCurrentlySelected && "opacity-0"}`} onClick={handleSelected}>
        <div
          className={`w-[50vmax] aspect-square relative ${assets[index].isSelected ? "selected-coin" : "tilted-coin"}`}
          ref={drag}
          style={{ opacity }}>
          <div
            className={`font-['Arial'] cursor-default absolute w-[50vmax] h-[35vmax] aspect-square border-2 border-white top-0 rounded-lg 
        flex flex-col shadow-lg shadow-white items-center justify-start bg-black`}
            style={{ backgroundColor: assets[index]?.backgroundColor, color: assets[index]?.textColor }}>
            <div className="absolute  xl:text-5xl lg:text-4xl md:text-3xl text-2xl top-1/2 text-center font-semibold lsp8-name">{assets[index].assetName}</div>

            {assets[index].assetIcon !== "" && (
              <div className={`absolute top-0 right-0 w-[10%] m-2 aspect-square flex justify-center items-center rounded-full opacity-50 p-2`}>
                <img src={assets[index].assetIcon} className="w-full aspect-square select-none rounded-full"></img>
              </div>
            )}
            {assets[index].assetImage1 !== "" && (
              <div className={`absolute top-0 left-0 w-[20%] aspect-square flex justify-center items-center rounded-full opacity-50 p-2`}>
                <img src={assets[index].assetImage1} className="w-full aspect-square select-none rounded-full"></img>
              </div>
            )}

{!assets[index].isSelected &&
            <div className="absolute left-0 bottom-0 xl:text-2xl lg:text-xl md:text-base text-sm text-center p-2 m-4 max-w-[75%] text-ellipsis border-4xl shadow-white shadow-inner whitespace-nowrap overflow-hidden">
              Your token IDs: {assets[index].tokenIDsOf}
            </div>}

            <div className="absolute flex flex-col items-center top-1/2 -translate-y-1/2 text-2xl w-[50%] aspect-square overflow-x-auto justify-center rounded-xl text-center shadow-white shadow-lg"></div>
            {assets[index].assetImage2 !== "" && (
              <div className={`absolute top-1/2 -translate-y-1/2 w-[50%] aspect-square flex justify-center items-center rounded-xl opacity-50 p-2`}>
                <img src={assets[index].assetImage2} className="w-full aspect-square select-none"></img>
              </div>
            )}
            
            <p className="xl:text-7xl lg:text-5xl md:text-3xl text-xl m-6 uppercase font-semibold brightness-200">{assets[index].assetSymbol}</p>
          </div>
          {assets[index].isSelected && (
            <><div className="absolute -top-14 right-1/2 translate-x-1/2 text-4xl">
              <Address address={assets[index].address} />
            </div>
              <div className="absolute top-[36vmax] right-1/2 translate-x-1/2 text-2xl w-full">
              Your token IDs: {assets[index].tokenIDsOf}
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletLSP8;
