//component for the selection panel under the wallet
//implements the drop hook from react-dnd
//TO-DO add vault name or color to display

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { AiOutlineWallet } from "react-icons/ai";
import { useDrop } from "react-dnd";
import { BsFillPersonLinesFill } from "react-icons/bs";

const WalletSliderIcon = ({ index }) => {
  const { accountAddresses, currentAccount } = useProfileContext();

  //styling for drag and drop
  function selectStyle(isActive, canDrop) {
    if (isActive) {
      //dragged item is placed on top of a valid drop box
      return "bg-green-500 scale-110 border-4 border-white rounded-lg";
    } else if (canDrop) {
      //highlights all droppable components for the dragged item
      return "bg-sky-500 rounded-lg border-4 border-white";
    } else {
      return "";
    }
  }

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ["LSP7", "LSP8"], //type of assets the droppable component can accept - defined in WalletLSP7.js and WalletLSP8.js
      drop: () => ({
        name: `${index === 0 ? currentAccount : accountAddresses.vaults[index - 1]}`, //index 0 is universal profile, vaults start from index 1
        allowedDropEffect: "move",
      }),
      collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    ["move"]
  );
  const isActive = canDrop && isOver;
  const style = selectStyle(isActive, canDrop);

  return (
    <div ref={drop} className={`flex flex-col xl:text-[6rem] md:text-[4rem] text-[1rem] text-white items-center ${style}`}>
      {index === 0 ? ( //if index is 0 show universal profile
        <>
          <BsFillPersonLinesFill />
          <div className="xl:text-base text-xs -translate-y-1 text-center">Universal Profile</div>
        </>
      ) : ( //otherwise show vault
        <>
          <AiOutlineWallet />
          <div className="xl:text-base text-xs -translate-y-1 text-center">
            Vault {accountAddresses.vaults[index - 1] && accountAddresses.vaults[index - 1].substring(0, 8)}...
          </div>
        </>
      )}
    </div>
  );
};

export default WalletSliderIcon;
