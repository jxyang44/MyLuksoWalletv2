//UP profile in MLW DApp
//TO-DO add more visual customization, fix the overflow text for different screen sizes

import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { IPFS_GATEWAY } from "../../utils/luksoConfigs";
import { Address, LYXBalanceFuncs } from "../../components";

const WalletProfileCard = () => {
  const { currentAccount, pendingProfileJSONMetadata, maxImageIndex } =
    useProfileContext();
  return (
    <div className="flex h-full md:w-5/6 justify-center py-1 px-2">
      <div
        className={`relative aspect-[1.8] w-full flex-col items-start justify-end rounded-xl bg-slate-700 p-3 text-white ring-2`}
      >
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex items-start justify-between text-lg text-neutral-100 mix-blend-lighten">
            <div className="flex h-full w-3/4 flex-col">
              <p
                className={
                  "drop-shadow-3xl mb-2 bg-gradient-to-tl from-white via-blue-500 to-white bg-clip-text text-lg font-bold tracking-tight text-transparent shadow-black hover:bg-gradient-to-tr xl:text-3xl"
                }
              >
                {pendingProfileJSONMetadata.name}
              </p>
              <div className="mr-1 max-h-[14vh] overflow-auto text-xs lg:max-h-[18vh] xl:max-h-[22vh] xl:text-sm">
                <div className="flex flex-wrap gap-0.5 xl:gap-1">
                  <LYXBalanceFuncs />
                  <span className="flex flex-wrap gap-1">
                    UP Address:{" "}
                    <Address address={currentAccount} left={6} right={6} />
                  </span>
                  <p className="mr-4 w-11/12 break-words">
                    {pendingProfileJSONMetadata.description.substring(0, 80)}
                    {pendingProfileJSONMetadata.description.length >= 80 &&
                      "..."}
                  </p>
                  {pendingProfileJSONMetadata.tags && (
                    <p className="mr-4 w-11/12 break-words">
                      {"Tags: #" + pendingProfileJSONMetadata.tags.join(", #")}
                    </p>
                  )}
                  {pendingProfileJSONMetadata.links && (
                    <div className="mr-4 flex w-11/12 flex-col break-words">
                      {pendingProfileJSONMetadata.links.map((item, index) => {
                        return (
                          <a
                            key={index}
                            href={item.url}
                            className="text-left not-italic text-blue-500 hover:text-blue-300"
                            rel="noreferrer"
                            target="_blank"
                          >
                            {item.title}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className={`relative flex w-4/12 items-center justify-center rounded-md border-2 border-white p-2`}
            >
              {pendingProfileJSONMetadata.profileImage.length > 0 && (
                <img
                  className="rounded"
                  src={pendingProfileJSONMetadata.profileImage[
                    maxImageIndex(pendingProfileJSONMetadata.profileImage, 100)
                  ].url?.replace("ipfs://", IPFS_GATEWAY)}
                ></img>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletProfileCard;
