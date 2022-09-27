//main container for universal profile dropdown

import React, { useEffect, useState } from "react";
import { AiOutlineWallet } from "react-icons/ai";
import { GiTwoCoins } from "react-icons/gi";
import { VscUnlock, VscLock } from "react-icons/vsc";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsSafeFill } from "react-icons/bs";
import {
  Address,
  MyMenuItem,
  Loading,
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
  const borderStyle = {
    borderColor: UPTextColor ?? "#DDDDDD",
    boxShadow: `0px 2px 4px -1px ${UPTextColor ?? "#000000"}`,
  };
  useEffect(() => {
    if (isProfileLoaded === true) {
      profileJSONMetadata.name === "" &&
        setPendingProfileJSONMetadata(current => ({
          ...current,
          name: defaultMetadata.name,
        })); //set name to default (e.g. "My username") if empty
      profileJSONMetadata.description === "" &&
        setPendingProfileJSONMetadata(current => ({
          ...current,
          description: defaultMetadata.description,
        })); //set name to default (e.g. "My description") if empty
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
      className="absolute right-1 top-12 w-[640px] origin-top-right scale-[0.6] overflow-auto rounded-xl bg-white bg-opacity-30 p-8 text-black transition xl:scale-[.85] animate-profile-in xl:animate-profile-in-xl"
      style={{
        backgroundColor: UPColor ?? "#FFFFFF",
        color: UPTextColor ?? "#000000",
        boxShadow: `2px 3px 8px -1px white`,
      }}>
      <div className={`absolute inset-0 -z-20 w-full rounded-xl bg-gradient-to-br from-slate-700 via-slate-200 to-slate-700 opacity-25 blur`}></div>
      {!editMode && <div className={`fixed inset-0 z-40 rounded-xl bg-black opacity-10`} style={{ boxShadow: `0px 5px 10px 5px ${UPColor}` }}></div>}
      <button
        className={`absolute top-1 right-1 z-50 rounded-xl border px-2 text-white ${
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
        className="flex flex-col items-center justify-between gap-0.5 rounded-2xl border-2 bg-slate-800 bg-opacity-70 py-2 text-white shadow-md shadow-blue-400/50  "
        style={borderStyle}>
        <div
          className={`font-header z-50 flex flex-row gap-2 bg-clip-text text-2xl font-semibold text-transparent`}
          style={{
            backgroundImage: `linear-gradient(to top left, #fff, ${UPTextColor ?? "#BBBBBB"}, #fff)`,
          }}>
          Universal Profile
          <a href={`https://l16.universalprofile.cloud/${currentAccount}`} target="_blank" className="hover:scale-105">
            <img src={UniversalCloudLogo} alt="Lukso Cloud Logo" className="h-8 w-8" />
          </a>
        </div>
        <div className="z-50 flex flex-col items-center">
          <Address address={currentAccount} />
          <LYXBalanceFuncs />
        </div>
      </div>

      {isProfileLoaded ? (
        <div className="min-h-96 relative flex flex-col pt-16">
          <div className="absolute top-4 flex max-h-44 w-full justify-center rounded-2xl border-2 bg-slate-800 bg-opacity-60 px-4 text-base font-semibold sssssssss hover:scale-105" style={borderStyle}>
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

          <div className="border-color border-b-1 z-10 mt-6 flex items-center gap-3 px-2 pb-6">
            <div
              className="content-square flex aspect-square w-1/3 items-center justify-center rounded-full border-4 shadow-md bg-white hover:scale-105"
              style={borderStyle}>
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
            <div className="mt-12 flex w-2/3 flex-col justify-end">
              <div className="rounded-t-2xl border-2 border-b-0 bg-gradient-to-r from-slate-900 via-slate-800 px-2 font-['Arial'] " style={borderStyle}>
                <EditText
                  defaultValue={profileJSONMetadata.name}
                  inputClassName="bg-success"
                  value={pendingProfileJSONMetadata.name}
                  onChange={e =>
                    setPendingProfileJSONMetadata(current => ({
                      ...current,
                      name: e.target.value,
                    }))
                  }
                  style={{
                    color: UPTextColor ?? "white",
                    padding: "0px",
                    margin: "0x",
                    fontSize: "1.5rem",
                    lineHeight: "2rem",
                    fontWeight: "600",
                  }}
                />
              </div>
              <div
                className="text-md rounded-b-2xl border-2 border-t-0 bg-white px-2 text-black"
                style={borderStyle}>
                <EditTextarea
                  rows={3}
                  defaultValue={profileJSONMetadata.description}
                  inputClassName="bg-success"
                  value={pendingProfileJSONMetadata.description}
                  onChange={e =>
                    setPendingProfileJSONMetadata(current => ({
                      ...current,
                      description: e.target.value,
                    }))
                  }
                  style={{ padding: "0px", margin: "0x" }}
                />
              </div>
            </div>
          </div>

          <ProfileTags editMode={editMode} />

          <ProfileLinks editMode={editMode} />

          <div className="z-50 flex flex-row flex-wrap items-center">
            <MyMenuItem icon={<AiOutlineWallet />} iconColor="bg-slate-800" linkTo="myluksowallet" header="MLW DApp" />
            <MyMenuItem icon={<RiUserSettingsFill />} iconColor="bg-orange-500" linkTo="myuniversalprofile" header="Profile Settings" />
            <MyMenuItem icon={<BsSafeFill />} iconColor="bg-gray-500" linkTo="myvaults" header="My Vaults" />
            <MyMenuItem icon={<GiTwoCoins />} iconColor="bg-green-700" linkTo="myassets" header="My Assets" />
          </div>

          {editMode ? (
            <div className="mt-2 grid grid-cols-3 gap-4">
              <UpdateProfile customStyle={"bg-green-700 shadow-md shadow-black hover:scale-110 hover:bg-green-900"} />
              <ButtonColor
                buttonText={"Discard Edits"}
                buttonFunc={handleDiscardEdits}
                customStyle={"shadow-md shadow-black hover:scale-110 bg-red-700 hover:bg-red-900"}
              />
              <DisconnectProfile customStyle={"shadow-md shadow-black hover:scale-110 bg-gray-700 hover:bg-gray-900"} />
            </div>
          ) : (
            <div className="z-50 mt-2 flex w-full flex-row justify-end self-end">
              <DisconnectProfile customStyle={"shadow-md shadow-black hover:scale-110 bg-gray-700 hover:bg-gray-900"} />
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
