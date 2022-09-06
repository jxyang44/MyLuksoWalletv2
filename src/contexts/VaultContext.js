//context provider to manage extension connection, Universal Profile state, vault settings, permissions, and key manager
//TO-DO organize these into separate contexts - this is getting messy

import React, { createContext, useContext } from "react";

import {
  UniversalProfileContract,
  LSP9Contract,
  web3Provider,
  LSP6Schema,
  LSP1VaultContract,
  INTERFACE_IDS,
  constants,
  LSP6Contract,
  LSP10Schema
} from "../utils/luksoConfigs";
import { useProfileContext } from "./ProfileContext";
import swal from "sweetalert";

const VaultContext = createContext();

export const VaultProvider = ({ children }) => {
  const { currentAccount, createErc725Instance, web3Window, useRelay, executeViaKeyManager } = useProfileContext();

  //  ------------------------------------------------------  //
  //  ------------------  VAULT FUNCTIONS ------------------  //
  //  ------------------------------------------------------  //

  //@desc checks if the walletAddress implements the vault interface
  //@param walletAddress the address of the wallet to check
  //@returns a promise resolving to a boolean
  const isVault = async walletAddress => {
    try {
      const contractInstance = new web3Provider.eth.Contract(LSP9Contract.abi, walletAddress);
      return await contractInstance.methods.supportsInterface(INTERFACE_IDS["LSP9Vault"]).call();
    } catch (err) {
      console.log(err);
      swal("Warning! Could not determine if this address supports the LSP9Vault interface.", "Proceed with caution.", "warning");
    }
  };

  //@desc fetches the allowed addresses associated a permissioned account linked to the universal profile
  //@param thirdPartyAddress the address to check permissions for
  //@returns an array of addresses that thirdPartyAddress has permissions for
  const getAllowedAddresses = async thirdPartyAddress => {
    try {
      const erc725 = createErc725Instance(LSP6Schema, currentAccount);
      const allowedAddressPermissions = await erc725.getData({
        keyName: "AddressPermissions:AllowedAddresses:<address>",
        dynamicKeyParts: thirdPartyAddress,
      });
      return allowedAddressPermissions.value;
    } catch (err) {
      console.log(err);
    }
  };

  //@desc gives an address permissions in the "AddressPermissions:AllowedAddresses<address>" key
  //@param thirdPartyAddress the address to check permissions for
  //@param allowedAddresses an array of addresses to give thirdPartyAddress permissions to
  //@return a promise resolving to the transaction
  const setAllowedAddresses = async (thirdPartyAddress, allowedAddresses) => {
    if (!thirdPartyAddress) return swal("No permissioned address detected.", "", "warning");
    try {
      const myUP = new web3Window.eth.Contract(UniversalProfileContract.abi, currentAccount);
      const allowedAddressesDataKey = constants.ERC725YKeys.LSP6["AddressPermissions:AllowedAddresses"] + thirdPartyAddress.substring(2);
      const arrayOfAddresses = web3Window.eth.abi.encodeParameter("address[]", allowedAddresses);
      return await myUP.methods["setData(bytes32,bytes)"](allowedAddressesDataKey, arrayOfAddresses).send({
        from: currentAccount,
        gasLimit: 600_000,
      });
    } catch (err) {
      console.log(err);
    }
  };


  //deploys vault and URD
  //https://docs.lukso.tech/guides/vault/create-a-vault
  //https://docs.lukso.tech/guides/vault/edit-vault-data
  const deployVault = async setRecentVaultAddress => {
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

  const deployVaultURD = async setRecentVaultURDAddress => {
    try {
      const myURDVault = new web3Window.eth.Contract(LSP1VaultContract.abi);
      return await myURDVault
        .deploy({
          data: LSP1VaultContract.bytecode,
        })
        .send({
          from: currentAccount,
          gas: 5_000_000,
          gasPrice: "1000000000",
        })
        .on("receipt", receipt => {
          console.log(receipt);
          localStorage.setItem("recentLSP9URDAddress", receipt.contractAddress);
          setRecentVaultURDAddress(receipt.contractAddress);
        })
        .once("sending", payload => {
          swal(
            "Deploying vault universal receiver delegate.",
            "The deployment process will begin once the transaction is confirmed. Please wait...",
            { button: false }
          );
          console.log(payload);
        })
        .on("error", error => console.log(error));
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error), "warning");
    }
  };

  const addURDToVaultFunc = async privateKey => {
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

  async function addVaultToUP(vaultAddress) {
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
        return await payloadFunction.send({
          from: currentAccount,
          gasLimit: 300_000,
        });
      }
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error), "warning");
    }
  }

  const getOwner = async address => {
    const universalProfileContract = new web3Provider.eth.Contract(UniversalProfileContract.abi, address);
    return await universalProfileContract.methods.owner().call();
  };

  return (
    <VaultContext.Provider
      value={{
        isVault,
        getAllowedAddresses,
        setAllowedAddresses,
        deployVault,
        deployVaultURD,
        addURDToVaultFunc,
        addVaultToUP,
        getOwner,
      }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVaultContext = () => useContext(VaultContext);
