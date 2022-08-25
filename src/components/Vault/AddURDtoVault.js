import React, { useEffect, useState } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { VaultStep} from ".";
import {
  web3Provider,
  LSP6Contract,
  LSP9Contract,
  LSP10Schema,
  LSP1VaultContract,
  UniversalProfileContract,
  MM_PrivateKey,
  constants,
  createErc725Instance,
} from "../../utils/ERC725Config";
import swal from "sweetalert";

const DeployVault = ({ recentVaultAddress, setRecentVaultAddress }) => {
  const { web3Window, currentAccount, useRelay, executeViaKeyManager } = useProfileContext();

  //deploys vault and URD
  //https://docs.lukso.tech/guides/vault/create-a-vault
  //https://docs.lukso.tech/guides/vault/edit-vault-data
  const addURDToVault = () => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    const deployVault = async () => {
      try {
        const web3 = web3Window; 
        const myEOA = web3Provider.eth.accounts.wallet.add(MM_PrivateKey); // TO-DO note this needs to be private key of eoa controlling UP
        
        
        swal("Please confirm transaction to add URD to vault.", { button: false });
        const URD_DATA_KEY = constants.ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;
        const myVaultAddress = localStorage.getItem("recentLSP9Address");
        const myURDAddress =  localStorage.getItem("recentLSP9URDAddress");

        const myVault = new web3.eth.Contract(LSP9Contract.abi, myVaultAddress);
        const myUP = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);
        const setDataPayload = await myVault.methods["setData(bytes32,bytes)"](URD_DATA_KEY, myURDAddress).encodeABI();
        
        const executePayload = await myUP.methods.execute(
          0, 
          myVaultAddress,
          0, 
          setDataPayload
          )
          .encodeABI();

        const keyManagerAddress = await myUP.methods.owner().call();
      const keyManagerContract = new web3Window.eth.Contract(LSP6Contract.abi, keyManagerAddress);

        if (useRelay) {
          return executeViaKeyManager(myUP.methods.execute(0, myVaultAddress, 0, setDataPayload), "Transferring funds via Key Manager...");
        } else {
          return await keyManagerContract.methods.execute(executePayload).send({
            from: currentAccount,
            gasLimit: 600_000,
          });
        }
      } catch (error) {
        console.log(error);
        swal("Something went wrong.", JSON.stringify(error), "warning");
      }
    };

    deployVault().then(res => {
      const address = localStorage.getItem("recentLSP9Address");
      if (res) swal(`Congratulations! Your vault at address ${localStorage.getItem("recentLSP9Address")} now has ${localStorage.getItem("recentLSP9URDAddress")} assigned as the URD!`, "", "success");
    });
  };


  return (
    <VaultStep
        buttonText="3. Add URD to Vault"
        buttonFunc={addURDToVault}
        inputLabel1="Target Vault"
        inputValue1={localStorage.getItem("recentLSP9Address")}
        inputLabel2={"URD to Add"}
        inputValue2={localStorage.getItem("recentLSP9URDAddress")}
      />
      
      
  );
};

export default DeployVault;
