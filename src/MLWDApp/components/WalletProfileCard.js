//UP profile in MLW DApp
//TO-DO add more visual customization, fix the overflow text for different screen sizes

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { IPFS_GATEWAY } from "../../utils/luksoConfigs";
import { Address, LYXBalanceFuncs } from "../../components";

const WalletProfileCard = () => {
  
  const { currentAccount, pendingProfileJSONMetadata, maxImageIndex } = useProfileContext();
  return (
    <div className="flex justify-center p-1 h-full w-5/6">
      <div className={`relative p-3 justify-end items-start flex-col rounded-xl w-full aspect-[1.8] bg-slate-700 text-white ring-2`}>
        <div className="flex justify-between flex-col w-full h-full">
          <div className="flex justify-between items-start text-lg text-neutral-100 mix-blend-lighten">
            <div className="flex flex-col h-full w-3/4">
              <p
                className={
                  "font-bold xl:text-3xl text-lg mb-2 tracking-tight text-transparent bg-clip-text bg-gradient-to-tl from-white via-blue-500 to-white drop-shadow-3xl shadow-black hover:bg-gradient-to-tr"
                }>
                {pendingProfileJSONMetadata.name}
              </p>
              <div className="xl:text-sm text-xs overflow-auto xl:max-h-[22vh] lg:max-h-[18vh] max-h-[14vh] mr-1">  
                <div className="flex flex-col xl:gap-1 gap-0.5">
                  <LYXBalanceFuncs />
                  <span className="flex gap-1">
                    UP Address: <Address address={currentAccount} left={6} right={6} />
                  </span>
                  <p className="mr-4 w-11/12 break-words">
                    {pendingProfileJSONMetadata.description.substring(0, 80)}
                    {pendingProfileJSONMetadata.description.length >= 80 && "..."}
                  </p>
                  {pendingProfileJSONMetadata.tags && (
                    <p className="mr-4 w-11/12 break-words">{"Tags: #" + pendingProfileJSONMetadata.tags.join(", #")}</p>
                  )}
                  {pendingProfileJSONMetadata.links && (
                    <div className="mr-4 w-11/12 break-words flex flex-col">
                      {pendingProfileJSONMetadata.links.map((item , index)=> {
                        return (
                          <a
                            key={index}
                            href={item.url}
                            className="not-italic text-left text-blue-500 hover:text-blue-300"
                            rel="noreferrer"
                            target="_blank">
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={`relative w-4/12 flex justify-center items-center rounded-md border-2 border-white p-2`}>
              {pendingProfileJSONMetadata.profileImage.length > 0 && (
                <img
                  className="rounded"
                  src={pendingProfileJSONMetadata.profileImage[maxImageIndex(pendingProfileJSONMetadata.profileImage, 100)].url?.replace(
                    "ipfs://",
                    IPFS_GATEWAY
                  )}></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletProfileCard;
