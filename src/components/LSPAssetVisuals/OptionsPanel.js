//component for mint/transfer/permissions panel

import React from "react";

const OptionsPanel = ({ defaultPanel, isPanelActive, setIsPanelActive }) => {
  return (
    <div className="flex scale-90 flex-row gap-1 rounded-lg bg-black bg-opacity-80 p-1 text-sm xl:text-lg">
      |
      <button
        className="text-red-500 hover:text-white"
        onClick={() =>
          setIsPanelActive({
            ...defaultPanel,
            permissions: !isPanelActive.permissions,
          })
        }
      >
        Permissions
      </button>
      |
      <button
        className="text-green-500 hover:text-white"
        onClick={() =>
          setIsPanelActive({ ...defaultPanel, mint: !isPanelActive.mint })
        }
      >
        Mint
      </button>
      |
      <button
        className="text-blue-500 hover:text-white"
        onClick={() =>
          setIsPanelActive({
            ...defaultPanel,
            transfer: !isPanelActive.transfer,
          })
        }
      >
        Transfer
      </button>
      |
    </div>
  );
};

export default OptionsPanel;
