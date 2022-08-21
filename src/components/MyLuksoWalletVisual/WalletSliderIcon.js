import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { AiOutlineWallet } from "react-icons/ai";
import { useDrop } from "react-dnd";

const WalletSliderIcon = ({ index }) => {
  const { accountAddresses } = useProfileContext();

  function selectBackgroundColor(isActive, canDrop) {
    if (isActive) {
      return "#CCC";
    } else if (canDrop) {
      return "#475569";
    } else {
      return "";
    }
  }

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ["LSP7", "LSP8"],
      drop: () => ({
        name: `${accountAddresses.vaults[index]}`,
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
  const backgroundColor = selectBackgroundColor(isActive, canDrop);

  return (
    <div ref={drop} className="flex flex-col text-[6rem] text-white items-center" style={{ backgroundColor: backgroundColor }}>
        <AiOutlineWallet />
      <div className="text-base -translate-y-2 text-center">
        {accountAddresses.vaults[index] && accountAddresses.vaults[index].substring(0, 12)}
        {accountAddresses.vaults[index] && accountAddresses.vaults[index].length > 12 && "..."}
      </div>
    </div>
  );
};

export default WalletSliderIcon;
