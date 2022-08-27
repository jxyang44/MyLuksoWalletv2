//context provider for account balance, LSP7, and LSP8 related functions

import React, { useEffect, useState, createContext, useContext } from "react";
import {
  web3Provider,
  web3, // same as web3Provider
  INTERFACE_IDS,
  LSP3Schema,
  LSP4Schema,
  LSP4Contract,
  LSP8Schema,
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
  const [accountBalance, setAccountBalance] = useState(0); // LYX balance
  const [receivedAssets, setReceivedAssets] = useState(""); // array of all LSP5 Received Assets for the connected Universal Profile
  const [issuedAssets, setIssuedAssets] = useState(""); // array of all LSP12 Issued Assets for the connected Universal Profile

  // used to get token name or symbol
  const getAssetByKey = async (assetAddress, assetKey) => {
    const assetData = await getAssetData(assetKey, assetAddress);
    return await decodeAssetData(assetKey, assetData, assetAddress);
  };

  // calls the decimals function from the LSP7 contract
  // **** currently not used ****
  const getDecimals = async assetAddress => {
    try {
      const assetContract = new web3.eth.Contract(LSP7Contract.abi, assetAddress);
      return await assetContract.methods.decimals().call();
    } catch (error) {
      return console.log("Decimals could not be fetched");
    }
  };

  // @desc Sets accountBalance for profile
  const updateAccountBalance = async address => {
    const balance = web3.utils.fromWei(await web3.eth.getBalance(address));
    setAccountBalance(balance);
    return;
  };

  // @desc Used to retrieve the assets tied to a specific address and assetType
  // @param address: Universal Profile address
  // @param assetType: LSP5ReceivedAssets[], LSP12IssuedAssets[]
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

  // @desc Checks if a supplied contract supports a particular interface
  // @param assetAddress: Smart contract address of the asset
  // @param interfaceType: Contract used for Contract to InterfaceId mapping (current implementation uses LSP7DigitalAsset, LSP8IdentifiableDigitalAsset)
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

  // @desc Retrieves the number of tokens owned (balanceOf) of profileAddress for assetAddress
  // @param assetAddress Smart contract address of the asset
  // @param profileAddress Universal Profile or EOA address to query
  // @param assetContract Instance of the asset contract using the LSP7Contract abi (LSP7 and LSP8 both share the totalSupply function)
  // @returns Promise of balanceOf, expressed in ether value (as opposed to wei value)
  const getBalanceOf = async (assetAddress, profileAddress) => {
    try {
      const assetContract = new web3.eth.Contract(LSP7Contract.abi, assetAddress);
      return web3.utils.fromWei(await assetContract.methods.balanceOf(profileAddress).call());
      // return balanceOf > 0.5 ? balanceOf : Number.parseFloat(balanceOf).toExponential(2);
    } catch (error) {
      return console.log("Balance of an asset could not be fetched");
    }
  };

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

  const getTokenOwnerOf = async (assetAddress, tokenID) => {
    const assetContract = new web3.eth.Contract(LSP8MintableContract.abi, assetAddress);
    return await assetContract.methods.tokenOwnerOf(web3.utils.padRight(web3.utils.stringToHex(tokenID), 64)).call();
  };

  const getTokenIdsOf = async (assetAddress, tokenOwner) => {
    const assetContract = new web3.eth.Contract(LSP8MintableContract.abi, assetAddress);
    return await assetContract.methods.tokenIdsOf(tokenOwner).call();
  };

  const mintLSP8 = (assetAddress, tokenID, mintToAddress, contract) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    if (!mintToAddress) mintToAddress = currentAccount;

    getTokenOwnerOf(assetAddress, tokenID).then(res => {
      if (res) return swal("This token ID is already taken.", "warning");
    });

    if (!assetAddress) return swal("The contract address for this asset could not be located.", "", "warning");
    if (contract !== LSP8MintableContract)
      //double check that function parameters are passed correctly
      return swal("This feature currently only supports Lukso's official LSP8Mintable Contract.", "", "warning");

    mintFunction(assetAddress, web3.utils.padRight(web3.utils.stringToHex(tokenID), 64), mintToAddress, contract, "LSP8").then(curr => {
      if (curr) swal("Congratulations!", `TokenID ${tokenID} was minted to ${mintToAddress}.`, "success");
    });
  };

  //@param secondParam mintAmount for LSP7 and tokenID for LSP8
  const mintFunction = async (assetAddress, secondParam, mintToAddress, contract, LSP) => {
    try {
      const assetContract = new web3Window.eth.Contract(contract.abi, assetAddress);

      const assetFunction = assetContract.methods.mint(mintToAddress, secondParam, false, "0x");
      // address to, uint256 amount, bool force, bytes memory data

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

  const transferLSP7 = (assetAddress, transferAmount, transferToAddress, contract, transferFromAddress, balanceOf, fromVault) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    if (!transferToAddress) transferToAddress = currentAccount;
    if (!transferFromAddress) transferFromAddress = currentAccount;
    if (Number(transferAmount) > Number(balanceOf)) return swal("Transfer amount exceeds balance.", "", "warning");
    if (Number(transferAmount) <= 0) return swal("Please enter a valid amount to mint.", "Amount must be greater than 0.", "warning");
    if (!assetAddress) return swal("The contract address for this asset could not be located.", "", "warning");
    if (contract !== LSP7MintableContract) return swal("This feature currently only supports Lukso's official LSP7Mintable Contract.", "", "warning");

    transferFunction(assetAddress, web3.utils.toWei(transferAmount.toString()), transferToAddress, contract, transferFromAddress, fromVault, "LSP7").then(
      curr => {
        if (curr) {
          swal("Congratulations!", `${transferAmount} token was transferred from ${transferFromAddress} to ${transferToAddress}.`, "success");
          console.log(`Congratulations! ${transferAmount} token was transferred from ${transferFromAddress} to ${transferToAddress}.`);
        }
      }
    );
  };

  const transferLSP8 = (assetAddress, tokenID, transferToAddress, contract, transferFromAddress, balanceOf, fromVault) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    if (!transferToAddress) transferToAddress = currentAccount;
    if (!transferFromAddress) transferFromAddress = currentAccount;
    //    function tokenOwnerOf(bytes32 tokenId) external view returns (address);
    //check token owner exists
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
        swal("Congratulations!", `TokenID ${tokenID} token was transferred from ${transferFromAddress} to ${transferToAddress}.`, "success");
        console.log(`Congratulations! TokenID ${tokenID} token was transferred from ${transferFromAddress} to ${transferToAddress}.`);
      }
    });
  };

  //transfer
  const transferFunction = async (assetAddress, secondParam, transferToAddress, contract, transferFromAddress, fromVault, LSP) => {
    try {
      const web3 = web3Window;
      const assetContract = new web3.eth.Contract(contract.abi, assetAddress);

      if (fromVault) {
        console.log("from vault");
        const targetPayload = assetContract.methods.transfer(transferFromAddress, transferToAddress, secondParam, false, "0x").encodeABI();
        // function transfer(address from, address to, uint256 amount, bool force, bytes memory data) external;

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
