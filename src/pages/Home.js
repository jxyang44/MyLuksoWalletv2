//component for the "MLW Homepage" page

import React, { useEffect } from "react";

import { Welcome, DigitalIdentity, AssetCards, WhatisMyLuksoWallet, Roadmap, GetStarted, AboutUs } from "./Home/index";
import { useStateContext } from "../contexts/StateContext";

const Home = () => {
  const { setActiveMenu } = useStateContext();

  useEffect(() => {
    setActiveMenu(false);
  }, []);

  return (
    <>
      <div className="flex flex-col items-center text-white gap-36">
        <Welcome />
        <DigitalIdentity />
        <WhatisMyLuksoWallet />
        <AssetCards />
        <Roadmap />
        <GetStarted />
        <AboutUs />
      </div>
    </>
  );
};

export default Home;
