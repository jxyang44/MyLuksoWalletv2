import React, { useEffect } from "react";
import { LoginGraphic, FullScreenButton } from "../components";
import {WalletContainer, WalletSliderIcon} from "../components/MyLuksoWalletVisual"
import { useStateContext } from "../contexts/StateContext";
import { useProfileContext } from "../contexts/ProfileContext";

import Slider from "react-slick";

import "./MyLuksoWallet.css";

const MyLuksoWallet = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  const { isProfileLoaded, accountAddresses } = useProfileContext();

  useEffect(() => {
    setActiveMenu(false);
  }, []);

  const sliderSettings = {
    customPaging: i => {
      return (
        <div>
          <WalletSliderIcon index={i}/>
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
    <>
      {activeMenu ? (
        <FullScreenButton text="MyLuksoWallet Dapp" />
      ) : isProfileLoaded ? (
        <div className="flex flex-col fade-in">
          <Slider {...sliderSettings}>
          
            {accountAddresses.vaults.map((vault, i) => {
              return <WalletContainer key={vault+i} walletAddress={vault}/>;
            })}
          </Slider>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[15vh]">
          <LoginGraphic />
        </div>
      )}
    </>
  );
};

export default MyLuksoWallet;
