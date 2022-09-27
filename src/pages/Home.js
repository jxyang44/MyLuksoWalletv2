//component for the "MLW Homepage" page

import React, { useEffect } from "react";

import {
  Welcome,
  DigitalIdentity,
  AssetCards,
  WhatisMyLuksoWallet,
  Roadmap,
  GetStarted,
  AboutUs,
} from "./Home/index";
import { useStateContext } from "../contexts/StateContext";

const Home = () => {
  const { setActiveMenu } = useStateContext();

  useEffect(() => {
    setActiveMenu(false);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center gap-12 md:gap-36 pb-32 text-white">
        <Welcome />
        {/* <DigitalIdentity /> */}
        <WhatisMyLuksoWallet />
        <AssetCards />
        <GetStarted />
        <Roadmap />
        <AboutUs />
      </div>
    </>
  );
};

export default Home;
