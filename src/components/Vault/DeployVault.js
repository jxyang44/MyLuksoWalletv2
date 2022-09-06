//deploys a vault and stores the address in localstorage
import React, { useState, useEffect } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { VaultStep } from ".";
import { useVaultContext } from "../../contexts/VaultContext";
import swal from "sweetalert";

const DeployVault = ({ recentVaultAddress, setRecentVaultAddress }) => {
  const { currentAccount } = useProfileContext();
  const { getOwner, deployVault } = useVaultContext();
  const [recentVaultOwner, setRecentVaultOwner] = useState("");
  const [ownerIsYou, setOwnerIsYou] = useState(false);

  useEffect(() => {
   
    getOwner(recentVaultAddress).then(res => {
      setRecentVaultOwner(res);
      res === currentAccount ? setOwnerIsYou(true) : setOwnerIsYou(false);
    });
  }, [recentVaultAddress, currentAccount]);

  const handleDeployVault = () => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    deployVault(setRecentVaultAddress).then(res => {
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
