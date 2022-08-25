import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RiUserSearchLine } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { useStateContext } from "../contexts/StateContext";
import { useProfileContext } from "../contexts/ProfileContext";
import { UniversalProfile, Button, Logo } from "./";
import { IPFS_GATEWAY } from "../utils/ERC725Config";
import { MdOutlineLogin } from "react-icons/md";
import swal from "sweetalert";

const Navbar = () => {
  const { setActiveMenu, activeProfile, setActiveProfile, setScreenSize, screenSize, scrollHeight, setScrollHeight, UPColor } = useStateContext();
  const {
    isProfileLoaded,
    activateAccountChangedListener,
    connectProfile,
    profileJSONMetadata,
    pendingProfileJSONMetadata,
    loginWithKey,
    useRelay,
    setUseRelay,
  } = useProfileContext();


  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    const handleScroll = () => setScrollHeight(window.scrollY);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    handleResize();
    activateAccountChangedListener();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleProfileClick = () => {
    setActiveProfile(current => !current);
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

  const handleMenuClick = () => {
    // if (pathname.toLowerCase() === "/myluksowallet" && !activeMenu) {
    //   swal({
    //     text: "Exit the MyLuksoWallet DApp?",
    //     buttons: [true, "Yes"],
    //   }).then(value => {
    //     if (value) setActiveMenu(curr => !curr);
    //   });
    // } else {
      setActiveMenu(curr => !curr);
    //}
  };

  const handleRelay = () => {
    // useRelay
    //   ? swal("Relay Service Disabled", "Gas fees will be paid from your Universal Profile balance. Please make sure your account is funded!", "")
    //   : swal("Relay Service Enabled", "MyLuksoWallet will pay your gas fees! This service is only free for the duration of L16 testnet.", "");
    // setUseRelay(curr => !curr);
    swal("Under Construction 👷","This feature is not implemented yet.")
  };

  return (
    <div className="flex justify-between items-center h-14 mb-4 relative">
      <div onClick={handleMenuClick} className="relative rounded p-3 text-slate-300 cursor-pointer hover:text-white mr-44">
        <AiOutlineMenu />
      </div>
      {scrollHeight === 0 && (
        <div>
          <Logo customFunc={""} customProps={"hover:text-white"} />
        </div>
      )}
      <div className="flex flex-col items-end gap-1 mt-6 mb-1 mr-1">
        {isProfileLoaded ? (
        <>
          <div
            className={`flex justify-between items-center gap-1 cursor-pointer py-1 px-1 rounded-lg transition-all duration-500
          bg-slate-600 from-white hover:bg-gradient-to-t ${
            activeProfile ? "bg-gradient-to-t  opacity-70" : "bg-gradient-to-b shadow-md shadow-black/80 "
          }`}  style={{ backgroundColor: UPColor ?? "#FFFFFF"}}
            onClick={handleProfileClick}>    
            {profileJSONMetadata.profileImage.length ? (
              <img className="rounded-full w-6 h-6" src={profileJSONMetadata.profileImage[0].url.replace("ipfs://", IPFS_GATEWAY)} />
            ) : (
              <div className="text-gray-400">
                <RiUserSearchLine />
              </div>
            )}
            <p className="font-bold ml-1 lg:text-base text-sm text-black flex flex-row items-center gap-2">
              {profileJSONMetadata.name} {activeProfile ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </p>
          </div>
             <button
             className={`text-white lg:text-sm text-xs font-semibold  w-fit border border-white px-3 hover:text-slate-800 hover:bg-slate-200 rounded-xl opacity-80 flex flex-row items-center justify-center ${
               useRelay ? "bg-green-500 contrast-100" : "bg-gray-300 contrast-20"
             }`}
             onClick={handleRelay}>
             Use Relay: {useRelay ? "On" : "Off"}
           </button>
           </>
        ) : (
          <div className="flex flex-col gap-1 items-end">
            <Button buttonText="Connect Profile" buttonFunc={() => connectProfile()} />
            <div className="text-white text-sm font-semibold flex flex-col gap-1 w-fit">
             
              <button
                className="border border-white px-3 hover:text-slate-800 hover:bg-slate-200 rounded-xl opacity-80 flex flex-row items-center justify-center"
                onClick={() => loginWithKey("UP Address")}>
                <MdOutlineLogin /> &nbsp; UP Address Login
              </button>
            </div>
          </div>
        )}
        {activeProfile && <UniversalProfile />}
      </div>
    </div>
  );
};

export default Navbar;
