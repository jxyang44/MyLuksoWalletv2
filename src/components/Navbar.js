//navbar, includes activation sidebar icon, logo, connect profile button, and universal profile window toggle

import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiUserSearchLine } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { useStateContext } from "../contexts/StateContext";
import { useProfileContext } from "../contexts/ProfileContext";
import { UniversalProfile, Tabs } from "./";
import { IPFS_GATEWAY } from "../utils/luksoConfigs";
import { MdOutlineLogin } from "react-icons/md";
import swal from "sweetalert";

const Navbar = () => {
  const { setActiveMenu, activeProfile, setActiveProfile, setScrollHeight, UPColor } = useStateContext();
  const { isProfileLoaded, connectProfile, profileJSONMetadata, loginWithKey, useRelay } = useProfileContext();

  //scroll height used for home page animations
  //resize used for mobile devices
  useEffect(() => {
    if (window.innerWidth < 768) {
      //&& window.screen.orientation.type.includes("portrait")
      swal(
        "Mobile device detected.",
        "The hackathon was designed for desktop operability, so MyLuksoWallet's core functionality is built around the desktop browser extension. \n\n Some features currently will not work for mobile. For the best experience, please rotate your device."
      );
    }

    // const handleResize = () => {
    //   if (
    //     window.innerWidth < 768 &&
    //     window.screen.orientation.type.includes("portrait")
    //   ) {
    //     swal(
    //       "Mobile device detected.",
    //       "The hackathon was designed for desktop operability, so MyLuksoWallet's core functionality is built around the desktop browser extension. \n\n Some features currently will not work for mobile. For the best experience, please rotate your device."
    //     );
    //   }
    // };
    const handleScroll = () => setScrollHeight(window.scrollY);
    // window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    // handleResize();

    return () => {
      //  window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleProfileClick = () => {
    setActiveProfile(current => !current);

    // displays a warning if the user has pending changes and closes their profile window - commented out due to overactive message
    // if (activeProfile && JSON.stringify(pendingProfileJSONMetadata) !== JSON.stringify(profileJSONMetadata)) {
    //   swal({
    //     title: "You have edits that have not been uploaded to the Lukso network. Are you sure you want to continue?",
    //     text: "Your edits will be stored as draft as long as you do not disconnect your profile.",
    //     buttons: [true, "Yes"],
    //   }).then(value => {
    //     if (value) setActiveProfile(current => !current);
    //   });
    // } else {
    //   setActiveProfile(current => !current);
    // }
  };

  //TO-DO Relay service disabled for the hackathon - implementation will be enabled in the future
  const handleRelay = () => {
    // useRelay
    //   ? swal("Relay Service Disabled", "Gas fees will be paid from your Universal Profile balance. Please make sure your account is funded!", "")
    //   : swal("Relay Service Enabled", "MyLuksoWallet will pay your gas fees! This service is only free for the duration of L16 testnet.", "");
    // setUseRelay(curr => !curr);
    swal("Under Construction 👷", "This feature is not implemented yet.");
  };

  return (
    <div className="relative flex h-14 items-center justify-between">
      <div onClick={() => setActiveMenu(curr => !curr)} className="relative cursor-pointer rounded p-3 text-slate-300 hover:text-white">
        <AiOutlineMenu />
      </div>

      <div className="mt-1 mb-1 mr-1 flex flex-col items-end gap-1 ">
        {isProfileLoaded ? (
          <>
            <div
              className={`flex cursor-pointer items-center justify-between gap-1 rounded-lg bg-slate-600 from-white py-1 px-1
          transition-all duration-500 hover:bg-gradient-to-t ${
            activeProfile ? "bg-gradient-to-t  opacity-70" : "bg-gradient-to-b shadow-md shadow-black/80 "
          }`}
              style={{ backgroundColor: UPColor ?? "#FFFFFF" }}
              onClick={handleProfileClick}>
              {profileJSONMetadata.profileImage.length ? (
                <img className="h-6 w-6 rounded-full" src={profileJSONMetadata.profileImage[0].url.replace("ipfs://", IPFS_GATEWAY)} />
              ) : (
                <div className="text-gray-400">
                  <RiUserSearchLine />
                </div>
              )}
              <p className="ml-1 flex flex-row items-center gap-2 text-sm font-bold text-black xl:text-base">
                {profileJSONMetadata.name} {activeProfile ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
              </p>
            </div>
            {/* <button
              className={`text-white xl:text-sm text-xs font-semibold  w-fit border border-white px-3 hover:text-slate-800 hover:bg-slate-200 rounded-xl opacity-80 flex flex-row items-center justify-center ${
                useRelay ? "bg-green-500 contrast-100" : "bg-gray-300 contrast-20"
              }`}
              onClick={handleRelay}>
              Use Relay: {useRelay ? "On" : "Off"}
            </button> */}
          </>
        ) : (
          <div className="mt-5 flex flex-col items-end gap-1">
            <button
              className={`focus:shadow-outline rounded-2xl bg-gradient-to-br from-sky-400 via-sky-200 to-sky-300 py-1 px-3 md:px-6 text-sm font-semibold text-sky-700 hover:text-white hover:bg-gradient-to-bl hover:shadow-white hover:shadow-sm focus:outline-none md:text-base`}
              onClick={() => connectProfile()}>
              Connect Profile
            </button>

            <div className="flex w-fit flex-col gap-0.5 text-xs text-white xl:text-sm">
              <button //manual log-in with public key
                className="flex flex-row items-center justify-center rounded-xl border border-white px-2 opacity-80 hover:bg-slate-200 hover:text-slate-800"
                onClick={() => loginWithKey("UP Address")}>
                <MdOutlineLogin /> &nbsp; Manual Login
              </button>
            </div>
          </div>
        )}
        {activeProfile && <>
          <Tabs/>
          <UniversalProfile />
        </>}
      </div>
    </div>
  );
};

export default Navbar;
