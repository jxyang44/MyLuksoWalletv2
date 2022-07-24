import React, {useEffect, useState, createContext, useContext} from "react";
import ERC725js from '@erc725/erc725.js';
import {INTERFACE_IDS, ERC725Y_INTERFACE_IDS, web3, LSP3Schema, LSP4Schema, LSP4Contract, LSP8Schema, LSP7Contract, LSP8Contract, provider,config, IPFS_GATEWAY} from "../utils/ERC725Config";

const { ERC725 } = require("@erc725/erc725.js");
require("isomorphic-fetch");

const AssetsContext = createContext();

//  const SAMPLE_PROFILE_ADDRESS = "0xa907c1904c22DFd37FF56c1f3c3d795682539196";
// const SAMPLE_ASSET_ADDRESS = "0x923F49Bac508E4Ec063ac097E00b4a3cAc68a353";

// const SAMPLE_PROFILE_ADDRESS = process.env.REACT_APP_MLV_PROFILE_ADDRESS;
// const SAMPLE_ASSET_ADDRESS = "0xA1A57B4129F1ec8d63F1509E9b3BE8edf36A43D6";




export const AssetsProvider = ({ children }) => {
    const defaultMetadata = {
        "description": "",
        "links": ["test"],
        "icon": [],
        "images": ["test","test2"],
        "assets": [],
      }
    
    
    const [accountBalance, setAccountBalance] = useState(0); // LYXe/(t) balance
    const [receivedAssets, setReceivedAssets] = useState(""); // array of all LSP5 Received Assets for the connected Universal Profile
    const [issuedAssets, setIssuedAssets] = useState(""); // array of all LSP12 Issued Assets for the connected Universal Profile
    const [vaults, setVaults] = useState(""); // array of all LSP10 Received Vaults for the connected Universal Profile

    const [ownedAssets, setOwnedAssets] = useState(""); // @TO-DO split into owned [received, issued, vaults]? what is difference between received and owned?

 

    // used to get token name or symbol
    const getAssetByKey = async (assetAddress, assetKey) => {
        const assetData = await getAssetData(assetKey, assetAddress);
        return await decodeAssetData(assetKey, assetData, assetAddress);
    }


    // @desc Sets accountBalance state variable to LYXe/(t) balance
    const updateAccountBalance = async (address) => {
        const balance = web3.utils.fromWei(await web3.eth.getBalance(address), 'ether');
        setAccountBalance(balance);
    }

    // @desc Used to retrieve the assets tied to a specific address and assetType
    // @param address: Universal Profile address
    // @param assetType: LSP5ReceivedAssets[], LSP10Vaults[], LSP12IssuedAssets[]
    // @returns Promise of array of asset addresses
    async function fetchAllAssets(address, assetType) {
        try {
            const profile = new ERC725(LSP3Schema, address, provider, config);
            const result = await profile.fetchData(assetType);
            assetType === "LSP5ReceivedAssets[]" && setReceivedAssets(result.value);
            assetType === "LSP10Vaults[]" && setVaults(result.value);
            assetType === "LSP12IssuedAssets[]" && setIssuedAssets(result.value);
            return result.value;
        } catch (error) {
            return console.log("This is not an ERC725 Contract");
        }
    }

    // TODO
    async function fetchOwnedAssets(address, assetType) {
        const digitalAssets = await fetchAllAssets(address, assetType);
        const assets = [];

        for (let i = 0; i < digitalAssets.length; i++) {
            const contractInstance = new web3.eth.Contract(LSP8Contract.abi, digitalAssets[i]);

            const isCurrentOwner = await contractInstance.methods.balanceOf(address).call();
            if (isCurrentOwner > 0) {
                assets[assets.length] = digitalAssets[i];
            }
        }
        setOwnedAssets(assets); //to-do why this not working
        return assets;
    }

    // @desc Checks if a supplied contract supports a particular interface
    // @param assetAddress: Smart contract address of the asset
    // @param interfaceType: Contract used for Contract to InterfaceId mapping (current implementation uses LSP7DigitalAsset, LSP8IdentifiableDigitalAsset, LSP9Vault)
    // @returns Promise of type boolean; true if assetAddress supports a specific interface, otherwise false
    const supportsInterface = async(assetAddress, interfaceType) => {
        try{
            const contractInstance = new web3.eth.Contract(LSP4Contract.abi, assetAddress); //TO-DO does this work for LSP9
            return await contractInstance.methods.supportsInterface(INTERFACE_IDS[interfaceType]).call();
        } catch (error) {
            return console.log("Contract could not be checked for interface");
        }
    }

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
            const digitalAsset = new ERC725(LSP4Schema, address, provider, config);
            return digitalAsset.decodeData({keyName: keyName, value: encodedData});
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
    const getAssetMetadata = async (assetAddress) => {
        try{
            const decodedData = await getAssetByKey(assetAddress, LSP4Schema[3].key);
            const metaDataLink = await getMetaDataLink(decodedData);
            return await fetchAssetMetadata(metaDataLink);
        } catch (error) {
            return console.log("Metadata of an asset could not be fetched");
        }
    }


    // @desc Retrieves the number of existing tokens (totalSupply) for assetAddress
    // @param assetAddress Smart contract address of the asset
    // @param assetContract Instance of the asset contract using the LSP7Contract abi (LSP7 and LSP8 both share the totalSupply function)
    // @returns Promise of totalSupply, expressed in ether value (as opposed to wei value)
    const getTotalSupply = async (assetAddress) => {
        try { 
            const assetContract = new web3.eth.Contract(LSP7Contract.abi, assetAddress); 
            const totalSupply = await assetContract.methods.totalSupply().call();
            return web3.utils.fromWei(totalSupply);
        } catch (error) {
            return console.log("Total supply of an asset could not be fetched");
        }
    }

    // @desc Retrieves the number of tokens owned (balanceOf) of profileAddress for assetAddress
    // @param assetAddress Smart contract address of the asset
    // @param profileAddress Universal Profile or EOA address to query
    // @param assetContract Instance of the asset contract using the LSP7Contract abi (LSP7 and LSP8 both share the totalSupply function)
    // @returns Promise of balanceOf, expressed in ether value (as opposed to wei value)
    const getBalanceOf = async (assetAddress, profileAddress) => {
        try {
            const assetContract = new web3.eth.Contract(LSP7Contract.abi, assetAddress); 
            const balanceOf = await assetContract.methods.balanceOf(profileAddress).call();
            return web3.utils.fromWei(balanceOf);
        } catch(error) {
            return console.log("Balance of an asset could not be fetched");
        }
    }

    //Tummi Gummi- 0x923F49Bac508E4Ec063ac097E00b4a3cAc68a353
    const test = async (profileAddress) => {
        console.log("test")
        const LSP7contractId = "0x7cf1e07F395BD61D6e609633D34a2063234a6aAD";
        const LSP8contractId = "0xA1A57B4129F1ec8d63F1509E9b3BE8edf36A43D6";
        const profileId = "0xC7d7315A1DDBbf92aBD068588bBA1e864F20F0f5"
        const contractInstance = new web3.eth.Contract(LSP4Contract.abi, LSP8contractId);

        // await contractInstance.methods.balanceOf(profileAddress).call().then(res => console.log(res));
        
        // await contractInstance.methods.totalSupply().call().then(res => console.log(web3.utils.fromWei(res, 'ether')));
        
        // await contractInstance.methods.owner().call().then(res => console.log(res));
                
        await Promise.all([
            contractInstance.methods.supportsInterface(INTERFACE_IDS.LSP7DigitalAsset).call(),
            contractInstance.methods.supportsInterface(INTERFACE_IDS.LSP8IdentifiableDigitalAsset).call(),
        ]).then(res => console.log(res));
      
        // const erc725 = new ERC725(
        //     [...LSP4Schema, LSP8Schema],
        //     profileAddress,
        //     provider, config
        // );

        // const data = await erc725.fetchData(
        //     'LSP4TokenName',
        //     'LSP4TokenSymbol',
        //     {
        //     keyName: 'LSP7MetadataJSON:<bytes32>',
        //     dynamicKeyParts: '0x923F49Bac508E4Ec063ac097E00b4a3cAc68a353',
        //     },
        //     'LSP4Metadata',
        // );
        // console.log(data)
        // const owner = await erc725.getOwner();
        // console.log("owner: " + owner)
        

    }

    return (
        <AssetsContext.Provider
        value={{
            accountBalance, setAccountBalance, updateAccountBalance,
            defaultMetadata,
            getAssetMetadata,
            getAssetByKey,
            getTotalSupply,
            getBalanceOf,
            test,
            receivedAssets, setReceivedAssets,
            fetchAllAssets,
            fetchOwnedAssets,
            supportsInterface
        }}
        >
        {children}
        </AssetsContext.Provider>
    );
};


export const useAssetsContext = () => useContext(AssetsContext);