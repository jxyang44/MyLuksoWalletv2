import React, { useEffect, useState } from "react";

import { Banner } from "../../components/";
import { DeployVault, DeployURD, AddURDtoVault, AddVaultToUP, EditVault } from "../../components/Vault";

const CreateVault = () => {
  const [recentVaultAddress, setRecentVaultAddress] = useState(localStorage.getItem("recentLSP9Address")); //stores the most recent address of the deployed vault (will override with each deployment)
  const [recentVaultURDAddress, setRecentVaultURDAddress] = useState(localStorage.getItem("recentLSP9URDAddress")); //stores the most recent address of the deployed vault (will override with each deployment)

  useEffect(() => {
    window.addEventListener("storage", () => {
      setRecentVaultAddress(JSON.parse(localStorage.getItem("recentLSP9Address")) || []);
      setRecentVaultURDAddress(JSON.parse(localStorage.getItem("recentLSP9URDAddress")) || []);
    });
  }, []);

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
        <DeployVault recentVaultAddress={recentVaultAddress} setRecentVaultAddress={setRecentVaultAddress} />
        <DeployURD recentVaultURDAddress={recentVaultURDAddress} setRecentVaultURDAddress={setRecentVaultURDAddress} />
        <AddURDtoVault recentVaultAddress={recentVaultAddress} recentVaultURDAddress={recentVaultURDAddress} />
        <AddVaultToUP recentVaultAddress={recentVaultAddress} />
        <EditVault />
      </div>
    </>
  );
};

export default CreateVault;
