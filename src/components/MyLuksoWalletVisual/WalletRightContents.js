import React, { useState, useRef, useEffect } from "react";
import { LSP7TokenCoin, Loading, Address } from "..";
import { WalletLSP7, WalletLSP8 } from ".";
import { useStateContext } from "../../contexts/StateContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import {
  web3Provider,
  createErc725Instance,
  LSP3Schema,
  LSP4Schema,
  LSP7Contract,
  LSP8Contract,
  LSP9Contract,
  INTERFACE_IDS,
  LSPMapping,
  IPFS_GATEWAY,
} from "../../utils/ERC725Config.js";
import walletTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/white-leather.png";
import topPocketTexture from "../../assets/MyLuksoWalletVisual/Wallet Texture/black-linen.png";
import swal from "sweetalert";

const WalletRightContents = ({ walletAddress, walletMetadata, LSP }) => {
  const { currentAccount } = useProfileContext();

  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [assets, setAssets] = useState([]);
  const { UPColor, UPTextColor } = useStateContext();
  const [isAnySelected, setIsAnySelected] = useState(false); //if any coin is selected, mask the rest - forces user to select one at a time
  const { getAssetByKey, getBalanceOf, supportsInterface, getAssetMetadata } = useAssetsContext();

  useEffect(() => {
    currentAccount !== walletAddress &&
      isVault(walletAddress).then(res => {
        if (!res) swal("Warning! Could not detect a LSP9Vault interface for this address.", "Proceed with caution.", "warning");
      });
    handleLoadAssets();
  }, []);

  useEffect(() => {
    if (assetsLoaded) {
      setIsAnySelected(assets.some(e => e.isSelected === true));
      //console.log(assets)
    }
  }, [assets]);

  const isVault = async walletAddress => {
    try {
      const contractInstance = new web3Provider.eth.Contract(LSP9Contract.abi, walletAddress);
      return await contractInstance.methods.supportsInterface(INTERFACE_IDS["LSP9Vault"]).call();
    } catch (err) {
      console.log(err);
      swal("Warning! Could not determine if this address supports the LSP9Vault interface.", "Proceed with caution.", "warning");
    }
  };

  // TO-DO if not LSP7 or LSP8
  const handleLoadAssets = async () => {
    setAssetsLoaded(false);
    setAssets([]);

    if (assetsLoaded === false) {
      assetLoad().then(res => {
        console.log("loading assets", res);
        setAssetsLoaded(true);
        if (res){
          res.map(asset => {
            supportsInterface(asset, LSPMapping[LSP].contract).then(res => {
              //&& !assets.some(e => e.address === asset)
              if (res) {
                const namePromise = getAssetByKey(asset, LSP4Schema[1].key);
                const symbolPromise = getAssetByKey(asset, LSP4Schema[2].key);
                const metaDataPromise = getAssetMetadata(asset);
                const balancePromise = getBalanceOf(asset, walletAddress);

                Promise.all([namePromise, symbolPromise, metaDataPromise, balancePromise]).then(res => {
                  setAssets(curr => [
                    ...curr,
                    {
                      address: asset,
                      isSelected: false,
                      assetName: res[0].value,
                      assetSymbol: res[1].value,
                      assetIcon: res[2]?.icon && res[2].icon.length > 0 && res[2]?.icon[0] && res[2].icon[0]?.url?.replace("ipfs://", IPFS_GATEWAY),
                      assetImage1:
                        res[2]?.images && res[2].images.length > 0 && res[2]?.images[0] && res[2].images[0][0]?.url?.replace("ipfs://", IPFS_GATEWAY),
                      backgroundColor: res[2]?.backgroundColor ?? "",
                      textColor: res[2]?.textColor ?? "",
                      balanceOf: res[3],
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

  const handleSelected = (asset, index) => {
    const currentSelected = assets[index].isSelected;
    if ((!isAnySelected || (isAnySelected && asset.isSelected === true)) === false) return;
    const before = assets.slice(0, index);
    const after = assets.slice(index + 1);
    setAssets(() => [...before, ...after, { address: asset.address, isSelected: !currentSelected }]);
    console.log(assets);
  };

  return (
    <div
      className="flex flex-col justify-between border-4 rounded-lg border-slate-700 border-dashed w-full h-full my-1 mx-2 p-4 text-slate-200"
      style={{ backgroundColor: UPColor, backgroundImage: `url(${walletTexture})` }}>
      <div
        className="flex flex-col items-center h-1/3 bg-slate-500 py-1 px-3 border border-black rounded-t-3xl envelope "
        style={{ backgroundImage: `url(${topPocketTexture})` }}>
        <div className="flex flex-row gap-1 font-semibold lg:text-xl text-xs">
          {LSP} Assets for {walletMetadata.vaultName} <Address address={walletAddress} left={6} right={6} /> {LSP === "LSP8" && "(👷 - WIP)"}
        </div>
        <div className="h-0.5 w-full rounded-lg bg-gradient-to-r from-black via-white to-black"></div>
        <div className="flex flex-row lg:max-h-56 max-h-24 my-1 gap-2">
          <div className="flex flex-col w-1/2 text-sm border-2 border-slate-200 rounded-lg p-1 bg-slate-700">
            <div className="font-semibold border-b-[1px] border-slate-200 mb-1 lg:text-base text-xs"> {LSP} Asset Addresses</div>
            <div className="ml-2 lg:text-sm text-xs overflow-y-auto">
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
            <div className="font-semibold border-b-[1px] border-slate-200 mb-1 lg:text-base text-xs">Interaction</div>
            <div className="ml-2 lg:text-sm text-xs overflow-y-auto">
              Click on asset to enlarge it.
              <br></br>
              Click again to position it in front.
              <br></br> Drag an asset into the slider at the bottom of the screen to transfer it to another vault or UP.
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-row-reverse justify-end h-2/3 my-2 w-full bg-slate-500 py-1 px-3 border border-black envelope rounded-b-3xl"
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
                    <WalletLSP8
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
