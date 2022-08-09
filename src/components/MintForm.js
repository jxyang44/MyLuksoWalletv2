import React, { useState } from "react";
import { Input, Alert } from ".";
import { useAssetsContext } from "../contexts/AssetsContext";
import { useProfileContext } from "../contexts/ProfileContext";
import { web3, LSP7MintableContract } from "../utils/ERC725Config";

const MintForm = ({ assetAddress }) => {
  const [isAlertActive, setIsAlertActive] = useState(false);
  const [mintAmount, setMintAmount] = useState(0);
  const [alert, setAlert] = useState();
  const { currentAccount } = useProfileContext();

  const mintToken = () => {
    console.log("mintToken");
    //add logic for supply
    const assetContract = new web3.eth.Contract(LSP7MintableContract.abi, assetAddress);
    const mintFunction = async () => {
      try {
        console.log(mintAmount.toString(), assetAddress, currentAccount);
        const amount = web3.utils.toWei(mintAmount.toString());
        console.log(amount);
        const force = false; // When set to TRUE, to may be any address; when set to FALSE to must be a contract that supports LSP1 UniversalReceiver and not revert.
        const data = "0x";

        console.log(assetContract);
        const mint = await assetContract.methods
          .mint(currentAccount, amount, force, data)
          .send({ from: currentAccount });

        return mint;
      } catch (err) {
        setAlert(err.toString());
        setIsAlertActive(true);
      }
    };

    mintFunction().then(res => console.log(res));
  };

  return (
    <div className="flex flex-col w-2/6 animate-fadeInLeft">
      {isAlertActive && <Alert type="error" text={alert} setIsAlertActive={setIsAlertActive} />}
      <Input
        field="Mint Amount"
        placeholder="0"
        type="number"
        value={mintAmount}
        setValue={setMintAmount}
        customFunc={mintToken}
        buttonDescription="Mint"
        themeColor="from-green-500 to-green-600"
        themeText="text-green-700"
      />
    </div>
  );
};

export default MintForm;
