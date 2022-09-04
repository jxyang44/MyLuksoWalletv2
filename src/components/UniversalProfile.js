//main container for universal profile dropdown

import React, { useEffect, useState } from "react";
import { AiOutlineWallet } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { VscUnlock, VscLock } from "react-icons/vsc";
import { RiUserSettingsFill } from "react-icons/ri";
import {
  Address,
  MyMenuItem,
  Loading,
  ButtonShadow,
  ButtonColor,
  UpdateProfile,
  DisconnectProfile,
  UploadProfileImage,
  UploadBannerImage,
  ProfileTags,
  ProfileLinks,
  LYXBalanceFuncs,
} from ".";
import { useProfileContext } from "../contexts/ProfileContext";
import { useStateContext } from "../contexts/StateContext";
import { EditText, EditTextarea } from "react-edit-text";
import { IPFS_GATEWAY } from "../utils/luksoConfigs";
import UniversalCloudLogo from "../assets/Logos/Lukso_Original/Lukso_Signet_white-GradientBG.png";
import "react-edit-text/dist/index.css";
import swal from "sweetalert";

const UniversalProfile = () => {
  const [editMode, setEditMode] = useState(true); //determines whether profile can be edited
  const { UPColor, UPTextColor } = useStateContext();
  const {
    defaultMetadata,
    currentAccount,
    isProfileLoaded,
    profileJSONMetadata,
    pendingProfileJSONMetadata,
    setPendingProfileJSONMetadata,
    maxImageIndex,
  } = useProfileContext();

  useEffect(() => {
    if (isProfileLoaded === true) {
      profileJSONMetadata.name === "" && setPendingProfileJSONMetadata(current => ({ ...current, name: defaultMetadata.name })); //set name to default (e.g. "My username") if empty
      profileJSONMetadata.description === "" && setPendingProfileJSONMetadata(current => ({ ...current, description: defaultMetadata.description })); //set name to default (e.g. "My description") if empty
    }
  }, []);

  //for debugging
  useEffect(() => {
    // console.log("profile:", profileJSONMetadata);
    // console.log("pending:", pendingProfileJSONMetadata,JSON.stringify(pendingProfileJSONMetadata));
  }, [pendingProfileJSONMetadata, profileJSONMetadata]);

  //navigation modals for discarding edits
  const handleDiscardEdits = () => {
    if (JSON.stringify(pendingProfileJSONMetadata) === JSON.stringify(profileJSONMetadata)) {
      swal("You do not have edits to discard.");
      return;
    }
    swal({
      title: "Are you sure you want to discard edits?",
      text: "You will not be able to recover any discarded changes.",
      buttons: [true, "Discard"],
      dangerMode: true,
    }).then(value => {
      if (value) {
        setPendingProfileJSONMetadata(profileJSONMetadata); //set pendingProfileJSONMetadata state back to profileJSONMetadata if user wants to discard edits
        //TO-DO need to also do this for images
      }
    });
  };

  return (
    <div
      className="transition absolute right-1 top-12 p-8 rounded-md w-[640px] origin-top-right xl:scale-[.85] lg:scale-[.6] md:scale-[0.6] scale-[0.3] bg-opacity-30 bg-white text-black overflow-auto"
      style={{ backgroundColor: UPColor ?? "#FFFFFF", color: UPTextColor ?? "#000000" }}>
      <div className={`absolute w-full inset-0 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-400 rounded-lg blur opacity-25 -z-20`}></div>
      {!editMode && <div className={`fixed inset-0 bg-black rounded-md opacity-10 z-40`} style={{ boxShadow: `0px 5px 10px 5px ${UPColor}` }}></div>}
      <button
        className={`absolute z-50 top-1 right-1 border rounded-xl px-2 text-white ${
          editMode ? "bg-green-500" : "bg-black"
        } font-semibold hover:bg-slate-300 hover:text-slate-500 `}
        onClick={() => setEditMode(curr => !curr)}>
        {editMode ? (
          <div className="flex flex-row items-center gap-1">
            <VscUnlock /> Edit Mode
          </div>
        ) : (
          <div className="flex flex-row items-center gap-1">
            <VscLock /> View Mode
          </div>
        )}
      </button>
      <div
        className="flex flex-col justify-between items-center border-2 border-blue-400 rounded-md py-2 shadow-md shadow-blue-400/50 gap-0.5 bg-slate-800 bg-opacity-70 text-white  "
        style={{ boxShadow: `0px 4px 6px -1px ${UPTextColor ?? "#000000"}` }}>
        <div
          className={`flex flex-row gap-2 text-2xl font-semibold font-header z-50 text-transparent bg-clip-text`}
          style={{ backgroundImage: `linear-gradient(to top left, #fff, ${UPTextColor ?? "#BBBBBB"}, #fff)` }}>
          Universal Profile
          <a href={`https://l16.universalprofile.cloud/${currentAccount}`} target="_blank" className="hover:scale-105">
            <img src={UniversalCloudLogo} alt="Lukso Cloud Logo" className="w-8 h-8" />
          </a>
        </div>
        <div className="z-50">
          <Address address={currentAccount} />
          <LYXBalanceFuncs />
        </div>
      </div>

      {isProfileLoaded ? (
        <div className="relative flex flex-col min-h-96 pt-16">
          <div className="absolute top-4 max-h-44 flex w-full hover:scale-105 justify-center text-base font-semibold text-blue-500 px-4 rounded border-2 border-blue-400 bg-slate-800 bg-opacity-60">
            {profileJSONMetadata.backgroundImage.length > 0 ? (
              <UploadBannerImage
                id="banner"
                currentImage={profileJSONMetadata.backgroundImage[maxImageIndex(profileJSONMetadata.backgroundImage, 100)].url.replace(
                  "ipfs://",
                  IPFS_GATEWAY
                )}
              />
            ) : (
              <UploadBannerImage id="banner" /> //if current image is not passed in props, use default text
            )}
          </div>

          <div className="flex gap-3 items-center mt-6 border-color border-b-1 pb-6 px-2 z-10">
            <div
              className="w-1/3 flex justify-center items-center border-4 rounded-full content-square shadow-md aspect-square bg-gradient-to-tr from-pink-200 to-pink-100 hover:scale-105"
              style={{ borderColor: UPTextColor ?? "#DDDDDD", boxShadow: `0px 4px 6px -1px ${UPTextColor ?? "#000000"}` }}>
              {profileJSONMetadata.profileImage.length > 0 ? (
                <UploadProfileImage
                  id="profile"
                  currentImage={profileJSONMetadata.profileImage[maxImageIndex(profileJSONMetadata.profileImage, 100)]?.url?.replace(
                    "ipfs://",
                    IPFS_GATEWAY
                  )}
                />
              ) : (
                <UploadProfileImage id="profile" />
              )}
            </div>
            <div className="w-2/3 mt-12 flex flex-col justify-end">
              <div
                className="font-['Arial'] bg-gradient-to-r from-slate-900 via-slate-800 border-blue-400 border-2 rounded-t px-2 border-b-0 "
                style={{ color: UPTextColor ?? "white" }}>
                <EditText
                  defaultValue={profileJSONMetadata.name}
                  inputClassName="bg-success"
                  value={pendingProfileJSONMetadata.name}
                  onChange={e => setPendingProfileJSONMetadata(current => ({ ...current, name: e.target.value }))}
                  style={{ padding: "0px", margin: "0x", fontSize: "1.5rem", lineHeight: "2rem", fontWeight: "600" }}
                />
              </div>
              <div
                className=" border-blue-400 rounded-b border-2 px-2 text-md bg-white text-black border-t-0"
                style={{ boxShadow: `0px 4px 6px -1px ${UPTextColor ?? "#000000"}` }}>
                <EditTextarea
                  rows={3}
                  defaultValue={profileJSONMetadata.description}
                  inputClassName="bg-success"
                  value={pendingProfileJSONMetadata.description}
                  onChange={e => setPendingProfileJSONMetadata(current => ({ ...current, description: e.target.value }))}
                  style={{ padding: "0px", margin: "0x" }}
                />
              </div>
            </div>
          </div>

          <ProfileTags editMode={editMode} />

          <ProfileLinks editMode={editMode} />

          <div className="flex flex-row items-center flex-wrap z-50">
            <MyMenuItem icon={<AiOutlineWallet />} iconColor="bg-slate-800" linkTo="myluksowallet" header="MyLukso-Wallet" />
            <MyMenuItem icon={<RiUserSettingsFill />} iconColor="bg-orange-500" linkTo="myuniversalprofile" header="My Profile Config" />
            <MyMenuItem icon={<GiTwoCoins />} iconColor="bg-green-700" linkTo="myassets" header="My Assets" />
          </div>

          {editMode ? (
            <div className="grid grid-cols-3 gap-4 mt-2">
              <UpdateProfile />
              <ButtonColor buttonText={"Discard Edits"} buttonFunc={handleDiscardEdits} customStyle={"bg-red-500 hover:bg-red-700"} />
              <DisconnectProfile />
            </div>
          ) : (
            <div className="flex flex-row justify-end self-end w-full z-50 mt-2">
              <DisconnectProfile />
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default UniversalProfile;
