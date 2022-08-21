import React, { useState } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { ButtonShadow } from "../../components/";
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

const DeployVault = () => {
  const { web3Window, currentAccount, useRelay, executeViaKeyManager } = useProfileContext();
  const [deployedVaultAddress, setDeployedVaultAddress] = useState(""); //stores the most recent address of the deployed vault (will override with each deployment)
  
  
  //deploys vault and URD
  //https://docs.lukso.tech/guides/vault/create-a-vault
  //https://docs.lukso.tech/guides/vault/edit-vault-data
  //TO-DO update logic for KM
  const handleDeployVault = () => {
    const deployVault = async () => {
      try {
        let tempDeployedAddress;
        const web3 = useRelay ? web3Provider : web3Window; //determines web3 provider based on relay status (web3Provider is RPC; web3 is window.ethereum)
        const myEOA = web3Provider.eth.accounts.wallet.add(MM_PrivateKey);
        const addressUsed = useRelay ? myEOA.address : currentAccount; //determines account to use to pay gas
        const myURDVault = new web3.eth.Contract(LSP1VaultContract.abi);
        const myVault = new web3.eth.Contract(LSP9Contract.abi);

        swal("Creating vault...", { button: false, closeOnClickOutside: false });
        const deployedVault = await myVault
          .deploy({
            data: LSP9Contract.bytecode,
            arguments: [currentAccount],
          })
          .send({
            from: addressUsed,
            gas: 5_000_000,
            gasPrice: "1000000000",
          })
          .on("receipt", receipt => {
            console.log(receipt);
            tempDeployedAddress = receipt.contractAddress;
            setDeployedVaultAddress(receipt.contractAddress);
          })
          .once("sending", payload => console.log(payload))
          .on("error", error => console.log(error));

        swal("Deploying universal receiver delegate...", { button: false, closeOnClickOutside: false });
        const deployedURD = await myURDVault
          .deploy({
            data: LSP1VaultContract.bytecode,
          })
          .send({
            from: addressUsed,
            gas: 5_000_000,
            gasPrice: "1000000000",
          })
          .on("receipt", receipt => console.log(receipt))
          .once("sending", payload => console.log(payload))
          .on("error", error => console.log(error));

        swal("Adding universal receiver delegate to vault...", { button: false, closeOnClickOutside: false });
        const URD_DATA_KEY = constants.ERC725YKeys.LSP0.LSP1UniversalReceiverDelegate;
        const myVaultAddress = deployedVault.options.address;
        const myURDAddress = deployedURD.options.address;
        const myVault2 = new web3.eth.Contract(LSP9Contract.abi, myVaultAddress);
        const myUP = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);

        const setDataPayload = await myVault2.methods["setData(bytes32,bytes)"](URD_DATA_KEY, myURDAddress).encodeABI();
        const executePayload = await myUP.methods.execute(0, myVaultAddress, 0, setDataPayload).encodeABI();

        const myKeyManagerAddress = await myUP.methods.owner().call();

        let myKM = new web3.eth.Contract(LSP6Contract.abi, myKeyManagerAddress);

        await myKM.methods.execute(executePayload).send({
          from: addressUsed,
          gasLimit: 600_000,
        });

        return tempDeployedAddress;
      } catch (err) {
        console.log(err);
      }
    };

    deployVault().then(address => {
      console.log(address);
      addVault(address).then(res => {
        console.log(res);
        swal("Congratulations!", `Your vault at address ${address} has been created and added to your account!`, "success");
      });
    });
  };

  const handleAddVault = () => {
    if (!currentAccount) return swal("You are not connected to an account.");

    swal(`Please enter the address of the vault you would like to add to your profile:`, {
      content: "input",
      button: true,
    })
      .then(value => {
        if (value) {
          addVault().then(res => {
            console.log(res);
            swal("Congratulations!", `Your vault at address ${value} has been added to your account!`, "success");
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
    //must update 3 keys when granting permissions
    try {
      swal("Adding vault to Universal Profile...", `Vault address: ${vaultAddress}`, { button: false, closeOnClickOutside: true });

      const web3 = useRelay ? web3Provider : web3Window; //determines web3 provider based on relay status (web3Provider is RPC; web3 is window.ethereum)

      const erc725 = createErc725Instance(LSP10Schema, currentAccount); //LSP10Vaults[],LSP10VaultsMap:<address>

      // key1: length of LSP10Vaults[]
      const permissionsArray = await erc725.getData("LSP10Vaults[]");
      const addressLengthKey = permissionsArray.key; //0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06
      const currentPermissionsCount = permissionsArray?.value.length ?? 0;
      const newPermissionsCount = "0x" + ("0".repeat(64 - (currentPermissionsCount + 1).toString().length) + (currentPermissionsCount + 1));
      console.log(permissionsArray, currentPermissionsCount, newPermissionsCount, addressLengthKey);

      // key2: index of vault in LSP10Vaults[]
      const beneficiaryIndexKey = addressLengthKey.slice(0, 34) + "0000000000000000000000000000000" + currentPermissionsCount;
      const beneficiaryAddress = vaultAddress; // jxyang metamask dev account

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
        swal("Preparing for final transaction. Please confirm...", { button: false, closeOnClickOutside: false });
        return await payloadFunction.send({ from: currentAccount, gasLimit: 300_000 });
      }
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error), "warning");
    }
  }

  return (
    <>
      <div className="text-white">{deployedVaultAddress}</div>
      <ButtonShadow buttonText={"Deploy Vault"} buttonFunc={handleDeployVault} buttonColor={"bg-green-500"} buttonTextColor={"text-sky-800"} />
      <ButtonShadow buttonText={"Add Vault"} buttonFunc={handleAddVault} buttonColor={"bg-green-500"} buttonTextColor={"text-sky-800"} />
    </>
  );
};

export default DeployVault;
