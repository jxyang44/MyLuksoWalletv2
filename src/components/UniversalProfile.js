import React, { useEffect, useState} from 'react';
import {AiTwotoneStar} from 'react-icons/ai';
import {GiTwoCoins} from 'react-icons/gi';
import {BsSafe} from 'react-icons/bs';
import {RiUserSettingsFill} from 'react-icons/ri';
import {Address, MyMenuItem,Loading, Button_Shadow, UpdateProfile, DisconnectProfile, UploadProfileImage, ProfileTags, ProfileLinks, LYXBalanceFuncs} from '.';
import {useProfileContext} from '../contexts/ProfileContext';
import {useAssetsContext} from '../contexts/AssetsContext';
import { EditText, EditTextarea } from 'react-edit-text';
import { IPFS_GATEWAY } from '../utils/ERC725Config';
import 'react-edit-text/dist/index.css';
import swal from 'sweetalert';

const UserProfile = () => {
  const {defaultMetadata, currentAccount, isProfileLoaded, profileJSONMetadata, pendingProfileJSONMetadata, setPendingProfileJSONMetadata, maxImageIndex } = useProfileContext();
  console.log(pendingProfileJSONMetadata.profileImage)
  
  useEffect(() => {
    if(isProfileLoaded === true) {
      profileJSONMetadata.name === '' && setPendingProfileJSONMetadata(current => ({...current, name: defaultMetadata.name})); //set name to default (e.g. "My username") if empty
      profileJSONMetadata.description === '' && setPendingProfileJSONMetadata(current => ({...current, description: defaultMetadata.description})); //set name to default (e.g. "My description") if empty
    }
  },[])
  
  //for debugging
  useEffect(() => {
    console.log("profile:", profileJSONMetadata)
    console.log("pending:", pendingProfileJSONMetadata)
  },[pendingProfileJSONMetadata, profileJSONMetadata])

  //navigation modals for discarding edits
  const handleDiscardEdits = () => {
    if(JSON.stringify(pendingProfileJSONMetadata)===JSON.stringify(profileJSONMetadata)){
      swal("You do not have edits to discard.");
      return;
    } 
    swal({
      title: "Are you sure you want to discard edits?",
      text:"You will not be able to recover any discarded changes.",
      buttons: [true, "Discard"],
      dangerMode: true,
    })
    .then((value) => {
      if(value){
        setPendingProfileJSONMetadata(profileJSONMetadata); //set pendingProfileJSONMetadata state back to profileJSONMetadata if user wants to discard edits
      }
    });   
  }

  return (
    <div className="transition absolute right-1 top-16 p-8 rounded-lg w-2/6 bg-gradient-to-bl from-indigo-100 via-purple-100 to-pink-100 shadow-2xl shadow-pink-100/80">
      <div className="flex flex-col justify-between items-center border-2 border-blue-400 rounded-md py-2 shadow-md shadow-blue-400/50 gap-0.5">
        <p className="text-2xl font-semibold font-header text-transparent bg-clip-text bg-gradient-to-tl from-gray-700 via-gray-900 to-gray-700">Universal Profile</p>
        <Address address={currentAccount}/>
        <LYXBalanceFuncs/>
      </div>

      {
        isProfileLoaded ?
          <div className="flex flex-col gap-2 min-h-96">
            <button className="flex w-full justify-center mt-2 max-h-40 hover:scale-105 ">
              {profileJSONMetadata.backgroundImage.length>0 ? 
                <img src={profileJSONMetadata.backgroundImage[maxImageIndex(profileJSONMetadata.backgroundImage,100)].url.replace("ipfs://", IPFS_GATEWAY)}></img>
              :
              <div className='text-base font-semibold text-blue-500 w-full px-4 rounded border-2 border-blue-400 bg-gradient-to-tr from-pink-200 to-pink-100'>
                Upload Banner Image
              </div>
              }
            </button>

            <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">  
              <div className="w-1/3 flex justify-center items-center border-4 rounded-full content-square border-blue-400 shadow-blue-300 shadow-md aspect-square bg-gradient-to-tr from-pink-200 to-pink-100 hover:scale-105">
                {
                  profileJSONMetadata.profileImage.length>0 ?
                    <UploadProfileImage id="profile" currentImage={profileJSONMetadata.profileImage[maxImageIndex(profileJSONMetadata.profileImage,100)].url.replace("ipfs://", IPFS_GATEWAY)}/>
                    :
                    <UploadProfileImage id="profile" />
                }
              </div>
              <div className="w-2/3">
                <EditText className='font-semibold text-xl' 
                    defaultValue={profileJSONMetadata.name} 
                    inputClassName='bg-success' 
                    value = {pendingProfileJSONMetadata.name} 
                    onChange={(e)=>setPendingProfileJSONMetadata(current=>({...current, name: e.target.value}))}
                    style={{padding: '0px', margin:'0x', fontSize:'1.125rem', lineHeight:'1.75rem', fontWeight: '600'}}
                />
                <EditTextarea
                    className='text-gray-800 text-sm'
                    rows={4} 
                    defaultValue={profileJSONMetadata.description} 
                    inputClassName='bg-success'
                    value = {pendingProfileJSONMetadata.description} 
                    onChange={(e)=>setPendingProfileJSONMetadata(current=>({...current, "description": e.target.value}))}
                    style={{padding: '0px', margin:'0x', fontSize:'0.875rem', lineHeight:'1.25rem'}}
                />
              </div>
            </div>
            
            <ProfileTags/>
            
            <ProfileLinks/>
    
            {/* <MyMenuItem icon={<AiOutlineLink/>} iconColor="bg-blue-500" linkTo="" header="MyLinks" items={profileJSONMetadata.links.length && pendingProfileJSONMetadata.links} itemType="link"/> */}
            <div className='flex flex-row items-center flex-wrap'>
              <MyMenuItem icon={<RiUserSettingsFill/>}  iconColor="bg-orange-500" linkTo="myuniversalprofile" header="My Profile Config"/>
              <MyMenuItem icon={<GiTwoCoins/>}  iconColor="bg-green-700" linkTo="mytokens" header="My Tokens"/>
              <MyMenuItem icon={<AiTwotoneStar/>}  iconColor="bg-violet-600" linkTo="myNFTs" header="My NFTs"/>
              <MyMenuItem icon={<BsSafe/>}  iconColor="bg-slate-800" linkTo="myvaults" header="My Vaults"/>
            </div>

            <div className="flex flex-row self-end w-full gap-3">
              <UpdateProfile />
              <Button_Shadow buttonText={"Discard Edits"} buttonFunc={handleDiscardEdits} buttonColor={"bg-red-500"} buttonTextColor ={"text-red-800"}/>
              <DisconnectProfile />
            </div>
          </div>
          :
          <Loading/>
      }    
    </div>
  );
};

export default UserProfile;