import React, { useEffect } from "react";
import { Wallet } from "../components";
import { useStateContext } from "../contexts/StateContext";
import { useProfileContext } from "../contexts/ProfileContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const MyLuksoWallet = () => {
  const { setActiveMenu } = useStateContext();
  const { isProfileLoaded } = useProfileContext();

  useEffect(() => {
    setActiveMenu(false);
  }, []);

  



  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



  return (
    <div className=" flex flex-col">
    <h2> Single Item</h2>
        <Slider {...sliderSettings}>
        <div>
           <Wallet/>
        </div>
        <div>
        <Wallet/>
        </div>
      
        </Slider>
  </div>
    
    
  );
};

export default MyLuksoWallet;
