import React, { useState } from "react";

import { Address, Banner } from "../../components/";
import { DeployVault, DeployURD, AddURDtoVault, AddVaultToUP, AddPermissions, AddMetadata } from "../../components/Vault";

const CreateVault = () => {
  const [recentVaultAddress, setRecentVaultAddress] = useState(); //stores the most recent address of the deployed vault (will override with each deployment)

  //   <div className="my-2 flex flex-row gap-1 text-white">
  //   Most recently deployed LSP7 token contract from your browser:
  //   <span className="font-bold"><Address address={recentVaultAddress ?? localStorage.getItem("recentLSP9Address") ?? "N/A"} /></span>
  // </div>
  // <DeployVault recentVaultAddress={recentVaultAddress} setRecentVaultAddress = {setRecentVaultAddress}/>
  // <VaultPermissions/>

  return (
    <>
      <Banner
        colorFrom={"from-sky-500"}
        title={"Create a LSP9 Vault"}
        subtitle={"Vaults are used to organize and manage your assets"}
        buttonText={""}
      />

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold sm:text-3xl text-white">Set Up a Vault</h2>

        <p className="mx-auto mt-4 text-slate-200">
          Setting up a vault is a multi-step process and requires several confirmations from your browser extension. The deployment process is
          separated into steps so that you won't have to start over in case anything goes wrong along the way.
        </p>
        <div className="mt-4 mb-16 w-full bg-slate-500 h-[1px]"></div>
        <DeployVault />
        <DeployURD />
        <AddURDtoVault />
        <AddVaultToUP />
        <AddPermissions />
        <AddMetadata />
      </div>
    </>
  );
};

export default CreateVault;
