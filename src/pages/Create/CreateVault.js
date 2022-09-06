//component for the "Create Vault" page

import React, { useEffect, useState } from "react";

import { ContainerWithHeader, Banner } from "../../components/";
import { DeployVault, DeployURD, AddURDToVault, AddVaultToUP, EditVault } from "../../components/Vault";

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
    <ContainerWithHeader title={"Set Up a LSP9 Vault"} subtitle={"Vaults are Used to Organize and Manage Your Assets"}>

      <div className="mx-auto max-w-5xl text-center">

      <div className="mt-4 h-[1px] w-full bg-slate-500"></div>
        <p className="mx-auto mt-4 text-slate-200">
          Setting up a vault is a multi-step process and requires several confirmations from your browser extension. The deployment process is
          separated into steps so that you won't have to start over in case anything goes wrong along the way.
        </p>
        <div className="mt-4 mb-16 h-[1px] w-full bg-slate-500"></div>
        <DeployVault recentVaultAddress={recentVaultAddress} setRecentVaultAddress={setRecentVaultAddress} />
        <DeployURD recentVaultURDAddress={recentVaultURDAddress} setRecentVaultURDAddress={setRecentVaultURDAddress} />
        <AddURDToVault recentVaultAddress={recentVaultAddress} recentVaultURDAddress={recentVaultURDAddress} />
        <AddVaultToUP recentVaultAddress={recentVaultAddress} />
        <EditVault />
      </div>
    </ContainerWithHeader>
  );
};

export default CreateVault;
