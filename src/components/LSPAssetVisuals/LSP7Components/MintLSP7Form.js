//mint form on back of LSP7 coin

import React, { useState } from "react";
import { Input } from "../..";
import { useAssetsContext } from "../../../contexts/AssetsContext";
const MintLSP7Form = ({ assetAddress,contract }) => {
  const [mintAmount, setMintAmount] = useState(0);
  const [mintToAddress, setMintToAddress] = useState("");
  const { mintLSP7 } = useAssetsContext();

  const mintInputs = [
    {
      label: "Mint Amount",
      placeholder: "0",
      type: "number",
      value: mintAmount,
      setValue: setMintAmount,
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
        customFunc={()=>mintLSP7(assetAddress, mintAmount, mintToAddress, contract)}
        buttonDescription="Mint"
        themeColor="from-green-500 to-green-600"
        themeText="text-green-700"
      />
    </div>
  );
};

export default MintLSP7Form;
