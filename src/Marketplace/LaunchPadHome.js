import React from "react";
import { Title, HowTo, TOC, FirstOfAKind, FeaturedCreators, TradeAndShare, Partnership } from "./LaunchPad";
const LaunchPadHome = () => {
  return (
    <div className="mt-10 flex flex-col items-center gap-12 px-8 pb-32 text-white md:px-32">
      <Title />
      <TOC />
      <FirstOfAKind />
   
      <FeaturedCreators />
      <TradeAndShare />
      <Partnership />
      <HowTo />
    </div>
  );
};

export default LaunchPadHome;
