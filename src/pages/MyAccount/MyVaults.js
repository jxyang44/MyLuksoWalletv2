//component for the "My Vaults" page

import React, { useState } from "react";
import { ContainerWithHeader, MyVaultsForm, FormTabs, VaultPermissionsForm, EditVaultOwnerForm, ManagePermissionsForm } from "../../components";

const forms = [
  { name: "Metadata", border: "border-sky-400 shadow-sky-400" },
  { name: "Allowed Addresses", border: "border-violet-500 shadow-violet-500" },
  { name: "Edit Vault Owner", border: "border-orange-500 shadow-orange-500" },
  { name: "Manage Permissions", border: "border-green-500 shadow-green-500" },
];

const MyProfile = () => {
  const [showForm, setShowForm] = useState(forms[0].name);

  return (
    <ContainerWithHeader title="Vaults Settings" subtitle="LSP9 and LSP10 Vault Management">
    
      <div className="w-auto">
        <FormTabs forms={forms} showForm={showForm} setShowForm={setShowForm} />
        {showForm === "Metadata" && <MyVaultsForm />}
        {showForm === "Allowed Addresses" && <VaultPermissionsForm />}
        {showForm === "Edit Vault Owner" && <EditVaultOwnerForm />}
        {showForm === "Manage Permissions" && <ManagePermissionsForm />}
      </div>

      {showForm === "Metadata" && (
        <div className="mt-12 max-w-5xl rounded-xl border-2 border-white bg-slate-700 p-6 text-xl text-sky-500 xl:text-3xl">
          Vault Metadata
          <div className="mt-2 flex flex-col gap-1 text-left text-sm text-white xl:text-base">
            <p>
              To streamline vault navigation within the MyLuksoWallet DApp, the user may assign a name, description, and color to the vault. The
              current implementation stores these settings in the user's Universal Profile.
            </p>
            <p>
              Future implementations could include attaching these variables to the vault itself or implementing compatibility with an ENS-like
              service.
            </p>
          </div>
        </div>
      )}
      {showForm === "Allowed Addresses" && (
        <div className="mt-12 max-w-5xl rounded-xl border-2 border-white bg-slate-700 p-6 text-xl text-sky-500 xl:text-3xl">
          Allowed Addresses
          <div className="mt-2 flex flex-col gap-1 text-left text-sm text-white xl:text-base">
            <p>
              An external address interacting with your Universal Profile can be restricted to only interact with a specific vault that it has
              permissions for. Managing allowed addresses on your vaults can allow others to execute functions on some of your assets without having
              access to others.
            </p>
            <p>This presents many use cases, especially if you own a variety of assets in different categories.</p>
          </div>
        </div>
      )}
   </ContainerWithHeader>
  );
};

export default MyProfile;
