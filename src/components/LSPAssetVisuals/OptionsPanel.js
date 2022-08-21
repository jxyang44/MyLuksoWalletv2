import React, { useState } from "react";
import { Address, ButtonShadow, Input, Alert, MintForm } from "..";

const OptionsPanel = ({ defaultPanel, isPanelActive, setIsPanelActive }) => {
  return (
    <div className="flex flex-row gap-1 scale-90 text-lg bg-black bg-opacity-80 rounded-lg p-1">
      |
      <button
        className="text-red-500 hover:text-white"
        onClick={() => setIsPanelActive({ ...defaultPanel, permissions: !isPanelActive.permissions })}>
        Permissions
      </button>
      |
      <button className="text-green-500 hover:text-white" onClick={() => setIsPanelActive({ ...defaultPanel, mint: !isPanelActive.mint })}>
        Mint
      </button>
      |
      <button className="text-blue-500 hover:text-white" onClick={() => setIsPanelActive({ ...defaultPanel, transfer: !isPanelActive.transfer })}>
        Transfer
      </button>
      |
    </div>
  );
};

export default OptionsPanel;
