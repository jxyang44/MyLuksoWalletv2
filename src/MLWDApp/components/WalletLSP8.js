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

const WalletLSP8 = ({
  walletAddress,
  index,
  assets,
  setAssets,
  LSP,
  isCurrentlySelected,
  handleSelected,
}) => {
  const { currentAccount } = useProfileContext();
  const { transferLSP8 } = useAssetsContext();

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: LSP,
      item: ` ${assets[index].address} `,
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          if (dropResult.name === walletAddress)
            return swal(
              `"${assets[index].assetName}" (${assets[index].address}) is already in this wallet!`
            );
          swal(
            `Would you like to transfer "${assets[index].assetName}" (${assets[index].address}) from ${walletAddress} to ${dropResult.name}?`,
            {
              buttons: true,
            }
          ).then((res) => {
            if (res) {
              swal(
                `You currently own the tokenIds: (${assets[index].tokenIDsOf}).`,
                "Which token would you like to transfer?",
                {
                  content: "input",
                }
              ).then((input) => {
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
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [assets[index].address]
  );

  return (
    <>
      <div
        className={`relative w-12 ${!isCurrentlySelected && "opacity-0"}`}
        onClick={handleSelected}
      >
        <div
          className={`relative aspect-square w-[50vmax] ${
            assets[index].isSelected ? "selected-coin" : "tilted-coin"
          }`}
          ref={drag}
          style={{ opacity }}
        >
          <div
            className={`absolute top-0 flex aspect-square h-[35vmax] w-[50vmax] cursor-default flex-col items-center justify-start 
        rounded-lg border-2 border-white bg-black font-['Arial'] shadow-lg shadow-white`}
            style={{
              backgroundColor: assets[index]?.backgroundColor,
              color: assets[index]?.textColor,
            }}
          >
            <div className="lsp8-name  absolute top-1/2 text-center text-2xl font-semibold md:text-3xl lg:text-4xl xl:text-5xl">
              {assets[index].assetName}
            </div>

            {assets[index].assetIcon !== "" && (
              <div
                className={`absolute top-0 right-0 m-2 flex aspect-square w-[10%] items-center justify-center rounded-full p-2 opacity-50`}
              >
                <img
                  src={assets[index].assetIcon}
                  className="aspect-square w-full select-none rounded-full"
                ></img>
              </div>
            )}
            {assets[index].assetImage1 !== "" && (
              <div
                className={`absolute top-0 left-0 flex aspect-square w-[20%] items-center justify-center rounded-full p-2 opacity-50`}
              >
                <img
                  src={assets[index].assetImage1}
                  className="aspect-square w-full select-none rounded-full"
                ></img>
              </div>
            )}

            {!assets[index].isSelected && (
              <div className="border-4xl absolute left-0 bottom-0 m-4 max-w-[75%] overflow-hidden text-ellipsis whitespace-nowrap p-2 text-center text-sm shadow-inner shadow-white md:text-base lg:text-xl xl:text-2xl">
                Your token IDs: {assets[index].tokenIDsOf}
              </div>
            )}

            <div className="absolute top-1/2 flex aspect-square w-[50%] -translate-y-1/2 flex-col items-center justify-center overflow-x-auto rounded-xl text-center text-2xl shadow-lg shadow-white"></div>
            {assets[index].assetImage2 !== "" && (
              <div
                className={`absolute top-1/2 flex aspect-square w-[50%] -translate-y-1/2 items-center justify-center rounded-xl p-2 opacity-50`}
              >
                <img
                  src={assets[index].assetImage2 ?? assets[index].assetImage1}
                  className="aspect-square w-full select-none"
                ></img>
              </div>
            )}

            <p className="m-6 text-xl font-semibold uppercase brightness-200 md:text-3xl lg:text-5xl xl:text-7xl">
              {assets[index].assetSymbol}
            </p>
          </div>
          {assets[index].isSelected && (
            <>
              <div className="absolute -top-14 right-1/2 translate-x-1/2 text-4xl">
                <Address address={assets[index].address} />
              </div>
              <div className="absolute top-[36vmax] right-1/2 w-full translate-x-1/2 text-2xl">
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
