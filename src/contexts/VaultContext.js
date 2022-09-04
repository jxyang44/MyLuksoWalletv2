//context provider to manage extension connection, Universal Profile state, vault settings, permissions, and key manager
//TO-DO organize these into separate contexts - this is getting messy

import React, { useState, createContext, useContext } from "react";
import Web3 from "web3";
import {
  LSP3Schema,
  UniversalProfileContract,
  LSP6Contract,
  LSP9Contract,
  web3Provider,
  LSP6Schema,
  LSP1Schema,
  LSP10Schema,
  createErc725Instance,
  INTERFACE_IDS,
  constants,
} from "../utils/luksoConfigs";
import { useStateContext } from "./StateContext";
import swal from "sweetalert";

const VaultContext = createContext();
const { ethereum } = window;
export let web3Window;

export const VaultProvider = ({ children }) => { 


  const { setTheme, setUPColor, setUPTextColor, setThemeDefaults } = useStateContext(); //state variables for website themes, fetched from UP metadata
  const [currentAccount, setCurrentAccount] = useState(""); // current UP address
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); // true if profile metadata is fetched
  const [profileJSONMetadata, setProfileJSONMetadata] = useState(defaultMetadata); // profile metadata - should always be in sync with JSON metadata on IPFS
  const [pendingProfileJSONMetadata, setPendingProfileJSONMetadata] = useState(defaultMetadata); // keeps track of pending profile metadata that the user makes locally, but hasn't committed to uploading to the blockchain
  const [useRelay, setUseRelay] = useState(false); // true if user has enabled relay transaction service
  const [accountAddresses, setAccountAddresses] = useState(defaultAddresses); // stores permissions, URD, vault, and key manager addresses for the connected UP

 
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

  //  ------------------------------------------------------  //
  //  --------------------  PERMISSIONS --------------------  //
  //  ------------------------------------------------------  //

  //@desc adds a new permission to the account - contains conditional logic for both UP and vaults
  //@addressFrom the address of your account (UP or vault) that needs permissions managed
  //@addressTo the address of the beneficiary account that permissions should be granted/modified/removed from
  //@permissions decoded permissions JSON object to be changed
  //@return a promise that resolves to the executed transaction
  async function addNewPermission(addressFrom, addressTo, permissions) {
    if (!currentAccount) return swal("You are not connected to an account.", "", "warning");
    if (!addressFrom || !addressTo || !permissions) return swal("A required address was not provided.", "", "warning");
    try {
      swal(`Adding new permissions for ${addressTo} to ${addressFrom}...`, { button: false });

      const erc725 = createErc725Instance(LSP6Schema, addressFrom);

      //3 items need to be updated for adding a new permissions (comments below)

      //key1: increment length of AddressPermissions[]
      const permissionsArray = await erc725.getData("AddressPermissions[]");
      const addressLengthKey = permissionsArray.key; //0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3
      const currentPermissionsCount = permissionsArray?.value.length ?? 0;
      const newPermissionsCount = "0x" + ("0".repeat(64 - (currentPermissionsCount + 1).toString().length) + (currentPermissionsCount + 1));

      //key2: get index of beneficiary in AddressPermissions[]
      const beneficiaryIndexKey = addressLengthKey.slice(0, 34) + "0000000000000000000000000000000" + currentPermissionsCount;
      const beneficiaryAddress = addressTo;

      //console.log(permissionsArray, currentPermissionsCount, newPermissionsCount, addressLengthKey);

      //key3: permissions of the beneficiary address
      swal("Encoding permissions...", { button: false });
      const beneficiaryPermissions = erc725.encodePermissions(permissions);
      const data = erc725.encodeData({
        keyName: "AddressPermissions:Permissions:<address>",
        dynamicKeyParts: beneficiaryAddress,
        value: beneficiaryPermissions,
      });

      const myUniversalProfile = new web3Window.eth.Contract(UniversalProfileContract.abi, currentAccount);

      if (currentAccount === addressFrom) {
        //if the address is the Universal Profile, send directly from the extension
        swal("Adding permissions. Please confirm...", { button: false });
        return await myUniversalProfile.methods["setData(bytes32[],bytes[])"](
          [
            addressLengthKey, // length of AddressPermissions[]
            beneficiaryIndexKey, // index of beneficiary in AddressPermissions[]
            data.keys[0], // permissions of the beneficiary
          ],
          [newPermissionsCount, beneficiaryAddress, data.values[0]]
        ).send({ from: currentAccount, gasLimit: 300_000 });
      } else {
        //if the address is a vault, execute via key manager
        const myVault = new web3Window.eth.Contract(LSP9Contract.abi, addressFrom);
        const myUP = new web3Window.eth.Contract(UniversalProfileContract.abi, currentAccount);
        const setDataPayload = myVault.methods["setData(bytes32[],bytes[])"](
          [
            addressLengthKey, // length of AddressPermissions[]
            beneficiaryIndexKey, // index of beneficiary in AddressPermissions[]
            data.keys[0], // permissions of the beneficiary
          ],
          [newPermissionsCount, beneficiaryAddress, data.values[0]]
        ).encodeABI();
        const executePayload = await myUP.methods.execute(0, addressFrom, 0, setDataPayload);
        executeViaKeyManager(executePayload.encodeABI, `Please wait. Adding permissions via key manager...`, "Your permissions were added!");
      }
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error), "warning");
    }
  }

  //@desc updates permissions for an existing account - contains conditional logic for both UP and vaults
  //@addressFrom the address of your account (UP or vault) that needs permissions managed
  //@addressTo the address of the beneficiary account that permissions should be granted/modified/removed from
  //@permissions decoded permissions JSON object to be changed
  //@return a promise that resolves to the executed transaction
  async function updateExistingPermission(addressFrom, addressTo, permissions) {
    if (!currentAccount) return swal("You are not connected to an account.", "", "warning");
    if (!addressFrom || !addressTo || !permissions) return swal("A required address was not provided.", "", "warning");
    try {
      swal(`Updating permissions for ${addressTo} on ${addressFrom}...`, { button: false });

      const erc725 = createErc725Instance(LSP6Schema, addressFrom);

      swal("Encoding permissions...", { button: false });
      const beneficiaryAddress = addressTo;

      const beneficiaryPermissions = erc725.encodePermissions(permissions);

      const data = erc725.encodeData({
        keyName: "AddressPermissions:Permissions:<address>",
        dynamicKeyParts: beneficiaryAddress,
        value: beneficiaryPermissions,
      });

      const myUniversalProfile = new web3Window.eth.Contract(UniversalProfileContract.abi, currentAccount);

      if (currentAccount === addressFrom) {
        //if the address is the Universal Profile, send directly from the extension
        swal("Updating permissions. Please confirm...", { button: false });
        return await myUniversalProfile.methods["setData(bytes32,bytes)"](data.keys[0], data.values[0]).send({
          from: currentAccount,
          gasLimit: 300_000,
        });
      } else {
        //if the address is a vault, execute via key manager
        const myVault = new web3Window.eth.Contract(LSP9Contract.abi, addressFrom);
        const myUP = new web3Window.eth.Contract(UniversalProfileContract.abi, currentAccount);
        const setDataPayload = myVault.methods["setData(bytes32,bytes)"](data.keys[0], data.values[0]).encodeABI();
        const executePayload = await myUP.methods.execute(0, addressFrom, 0, setDataPayload);
        executeViaKeyManager(executePayload.encodeABI, `Please wait. Updating permissions via key manager...`, "Your permissions were updated!");
      }
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error), "warning");
    }
  }

  return (
    <VaultContext.Provider
      value={{
        defaultMetadata,
        connectProfile,
        loginWithKey,
        connectProfileUsingUPAddress,
        currentAccount,
        setCurrentAccount,
        profileJSONMetadata,
        setProfileJSONMetadata,
        pendingProfileJSONMetadata,
        setPendingProfileJSONMetadata,
        isProfileLoaded,
        setIsProfileLoaded,
        maxImageIndex,
        disconnectUPExtension,
        fetchProfileMetadata,
        web3Window,
        useRelay,
        setUseRelay,
        executeViaKeyManager,
        accountAddresses,
        setAccountAddresses,
        getPermissionsOfAddresses,
        fetchAddresses,
        getAccountType,
        addNewPermission,
        updateExistingPermission,
        isVault,
        getAllowedAddresses,
        setAllowedAddresses,
      }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVaultContext = () => useContext(VaultContext);
