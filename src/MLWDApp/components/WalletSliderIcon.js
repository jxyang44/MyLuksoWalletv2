//component for the selection panel under the wallet
//implements the drop hook from react-dnd
//TO-DO add vault name or color to display

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { AiOutlineWallet } from "react-icons/ai";
import { useDrop } from "react-dnd";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IPFS_GATEWAY } from "../../utils/luksoConfigs";
const WalletSliderIcon = ({ index }) => {
  const { accountAddresses, currentAccount, pendingProfileJSONMetadata } =
    useProfileContext();

  //styling for drag and drop
  function selectStyle(isActive, canDrop) {
    if (isActive) {
      //dragged item is placed on top of a valid drop box
      return "scale-110 border-4 border-white rounded-lg";
    } else if (canDrop) {
      //highlights all droppable components for the dragged item
      return "rounded-lg border-2 border-white";
    } else {
      return "";
    }
  }

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ["LSP7", "LSP8"], //type of assets the droppable component can accept - defined in WalletLSP7.js and WalletLSP8.js
      drop: () => ({
        name: `${
          index === 0 ? currentAccount : accountAddresses.vaults[index - 1]
        }`, //index 0 is universal profile, vaults start from index 1
        allowedDropEffect: "move",
      }),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    ["move"]
  );
  const isActive = canDrop && isOver;
  const style = selectStyle(isActive, canDrop);

  return (
    <div
      ref={drop}
      className={`flex flex-col items-center text-[1rem] text-white md:text-[4rem] xl:text-[6rem] ${style}`}
    >
      {index === 0 ? ( //if index is 0 show universal profile
        <>
          {pendingProfileJSONMetadata.profileImage.length > 0 ? (
            <img
              className="h-4 w-4 scale-90 rounded border-2 p-1 md:h-16 md:w-16 xl:h-24 xl:w-24"
              style={{
                borderColor: `${pendingProfileJSONMetadata.MLWUPColor ?? ""}`,
              }}
              src={pendingProfileJSONMetadata.profileImage[0].url?.replace(
                "ipfs://",
                IPFS_GATEWAY
              )}
            ></img>
          ) : (
            <div
              style={{
                color: `${pendingProfileJSONMetadata.MLWUPColor ?? ""}`,
              }}
            >
              <BsFillPersonLinesFill />
            </div>
          )}
          <div className="-translate-y-1 text-center text-xs xl:text-base">
            Profile
          </div>
        </>
      ) : (
        //otherwise show vault
        <>
          <div
            style={{
              color: `${
                pendingProfileJSONMetadata[
                  "MLW_Vault_" + accountAddresses.vaults[index - 1]
                ]?.vaultColor ?? ""
              }`,
            }}
          >
            <AiOutlineWallet />
          </div>
          <div className="contrast -translate-y-1 text-center text-xs xl:text-base">
            {pendingProfileJSONMetadata[
              "MLW_Vault_" + accountAddresses.vaults[index - 1]
            ]?.vaultName ??
              accountAddresses?.vaults[index - 1].substring(0, 8) + "..." ??
              "[Invalid Vault]"}
          </div>
        </>
      )}
    </div>
  );
};

export default WalletSliderIcon;
