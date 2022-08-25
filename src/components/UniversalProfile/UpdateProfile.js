import React, { useState, useEffect } from "react";
import {
  LSP3Schema,
  createLSPFactoryWindowInstance,
  createErc725Instance,
  IPFS_GATEWAY,
  LSP6Contract,
  UniversalProfileContract,
  MM_PrivateKey,
} from "../../utils/ERC725Config";
import { ButtonShadow } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const UpdateProfile = () => {
  const {
    web3Window,
    useRelay,
    isProfileLoaded,
    currentAccount,
    profileJSONMetadata,
    setProfileJSONMetadata,
    pendingProfileJSONMetadata,
    executeViaKeyManager,
  } = useProfileContext();
  const [isEdited, setIsEdited] = useState(false); //false if pendingProfileJSONMetadata = profileJSONMetadata, handled in useEffect hook below

  useEffect(() => {
    if (isProfileLoaded === false) {
      setIsEdited(false);
      return;
    }
    JSON.stringify(pendingProfileJSONMetadata) === JSON.stringify(profileJSONMetadata) ? setIsEdited(false) : setIsEdited(true);
  }, [pendingProfileJSONMetadata]);

  //TO-DO add limits to name, description character lengths?
  const handleUploadEdits = () => {
    if (isProfileLoaded === false) {
      swal("You are not connected to an account.");
      return;
    }
    if (!isEdited) {
      swal("You have not modified your Universal Profile.");
      return;
    }

    const edits = []; //used to display the metadata fields that were changed to the user
    for (const [key, newValue] of Object.entries(pendingProfileJSONMetadata)) {
      if (newValue instanceof File) {
        edits.push({
          key,
          newValue: newValue.name,
          oldValue: profileJSONMetadata[key][0]?.url?.replace("ipfs://", IPFS_GATEWAY) || profileJSONMetadata[key][0]?.name || "old picture",
        });
      } else if (newValue && newValue !== profileJSONMetadata[key]) {
        edits.push({ key, newValue: JSON.stringify(newValue), oldValue: JSON.stringify(profileJSONMetadata[key]) });
      }
    }

    swal({
      title: "Please confirm upload of these changes to the Lukso network. Once confirmed, your edits cannot be reverted.",
      text: `${edits.map(edit => `\nUPDATE: "${edit.key}" \nFROM: "${edit.oldValue}" \nTO: "${edit.newValue}"\n`)}`,
      buttons: {
        cancel: true,
        confirm: true,
      },
    }).then(value => {
      if (value) {
        editProfile().then(res => {
          console.log(res);
          if (res !== undefined && res) {
            setProfileJSONMetadata(pendingProfileJSONMetadata);
            swal("Congratulations!", "Your Universal Profile has been updated on the Lukso blockchain!", "success");
          }
        });
      }
    });
  };

  //primary logic to update profile information on the blockchain
  const editProfile = async () => {
    try {
      console.log("------------------ STARTING PROFILE UPDATE PROCESS ------------------");
      const web3 = web3Window; 
      const jsonFile = { LSP3Profile: pendingProfileJSONMetadata }; //pendingProfileJSONMetadata is updated in UserProfile.js
      console.log("------------------ client-side data ------------------\n", jsonFile);

      swal("Please wait. Saving profile metadata on IPFS...", "You may click outside this window.", { button: false});
      const lspFactory = createLSPFactoryWindowInstance();
      const uploadResult = await lspFactory.UniversalProfile.uploadProfileData(jsonFile.LSP3Profile); //no gas needed
      console.log("------------------ uploaded IPFS data ------------------\n", uploadResult, uploadResult.url, uploadResult.json);

      const erc725 = createErc725Instance(LSP3Schema, currentAccount);
      const encodedData = erc725.encodeData({
        keyName: "LSP3Profile",
        value: {
          hashFunction: "keccak256(utf8)",
          hash: web3.utils.keccak256(JSON.stringify(uploadResult.json)),
          url: uploadResult.url,
        },
      });
      console.log("------------------ encoded data ------------------\n", encodedData);

      const universalProfileContract = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);

      if (useRelay) {
        //use key manager
        return executeViaKeyManager(
          universalProfileContract.methods["setData(bytes32[],bytes[])"](encodedData.keys, encodedData.values).encodeABI,
          "Setting Universal Profile data via Key Manager..."
        );
      } else {
        //pay from account balance
        swal("Please confirm update of Universal Profile data to the blockchain...", { button: false});
        return await universalProfileContract.methods["setData(bytes32[],bytes[])"](encodedData.keys, encodedData.values).send({
          from: currentAccount,
          gasLimit: 300_000,
        });
      }
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error.message), "warning");
    }
  };

  return (
  <ButtonShadow buttonText={"Upload Edits"} buttonFunc={handleUploadEdits} buttonColor={"bg-green-500"} buttonTextColor={"text-green-800"} />
  );
};

export default UpdateProfile;
