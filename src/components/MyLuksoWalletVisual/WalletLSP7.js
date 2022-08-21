import React, { useEffect, useState } from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { IPFS_GATEWAY, LSP4Schema, LSP7MintableContract } from "../../utils/ERC725Config";
import { Name, Background } from "../LSPAssetVisuals/LSP7Components";
import { useDrag, DragPreviewImage } from "react-dnd";
import swal from "sweetalert";
import { MintForm } from "..";
const WalletLSP7 = ({ assetAddress }) => {
  const { currentAccount } = useProfileContext();
  const { getAssetMetadata, getAssetByKey, getBalanceOf } = useAssetsContext();
  const [assetName, setAssetName] = useState("");
  const [assetSymbol, setAssetSymbol] = useState("");
  const [assetIcon, setAssetIcon] = useState("");
  const [assetImageFront, setAssetImageFront] = useState("");
  const [assetMetadata, setAssetMetadata] = useState({});
  const [balanceOf, setBalanceOf] = useState("");
  const [bringToFront, setBringToFront] = useState(false);

  //retrieve asset metadata from blockchain
  useEffect(() => {
    if (assetAddress) {
      getAssetByKey(assetAddress, LSP4Schema[1].key).then(res => setAssetName(res.value));
      getAssetByKey(assetAddress, LSP4Schema[2].key).then(res => setAssetSymbol(res.value));
      //getDecimals(assetAddress).then(res => console.log(res.value));
      getAssetMetadata(assetAddress).then(res => {
        setAssetMetadata(cur => ({ ...cur, ...res }));
        //console.log("metadata results:", res, res.backgroundColor, assetMetadata);
        if (res.icon && res.icon.length > 0) {
          setAssetIcon(res.icon[0]?.url?.replace("ipfs://", IPFS_GATEWAY));
        }
        if (res.images && res.images.length > 0) {
          setAssetImageFront(res.images[0][0]?.url?.replace("ipfs://", IPFS_GATEWAY)); //defaults first image to front
        }
        //TO-DO something with assets key if it exists
      });
      currentAccount && getBalanceOf(assetAddress, currentAccount).then(res => setBalanceOf(res));
    }
  }, []);

  const [{ opacity }, drag, preview] = useDrag(
    () => ({
      type: "LSP7",
      item: { assetAddress },
      end(item, monitor) {
        const dropResult = monitor.getDropResult();
        if (item && dropResult) {
          swal("Success!", `You moved ${item.assetAddress} into ${dropResult.name}!`, "success");
        }
      },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
      }),
    }),
    [assetAddress]
  );

  return (
      <div className={`relative w-12 ${bringToFront && "order-last z-100"}`} onClick={() => setBringToFront(curr => !curr)}>
    <div ref={preview} style={{ opacity }}>
        <div
          className={`w-[40vmax] aspect-square tilted-coin relative `}
          ref={drag}
          style={{ opacity }}
         >
          <div
            className={`font-['Arial'] cursor-default absolute w-[40vmax] aspect-square border-2 border-white top-0 rounded-full  
        flex flex-col shadow-lg shadow-white items-center justify-start bg-black`}
            style={{ backgroundColor: assetMetadata.backgroundColor, color: assetMetadata.textColor }}>
            <Background assetImage={assetImageFront} />
            <Name assetName={assetName} rotationOffset={-70} />

            {assetIcon !== "" && (
              <div className={`absolute top-1/2 -translate-y-1/2 w-[50%] aspect-square flex justify-center items-center rounded-full opacity-50 p-2`}>
                <img src={assetIcon} className="w-full aspect-square select-none rounded-full"></img>
              </div>
            )}
            <div
              className="absolute flex flex-col items-center top-1/2 -translate-y-1/2 text-2xl w-[50%] aspect-square overflow-x-auto justify-center rounded-full text-center shadow-white shadow-lg"
              style={{ background: `radial-gradient(#AAA 20%, transparent, ${assetMetadata.backgroundColor})` }}>
              <p className="font-['Times'] text-4xl font-bold ">Owned</p>
              <p className="text-8xl mt-1 font-semibold brightness-50">{balanceOf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              <p className="text-3xl uppercase font-semibold brightness-50">{assetSymbol}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletLSP7;
