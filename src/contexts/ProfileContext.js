//Context to manage extension connection and Universal Profile state

import React, { useState, createContext, useContext } from "react";
import { ethers } from "ethers";
import { LSP3Schema, provider, config } from "../utils/ERC725Config";
import swal from "sweetalert";
const { ERC725 } = require("@erc725/erc725.js");
require("isomorphic-fetch");
const ProfileContext = createContext();
const { ethereum } = window;

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

  const [currentAccount, setCurrentAccount] = useState(""); // current UP address
  const [isProfileLoaded, setIsProfileLoaded] = useState(false); // true if profile metadata is fetched
  const [profileJSONMetadata, setProfileJSONMetadata] = useState(defaultMetadata); // profile metadata - should always be in sync with JSON metadata on IPFS
  const [pendingProfileJSONMetadata, setPendingProfileJSONMetadata] = useState(defaultMetadata); // used to keep track of pending profile metadata that the user makes in the DApp, but hasn't committed to uploading to IPFS/contract yet

  //@desc connects to the extension using ethers.js, sets the Universal Profile address state, and fetches profile metadata
  const connectProfile = async () => {
    try {
      if (!ethereum) return swal("Wallet not detected.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = etherProvider.getSigner();
      await signer.getAddress();
      setCurrentAccount(accounts[0]);
      fetchProfileMetadata(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const connectProfileUsingPrivateKey = async () => {};

  //https://docs.lukso.tech/guides/universal-profile/read-profile-data
  async function fetchProfileData(address) {
    try {
      const profile = new ERC725(LSP3Schema, address, provider, config);
      swal("Fetching profile data...", { button: false });
      return await profile.fetchData("LSP3Profile");
    } catch (error) {
      swal(`This is not an ERC725 Contract.`, "", "warning");
    }
  }

  //@param imageArray array of images from LSP3Profile metadata (e.g. profileImage, backgroundImage)
  //@param maxSize maximum width the image
  //@returns the array index of the image with the largest size <= maxSize
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
    console.log(profileData.value);
    if (profileData === undefined) return;
    setProfileJSONMetadata(current => ({
      ...current,
      ...profileData.value.LSP3Profile,
    }));
    setPendingProfileJSONMetadata(current => ({
      ...current,
      ...profileData.value.LSP3Profile,
    }));
    setIsProfileLoaded(true);
    swal(
      "Your Universal Profile is now connected to MyLuksoWallet.",
      `Welcome, ${profileData.value.LSP3Profile.name}!`,
      "success"
    );
  }

  //@desc called when the user disconnects from the extension
  //@param sets all profile state variables to empty and false
  const disconnectUPExtension = () => {
    setProfileJSONMetadata(defaultMetadata);
    setPendingProfileJSONMetadata(defaultMetadata);
    setIsProfileLoaded(false);
    setCurrentAccount();
  };

  //checked (is this used?)
  const isWalletConnected = async () => {
    try {
      if (!ethereum) return swal("Wallet not detected.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log(currentAccount);
        // getAllProfiles();
      } else {
        swal("No accounts found.");
      }
    } catch (error) {
      swal(`${error}`, "", "warning");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        defaultMetadata,
        isWalletConnected,
        connectProfile,
        connectProfileUsingPrivateKey,
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
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);
