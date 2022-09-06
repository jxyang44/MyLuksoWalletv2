//add vault to the universal profile address of the connected user
//prompts user input for vault address, which can be easily copy/pasted from the "Create Vault"

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useVaultContext } from "../../contexts/VaultContext";
import { VaultStep } from ".";
import swal from "sweetalert";

const AddVaultToUP = ({ recentVaultAddress }) => {
  const { currentAccount, fetchAddresses } = useProfileContext();
  const { isVault, addVaultToUP} = useVaultContext();
  const handleAddVault = () => {
    if (!currentAccount) return swal("You are not connected to an account.");
    swal(
      `Please enter the address of the vault to add to your profile.`,
      `Paste this address into the box below if you are unsure: \n${localStorage.getItem("recentLSP9Address")}`,
      {
        content: "input",
        button: true,
      }
    )
      .then(value => {
        if (value) {
          isVault(value).then(res => {
            if (!res) return swal(`${value} does not support the vault interface.`, "", "warning");
            addVaultToUP(value).then(res => {
              if (res) {
                swal(
                  `Congratulations! Your vault at address ${value} has been added to your account!`,
                  "Please wait a few seconds and refresh the page if the vault does not show up in your account.",
                  "success"
                );
                fetchAddresses(currentAccount); //adds vault to state
              }
            });
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
      buttonText="4. Add Vault to Universal Profile"
      buttonFunc={handleAddVault}
      inputLabel1="Most Recently Deployed Vault from this Browser"
      inputValue1={recentVaultAddress}
      inputLabel2="Universal Profile"
      inputValue2={currentAccount}
    />
  );
};

export default AddVaultToUP;
