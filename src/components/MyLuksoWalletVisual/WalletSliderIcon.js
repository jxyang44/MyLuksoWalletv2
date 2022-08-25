import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { AiOutlineWallet } from "react-icons/ai";
import { useDrop } from "react-dnd";
import { BsFillPersonLinesFill } from "react-icons/bs";
const WalletSliderIcon = ({ index }) => {
  const { accountAddresses,currentAccount } = useProfileContext();

  function selectStyle(isActive, canDrop) {
    if (isActive) {
      return "bg-green-500 scale-110 border-4 border-white rounded-lg";
    } else if (canDrop) {
      return "bg-sky-500 rounded-lg border-4 border-white";
    } else {
      return "";
    }
  }

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: ["LSP7", "LSP8"],
      drop: () => ({
        name: `${index===0 ? currentAccount : accountAddresses.vaults[index - 1]}`,
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
    <div ref={drop} className={`flex flex-col lg:text-[6rem] md:text-[4rem] text-[1rem] text-white items-center ${style}`}>
      {index === 0 ? (
        <>
          <BsFillPersonLinesFill />
          <div className="lg:text-base text-xs -translate-y-1 text-center">
           Universal Profile
          </div>
        </>
      ) : (
        <>
          <AiOutlineWallet />
          <div className="lg:text-base text-xs -translate-y-1 text-center">
            Vault {accountAddresses.vaults[index - 1] && accountAddresses.vaults[index - 1].substring(0, 8)}...
          </div>
        </>
      )}
    </div>
  );
};

export default WalletSliderIcon;
