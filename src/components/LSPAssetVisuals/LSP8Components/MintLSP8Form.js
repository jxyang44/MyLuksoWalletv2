//mint form LSP8 card

import React, { useState } from "react";
import { Input } from "../../";
import { useAssetsContext } from "../../../contexts/AssetsContext";

const MintLSP8Form = ({ assetAddress, contract }) => {
  const [tokenID, setTokenID] = useState(0);
  const [mintToAddress, setMintToAddress] = useState("");
  const { mintLSP8 } = useAssetsContext();

  const mintInputs = [
    {
      label: "Token ID",
      placeholder: "1",
      type: "text",
      value: tokenID,
      setValue: setTokenID,
    },
    {
      label: "Mint To Address",
      placeholder: "0x... (blank = UP address)",
      type: "text",
      value: mintToAddress,
      setValue: setMintToAddress,
    },
  ];

  return (
    <div className="flex flex-col animate-fadeInLeft">
      <Input
        fields={mintInputs}
        customFunc={() => mintLSP8(assetAddress, tokenID, mintToAddress, contract)}
        buttonDescription="Mint"
        themeColor="from-green-500 to-green-600"
        themeText="text-green-700"
      />
    </div>
  );
};

export default MintLSP8Form;
