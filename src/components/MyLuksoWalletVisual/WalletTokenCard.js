import React, { useEffect, useState } from "react";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { IPFS_GATEWAY, LSP4Schema } from "../../utils/ERC725Config";

//bg idea: https://dribbble.com/shots/5784934-Gradients-and-textures-for-cryptocurrency-project/attachments/1247671?mode=media
const WalletTokenCard = ({ assetAddress }) => {
  const [assetName, setAssetName] = useState("");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [assetMetadata, setAssetMetadata] = useState("");
  const { getAssetMetadata, getAssetByKey } = useAssetsContext();

  useEffect(() => {
    getAssetByKey(assetAddress, LSP4Schema[1].key).then(res => setAssetName(res.value));
    getAssetByKey(assetAddress, LSP4Schema[2].key).then(res => setAssetSymbol(res.value));
    getAssetMetadata(assetAddress).then(res => {
      setAssetMetadata(res);
      console.log(res); //do something with assetmetadata if there are more fields
    });
  }, []);

  return (
    <div className="flex flex-col w-5/6 items-center justify-start my-2">
      <div className="w-5/6 h-[8vmin] ml-4 bg-slate-400 border-4 border-slate-900 rounded-t-3xl border-b-0 token-card-test flex flex-row justify-between">
        <div className="flex flex-col">
          <div>{assetName}</div>
          <div>{assetSymbol}</div>
        </div>
        <div className="">Token supply</div>
        <div>
          {assetMetadata && (
            <img className="w-16" src={assetMetadata.icon[0].url.replace("ipfs://", IPFS_GATEWAY)}></img>
          )}
        </div>
      </div>
      <div className="h-[1vmin] w-full bg-slate-600 border-b-[2px] border-b-slate-200 border-t-[2px] border-t-slate-800 z-100"></div>
    </div>
  );
};

export default WalletTokenCard;
