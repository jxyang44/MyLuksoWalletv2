//deploys a vault and stores the address in localstorage
import React, { useState, useEffect } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { VaultStep } from ".";
import { LSP9Contract, UniversalProfileContract, web3Provider } from "../../utils/luksoConfigs";
import swal from "sweetalert";

const DeployVault = ({ recentVaultAddress, setRecentVaultAddress }) => {
  const { web3Window, currentAccount } = useProfileContext();
  const [recentVaultOwner, setRecentVaultOwner] = useState("");
  const [ownerIsYou, setOwnerIsYou] = useState(false);

  useEffect(() => {
    const getOwner = async () => {
      const universalProfileContract = new web3Provider.eth.Contract(UniversalProfileContract.abi, recentVaultAddress);
      return await universalProfileContract.methods.owner().call();
    };
    getOwner().then(res => {
      setRecentVaultOwner(res);
      res === currentAccount ? setOwnerIsYou(true) : setOwnerIsYou(false);
    });
  }, [recentVaultAddress, currentAccount]);

  //deploys vault
  //https://docs.lukso.tech/guides/vault/create-a-vault
  //https://docs.lukso.tech/guides/vault/edit-vault-data
  const handleDeployVault = () => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    const deployVault = async () => {
      try {
        const myVault = new web3Window.eth.Contract(LSP9Contract.abi);

        return await myVault
          .deploy({
            data: LSP9Contract.bytecode,
            arguments: [currentAccount],
          })
          .send({
            from: currentAccount,
            gas: 5_000_000,
            gasPrice: "1000000000",
          })
          .on("receipt", receipt => {
            console.log(receipt);
            localStorage.setItem("recentLSP9Address", receipt.contractAddress);
            setRecentVaultAddress(receipt.contractAddress);
          })
          .once("sending", payload => {
            swal("Deploying vault", "The deployment process will begin once the transaction is confirmed. Please wait...", { button: false });
            console.log(payload);
          })
          .on("error", error => console.log(error));
      } catch (error) {
        console.log(error);
        swal("Something went wrong.", JSON.stringify(error), "warning");
      }
    };

    deployVault().then(res => {
      const address = localStorage.getItem("recentLSP9Address");
      if (res) swal(`Congratulations! Your vault at address ${address} has been deployed!`, "", "success");
    });
  };

  return (
    <VaultStep
      buttonText="1. Deploy Vault"
      buttonFunc={handleDeployVault}
      inputLabel1="Most Recently Deployed Vault from this Browser"
      inputValue1={recentVaultAddress}
      inputLabel2={`Vault Owner ${ownerIsYou ? "(Your UP is the Owner)" : ""}`}
      inputValue2={recentVaultOwner}
    />
  );
};

export default DeployVault;
