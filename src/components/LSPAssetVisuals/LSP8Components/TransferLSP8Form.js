//transfer form on LSP8 card

import React, { useState } from "react";
import { Input } from "../..";
import { useAssetsContext } from "../../../contexts/AssetsContext";
import { useProfileContext } from "../../../contexts/ProfileContext";
const TransferLSP8 = ({ assetAddress, contract, balanceOf }) => {
  const { currentAccount } = useProfileContext();
  const [tokenID, setTokenID] = useState(0);
  const [transferToAddress, setTransferToAddress] = useState("");
  //const [transferFromAddress, setTransferFromAddress] = useState("");
  const { transferLSP8 } = useAssetsContext();

  const transferInputs = [
    {
      label: "Token ID",
      placeholder: "1",
      type: "text",
      value: tokenID,
      setValue: setTokenID,
    },
    // {
    //   label: "Transfer from Address",
    //   placeholder: "0x... (blank = UP address)",
    //   type: "text",
    //   value: transferFromAddress,
    //   setValue: setTransferFromAddress,
    // },
    {
      label: "Transfer to Address",
      placeholder: "0x... (blank = UP address)",
      type: "text",
      value: transferToAddress,
      setValue: setTransferToAddress,
    },
  ];

  return (
    <div className="flex animate-fadeInLeft flex-col">
      <Input
        fields={transferInputs}
        customFunc={() =>
          transferLSP8(
            assetAddress,
            tokenID,
            transferToAddress,
            contract,
            currentAccount,
            balanceOf
          )
        }
        buttonDescription="Transfer"
        themeColor="from-blue-500 to-blue-600"
        themeText="text-blue-700"
      />
    </div>
  );
};

export default TransferLSP8;
