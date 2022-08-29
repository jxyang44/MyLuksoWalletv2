//context provider for account balance, LSP7, and LSP8 related functions

import React, { useState, createContext, useContext } from "react";
import {
  web3,
  INTERFACE_IDS,
  LSP3Schema,
  LSP4Schema,
  LSP4Contract,
  LSP7Contract,
  LSP7MintableContract,
  LSP8MintableContract,
  LSP9Contract,
  UniversalProfileContract,
  IPFS_GATEWAY,
  createErc725Instance,
} from "../utils/luksoConfigs";
import { useProfileContext } from "./ProfileContext";
import swal from "sweetalert";
require("isomorphic-fetch");

const AssetsContext = createContext();

export const AssetsProvider = ({ children }) => {
  const { currentAccount, web3Window, useRelay, executeViaKeyManager } = useProfileContext();
  const [accountBalance, setAccountBalance] = useState(0); // LYX balance of UP
  const [receivedAssets, setReceivedAssets] = useState(""); // array of all LSP5 Received Assets for the connected Universal Profile
  const [issuedAssets, setIssuedAssets] = useState(""); // array of all LSP12 Issued Assets for the connected Universal Profile

  // @desc sets accountBalance for universal profile - function should not be called on any address other than the connected UP
  // @param UPAddress - address of profile
  // @return sets accountBalance state
  const updateAccountBalance = async UPAddress => {
    const balance = web3.utils.fromWei(await web3.eth.getBalance(UPAddress));
    setAccountBalance(balance);
    return;
  };

  // @desc used to decode token name or symbol
  // @param assetAddress address of LSP7 or LSP8
  // @param assetKey (e.g. LSP4Schema[1].key, LSP4Schema[2].key)
  // @return promise with token name or symbol
  const getAssetByKey = async (assetAddress, assetKey) => {
    const assetData = await getAssetData(assetKey, assetAddress);
    return await decodeAssetData(assetKey, assetData, assetAddress);
  };

  // @desc used to retrieve the assets tied to a specific address and assetType
  // @param address Universal Profile address
  // @param assetType LSP5ReceivedAssets[], LSP12IssuedAssets[]
  // @returns Promise of array of asset addresses
  async function fetchAllAssets(address, assetType) {
    try {
      const profile = createErc725Instance(LSP3Schema, address);
      const result = await profile.fetchData(assetType);
      assetType === "LSP5ReceivedAssets[]" && setReceivedAssets(result.value);
      assetType === "LSP12IssuedAssets[]" && setIssuedAssets(result.value);
      return result.value;
    } catch (error) {
      return console.log(error);
    }
  }

  // @desc checks if a supplied contract supports a particular interface
  // @param assetAddress smart contract address of the asset
  // @param interfaceType contract used for contract to InterfaceId mapping (current implementation uses InterfaceId = LSP7DigitalAsset or InterfaceId = LSP8IdentifiableDigitalAsset)
  // @returns Promise of type boolean; true if assetAddress supports a specific interface, otherwise false
  const supportsInterface = async (assetAddress, interfaceType) => {
    try {
      const contractInstance = new web3.eth.Contract(LSP4Contract.abi, assetAddress);
      return await contractInstance.methods.supportsInterface(INTERFACE_IDS[interfaceType]).call();
    } catch (error) {
      return console.log("Contract could not be checked for interface");
    }
  };

  // code from https://github.com/lukso-network/lukso-playground/blob/main/fetch-asset/current/read_asset_full.js
  async function getAssetData(key, address) {
    try {
      const digitalAsset = new web3.eth.Contract(LSP4Contract.abi, address);
      return await digitalAsset.methods["getData(bytes32)"](key).call();
    } catch (error) {
      return console.error("Data of assets address could not be loaded");
    }
  }

  // code from https://github.com/lukso-network/lukso-playground/blob/main/fetch-asset/current/read_asset_full.js
  async function decodeAssetData(keyName, encodedData, address) {
    try {
      const digitalAsset = createErc725Instance(LSP4Schema, address);
      //const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
      return digitalAsset.decodeData({ keyName: keyName, value: encodedData });
    } catch (error) {
      console.log("Data of an asset could not be decoded");
    }
  }

  // code from https://github.com/lukso-network/lukso-playground/blob/main/fetch-asset/current/read_asset_full.js
  async function getMetaDataLink(decodedAssetMetadata) {
    try {
      return decodedAssetMetadata.value.url.replace("ipfs://", IPFS_GATEWAY);
    } catch (error) {
      console.log("URL could not be fetched");
    }
  }

  // code from https://github.com/lukso-network/lukso-playground/blob/main/fetch-asset/current/read_asset_full.js
  async function fetchAssetMetadata(dataURL) {
    try {
      const response = await fetch(dataURL);
      const responseJSON = await response.json();
      return responseJSON.LSP4Metadata;
    } catch (error) {
      console.log("JSON data of IPFS link could not be fetched");
    }
  }

  // @desc Used to retrieve the metadata for assetAddress
  // @param assetAddress Smart contract address of the asset
  // @param metaDataLink IPFS URL of the metadata
  // @returns Promise json of asset metadata
  const getAssetMetadata = async assetAddress => {
    try {
      const decodedData = await getAssetByKey(assetAddress, LSP4Schema[3].key);
      const metaDataLink = await getMetaDataLink(decodedData);
      return await fetchAssetMetadata(metaDataLink);
    } catch (error) {
      return console.log("Metadata of an asset could not be fetched");
    }
  };

  //  --------------------------------------------------  //
  //  ------------------  MINT ASSETS ------------------  //
  //  --------------------------------------------------  //

  //@desc applies guardrails and notifications before/after calling the transfer function
  //@param assetAddress address of the asset contract
  //@param mintAmount amount of tokens to mint
  //@param mintToAddress address to mint the token to
  //@param contract contract of the asset - should always be LSP7MintableContract (for now)
  const mintLSP7 = (assetAddress, mintAmount, mintToAddress, contract) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    if (!mintToAddress) mintToAddress = currentAccount;
    if (mintAmount <= 0) return swal("Please enter a valid amount to mint.", "Amount must be greater than 0.", "warning");
    if (!assetAddress) return swal("The contract address for this asset could not be located.", "", "warning");
    if (contract !== LSP7MintableContract)
      //double check that function parameters are passed correctly
      return swal("This feature currently only supports Lukso's official LSP7Mintable Contract.", "", "warning");
    mintFunction(assetAddress, web3.utils.toWei(mintAmount.toString()), mintToAddress, contract, "LSP7").then(curr => {
      if (curr) swal("Congratulations!", `${mintAmount} tokens were minted to ${mintToAddress}.`, "success");
    });
  };

  //@desc applies guardrails and notifications before/after calling the transfer function
  //@param assetAddress address of the asset contract
  //@param tokenID tokenID of the token to mint
  //@param mintToAddress address to mint the token to
  //@param contract contract of the asset - should always be LSP8MintableContract (for now)
  const mintLSP8 = (assetAddress, tokenID, mintToAddress, contract) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    if (!mintToAddress) mintToAddress = currentAccount;
    if (!assetAddress) return swal("The contract address for this asset could not be located.", "", "warning");
    if (contract !== LSP8MintableContract)
      //double check that function parameters are passed correctly
      return swal("This feature currently only supports Lukso's official LSP8Mintable Contract.", "", "warning");
    mintFunction(assetAddress, web3.utils.padRight(web3.utils.stringToHex(tokenID), 64), mintToAddress, contract, "LSP8").then(curr => {
      if (curr) swal("Congratulations!", `TokenID ${tokenID} was minted to ${mintToAddress}.`, "success");
    });
  };

  //@desc mints the token, called from mintLSP7 and mintLSP8
  //@param assetAddress address of the asset contract
  //@param secondParam mintAmount for LSP7 and tokenID for LSP8
  //@param mintToAddress address to mint the token to
  //@param contract contract of the asset - should always be LSP7MintableContract or LSP8MintableContract (for now)
  //@param assetType string of the asset type - should always be "LSP7" or "LSP8" (for now)
  //@return promise of the transaction
  const mintFunction = async (assetAddress, secondParam, mintToAddress, contract, LSP) => {
    try {
      const assetContract = new web3Window.eth.Contract(contract.abi, assetAddress);
      const assetFunction = assetContract.methods.mint(mintToAddress, secondParam, false, "0x");
      if (useRelay) {
        return await executeViaKeyManager(assetFunction.encodeABI, `Please wait. Minting your ${LSP} asset via a key manager...`); // not working
      } else {
        swal(`Please confirm. Minting your ${LSP} asset...`, { button: false });
        return await assetFunction.send({ from: currentAccount, gasLimit: 300_000 });
      }
    } catch (err) {
      swal("Something went wrong.", JSON.stringify(err), "error");
      console.log(err);
    }
  };

  //  ------------------------------------------------------  //
  //  ------------------  TRANSFER ASSETS ------------------  //
  //  ------------------------------------------------------  //

  //@desc applies guardrails and notifications before/after calling the transfer function
  //@param assetAddress address of the asset contract
  //@param transferAmount amount of tokens to transfer
  //@param transferToAddress address to transfer the token to
  //@param contract contract of the asset - should always be LSP7MintableContract (for now)
  //@param transferFromAddress address to transfer the token from
  //@balanceOf balance of the current account
  //@param fromVault optional boolean describing whether the address is being transferred from a vault
  const transferLSP7 = (assetAddress, transferAmount, transferToAddress, contract, transferFromAddress, balanceOf, fromVault) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    if (!transferToAddress) transferToAddress = currentAccount;
    if (!transferFromAddress) transferFromAddress = currentAccount;
    if (Number(transferAmount) > Number(balanceOf)) return swal("Transfer amount exceeds balance.", "", "warning");
    if (Number(transferAmount) <= 0) return swal("Please enter a valid amount to mint.", "Amount must be greater than 0.", "warning");
    if (!assetAddress) return swal("The contract address for this asset could not be located.", "", "warning");
    if (contract !== LSP7MintableContract) return swal("This feature currently only supports Lukso's official LSP7Mintable Contract.", "", "warning");
    transferFunction(
      assetAddress,
      web3.utils.toWei(transferAmount.toString()),
      transferToAddress,
      contract,
      transferFromAddress,
      fromVault,
      "LSP7"
    ).then(curr => {
      if (curr) {
        swal("Congratulations!", `${transferAmount} token was transferred from ${transferFromAddress} to ${transferToAddress}.`, "success");
        console.log(`Congratulations! ${transferAmount} token was transferred from ${transferFromAddress} to ${transferToAddress}.`);
      }
    });
  };

  //@desc applies guardrails and notifications before/after calling the transfer function
  //@param assetAddress address of the asset contract
  //@param tokenID tokenID of the token to transfer
  //@param transferToAddress address to transfer the token to
  //@param contract contract of the asset - should always be LSP8MintableContract (for now)
  //@param transferFromAddress address to transfer the token from
  //@balanceOf - unused for LSP8
  //@param fromVault optional boolean describing whether the address is being transferred from a vault
  const transferLSP8 = (assetAddress, tokenID, transferToAddress, contract, transferFromAddress, balanceOf, fromVault) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    if (!transferToAddress) transferToAddress = currentAccount;
    if (!transferFromAddress) transferFromAddress = currentAccount;
    if (!assetAddress) return swal("The contract address for this asset could not be located.", "", "warning");
    if (contract !== LSP8MintableContract) return swal("This feature currently only supports Lukso's official LSP8Mintable Contract.", "", "warning");
    transferFunction(
      assetAddress,
      web3.utils.padRight(web3.utils.stringToHex(tokenID), 64),
      transferToAddress,
      contract,
      transferFromAddress,
      fromVault,
      "LSP8"
    ).then(curr => {
      if (curr) {
        swal("Congratulations!", `TokenID [${tokenID}] was transferred from ${transferFromAddress} to ${transferToAddress}.`, "success");
        console.log(`Congratulations! TokenID [${tokenID}] was transferred from ${transferFromAddress} to ${transferToAddress}.`);
      }
    });
  };

  //@desc transfers the token, called from transferLSP7 and transferLSP8
  //@param assetAddress address of the asset contract
  //@param secondParam mintAmount for LSP7 and tokenID for LSP8
  //@param mintToAddress address to mint the token to
  //@param contract contract of the asset - should always be LSP7MintableContract or LSP8MintableContract (for now)
  //@param assetType string of the asset type - should always be "LSP7" or "LSP8" (for now)
  //@return promise of the transaction
  const transferFunction = async (assetAddress, secondParam, transferToAddress, contract, transferFromAddress, fromVault, LSP) => {
    try {
      const web3 = web3Window;
      const assetContract = new web3.eth.Contract(contract.abi, assetAddress);
      if (fromVault) { //TO-DO work in progress
        console.log("from vault");
        const targetPayload = assetContract.methods.transfer(transferFromAddress, transferToAddress, secondParam, false, "0x").encodeABI();
        const myVault = new web3.eth.Contract(LSP9Contract.abi, transferFromAddress);
        const vaultPayload = await myVault.methods.execute(0, transferToAddress, 0, targetPayload).encodeABI();
        const owner = await myVault.methods.owner().call(); // TO-DO must equal transferFrom (for now - employ key manager later)
        if (owner !== currentAccount) console.log("is not owner of vault - function should revert");
        const myUP = new web3.eth.Contract(UniversalProfileContract.abi, owner);
        console.log(myVault, vaultPayload, owner, myUP);
        return await myUP.methods.execute(0, transferToAddress, 0, vaultPayload).send({ from: owner, gasLimit: 300_000 });
      } else {
        const assetFunction = assetContract.methods.transfer(transferFromAddress, transferToAddress, secondParam, false, "0x");

        if (useRelay) {
          return await executeViaKeyManager(assetFunction.encodeABI, "Please wait. Transferring your asset via a key manager..."); // not working
        } else {
          swal(`Please confirm. Transferring your ${LSP} asset...`, { button: false });
          return await assetFunction.send({ from: currentAccount, gasLimit: 300_000 });
        }
      }
    } catch (err) {
      swal("Something went wrong.", JSON.stringify(err), "error");
      console.log(err);
    }
  };

  //  -----------------------------------------------  //
  //  ------------------ LSP7&LSP8 ------------------  //
  //  -----------------------------------------------  //

  // @desc Retrieves the number of existing tokens (totalSupply) for assetAddress
  // @param assetAddress Smart contract address of the asset
  // @param assetContract Instance of the asset contract using the LSP7Contract abi (LSP7 and LSP8 both share the totalSupply function)
  // @returns Promise of totalSupply, expressed in ether value (as opposed to wei value)
  const getTotalSupply = async assetAddress => {
    try {
      const assetContract = new web3.eth.Contract(LSP7Contract.abi, assetAddress);
      const totalSupply = await assetContract.methods.totalSupply().call();
      return web3.utils.fromWei(totalSupply);
    } catch (error) {
      return console.log("Total supply of an asset could not be fetched");
    }
  };

  // @desc retrieves the number of tokens owned (balanceOf) of profileAddress for assetAddress
  // @param assetAddress smart contract address of the asset
  // @param profileAddress universal Profile or EOA address to query
  // @param assetContract instance of the asset contract using the LSP7Contract abi (LSP7 and LSP8 both share the totalSupply function)
  // @returns promise resolving to the balance of the profileAddress for the assetAddress
  const getBalanceOf = async (assetAddress, profileAddress) => {
    try {
      const assetContract = new web3.eth.Contract(LSP7Contract.abi, assetAddress);
      return web3.utils.fromWei(await assetContract.methods.balanceOf(profileAddress).call());
      // return balanceOf > 0.5 ? balanceOf : Number.parseFloat(balanceOf).toExponential(2);
    } catch (error) {
      return console.log("Balance of an asset could not be fetched");
    }
  };

  //  -----------------------------------------------  //
  //  ------------------ LSP7 only ------------------  //
  //  -----------------------------------------------  //

  // @desc calls the decimals function from the LSP7 contract
  // @assetAddress address of the asset contract
  // @return promise that resolves to true or false depending on whether the function is divisible
  // TO-DO currently unused
  const getDecimals = async assetAddress => {
    try {
      const assetContract = new web3.eth.Contract(LSP7Contract.abi, assetAddress);
      return await assetContract.methods.decimals().call();
    } catch (error) {
      console.log("Decimals could not be fetched");
    }
  };

  //  -----------------------------------------------  //
  //  ------------------ LSP8 only ------------------  //
  //  -----------------------------------------------  //

  //@param assetAddress address of the asset contract
  //@param tokenID tokenID of the token to transfer
  //@param tokenOwner address of the token owner

  //@desc calls the tokenOwnerOf function from the LSP8 contract
  //@returns a promise that resolves to the address of the tokenID owner
  const getTokenOwnerOf = async (assetAddress, tokenID) => {
    try {
      const assetContract = new web3.eth.Contract(LSP8MintableContract.abi, assetAddress);
      return await assetContract.methods.tokenOwnerOf(web3.utils.padRight(web3.utils.stringToHex(tokenID), 64)).call(); //formatting from example-dapp-lsps
    } catch (error) {
      return console.log("Token owner could not be fetched");
    }
  };

  //@desc calls the tokenIDsOfOwner function from the LSP8 contract
  //@returns a promise that resolves to an array of tokenIDs
  const getTokenIdsOf = async (assetAddress, tokenOwner) => {
    try {
      const assetContract = new web3.eth.Contract(LSP8MintableContract.abi, assetAddress);
      return await assetContract.methods.tokenIdsOf(tokenOwner).call();
    } catch (error) {
      return console.log("Token IDs could not be fetched");
    }
  };

  return (
    <AssetsContext.Provider
      value={{
        accountBalance,
        setAccountBalance,
        updateAccountBalance,
        getAssetMetadata,
        getAssetByKey,
        getDecimals,
        getTotalSupply,
        getBalanceOf,
        receivedAssets,
        setReceivedAssets,
        issuedAssets,
        setIssuedAssets,
        fetchAllAssets,
        supportsInterface,
        mintLSP7,
        mintLSP8,
        transferLSP7,
        transferLSP8,
        getTokenIdsOf,
      }}>
      {children}
    </AssetsContext.Provider>
  );
};

export const useAssetsContext = () => useContext(AssetsContext);
