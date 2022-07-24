import { ERC725 } from '@erc725/erc725.js';
import {web3, LSP6Schema, LSP6Contract, UniversalProfileContract} from '../../utils/ERC725Config';

import React from 'react'
import { Button_Shadow } from '..'
import { useProfileContext } from '../../contexts/ProfileContext';
import swal from 'sweetalert';
import Swal from 'sweetalert2';



const KeyManager = () => {
  const { currentAccount } = useProfileContext();

  //https://docs.lukso.tech/guides/key-manager/get-controllers
  const checkPermissions = () =>{
    const erc725 = new ERC725(
      LSP6Schema,
      currentAccount,
      web3.currentProvider,
    );
    async function getPermissionedAddresses() {
      const result = await erc725.getData('AddressPermissions[]');
      console.log(result)
      for (let ii = 0; ii < result.value.length; ii++) {
        const address = result.value[ii];
        const addressPermission = await erc725.getData({
          keyName: 'AddressPermissions:Permissions:<address>',
          dynamicKeyParts: address,
        });
        const decodedPermission = erc725.decodePermissions(addressPermission.value);
        console.log(
          `decoded permission for ${address} = ` +
            JSON.stringify(decodedPermission, null, 2),
        );
      }
    }
    
    getPermissionedAddresses();
  }
  
  //https://docs.lukso.tech/guides/key-manager/give-permissions
  const handleGrantPermissions = () => {
      
    //   const grantPermissions = async () => { //async function to guide user through permissions modals
        
          const privateKeyIsValid = (privateKey) => { //function to validate private key for extension
              const myUPExtension = web3.eth.accounts.wallet.add(privateKey);
              if(myUPExtension.address === currentAccount)
                return true;
              else{
                return false;
              }
        }


    //     let accountType;
    //     const { value: toAddress } = await Swal.fire({ //modal to grant permissions to address
    //       title: '(FOR TESTNET USE ONLY) Grant Permissions',
    //       text: ' Please enter the private key of your account to grant permissions (the extension currently does not have an import feature, so we must do this manually via private key):',
    //       input: 'text',
    //       inputPlaceholder: "0x...",
    //       showCancelButton: true,
    //       inputValidator: (value) => {
    //         return validatePrivateKey(value);
    //         if(accountType === 'Invalid') return 'Invalid address';
    //       }
    //     })

    //   }
    // grantPermissions();
 
          // title: "Allow MyLuksoWallet write permissions to your Universal Profile?",
          // text: "This will add MyLuksoWallet as a key manager to your Universal Profile.",
     grant();

    async function grant() {
      try{
        const PRIVATE_KEY = process.env.REACT_APP_JXYANG_PRIVATE_KEY; //UP extension private key
        const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);    

        const erc725 = new ERC725(LSP6Schema);
        const myUniversalProfile = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);
        
        swal("Fetching key manager address...", {button: false, closeOnClickOutside: false});
        const keyManagerAddress = await myUniversalProfile.methods.owner().call();
        const myKeyManager = new web3.eth.Contract(LSP6Contract.abi, keyManagerAddress);
        
        const beneficiaryAddress = process.env.REACT_APP_METAMASK_MY_DEV_ACCOUNT; // jxyang metamask dev account
        const beneficiaryPermissions = erc725.encodePermissions({SETDATA: true,});
      
        swal("Encoding permissions...", {button: false, closeOnClickOutside: false});
        const data = erc725.encodeData({
          keyName: "AddressPermissions:Permissions:<address>",
          dynamicKeyParts: beneficiaryAddress,
          value: beneficiaryPermissions,
        });
      
        const payload = myUniversalProfile.methods["setData(bytes32,bytes)"](data.keys[0], data.values[0]).encodeABI();
      
        swal("Setting permissions...", {button: false, closeOnClickOutside: false});
        await myKeyManager.methods.execute(payload).send({from: myEOA.address, gasLimit: 300_000,});
      
        const result = await myUniversalProfile.methods["getData(bytes32)"](data.keys[0]).call();
        
        swal(`The beneficiary address ${beneficiaryAddress} has now the following permissions:`+erc725.decodePermissions(result), {button: false, closeOnClickOutside: false});
        console.log(`The beneficiary address ${beneficiaryAddress} has now the following permissions:`, erc725.decodePermissions(result));
        } catch(error){
          swal("Something went wrong.",`${error}`,"warning");
        }
    }
  
   
  }

 

  return (
    <div className='flex flex-col gap-10'>
      <Button_Shadow buttonText={"Check Permissions"} buttonFunc={checkPermissions} buttonColor={"bg-orange-800"} buttonTextColor ={"text-emerald-200"}/>
    <Button_Shadow buttonText={"Grant Permissions"} buttonFunc={handleGrantPermissions} buttonColor={"bg-emerald-800"} buttonTextColor ={"text-orange-200"}/>
    </div>
  )
}

export default KeyManager