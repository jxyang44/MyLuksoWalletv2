//component for the "My Vaults" page

import React, { useState } from "react";
import { MyVaultsForm, FormTabs, VaultPermissionsForm, EditVaultOwnerForm, ManagePermissionsForm } from "../../components";

const forms = [
  { name: "Metadata", border: "border-sky-400 shadow-sky-400" },
  { name: "Allowed Addresses", border: "border-violet-500 shadow-violet-500" },
  { name: "Edit Vault Owner", border: "border-orange-500 shadow-orange-500" },
  { name: "Manage Permissions", border: "border-green-500 shadow-green-500" },

];

const MyProfile = () => {
  const [showForm, setShowForm] = useState(forms[0].name);

  return (
    <div className="flex flex-col mx-32 mt-16 justify-center items-center">
      <div className="text-sky-500 font-semibold text-2xl">Vaults Settings</div>
      <div className="text-3xl mb-4 text-white">LSP9 and LSP10 Vault Management</div>
      <div className="w-auto">
        <FormTabs forms={forms} showForm={showForm} setShowForm={setShowForm} />
        {showForm === "Metadata" && <MyVaultsForm />}
        {showForm === "Allowed Addresses" && <VaultPermissionsForm />}
        {showForm === "Edit Vault Owner" && <EditVaultOwnerForm />}
        {showForm === "Manage Permissions" && <ManagePermissionsForm />}
      </div>

      {showForm === "Metadata" && (
        <div className="xl:text-3xl text-xl text-sky-500 max-w-5xl mt-12 border-2 p-6 rounded-xl border-white bg-slate-700">
          Vault Metadata
          <div className="text-white text-left xl:text-base text-sm flex flex-col gap-1 mt-2">
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
        <div className="xl:text-3xl text-xl text-sky-500 max-w-5xl mt-12 border-2 p-6 rounded-xl border-white bg-slate-700">
          Allowed Addresses
          <div className="text-white text-left xl:text-base text-sm flex flex-col gap-1 mt-2">
            <p>
              An external address interacting with your Universal Profile can be restricted to only interact with a specific vault that it has permissions for. 
              Managing allowed addresses on your vaults can allow others to execute functions on some of your assets without having access to others.
            </p>
            <p>
              This presents many use cases, especially if you own a variety of assets in different categories.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
