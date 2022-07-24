import React, { useState, useEffect } from "react";


import {AiOutlineCheck, AiTwotoneStar, AiOutlineLink} from "react-icons/ai";
import { useAssetsContext, smallestIconIndex } from "../contexts/AssetsContext";
import {IPFS_GATEWAY, LSP4Schema} from "../utils/ERC725Config";
import {MyMenuItem} from '.';
import {Address} from '.';

const NFTCard = ({assetAddress}) => {
  const [assetName, setAssetName] = useState("");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [assetMetadata, setAssetMetadata] = useState("");
  const {getAssetMetadata, getAssetByKey} = useAssetsContext();
  

  useEffect(() => {

    getAssetByKey(assetAddress,LSP4Schema[1].key).then(res => setAssetName(res.value));
    getAssetByKey(assetAddress,LSP4Schema[2].key).then(res => setAssetSymbol(res.value));
    getAssetMetadata(assetAddress).then(res => {
      setAssetMetadata(res)
      console.log(res) //do something with assetmetadata if there are more fields
    });  
    
    
  }, []);


  return ( 
    <div className="p-8 rounded-lg w-2/6 bg-gradient-to-bl from-indigo-100 via-purple-100 to-pink-100 shadow-2xl shadow-pink-100/80">
      <div className="flex flex-col justify-between items-center border-2 border-blue-400 rounded-md py-2 shadow-md shadow-blue-400/50">
        <p className="font-semibold text-xl">LSP8: {assetName}</p>
        <Address address={assetAddress}/>
      </div>

      <div className="flex items-center justify-center border-2 border-white p-3 mt-3">
        {assetMetadata && <img className ="w-56" src={assetMetadata.icon[0].url.replace("ipfs://", IPFS_GATEWAY)}></img>}
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">  
        <a href=""  target="_blank">
          {assetMetadata && <img className="rounded-full w-full h-full" src={assetMetadata.icon[0].url.replace("ipfs://", IPFS_GATEWAY)} />}
        </a>
        <div className="">
          <p className="font-semibold text-xl"> Symbol: {assetSymbol} </p>
          <p className="text-gray-800 text-sm align-top pb-4"> Name: {assetName}</p>
          <p className="font-semibold text-sm">Description: <span className="text-gray-600 italic font-normal">{assetMetadata && assetMetadata.description}</span></p>
        </div>
      </div>

      {assetMetadata && 
        <MyMenuItem icon={<AiOutlineLink/>} 
          iconColor="bg-blue-500" linkTo="" header="MyLinks" 
          items={assetMetadata ? assetMetadata.links : "No links provided."} 
          itemType="link"/>
      }
    
      {/* <MyMenuItem icon={<AiTwotoneStar/>}  iconColor="bg-violet-600" linkTo="NFTs" header="MyNFTs" items={["hi","test"]} itemType="list"/> */}
     
      
      
    </div>
    
  )
}

export default NFTCard