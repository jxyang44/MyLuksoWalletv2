import React, { useEffect, useState } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { IPFS_GATEWAY, LSP4Schema, LSP7MintableContract, LSP8MintableContract, web3Provider, LSP9Contract } from "../../utils/ERC725Config";
import { Address } from "../../components";
import { Name, Background } from "../LSPAssetVisuals/LSP7Components";
import { useDrag } from "react-dnd";
import swal from "sweetalert";

const WalletLSP8 = ({ walletAddress, index, assets, setAssets, LSP, isCurrentlySelected, handleSelected }) => {
  const { web3Window, currentAccount } = useProfileContext();
  const { transferLSP8, getTokenIdsOf } = useAssetsContext();

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: LSP,
      item: ` ${assets[index].address} `,
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          if (dropResult.name === walletAddress) return swal(`"${assets[index].assetName}" (${assets[index].address}) is already in this wallet!`);
          // swal(`Would you like to transfer "${assets[index].assetName}" (${item.assets[index].address}) from ${walletAddress} to ${dropResult.name}?`, {content: "input"})
          console.log(assets[index].assetName);
          swal(`Would you like to transfer "${assets[index].assetName}" (${assets[index].address}) from ${walletAddress} to ${dropResult.name}?`, {
            buttons: true,
          }).then(res => {
            if (res)
              getTokenIdsOf(assets[index].address, walletAddress).then(res => {
                console.log(web3Window.utils.toAscii(res))
                
                swal(`You currently own the tokenIds: ${web3Window.utils.toAscii(res)}.`, "Which token would you like to transfer?", {
                  content: "input",
                }).then(input => {
                  if (!input) return swal("", "No input provided.", "error");
                  //TO-DO check
                  console.log(assets[index].address, input, dropResult.name, LSP8MintableContract, walletAddress, assets[index].balanceOf);
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
              });
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
              <p className="font-['Times'] text-4xl font-bold ">Owned</p>
              {assets[index].balanceOf && (
                <p
                  className={`mt-1 font-semibold break-all brightness-50 ${
                    assets[index].balanceOf.length < 5 ? "text-8xl" : assets[index].balanceOf.length < 10 ? "text-3xl" : "text-xl"
                  }`}>
                  {assets[index].balanceOf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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

export default WalletLSP8;
