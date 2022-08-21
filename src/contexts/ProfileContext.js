//context provider to manage extension connection, Universal Profile state, keymanager, etc.

import React, { useState, createContext, useContext } from "react";
import Web3 from "web3";
import {
  LSP3Schema,
  provider,
  config,
  UniversalProfileContract,
  LSP6Contract,
  LSP4Contract,
  MM_PrivateKey,
  web3Provider,
  chainId,
  MM_PublicKey,
  LSP6Schema,
  LSP1Schema,
  LSP10Schema,
  createErc725Instance,
} from "../utils/ERC725Config";
import { useStateContext } from "./StateContext";
import swal from "sweetalert";

require("isomorphic-fetch");
const ProfileContext = createContext();
const { ethereum } = window;
export let web3Window;

export const ProfileProvider = ({ children }) => {
  //following format guidelines per https://github.com/lukso-network/LIPs/blob/main/LSPs/LSP-3-UniversalProfile-Metadata.md#lsp3profile
  const defaultMetadata = {
    name: "My username",
    description: "My description",
    links: [],
    tags: [],
    avatar: [],
    profileImage: [],
    backgroundImage: [],
  };

  const defaultAddresses = {
    permissions: [], //array of all permissed accounts
    URD: "", //address of Universal Receiver Delegate
    KM: "", //address of Key Manager
    vaults: [], //array of all LSP10 Received Vaults for the connected Universal Profile
  };

  const { setTheme, setUPColor, setUPTextColor, setThemeDefaults } = useStateContext(); //state variables for website themes, fetched from UP metadata
  const [currentAccount, setCurrentAccount] = useState(""); // current UP address
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); // true if profile metadata is fetched
  const [profileJSONMetadata, setProfileJSONMetadata] = useState(defaultMetadata); // profile metadata - should always be in sync with JSON metadata on IPFS
  const [pendingProfileJSONMetadata, setPendingProfileJSONMetadata] = useState(defaultMetadata); // keeps track of pending profile metadata that the user makes locally, but hasn't committed to uploading to the blockchain
  const [useRelay, setUseRelay] = useState(true); // true if user has enabled relay transaction service
  const [accountAddresses, setAccountAddresses] = useState(defaultAddresses); // stores permissions, URD, vault, and key manager addresses for the connected UP

  //@desc connects to the UPextension, sets the Universal Profile address state, and fetches profile metadata
  const connectProfile = async () => {
    try {
      if (!ethereum) return swal("Wallet not detected.", "", "error");
      if (ethereum.isMetaMask)
        return swal(
          "MyLuksoWallet is designed to work with the Universal Profile extension.",
          "Please switch to the UP extension and refresh the page.",
          "warning"
        );

      web3Window = new Web3(window.ethereum);
      const accounts = await web3Window.eth.requestAccounts();

      setCurrentAccount(accounts[0]);
      fetchProfileMetadata(accounts[0]);
      fetchAccountAddresses(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  //updates addresses
  const fetchAccountAddresses = address => {
    const getPermissions = async address => {
      const profile = createErc725Instance(LSP6Schema, address);
      return await profile.fetchData();
    };
    const getURD = async address => {
      const profile = createErc725Instance(LSP1Schema, address);
      return await profile.fetchData();
    };
    const getVaults = async address => {
      const profile = createErc725Instance(LSP10Schema, address);
      return await profile.fetchData();
    };
    const getKM = async address => {
      const universalProfileContract = new web3Provider.eth.Contract(UniversalProfileContract.abi, address);
      return await universalProfileContract.methods.owner().call();
    };
    getPermissions(address).then(res => setAccountAddresses(current => ({ ...current, permissions: res[0].value })));
    getURD(address).then(res => setAccountAddresses(current => ({ ...current, URD: res[0].value })));
    getVaults(address).then(res => setAccountAddresses(current => ({ ...current, vaults: res[0].value })));
    getKM(address).then(res => setAccountAddresses(current => ({ ...current, KM: res })));
  };

  const loginWithKey = keyType => {
    swal(`Login with ${keyType}:`, {
      content: "input",
      button: true,
    })
      .then(value => {
        if (value) {
          // if (keyType === "Private Key") connectProfileUsingPrivateKey(value);
          if (keyType === "UP Address") connectProfileUsingUPAddress(value);
        } else {
          swal("No input detected.");
        }
      })
      .catch(() => {
        swal("Something went wrong.", "Please try again later.", "warning");
      });
  };

  const connectProfileUsingUPAddress = async UPAddress => {
    try {
      disconnectUPExtension();
      setCurrentAccount(UPAddress);
      fetchProfileMetadata(UPAddress);
      fetchAccountAddresses(UPAddress);
    } catch (error) {
      console.log(error);
    }
  };

  //TO-DO come back to this - not working
  const activateAccountChangedListener = () => {
    window.ethereum.on("accountsChanged", accounts => {
      disconnectUPExtension();
      setCurrentAccount(accounts[0]);
      fetchProfileMetadata(accounts[0]);
      fetchAccountAddresses(accounts[0]);
      console.log("------- UP extension account switched to: ------", accounts[0]);
    });
  };

  //https://docs.lukso.tech/guides/universal-profile/read-profile-data
  async function fetchProfileData(address) {
    try {
      const profile = createErc725Instance(LSP3Schema, address);
      swal("Fetching profile data...", { button: false });
      return await profile.fetchData("LSP3Profile");
    } catch (error) {
      swal(`This contract does not support LSP3 Universal Profile Metadata.`, "", "warning");
      setCurrentAccount("");
    }
  }

  //@param imageArray array of images from LSP3Profile metadata (e.g. profileImage, backgroundImage)
  //@param maxSize maximum width of the image allowed in returned index
  //@returns the array index of the image with the largest width <= maxSize
  //TO-DO
  const maxImageIndex = (imageArray, maxSize) => {
    return 0;
  };

  //@desc initializes Universal Profile state variables, called by connectProfile(), which is called when the user connects to the extension
  //@param address Universal Profile address
  //@param profileData promise JSON of profile data
  //@param setProfileJSONMetadata React state setter for initial profile metadata
  //@param setPendingProfileJSONMetadata equal to setProfileJSONMetadata on initialization
  //@param setIsProfileLoaded React state setter indicating that profile metadata is loaded
  async function fetchProfileMetadata(address) {
    const profileData = await fetchProfileData(address);
    console.log(profileData);
    console.log(profileData.value);
    if (profileData === undefined) return;
    if (profileData.value !== null) {
     
      setProfileJSONMetadata(current => ({
        ...current,
        ...profileData.value.LSP3Profile,
      }));
      setPendingProfileJSONMetadata(current => ({
        ...current,
        ...profileData.value.LSP3Profile,
      }));

      setTheme(profileData.value.LSP3Profile.MLWTheme);
      setUPColor(profileData.value.LSP3Profile.MLWUPColor);
      setUPTextColor(profileData.value.LSP3Profile.MLWUPTextColor);
      setIsProfileLoaded(true);
      swal("Your account is now connected to MyLuksoWallet.", `Welcome, ${profileData.value.LSP3Profile.name}!`, "success");
    } else{
      // const contractInstance = new web3Provider.eth.Contract(LSP9Contract.abi, address);
      // const isVault = await contractInstance.methods.supportsInterface(INTERFACE_IDS[interfaceType]).call();

      setIsProfileLoaded(true);
      swal("Your account is now connected to MyLuksoWallet.", "No initial profile metadata was found for this account!", "warning");
    }

    
  }

  //@desc resets all profile state variables to their default values
  //@desc does not actually "disconnect" the login from the extension - user must do that manually in the extension
  const disconnectUPExtension = () => {
    setProfileJSONMetadata(defaultMetadata);
    setPendingProfileJSONMetadata(defaultMetadata);
    setAccountAddresses(defaultAddresses);
    setIsProfileLoaded(false);
    setCurrentAccount("");
    setThemeDefaults();
  };

  //TO-DO - breaks at final line
  const executeViaKeyManager = async (functionABI, swalMessage) => {
    try {
      if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
      console.log("initiating key manager");

      const universalProfileContract = new web3Provider.eth.Contract(UniversalProfileContract.abi, currentAccount);

      swal("Using relay service...", "Fetching key manager address...", { button: false, closeOnClickOutside: false });
      const keyManagerAddress = await universalProfileContract.methods.owner().call();
      const keyManagerContract = new web3Provider.eth.Contract(LSP6Contract.abi, keyManagerAddress);

      const myEOA = web3Provider.eth.accounts.wallet.add(MM_PrivateKey);

      const abiPayload = functionABI();
      swal(swalMessage, { button: false, closeOnClickOutside: false });

      const channelId = 0;
      swal("Using relay service...", "Establishing key manager nonce...", { button: false, closeOnClickOutside: false });
      const nonce = await keyManagerContract.methods.getNonce(myEOA.address, channelId).call();

      const message = web3Provider.utils.soliditySha3(chainId, keyManagerAddress, nonce, {
        t: "bytes",
        v: abiPayload,
      });

      swal("Using relay service...", "Signing the transaction...", { button: false, closeOnClickOutside: false });
      const signatureObject = myEOA.sign(message);
      const signature = signatureObject.signature;
      //per fabian, use issignaturevalid to verify signature

      return await keyManagerContract.methods.executeRelayCall(signature, nonce, abiPayload).send({ from: myEOA.address, gasLimit: 300_000 });
    } catch (error) {
      swal("Something went wrong.", JSON.stringify(error), "warning");
      console.log(error);
    }
  };

  //only use this if account was added to wallet via key manager
  const executeViaKeyManager2 = async (functionABI, swalMessage) => {
    if (currentAccount === "") return swal("Please connect to a Universal Profile.", "", "warning");
    console.log("initiating key manager");
    const myEOA = web3Provider.eth.accounts.wallet.add(MM_PrivateKey);
    const universalProfileContract = new web3Provider.eth.Contract(UniversalProfileContract.abi, currentAccount);
    swal("Fetching key manager address...", { button: false, closeOnClickOutside: false });
    const keyManagerAddress = await universalProfileContract.methods.owner().call();
    const keyManagerContract = new web3Provider.eth.Contract(LSP6Contract.abi, keyManagerAddress);
    const abiPayload = functionABI();
    swal(swalMessage, { button: false, closeOnClickOutside: false });
    return await keyManagerContract.methods.execute(abiPayload).send({ from: myEOA.address, gasLimit: 300_000 });
  };

  return (
    <ProfileContext.Provider
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
        activateAccountChangedListener,
        web3Window,
        useRelay,
        setUseRelay,
        executeViaKeyManager,
        accountAddresses,
        setAccountAddresses,
        fetchAccountAddresses,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
