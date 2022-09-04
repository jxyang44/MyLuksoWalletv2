//add vault to the universal profile address of the connected user
//prompts user input for vault address, which can be easily copy/pasted from the "Create Vault"

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { VaultStep } from ".";
import { LSP10Schema, UniversalProfileContract, createErc725Instance } from "../../utils/luksoConfigs";
import swal from "sweetalert";

const AddVaultToUP = ({ recentVaultAddress }) => {
  const { web3Window, currentAccount, useRelay, executeViaKeyManager, fetchAddresses, isVault } = useProfileContext();

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
            addVault(value).then(res => {
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

  async function addVault(vaultAddress) {
    try {
      swal("Adding vault to Universal Profile...", `Vault address: ${vaultAddress}`, { button: false, closeOnClickOutside: true });

      const web3 = web3Window;

      const erc725 = createErc725Instance(LSP10Schema, currentAccount); //LSP10Vaults[],LSP10VaultsMap:<address>

      // key1: length of LSP10Vaults[]
      const permissionsArray = await erc725.getData("LSP10Vaults[]");
      const addressLengthKey = permissionsArray.key; //0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06
      const currentPermissionsCount = permissionsArray?.value.length ?? 0;
      const newPermissionsCount = "0x" + ("0".repeat(64 - (currentPermissionsCount + 1).toString().length) + (currentPermissionsCount + 1));
      console.log(permissionsArray, currentPermissionsCount, newPermissionsCount, addressLengthKey);

      // key2: index of vault in LSP10Vaults[]
      const beneficiaryIndexKey = addressLengthKey.slice(0, 34) + "0000000000000000000000000000000" + currentPermissionsCount;
      const beneficiaryAddress = vaultAddress;

      const myUniversalProfile = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);
      const payloadFunction = await myUniversalProfile.methods["setData(bytes32[],bytes[])"](
        [
          addressLengthKey, // length of LSP10Vaults[]
          beneficiaryIndexKey, // index of vault in LSP10Vaults[]
        ],
        [newPermissionsCount, beneficiaryAddress]
      );

      console.log(payloadFunction);

      if (useRelay) {
        //use key manager
        return executeViaKeyManager(payloadFunction.encodeABI, "Adding vault to Universal Profile via key manager...");
      } else {
        //pay from account balance
        swal("Preparing transaction. Please confirm...", { button: false });
        return await payloadFunction.send({ from: currentAccount, gasLimit: 300_000 });
      }
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error), "warning");
    }
  }

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
