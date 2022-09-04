//transfer form on back of LSP7 coin

import React, { useState} from "react";
import { Input } from "../..";
import { useAssetsContext } from "../../../contexts/AssetsContext";
import { useProfileContext } from "../../../contexts/ProfileContext";

const PermissionsLSP7 = ({ assetAddress, contract }) => {
  const {currentAccount} = useProfileContext();
  const [transferToAddress, setTransferToAddress] = useState("");
  //const [transferFromAddress, setTransferFromAddress] = useState("");
  const { transferOwnership } = useAssetsContext();

  const permissionsInputs = [
    {
      label: "Transfer Contract To:",
      placeholder: "0x...",
      type: "text",
      value: transferToAddress,
      setValue: setTransferToAddress,
    },
  ];

  return (
    <div className="flex flex-col animate-fadeInLeft">
      <Input
        fields={permissionsInputs}
        customFunc={()=>transferOwnership(assetAddress, transferToAddress)}
        buttonDescription="Transfer"
        themeColor="from-red-500 to-red-600"
        themeText="text-red-700"
      />
    </div>
  );
};

export default PermissionsLSP7;
