import React, { useEffect } from "react";
import { LoginGraphic, FullScreenButton } from "../components";
import { WalletContainer, WalletSliderIcon } from "./components/";
import { useStateContext } from "../contexts/StateContext";
import { useProfileContext } from "../contexts/ProfileContext";

import Slider from "react-slick";

import "./MyLuksoWallet.css";
import aboutLukso from "../assets/MyLuksoWalletVisual/MLWDappbackground.jpg";
const MyLuksoWallet = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const { isProfileLoaded, accountAddresses, currentAccount, pendingProfileJSONMetadata } = useProfileContext();

  useEffect(() => {
    setActiveMenu(false);
  }, []);

  const sliderSettings = {
    customPaging: i => {
      return (
        <div>
          <WalletSliderIcon index={i} />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots",
    infinite: true,
    speed: 500,
    swipe: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: true,
  };

  return (
    <div className="bg-slate-900 bg-fixed pb-32 bg-blend-multiply" style={{ backgroundImage: `url(${aboutLukso})` }}>
      {activeMenu ? (
        <FullScreenButton text="MyLuksoWallet Dapp" />
      ) : isProfileLoaded ? (
        <>
          <div className="text-white text-center text-4xl xl:text-5xl pt-16 pb-4 animate-fadeInTop">MyLuksoWallet Vault Manager - Wallet</div>
          <div className="fade-in flex flex-col">
            <Slider {...sliderSettings}>
              <WalletContainer
                walletAddress={currentAccount}
                walletMetadata={{
                  vaultAddress: currentAccount,
                  vaultName: pendingProfileJSONMetadata?.name,
                  vaultDescription: pendingProfileJSONMetadata?.description,
                  vaultColor: pendingProfileJSONMetadata?.MLWUPColor,
                }}
              />
              {accountAddresses.vaults.map((vault, i) => {
                return <WalletContainer key={vault + i} walletAddress={vault} walletMetadata={pendingProfileJSONMetadata[`MLW_Vault_${vault}`]} />;
              })}
            </Slider>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <LoginGraphic />
        </div>
      )}
    </div>
  );
};

export default MyLuksoWallet;
