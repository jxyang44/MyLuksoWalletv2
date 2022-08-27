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
      className={`flex flex-col items-center justify-center h-full w-full rounded-l-lg border-8 border-black  bg-opacity-20 relative token-topography scale-x-[-1] text-white`}
      onClick={flipFunction}>
      <div className="lg:text-6xl text-3xl mb-10">{walletMetadata?.vaultName ?? "Unnamed Vault"}</div>
      <img className={`w-1/2 h-1/2 ${animateSpin && "animate-closeVault"}`} src={vaultCover} />
      <div className="lg:text-xl text-base mt-10">{walletMetadata?.vaultDescription}</div>
      {walletMetadata?.vaultAddress && (
        <div className="lg:text-3xl text-xl rounded-lg border-2 py-1 px-2 bg-slate-800">
          <Address address={walletMetadata?.vaultAddress} />
        </div>
      )}
    </div>
  );
};

export default WalletCover;
