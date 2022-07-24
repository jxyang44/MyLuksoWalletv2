import React from 'react'
import {KeyManager, Button_Shadow} from '../../components';
import {LSP3Schema, provider, config, web3, UniversalProfileContract, LSP6Contract, LSP7Contract} from "../../utils/ERC725Config";
import {useProfileContext} from '../../contexts/ProfileContext';
import {ethers} from "ethers";
const {ethereum} = window;
const { ERC725 } = require("@erc725/erc725.js");
const { LSPFactory } = require("@lukso/lsp-factory.js");

const testJSON = {"LSP3Profile":{"name":"MyLuksoWallet","description":"This is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\nThis is my lukso wallet and I like it a lot.\n","links":[{"title":"...","url":"..."},{"title":"","url":"https://test"}],"tags":["myluksowallet","new tag","new tag"],"avatar":[],"profileImage":[{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":192,"height":192,"hashFunction":"keccak256(bytes)","hash":"0x8fd4fe09432f8a26bebac42a8be53b9cd83c19bd0c820e28f6819979d3073a9b","url":"ipfs://QmcVWq7RGEswoyx8URRaP6SXJtLA9LWxbyd3VWaSwhL8YR"},{"width":180,"height":180,"hashFunction":"keccak256(bytes)","hash":"0xeb41471392725596da7d34be6c6c2eb077d4514679c1543db25a1016c17567d5","url":"ipfs://QmSE3kd3i8p62EXow2y1MMB7kSDvADH2mAjdJ8DwYL5d2D"}],"backgroundImage":[{"width":1024,"height":576,"hashFunction":"keccak256(bytes)","hash":"0x...","url":"ipfs://..."}]}}





const MyProfile = () => {
  const {setCurrentAccount, profileJSONMetadata, fetchProfileMetadata, fetchProfileData} = useProfileContext();
  let profile;
  const testFunction = () => {
      
    var MyContract = new web3.eth.Contract(LSP7Contract.abi, '0xE6AA7bcb973959e4cBaabf43ba908698F8c03C9F');
    var owner = MyContract.methods.owner().call();
    console.log(owner)

    
      const test = async () =>{
        const accounts = await ethereum.request({ method:"eth_requestAccounts"});
        const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = etherProvider.getSigner();
        await signer.getAddress();
        setCurrentAccount(accounts[0]);
        profile = new ERC725(LSP3Schema, accounts[0], provider, config);
        const result1 = await profile.fetchData().then(res=>console.log(res));;
        const result2 = await profile.fetchData("LSP3Profile").then(res=>console.log(res));;
        const result3 = await profile.getData().then(res=>console.log(res));;
        const result4 = await profile.getData("LSP3Profile").then(res=>console.log(res));
      

      // const PRIVATE_KEY = process.env.REACT_APP_METAMASK_MY_DEV_PRIVATE_KEY;

      // const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

      //   const universalProfileContract = new web3.eth.Contract(UniversalProfileContract.abi, accounts[0]);
      //   const keyManagerAddress = await universalProfileContract.methods.owner().call();
      //   const keyManagerContract = new web3.eth.Contract(LSP6Contract.abi, keyManagerAddress);
      //   console.log(  encodedData.keys,  encodedData.values)
      //   const abiPayload = await universalProfileContract.methods["setData(bytes32[],bytes[])"](
      //       encodedData.keys,
      //       encodedData.values
      //   ).encodeABI();
      //   const final = await keyManagerContract.methods.execute(abiPayload).send({from: myEOA.address, gasLimit: 300_000 });
      //   console.log(final)
      //  console.log(abiPayload);
      //   const result5 = profile.decodeData([
      //     {
      //       keyName: 'LSP3Profile',
      //       value:
      //         '0x6f357c6a1222dfc66aa67e964949d8a4b733c140652bc23e53409e02762adf21d9693959697066733a2f2f516d656638784b6b62704e3276514539373838724e713879684e4a6848457a6d33756e7854614e6a637944413442',
      //     },
      //   ]);
      //   console.log(result5)
      }
      //test();
      //0x6f357c6a1222dfc66aa67e964949d8a4b733c140652bc23e53409e02762adf21d9693959697066733a2f2f516d656638784b6b62704e3276514539373838724e713879684e4a6848457a6d33756e7854614e6a637944413442
  }
  
  
  return (
    <div className='text-white'>
      <KeyManager/>
      {/* <UpdateProfile/> */}
      <Button_Shadow buttonText={"Test Feature"} buttonFunc={testFunction} buttonColor={"bg-red-500"} buttonTextColor ={"text-red-800"}/>
    </div>
  )
}

export default MyProfile