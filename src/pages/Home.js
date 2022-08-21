import React, { useEffect } from "react";

import { Welcome, DigitalIdentity, AssetCards, Footer, WhatisMyLuksoWallet, GetStarted, AboutUs } from "./Home/index";
import { useStateContext } from "../contexts/StateContext";

const Home = () => {
  const { setActiveMenu } = useStateContext();

  useEffect(() => {
    setActiveMenu(false);
  }, []);

  return (
    <div className="flex flex-col  items-center text-white gap-36">
      <Welcome />
      <DigitalIdentity />
      <WhatisMyLuksoWallet />
      <AssetCards />
      <GetStarted />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default Home;
