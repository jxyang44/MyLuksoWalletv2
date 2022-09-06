//container for asset type (e.g. LSP7, LSP8, other)

import React, { useState, useEffect } from "react";
import { Loading, Address } from "../../components";
import { WalletLSP7, WalletLSP8 } from ".";
import { useStateContext } from "../../contexts/StateContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useVaultContext } from "../../contexts/VaultContext";
import {
  web3Provider,
  LSP4Schema,
  LSPMapping,
  IPFS_GATEWAY,
} from "../../utils/luksoConfigs.js";
import walletTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
import topPocketTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/black-linen.png";
import swal from "sweetalert";

const WalletRightContents = ({
  walletAddress,
  walletMetadata,
  LSP,
  ownedAsset,
  setOwnedAsset,
  assetLoad,
}) => {
  const { currentAccount } = useProfileContext();
  const {isVault} = useVaultContext();
  const [assetsLoaded, setAssetsLoaded] = useState(false); //boolean are assets loaded
  const [assets, setAssets] = useState([]); //assets array of JSONs for each asset
  const { UPColor } = useStateContext(); //user determined UP color - stored in UP metadata, accessed through the "My Universal Profile" page
  const [isAnySelected, setIsAnySelected] = useState(false); //if any coin is selected, mask the rest - forces user to select one at a time
  const [selectedIndex, setSelectedIndex] = useState(); //index of selected coin
  const {
    getAssetByKey,
    getBalanceOf,
    supportsInterface,
    getAssetMetadata,
    getTokenIdsOf,
  } = useAssetsContext();

  useEffect(() => {
    currentAccount !== walletAddress && //wallet address is universal profile address
      isVault(walletAddress).then((res) => {
        //wallet address implements vault interface
        if (!res)
          swal(
            "Warning! Could not detect a LSP9Vault interface for this address.",
            "Proceed with caution.",
            "warning"
          );
      });
  }, []);

  useEffect(() => {
    handleLoadAssets();
  }, [ownedAsset]);

  useEffect(() => {
    if (assetsLoaded) {
      setIsAnySelected(assets.some((e) => e.isSelected === true)); //boolean to determine if any asset is selected to manages background mask
    }
  }, [assets]);

  // TO-DO clean this up
  const handleLoadAssets = async () => {
    setAssetsLoaded(false);
    setAssets([]);

    // if (assetsLoaded === false) {
    if (true) {
      assetLoad().then((res) => {
        //console.log("loading assets", res);
        setAssetsLoaded(true);
        if (res) {
          res.map((asset) => {
            supportsInterface(asset, LSPMapping[LSP].contract).then((res) => {
              //&& !assets.some(e => e.address === asset)
              if (res) {
                const namePromise = getAssetByKey(asset, LSP4Schema[1].key);
                const symbolPromise = getAssetByKey(asset, LSP4Schema[2].key);
                const metaDataPromise = getAssetMetadata(asset);
                const balancePromise = getBalanceOf(asset, walletAddress);
                const tokenIDsPromise =
                  LSP === "LSP8" && getTokenIdsOf(asset, walletAddress);

                Promise.all([
                  namePromise,
                  symbolPromise,
                  metaDataPromise,
                  balancePromise,
                  tokenIDsPromise,
                ]).then((res) => {
                  const formattedIDs =
                    LSP === "LSP8" &&
                    res[4]
                      .map((id) => {
                        return (
                          "[" + web3Provider.utils.toUtf8(id.toString()) + "]"
                        );
                      })
                      .join(", ");
                  setAssets((curr) => [
                    ...curr,
                    {
                      address: asset, //address of the LSP7 or LSP8 asset
                      isSelected: false, //is the asset selected (clicked)
                      assetName: res[0].value, //asset name
                      assetSymbol: res[1].value, //asset symbol
                      assetIcon:
                        res[2]?.icon &&
                        res[2].icon.length > 0 &&
                        res[2]?.icon[0] &&
                        res[2].icon[0]?.url?.replace("ipfs://", IPFS_GATEWAY), //asset icon
                      //only include 1 image for now
                      assetImage1:
                        res[2]?.images &&
                        res[2].images.length > 0 &&
                        res[2]?.images[0] &&
                        res[2].images[0][0]?.url?.replace(
                          "ipfs://",
                          IPFS_GATEWAY
                        ),
                      assetImage2:
                        res[2]?.images &&
                        res[2].images.length > 1 &&
                        res[2]?.images[1] &&
                        res[2].images[1][0]?.url?.replace(
                          "ipfs://",
                          IPFS_GATEWAY
                        ),
                      backgroundColor: res[2]?.backgroundColor ?? "", //background color
                      textColor: res[2]?.textColor ?? "", //text color
                      balanceOf:
                        LSP === "LSP8"
                          ? web3Provider.utils.toWei(res[3])
                          : res[3], //user balance of token
                      tokenIDsOf: formattedIDs,
                    },
                  ]);
                });
              }
            });
          });
        }
      });
    }
  };

  //if an asset is selected, shift its position to the front of the pile
  const handleSelected = (asset, index) => {
    const currentSelected = assets[index].isSelected;
    if (
      (!isAnySelected || (isAnySelected && asset.isSelected === true)) === false
    )
      return;
    const before = assets.slice(0, index);
    const after = assets.slice(index + 1);
    setAssets(() => [
      ...before,
      ...after,
      { ...assets[index], isSelected: !currentSelected },
    ]);
    setSelectedIndex(index);
    // console.log(assets);
  };

  return (
    <div
      className="my-1 mx-2 flex h-full w-full flex-col justify-between rounded-lg border-2 border-dashed border-slate-700 p-4 text-slate-200"
      style={{
        backgroundColor: UPColor,
        backgroundImage: `url(${walletTexture})`,
      }}
    >
      <div
        className="custom-shadow flex h-1/3 flex-col items-center rounded-t-3xl border border-black bg-slate-500 py-1 px-3 "
        style={{ backgroundImage: `url(${topPocketTexture})` }}
      >
        <div className="flex flex-row gap-1 text-xs font-semibold lg:text-lg xl:text-xl">
          {LSP} Assets for {walletMetadata?.vaultName}{" "}
          <Address address={walletAddress} left={6} right={6} />
        </div>
        <div className="h-0.5 w-full rounded-lg bg-gradient-to-r from-black via-white to-black"></div>
        <div className="my-1 flex h-[14vh] flex-row gap-2 xl:h-[15vh]">
          <div className="flex w-1/2 flex-col rounded-lg border-2 border-slate-200 bg-slate-700 p-1 text-sm">
            <div className="mb-1 flex flex-row justify-between border-b-[1px] border-slate-200 text-xs font-semibold xl:text-base">
              <div>Addresses</div>

              <div className=" flex flex-row items-center gap-1 text-xs font-normal xl:text-sm">
                {ownedAsset ? "Owned" : "Issued"}
                <label className="relative inline-block h-3 w-6">
                  <input type="checkbox" className="peer sr-only" />
                  <span
                    className="absolute inset-0 cursor-pointer rounded-full bg-sky-500 transition duration-200 before:absolute 
                  before:bottom-0.5 before:left-0.5 before:h-2 before:w-2 before:rounded-full
                  before:bg-white before:shadow-sm before:transition before:duration-200 peer-checked:bg-green-500 
                  peer-checked:before:translate-x-3 peer-focus:ring"
                    onClick={() => setOwnedAsset((curr) => !curr)}
                  ></span>
                </label>
              </div>
            </div>
            <div className="ml-2 overflow-y-auto text-xs xl:text-sm">
              {assets.map((asset, index) => {
                return (
                  <div
                    key={asset + index}
                    className="text-blue-500 hover:text-blue-300"
                    onClick={() => handleSelected(asset, index)}
                  >
                    {asset.address.substring(0, 6)}...
                    {asset.address.substring(36)}{" "}
                    <span className="text-white">
                      ( {asset.assetName} - <b>{asset.assetSymbol} </b>)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex w-1/2 flex-col rounded-lg border-2 border-slate-200 bg-slate-700 p-1 text-sm">
            <div className="mb-1 border-b-[1px] border-slate-200 text-xs font-semibold xl:text-base">
              Interaction
            </div>
            <div className="ml-2 overflow-y-auto text-xs xl:text-sm">
              Click on an asset to enlarge it.
              <br></br>
              Click on it again to minimize and position in front.
              <br></br> Drag an asset into the slider at the bottom of the
              screen to transfer it to another vault or UP.
            </div>
          </div>
        </div>
      </div>
      <div
        className="custom-shadow my-2 flex h-2/3 w-full flex-row-reverse justify-end rounded-b-3xl border border-black bg-slate-500 py-1 px-3"
        style={{ backgroundImage: `url(${topPocketTexture})` }}
      >
        {isAnySelected && (
          <div
            className={`absolute inset-0  rounded-md bg-black opacity-30 `}
            onClick={() => handleSelected(assets[selectedIndex], selectedIndex)}
          ></div>
        )}
        {assetsLoaded ? (
          <>
            {LSP === "LSP7" && (
              <>
                {assets.map((asset, index) => {
                  return (
                    <WalletLSP7
                      key={asset.address + index}
                      walletAddress={walletAddress}
                      index={index}
                      assets={assets}
                      setAssets={setAssets}
                      LSP="LSP7"
                      isCurrentlySelected={
                        !isAnySelected ||
                        (isAnySelected && asset.isSelected === true)
                      }
                      handleSelected={() => handleSelected(asset, index)}
                    />
                  );
                })}
              </>
            )}
            {LSP === "LSP8" && (
              <>
                {assets.map((asset, index) => {
                  return (
                    <WalletLSP8
                      key={asset.address + index}
                      walletAddress={walletAddress}
                      index={index}
                      assets={assets}
                      setAssets={setAssets}
                      LSP="LSP8"
                      isCurrentlySelected={
                        !isAnySelected ||
                        (isAnySelected && asset.isSelected === true)
                      }
                      handleSelected={() => handleSelected(asset, index)}
                    />
                  );
                })}
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletRightContents;
