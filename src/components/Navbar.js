import React, {useState, useEffect} from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import {RiUserSearchLine} from 'react-icons/ri';
import { MdKeyboardArrowDown,MdKeyboardArrowUp } from 'react-icons/md';

import {useStateContext} from '../contexts/StateContext';
import {useProfileContext} from '../contexts/ProfileContext';
import {UserProfile, Button, Logo} from './';
import {IPFS_GATEWAY} from '../utils/ERC725Config';
import swal from 'sweetalert';

const Navbar = () => {
  const {activeMenu, setActiveMenu, activeProfile, setActiveProfile, setScreenSize, screenSize} = useStateContext();
  const {isProfileLoaded, connectProfile, profileJSONMetadata, pendingProfileJSONMetadata} = useProfileContext();
  const [scrollHeight, setScrollHeight] = useState(0);
  

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollHeight(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  
  const handleMenuClick = () => {
      if(activeProfile && JSON.stringify(pendingProfileJSONMetadata)!==JSON.stringify(profileJSONMetadata)){
        swal({
          title: "You have edits that have not been uploaded to the Lukso network. Are you sure you want to continue?",
          text:  "Your edits will be stored as draft as long as you do not disconnect your profile.",
          buttons: [true, "Yes"],
        })
        .then((value) => {
          if(value)
          setActiveProfile(current=>!current);
        });
      }
      else{
        setActiveProfile(current=>!current);
      } 
  }


  return (
    <div className="flex justify-between items-center h-14 mb-4 relative">
      <div onClick={()=>setActiveMenu(!activeMenu)} className="relative rounded p-3 text-slate-300 cursor-pointer hover:text-white mr-44"><AiOutlineMenu/></div>
      {scrollHeight===0 && <div><Logo customFunc = {""} customProps ={"hover:text-white"}/></div>}
      <div className="flex mt-1 mb-1 mr-1">
        {
        isProfileLoaded ?
          <div className={`flex justify-between items-center gap-2 cursor-pointer py-2 px-3  rounded-lg transition-all duration-500
          bg-slate-600 from-white hover:bg-gradient-to-t ${activeProfile?"bg-gradient-to-t  opacity-70":"bg-gradient-to-b shadow-md shadow-black/80 "}`}  
            onClick={handleMenuClick}>
            {
              profileJSONMetadata.profileImage.length ? 
                <img className="rounded-full w-6 h-6" src={profileJSONMetadata.profileImage[0].url.replace("ipfs://", IPFS_GATEWAY)} />
                : 
                <div className="text-gray-400">
                    <RiUserSearchLine/>
                </div>
            }
            <p className="font-bold ml-1 text-14 text-black flex flex-row items-center gap-2"> {profileJSONMetadata.name} {activeProfile?<MdKeyboardArrowUp/>:<MdKeyboardArrowDown/> }</p>
          </div>
          :
          <Button buttonText="Connect Universal Profile" buttonFunc={()=>connectProfile()}/>
        }
        {activeProfile && <UserProfile/>}
      </div>
    </div>
  );
};

export default Navbar;