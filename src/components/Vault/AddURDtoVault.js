//adds universal receiver to vault
//TO-DO currently asks the user to input their private key; future implementation will use the extension

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { VaultStep } from ".";
import { LSP6Contract, LSP9Contract, UniversalProfileContract, constants } from "../../utils/luksoConfigs";
import swal from "sweetalert";

const DeployVault = ({ recentVaultAddress, recentVaultURDAddress }) => {
  const { web3Window, currentAccount, useRelay, executeViaKeyManager } = useProfileContext();

  //deploys vault and URD
  //https://docs.lukso.tech/guides/vault/create-a-vault
  //https://docs.lukso.tech/guides/vault/edit-vault-data
  const addURDToVault = () => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    const deployVault = async privateKey => {
      try {
        const myEOA = web3Window.eth.accounts.wallet.add(privateKey);
        swal("Please wait... adding URD to vault.", { button: false });
        const URD_DATA_KEY = constants.ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;
        const myVaultAddress = localStorage.getItem("recentLSP9Address");
        const myURDAddress = localStorage.getItem("recentLSP9URDAddress");

        const myVault = new web3Window.eth.Contract(LSP9Contract.abi, myVaultAddress);
        const myUP = new web3Window.eth.Contract(UniversalProfileContract.abi, currentAccount);
        const setDataPayload = await myVault.methods["setData(bytes32,bytes)"](URD_DATA_KEY, myURDAddress).encodeABI();
        const executePayload = await myUP.methods.execute(0, myVaultAddress, 0, setDataPayload).encodeABI();

        const keyManagerAddress = await myUP.methods.owner().call();
        const keyManagerContract = new web3Window.eth.Contract(LSP6Contract.abi, keyManagerAddress);

        if (useRelay) {
          return executeViaKeyManager(myUP.methods.execute(0, myVaultAddress, 0, setDataPayload), "Adding URD to Vault via Key Manager...");
        } else {
          return await keyManagerContract.methods.execute(executePayload).send({
            from: myEOA.address,
            gasLimit: 600_000,
          });
        }
      } catch (error) {
        console.log(error);
        swal("Something went wrong.", JSON.stringify(error), "warning");
      }
    };

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
          deployVault(value).then(res => {
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
      buttonFunc={addURDToVault}
      inputLabel1="Target Vault"
      inputValue1={recentVaultAddress}
      inputLabel2={"URD to Add"}
      inputValue2={recentVaultURDAddress}
    />
  );
};

export default DeployVault;
