import React, { useState} from "react";
import { Input } from "..";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";

const Transfer = ({ assetAddress,contract, balanceOf }) => {
  const {currentAccount} = useProfileContext();
  const [transferAmount, setTransferAmount] = useState(0);
  const [transferToAddress, setTransferToAddress] = useState("");
  //const [transferFromAddress, setTransferFromAddress] = useState("");
  const { transferToken } = useAssetsContext();

  const transferInputs = [
    {
      label: "Transfer Amount",
      placeholder: "0",
      type: "number",
      value: transferAmount,
      setValue: setTransferAmount,
      min: 0,
      max: balanceOf
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
    <div className="flex flex-col animate-fadeInLeft">
      <Input
        fields={transferInputs}
        customFunc={()=>transferToken(assetAddress, transferAmount, transferToAddress, contract, currentAccount, balanceOf)}
        buttonDescription="Transfer"
        themeColor="from-blue-500 to-blue-600"
        themeText="text-blue-700"
      />
    </div>
  );
};

export default Transfer;
