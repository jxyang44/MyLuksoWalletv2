import React, { useState, useEffect } from "react";
import { MyVaultsForm, FormTabs, ManagePermissionsForm } from "../../components";

const forms = [
  { name: "Metadata", border: "border-sky-400 shadow-sky-400" },
  { name: "Manage Permissions", border: "border-green-500 shadow-green-500" },
];

const MyProfile = () => {
  const [showForm, setShowForm] = useState(forms[0].name);

  return (
    <div className="flex flex-col mx-32 mt-16 justify-center items-center">
      <div className="text-sky-500 font-semibold text-2xl">Vaults Settings</div>
      <div className="text-3xl mb-4 text-white">LSP9 and LSP 10 Vault Management</div>
      <div className="w-auto">
        <FormTabs forms={forms} showForm={showForm} setShowForm={setShowForm} />
        {showForm === "Metadata" && <MyVaultsForm />}
        {showForm === "Manage Permissions" && <ManagePermissionsForm />}
      </div>

      {showForm === "Metadata" && (
        <div className="lg:text-3xl text-xl text-sky-500 max-w-5xl mt-12 border-2 p-6 rounded-xl border-white bg-slate-700">
          Vault Metadata
          <div className="text-white text-left lg:text-base text-sm flex flex-col gap-1 mt-2">
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
    </div>
  );
};

export default MyProfile;
