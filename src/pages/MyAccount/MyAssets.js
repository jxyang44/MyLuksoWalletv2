//component for hte "My Assets" page
//to-dos:
//  handle duplicates when an asset is owned and issued
//  clean up formatting
//  edit asset data

import React, { useState, useEffect} from "react";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";
import {
  FormTabs,
  LSP8NFTCard,
  LSP7TokenCoin,
  Loading,
  LoginGraphic,
  FullScreenButton,
  FormContainer,
} from "../../components";
import { LSPMapping, createErc725Instance, LSP3Schema } from "../../utils/luksoConfigs";
import { GiTwoCoins } from "react-icons/gi";
import { AiFillCreditCard } from "react-icons/ai";
import Slider from "react-slick";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4";
const inputLabel = "block text-white text-sm font-bold";

const SelectedAssetToggle = ({ assetText, selectedAsset, setSelectedAsset, otherAsset }) => {
  return (
    <button
      className={`${
        selectedAsset ? "font-semibold border-sky-200 shadow-sky-500 shadow-sm bg-sky-500" : "border-slate-200"
      } text-center xl:w-40 w-36  xl:text-base text-sm border-2 px-2 rounded-lg hover:text-slate-800 hover:bg-slate-200 flex flex-row justify-between items-center`}
      onClick={() => otherAsset && setSelectedAsset(curr => !curr)}>
      <p>{assetText}</p>
      <p>{selectedAsset ? "✔️" : "❌"}</p>
    </button>
  );
};

const forms = [
  { name: "Filter Assets", border: "border-sky-400 shadow-sm shadow-sky-400" },
  //{ name: "Edit Token", border: "border-orange-500 shadow-orange-500" },
];

const MyAssets = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const { currentAccount, accountAddresses } = useProfileContext();
  const { supportsInterface } = useAssetsContext();
  const [assets, setAssets] = useState("");
  const [showLSP7Assets, setShowLSP7Assets] = useState(true);
  const [showLSP8Assets, setShowLSP8Assets] = useState(false);
  const [showReceivedAssets, setShowReceivedAssets] = useState(true);
  const [showIssuedAssets, setShowIssuedAssets] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [walletAddress, setWalletAddress] = useState(currentAccount);
  const [showForm, setShowForm] = useState("Filter Assets");
  
  useEffect(() => {
    if (currentAccount) setActiveMenu(false);
    setWalletAddress(currentAccount);
    handleLoadAssets(currentAccount);
    
  }, []);



  const sliderSettings = {
    customPaging: i => {
      return (
        <div className="flex flex-col xl:text-[3rem] md:text-[2rem] text-[1rem] text-white items-center">
          {assets[i].LSP_7_8 === "LSP7" ? <GiTwoCoins /> : <AiFillCreditCard />}
          <div className="text-sm -translate-y-2 text-center">
            {assets[i].address && assets[i].address.substring(0, 8)}
            {assets[i].address && assets[i].address.length > 8 && "..."}
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
    vertical: true,
   
  };


  const handleLoadAssets = (walletAddress) => {
    setAssets([]);
    setAssetsLoaded(false);

    assetLoad(walletAddress).then(res => {
      setAssetsLoaded(true);
      if (res) {
        res.map(asset => {
          supportsInterface(asset, LSPMapping.LSP7.contract).then(res => {
            const newAsset = { address: asset, LSP_7_8: "LSP7" };
            if (res === true && showLSP7Assets) setAssets(curr => [...curr, newAsset]);
          });
          supportsInterface(asset, LSPMapping.LSP8.contract).then(res => {
            const newAsset = { address: asset, LSP_7_8: "LSP8" };
            if (res === true && showLSP8Assets) setAssets(curr => [...curr, newAsset]);
          });
        });
      }
    });
  };

  const assetLoad = async walletAddress => {
    const profile = createErc725Instance(LSP3Schema, walletAddress);
    let result1, result2;
    if (showReceivedAssets) result1 = await profile.fetchData("LSP5ReceivedAssets[]");
    if (showIssuedAssets) result2 = await profile.fetchData("LSP12IssuedAssets[]");
    const returnvalue = result1?.value.concat(result2?.value) ?? result2.value;
    return returnvalue;
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
            <div className="flex flex-row justify-center gap-28 xl:mx-16 mt-16">
              <div className="flex flex-col justify-start gap-2 w-5/12 mx-8 text-white">
                <div className="text-sky-500 font-semibold xl:text-4xl text-2xl">Powered by Lukso Standard Proposals</div>
                <div className="xl:text-2xl text-lg mb-4 text-white flex flex-row gap-1 items-center">
                  View and Manage LSP7
                  (<GiTwoCoins/>)

                   and LSP8 (<AiFillCreditCard/>) Assets</div>

                <div className="mt-4">
                  <FormTabs forms={forms} showForm={showForm} setShowForm={setShowForm} />
                  {showForm === "Filter Assets" && (
                    <FormContainer
                      title={`Filter Assets`}
                      subtitle={`Filter the View Between LSP7, LSP8, Received and Issued Assets. Known Bug: Owned balance shows your UP balance even if you switch to a vault. For now, to properly view your balance, use the MLW DApp.`}
                      mainOverride={"border-sky-400 shadow-sky-400 h-fit rounded-tl-none xl:w-[50vw] lg:w-[35vw]"}
                      textOverride={"text-sky-400"}>
                      <div className="my-4">
                        <div className={inputLabel}>Selected UP or Vault Address</div>
                        <select
                          type="text"
                          value={walletAddress}
                          placeholder={"Vault Address"}
                          onChange={e => setWalletAddress(e.target.value)}
                          className={inputStyle}>
                          <option value={currentAccount}>Universal Profile - {currentAccount}</option>
                          {accountAddresses.vaults.map((vault, i) => {
                            return (
                              <option key={vault + i} value={vault}>
                                Vault - {vault}
                              </option> //TO-DO add vault name to selection for clarity
                            );
                          })}
                        </select>

                        <div className="flex flex-col gap-2 my-4">
                          <div className="flex flex-row gap-6 h-12">
                            <SelectedAssetToggle
                              assetText="LSP7 Tokens"
                              selectedAsset={showLSP7Assets}
                              setSelectedAsset={setShowLSP7Assets}
                              otherAsset={showLSP8Assets}
                            />
                            <SelectedAssetToggle
                              assetText="LSP8 NFTs"
                              selectedAsset={showLSP8Assets}
                              setSelectedAsset={setShowLSP8Assets}
                              otherAsset={showLSP7Assets}
                            />
                          </div>

                          <div className="flex flex-row gap-6 h-12">
                            <SelectedAssetToggle
                              assetText="Owned Assets"
                              selectedAsset={showReceivedAssets}
                              setSelectedAsset={setShowReceivedAssets}
                              otherAsset={showIssuedAssets}
                            />
                            <SelectedAssetToggle
                              assetText="Issued Assets"
                              selectedAsset={showIssuedAssets}
                              setSelectedAsset={setShowIssuedAssets}
                              otherAsset={showReceivedAssets}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-end">
                          <button
                            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={()=>handleLoadAssets(walletAddress)}>
                            Reload Assets
                          </button>
                        </div>
                      </div>
                    </FormContainer>
                  )}
                </div>
              </div>

              {assetsLoaded ? (
                <div className="flex flex-row justify-center w-6/12">
                  {assets.length > 0 && assetsLoaded ? (
                    <Slider {...sliderSettings}>
                      {assets.map((asset, index) => {
                        return (
                          <>
                            {asset.LSP_7_8 === "LSP7" && (
                              <div className="px-4 my-20" key={asset+index+"LSP7"}>
                                <LSP7TokenCoin assetAddress={asset.address} />
                              </div>
                            )}
                            {asset.LSP_7_8 === "LSP8" && (
                              <div className="px-4 my-20" key={asset+index+"LSP8"}>
                                <LSP8NFTCard assetAddress={asset.address} />
                              </div>
                            )}
                          </>
                        );
                      })}
                    </Slider>
                  ) : (
                    <div className="text-white text-center self-center">No selected assets found in address {walletAddress}.</div>
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
