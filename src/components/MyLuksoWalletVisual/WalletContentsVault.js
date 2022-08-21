import React, { useState, useRef, useEffect } from "react";
import { LSP7TokenCoin } from "..";
import { WalletLSP7 } from ".";

import { useAssetsContext } from "../../contexts/AssetsContext";
import {
  web3Provider,
  createErc725Instance,
  LSP3Schema,
  LSP7Contract,
  LSP8Contract,
  LSP9Contract,
  INTERFACE_IDS,
  LSPMapping,
} from "../../utils/ERC725Config.js";
import swal from "sweetalert";

const WalletContentsLSP7 = ({ walletAddress }) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [LSP7Assets, setLSP7Assets] = useState([]);
  const [LSP8Assets, setLSP8Assets] = useState([]);
  const [otherAssets, setOtherAssets] = useState([]);

  const { supportsInterface } = useAssetsContext();

  useEffect(() => {
    isVault(walletAddress).then(res => {
      if (!res) swal("Warning! This address does not support the LSP9Vault interface.", "Proceed with caution.", "warning");
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

  const handleLoadAssets = async () => {
    //fix render twice...use async
    setLSP7Assets([]);
    setLSP8Assets([]);
    if (assetsLoaded === false) {
      assetLoad().then(res => {
        console.log(res);
        res.forEach(asset => {
          supportsInterface(asset, LSPMapping.LSP7.contract).then(res => {
            if (res && !LSP7Assets.includes(asset)) setLSP7Assets(curr => [...curr, asset]);
          });
          supportsInterface(asset, LSPMapping.LSP8.contract).then(res => {
            if (res && !LSP8Assets.includes(asset)) setLSP8Assets(curr => [...curr, asset]);
          });
        });
        setAssetsLoaded(true);
      });
    }
  };

  const assetLoad = async () => {
    const profile = createErc725Instance(LSP3Schema, walletAddress);
    const result = await profile.fetchData("LSP5ReceivedAssets[]");
    return result.value;
  };

  return (
    <div className=" flex flex-col justify-between border-4 rounded-lg border-slate-700 border-dashed w-full h-full my-1 mx-2 p-4 bg-white">
      <div className="bg-red">LSP7 Tokens, List, Total value Drag into vault</div>
      <div className="flex flex-row-reverse justify-end h-2/3 my-2 w-full bg-slate-600 border-4 border-slate-500 rounded-b-3xl">
        {LSP7Assets.map(asset => {
          return <WalletLSP7 assetAddress={asset} key={asset} />;
        })}
      </div>
    </div>
  );
};

export default WalletContentsLSP7;
