//container for asset type (e.g. LSP7, LSP8, other)

import React, { useState, useEffect } from "react";
import { Loading, Address } from "../../components";
import { WalletLSP7, WalletLSP8 } from ".";
import { useStateContext } from "../../contexts/StateContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import {
  web3Provider,
  createErc725Instance,
  LSP3Schema,
  LSP4Schema,
  LSP9Contract,
  INTERFACE_IDS,
  LSPMapping,
  IPFS_GATEWAY,
} from "../../utils/luksoConfigs.js";
import walletTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
import topPocketTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/black-linen.png";
import swal from "sweetalert";

const WalletRightContents = ({ walletAddress, walletMetadata, LSP }) => {
  const { currentAccount } = useProfileContext();
  const [assetsLoaded, setAssetsLoaded] = useState(false); //boolean are assets loaded
  const [assets, setAssets] = useState([]); //assets array of JSONs for each asset - {address, isSelected, assetName, assetSymbol, assetIcon, assetImage1, backgroundColor, textColor, balanceOf}
  const { UPColor } = useStateContext(); //user determined UP color - stored in UP metadata, accessed through the "My Universal Profile" page
  const [isAnySelected, setIsAnySelected] = useState(false); //if any coin is selected, mask the rest - forces user to select one at a time
  const { getAssetByKey, getBalanceOf, supportsInterface, getAssetMetadata, getTokenIdsOf } = useAssetsContext();

  useEffect(() => {
    currentAccount !== walletAddress && //wallet address is universal profile address
      isVault(walletAddress).then(res => {
        //wallet address implements vault interface
        if (!res) swal("Warning! Could not detect a LSP9Vault interface for this address.", "Proceed with caution.", "warning");
      });
    handleLoadAssets();
  }, []);

  const isVault = async walletAddress => {
    try {
      const contractInstance = new web3Provider.eth.Contract(LSP9Contract.abi, walletAddress);
      return await contractInstance.methods.supportsInterface(INTERFACE_IDS["LSP9Vault"]).call();
    } catch (err) {
      console.log(err);
      swal("Warning! Could not determine if this address supports the LSP9Vault interface.", "Proceed with caution.", "warning");
    }
  };

  useEffect(() => {
    if (assetsLoaded) {
      setIsAnySelected(assets.some(e => e.isSelected === true)); //boolean to determine if any asset is selected to manages background mask
    }
  }, [assets]);

  // TO-DO if not LSP7 or LSP8
  const handleLoadAssets = async () => {
    setAssetsLoaded(false);
    setAssets([]);

    if (assetsLoaded === false) {
      assetLoad().then(res => {
        //console.log("loading assets", res);
        setAssetsLoaded(true);
        if (res) {
          res.map(asset => {
            supportsInterface(asset, LSPMapping[LSP].contract).then(res => {
              //&& !assets.some(e => e.address === asset)
              if (res) {
                const namePromise = getAssetByKey(asset, LSP4Schema[1].key);
                const symbolPromise = getAssetByKey(asset, LSP4Schema[2].key);
                const metaDataPromise = getAssetMetadata(asset);
                const balancePromise = getBalanceOf(asset, walletAddress);
                const tokenIDsPromise = LSP === "LSP8" && getTokenIdsOf(asset, walletAddress);

                Promise.all([namePromise, symbolPromise, metaDataPromise, balancePromise, tokenIDsPromise]).then(res => {
                  const formattedIDs =
                    LSP === "LSP8" &&
                    res[4]
                      .map(id => {
                        return "["+web3Provider.utils.toUtf8(id)+"]";
                      })
                      .join(", ");
                  setAssets(curr => [
                    ...curr,
                    {
                      address: asset, //address of the LSP7 or LSP8 asset
                      isSelected: false, //is the asset selected (clicked)
                      assetName: res[0].value, //asset name
                      assetSymbol: res[1].value, //asset symbol
                      assetIcon: res[2]?.icon && res[2].icon.length > 0 && res[2]?.icon[0] && res[2].icon[0]?.url?.replace("ipfs://", IPFS_GATEWAY), //asset icon
                      //only include 1 image for now
                      assetImage1:
                        res[2]?.images && res[2].images.length > 0 && res[2]?.images[0] && res[2].images[0][0]?.url?.replace("ipfs://", IPFS_GATEWAY),
                      assetImage2:
                        res[2]?.images && res[2].images.length > 1 && res[2]?.images[1] && res[2].images[1][0]?.url?.replace("ipfs://", IPFS_GATEWAY),
                      backgroundColor: res[2]?.backgroundColor ?? "", //background color
                      textColor: res[2]?.textColor ?? "", //text color
                      balanceOf: LSP === "LSP8" ? web3Provider.utils.toWei(res[3]) : res[3], //user balance of token
                      tokenIDsOf: formattedIDs,
                      //TO-DO what needs to change for LSP8 (under construction)?
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

  const assetLoad = async () => {
    const profile = createErc725Instance(LSP3Schema, walletAddress);
    const result = await profile.fetchData("LSP5ReceivedAssets[]");
    return result.value;
  };

  //if an asset is selected, shift its position to the front of the pile
  const handleSelected = (asset, index) => {
    const currentSelected = assets[index].isSelected;
    if ((!isAnySelected || (isAnySelected && asset.isSelected === true)) === false) return;
    const before = assets.slice(0, index);
    const after = assets.slice(index + 1);
    setAssets(() => [...before, ...after, { ...assets[index], isSelected: !currentSelected }]);
    // console.log(assets);
  };

  return (
    <div
      className="flex flex-col justify-between rounded-lg border-slate-700 border-2 border-dashed w-full h-full my-1 mx-2 p-4 text-slate-200"
      style={{ backgroundColor: UPColor, backgroundImage: `url(${walletTexture})` }}>
      <div
        className="flex flex-col items-center h-1/3 bg-slate-500 py-1 px-3 border border-black rounded-t-3xl custom-shadow "
        style={{ backgroundImage: `url(${topPocketTexture})` }}>
        <div className="flex flex-row gap-1 font-semibold xl:text-xl lg:text-lg text-xs">
          {LSP} Assets for {walletMetadata?.vaultName} <Address address={walletAddress} left={6} right={6} />
        </div>
        <div className="h-0.5 w-full rounded-lg bg-gradient-to-r from-black via-white to-black"></div>
        <div className="flex flex-row xl:max-h-56 lg:max-h-20 max-h-12 my-1 gap-2">
          <div className="flex flex-col w-1/2 text-sm border-2 border-slate-200 rounded-lg p-1 bg-slate-700">
            <div className="font-semibold border-b-[1px] border-slate-200 mb-1 xl:text-base text-xs"> {LSP} Asset Addresses</div>
            <div className="ml-2 xl:text-sm text-xs overflow-y-auto">
              {assets.map((asset, index) => {
                return (
                  <div key={asset + index} className="text-blue-500 hover:text-blue-300" onClick={() => handleSelected(asset, index)}>
                    {asset.address.substring(0, 6)}...{asset.address.substring(36)}{" "}
                    <span className="text-white">
                      ( {asset.assetName} - <b>{asset.assetSymbol} </b>)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-1/2 text-sm border-2 border-slate-200 rounded-lg p-1 bg-slate-700">
            <div className="font-semibold border-b-[1px] border-slate-200 mb-1 xl:text-base text-xs">Interaction</div>
            <div className="ml-2 xl:text-sm text-xs overflow-y-auto">
              Click on an asset to enlarge it.
              <br></br>
              Click on it again to minimize and position in front.
              <br></br> Drag an asset into the slider at the bottom of the screen to transfer it to another vault or UP.
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-row-reverse justify-end h-2/3 my-2 w-full bg-slate-500 py-1 px-3 border border-black custom-shadow rounded-b-3xl"
        style={{ backgroundImage: `url(${topPocketTexture})` }}>
        {isAnySelected && <div className={`absolute inset-0  bg-black rounded-md opacity-30 `}></div>}
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
                      isCurrentlySelected={!isAnySelected || (isAnySelected && asset.isSelected === true)}
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
                    <WalletLSP8 //TO-DO currently a copy-paste of WalletLSP7 - the idea is generally the same, need to update visualization
                      key={asset.address + index}
                      walletAddress={walletAddress}
                      index={index}
                      assets={assets}
                      setAssets={setAssets}
                      LSP="LSP8"
                      isCurrentlySelected={!isAnySelected || (isAnySelected && asset.isSelected === true)}
                      handleSelected={() => handleSelected(asset, index)}
                    />
                  );
                })}
              </>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletRightContents;
