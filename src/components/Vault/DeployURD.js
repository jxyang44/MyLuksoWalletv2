//deploys a URD and stores the address in localstorage

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { VaultStep } from ".";
import { useVaultContext } from "../../contexts/VaultContext";
import swal from "sweetalert";

const DeployURD = ({ recentVaultURDAddress, setRecentVaultURDAddress }) => {
  const { currentAccount } = useProfileContext();
const {deployVaultURD} = useVaultContext();
  const handleDeployVaultURD = () => {
    if (currentAccount === "")
      return swal("Please connect to a Universal Profile.", "", "warning");
    deployVaultURD(setRecentVaultURDAddress).then((res) => {
      if (res)
        swal(
          `Congratulations! Your URD at address ${recentVaultURDAddress} has deployed!`,
          "",
          "success"
        );
    });
  };

  return (
    <VaultStep
      buttonText="2. Deploy Vault URD"
      buttonFunc={handleDeployVaultURD}
      inputLabel1="Most Recently Deployed Vault URD from this Browser"
      inputValue1={recentVaultURDAddress}
    />
  );
};

export default DeployURD;
