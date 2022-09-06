//front wallet flap in MLW DApp
//TO-DO - spin vault on open vault

import React, { useEffect, useState } from "react";
import vaultCover from "../../assets/MyLuksoWalletVisual/signet_vault_lock.svg";
import { Address } from "../../components";

const WalletCover = ({ flipFunction, walletMetadata }) => {
  const [animateSpin, setAnimateSpin] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimateSpin(false);
    }, 3000);
  }, []);

  return (
    <div
      className={`token-topography relative text-center flex h-full w-full scale-x-[-1] flex-col items-center justify-center  rounded-l-lg border-8 border-black bg-opacity-20 text-white`}
      onClick={flipFunction}
    >
      <div className="mb-10 text-3xl xl:text-6xl">
        {walletMetadata?.vaultName ?? "Unnamed Vault"}
      </div>
      <img
        className={`md:h-1/2 md:w-1/2 ${animateSpin && "animate-closeVault"}`}
        src={vaultCover}
      />
      <div className="mt-10 text-base xl:text-xl mb-2">
        {walletMetadata?.vaultDescription}
      </div>
      {walletMetadata?.vaultAddress && (
        <div className="rounded-lg border-2 bg-slate-800 py-1 px-2 text-sm md:text-xl xl:text-3xl">
          <Address address={walletMetadata?.vaultAddress} left={4}/>
        </div>
      )}
    </div>
  );
};

export default WalletCover;
