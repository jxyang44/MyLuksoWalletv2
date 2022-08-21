import React, { useState, useEffect } from "react";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";
import { ButtonShadow, LSP8NFTCard, LSP7TokenCoin, Loading, Banner, LoginGraphic, FullScreenButton } from "../../components";
import { LSPMapping } from "../../utils/ERC725Config";
import { GiTwoCoins } from "react-icons/gi";
import { AiFillCreditCard } from "react-icons/ai";
import Slider from "react-slick";

//TO-DO set cooldown on how quickly to click
const SelectedAssetToggle = ({ assetText, selectedAsset, setSelectedAsset, otherAsset }) => {
  return (
    <button
      className={`${
        selectedAsset ? "bg-white text-green-500 font-semibold border-green-500" : "border-red-500"
      } text-center w-44 border-2  py-2 px-4 rounded-lg hover:text-slate-800 hover:bg-slate-200 flex flex-row justify-between items-center`}
      onClick={() => otherAsset && setSelectedAsset(curr => !curr)}>
      <p>{assetText}</p>
      <p>{selectedAsset ? "✔️" : "❌"}</p>
    </button>
  );
};

const MyAssets = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const { currentAccount } = useProfileContext();
  const { receivedAssets, issuedAssets, vaults, fetchAllAssets, supportsInterface } = useAssetsContext();
  const [assets, setAssets] = useState("");
  const [showLSP7Assets, setShowLSP7Assets] = useState(true);
  const [showLSP8Assets, setShowLSP8Assets] = useState(false);
  const [showReceivedAssets, setShowReceivedAssets] = useState(true);
  const [showIssuedAssets, setShowIssuedAssets] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    if (currentAccount) setActiveMenu(false);
    handleLoadAssets();
    // setTimeout(() => {
    //   setShowScreen(true);
    // }, 1000);
  }, []);

  useEffect(() => {
  
    handleLoadAssets();
    console.log(assets.length, assets);
  }, [currentAccount, showReceivedAssets, showIssuedAssets, showLSP7Assets, showLSP8Assets]);


  const sliderSettings = {
    customPaging: i => {
      return (
        <div className="flex flex-col text-[4rem] text-white items-center">
          {assets[i].LSP_7_8 === "LSP7" ? <GiTwoCoins /> : <AiFillCreditCard />}
          <div className="text-sm -translate-y-2 text-center">
            {assets[i].address && assets[i].address.substring(0, 12)}
            {assets[i].address && assets[i].address.length > 12 && "..."}
          </div>
        </div>
      );
    },
    dots: true,
    dotsClass: "assets-carousel-dots",
    infinite: true,
    speed: 500,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: true,
    vertical: true,
  };

  //test UP address: 0xa907c1904c22DFd37FF56c1f3c3d795682539196
  const handleLoadAssets = () => {
    setAssets([]);
    setAssetsLoaded(false);
    if (showReceivedAssets) assetLoad(receivedAssets, "LSP5");
    if (showIssuedAssets) assetLoad(issuedAssets, "LSP12");
    //handle redundacies
    //sort by some sort of order

    console.log(assets);
  };

  const assetLoad = (assetType, LSP) => {
    fetchAllAssets(currentAccount, LSPMapping[LSP].name).then(() => {
      assetType.length &&
        assetType.forEach(asset => {
          supportsInterface(asset, LSPMapping.LSP7.contract).then(res => {
            const newAsset = { address: asset, LSP_7_8: "LSP7", [LSP]: true };
            if (res === true && showLSP7Assets && !assets.includes(newAsset)) setAssets(curr => [...curr, newAsset]); 
            //fix the LSP loaded (currently show redundancies issued/owned)
          });
          supportsInterface(asset, LSPMapping.LSP8.contract).then(res => {
            const newAsset = { address: asset, LSP_7_8: "LSP8", [LSP]: true };
            if (res === true && showLSP8Assets && !assets.includes(newAsset)) setAssets(curr => [...curr, newAsset]);
          });
        });
      setAssetsLoaded(true);
    });
  };

  return (
    <>
      {!currentAccount ? (
        <LoginGraphic />
      ) : (
        <>
          {activeMenu ? (
            <FullScreenButton text={`My Tokens and NFTs`} />
          ) : (
            <div className="flex flex-row mt-16">
              <div className="flex flex-col justify-start gap-2 mx-24 w-5/12 text-white">
                <div className="text-sky-500 font-semibold text-3xl">Powered by Lukso Standard Proposals</div>
                <div className="text-5xl">My Assets</div>
                <div className="text-2xl mt-2 mb-6">Manage LSP7 & LSP8 Assets With MyLuksoWallet</div>
                <div className="flex flex-row gap-6 h-12">
                  <SelectedAssetToggle assetText="LSP7 Tokens" selectedAsset={showLSP7Assets} setSelectedAsset={setShowLSP7Assets} otherAsset={showLSP8Assets} />
                  <SelectedAssetToggle assetText="LSP8 NFTs" selectedAsset={showLSP8Assets} setSelectedAsset={setShowLSP8Assets} otherAsset={showLSP7Assets} />
                </div>

                <div className="flex flex-row gap-6 h-12">
                  <SelectedAssetToggle assetText="Owned Assets" selectedAsset={showReceivedAssets} setSelectedAsset={setShowReceivedAssets} otherAsset={showIssuedAssets} />
                  <SelectedAssetToggle assetText="Issued Assets" selectedAsset={showIssuedAssets} setSelectedAsset={setShowIssuedAssets}  otherAsset = {showReceivedAssets}/>
                  <ButtonShadow
                    buttonText={"Reload Assets"}
                    buttonFunc={handleLoadAssets}
                    buttonColor={"bg-blue-500"}
                    buttonTextColor={"text-black"}
                  />
                </div>
                <div>insert edit token form</div>
              </div>
              {assetsLoaded ? (
                <div className="flex flex-row justify-center w-7/12">
                  {assets.length > 0 && assetsLoaded ? (
                    <Slider {...sliderSettings}>
                      {assets.map((asset, index) => {
                        return (
                          <>
                            {asset.LSP_7_8 === "LSP7" && (
                              <div className="p-4">
                                <LSP7TokenCoin key={index} assetAddress={asset.address} />
                              </div>
                            )}
                            {asset.LSP_7_8 === "LSP8" && (
                              <div className="px-4 py-20">
                                <LSP8NFTCard key={index} assetAddress={asset.address} />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </Slider>
                  ) : (
                    <div className="text-white">You do not have any assets</div>
                  )}
                </div>
              ) : (
                <div className="flex flex-row justify-center w-7/12">
                  <Loading />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MyAssets;
