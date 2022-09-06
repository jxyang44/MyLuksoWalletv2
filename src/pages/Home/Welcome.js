import React from "react";

import { SampleAccounts } from "../../components";

import welcomeBg from "../../assets/Home/welcomebg.png";
import vault from "../../assets/Home/vault.png";

const Welcome = () => {
 
  return (
    <div className="bg-cover bg-right-bottom bg-no-repeat" style={{ backgroundImage: `url(${welcomeBg})` }} id="welcome">
      <div className="flex min-h-screen w-full flex-wrap items-center justify-between gap-4 px-8 backdrop-brightness-50 xl:px-48">
        <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
          <div className="text-4xl xl:text-5xl">An Innovative Token & NFT Vault Management System</div>
          <div className="mt-2 mb-6 text-xl text-sky-500 xl:text-2xl">Build Your Digital Identity With MyLuksoWallet</div>
          <SampleAccounts/>
        </div>
        <div className="hidden md:block">
          <img src={vault} alt="Vault" className="perspective-vault aspect-square w-[50vh]" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
