import React, {useState, useEffect} from 'react';
import {web3, lspFactoryInstance, createErc725Instance, IPFS_GATEWAY, LSP6Contract, UniversalProfileContract} from '../../utils/ERC725Config';
import {Button_Shadow} from '..'
import {useProfileContext} from '../../contexts/ProfileContext';
import swal from 'sweetalert';


const PRIVATE_KEY = process.env.REACT_APP_METAMASK_MY_DEV_PRIVATE_KEY; //jxyang metamask private key - dev account: only used to pay gas

//something doesn't work right for when uploading background image
const testJSON = {"LSP3Profile":{"name":"MyLuksoWallet","description":"This is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\n","links":[{"title":"...","url":"..."},{"title":"","url":"https://test"}],"tags":["myluksowallet","new tag","new tag"],"avatar":[],"profileImage":[{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":180,"height":180,"hashFunction":"keccak256(bytes)","hash":"0xeb41471392725596da7d34be6c6c2eb077d4514679c1543db25a1016c17567d5","url":"ipfs://QmSE3kd3i8p62EXow2y1MMB7kSDvADH2mAjdJ8DwYL5d2D"}],"backgroundImage":[{"width":1024,"height":576,"hashFunction":"keccak256(bytes)","hash":"0x...","url":"ipfs://..."}]}}

const UpdateProfile = () => {
    const {isProfileLoaded, currentAccount, profileJSONMetadata, setProfileJSONMetadata, pendingProfileJSONMetadata} = useProfileContext();
    const [isEdited, setIsEdited] = useState(false); //false if pendingProfileJSONMetadata = profileJSONMetadata
    
    //updates isEdited as pendingProfileJSONMetadata changes
    useEffect(() => {
        if(isProfileLoaded === false) {
            setIsEdited(false);
            return;
        }
        JSON.stringify(pendingProfileJSONMetadata)===JSON.stringify(profileJSONMetadata) ? setIsEdited(false) : setIsEdited(true);
    },[pendingProfileJSONMetadata])

    //primary logic to update profile information on the blockchain
    //code largely extracted from Lukso docs: https://docs.lukso.tech/guides/universal-profile/edit-profile
    const editProfileInfo = async () => {
        try{
            const jsonFile = {"LSP3Profile": pendingProfileJSONMetadata}; //pendingProfileJSONMetadata is (mainly) updated in UserProfile.js

            // const jsonFile = testJSON;
            const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

            swal("Uploading profile metadata...", {button: false, closeOnClickOutside: false});
            const uploadResult = await lspFactoryInstance.UniversalProfile.uploadProfileData(jsonFile.LSP3Profile);
            const lsp3ProfileIPFSUrl = uploadResult.url;
            console.log(uploadResult.url, uploadResult)
            const erc725 = createErc725Instance(currentAccount);
            const encodedData = erc725.encodeData({
                keyName: "LSP3Profile",
                value: {
                    hashFunction: "keccak256(utf8)",
                    hash: web3.utils.keccak256(JSON.stringify(jsonFile)),
                    url: lsp3ProfileIPFSUrl,
                },
            });
            console.log(encodedData)
            swal("Fetching key manager address...", {button: false, closeOnClickOutside: false});
            
            const universalProfileContract = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);
            const keyManagerAddress = await universalProfileContract.methods.owner().call();
            const keyManagerContract = new web3.eth.Contract(LSP6Contract.abi, keyManagerAddress);
            //console.log(keyManagerAddress)
            swal("Encoding metadata...", {button: false, closeOnClickOutside: false});
            const abiPayload = await universalProfileContract.methods["setData(bytes32[],bytes[])"](
                encodedData.keys,
                encodedData.values
            ).encodeABI();
            console.log(encodedData)
       

            swal("Setting Universal Profile data...", {button: false, closeOnClickOutside: false});
            return await keyManagerContract.methods.execute(abiPayload).send({from: myEOA.address, gasLimit: 300_000 });
        } catch (error) {
            swal("Something went wrong.",`${error}`,"warning");
        }
    }

    //add limits to metadata characters lengths?
    //fix tags changes
    const handleUploadEdits = () => {
        if(isProfileLoaded === false) {
            swal("You are not connected to an account.");
            return;
        }
        if(!isEdited){
          swal("You have not modified your Universal Profile.");
          return;
        } 

        const edits = []; //used to prompt the user to confirm the metadata fields that were changed
        for (const [key,newValue] of Object.entries(pendingProfileJSONMetadata)) {
         
          if(newValue instanceof File) {
            edits.push({key, newValue: newValue.name, oldValue: "old profile"});
              //profileJSONMetadata[key][0].name || profileJSONMetadata[key][0].url?.replace("ipfs://", IPFS_GATEWAY)});
          }
          else if (newValue && newValue !== profileJSONMetadata[key]) {
            edits.push({key, newValue, oldValue: profileJSONMetadata[key]});   
          }
        }

        
        swal({
          title: "Please confirm upload of these changes to the Lukso network. Once confirmed, your edits cannot be reverted.",
          text:`${edits.map((edit)=>`\nUPDATE: "${edit.key}" \nFROM: "${edit.oldValue}" \nTO: "${edit.newValue}"\n`)}`,
          buttons: {
            cancel: true,
            confirm: true,
          },
        })
        .then((value) => {
          if(value) {
            editProfileInfo()
            .then((res)=> { 
              console.log(res);
                setProfileJSONMetadata(pendingProfileJSONMetadata)
                swal("Congratulations!","Your Universal Profile has been updated on the Lukso network!","success")})
            .catch(() => {
                swal("Profile could not be updated.", "", "error");
            });
          }
        })
      }

    return (
        <Button_Shadow buttonText={"Upload Edits"} buttonFunc={handleUploadEdits} buttonColor={"bg-green-500"} buttonTextColor ={"text-green-800"}/>       
    )
  }

export default UpdateProfile;