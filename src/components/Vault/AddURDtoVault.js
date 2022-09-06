//adds universal receiver to vault
//TO-DO currently asks the user to input their private key; future implementation will use the extension

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { VaultStep } from ".";
import { useVaultContext } from "../../contexts/VaultContext";
import swal from "sweetalert";

const AddURDToVault = ({ recentVaultAddress, recentVaultURDAddress }) => {
  const { currentAccount } = useProfileContext();
  const { addURDToVaultFunc } = useVaultContext();

  const handleAddURDToVault = () => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");

    swal(
      `Hackathon Note: Manual input of a private key is not safe. \nWe are working to move this feature to the backend. 👷`,
      `Please enter the browser extension private key:`,
      {
        content: "input",
        button: true,
      }
    )
      .then(value => {
        if (value) {
          addURDToVaultFunc(value).then(res => {
            if (res)
              swal(
                `Congratulations! Your vault at address ${recentVaultAddress} now has ${recentVaultURDAddress} assigned as the URD!`,
                "",
                "success"
              );
          });
        } else {
          swal("No input detected.");
        }
      })
      .catch(() => {
        swal("Something went wrong.", "Please try again later.", "warning");
      });
  };

  return (
    <VaultStep
      buttonText="3. Add URD to Vault 👷"
      buttonFunc={handleAddURDToVault}
      inputLabel1="Target Vault"
      inputValue1={recentVaultAddress}
      inputLabel2={"URD to Add"}
      inputValue2={recentVaultURDAddress}
    />
  );
};

export default AddURDToVault;
