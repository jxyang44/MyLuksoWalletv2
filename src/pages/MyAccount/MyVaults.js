import React, { useState, useEffect } from "react";
import { MyVaultsForm, FormTabs, ManagePermissionsForm, PermissionTypesCheckbox } from "../../components";

const forms = [
  { name: "Metadata", border: "border-sky-400 shadow-sky-400" },
  { name: "Permissions", border: "border-green-500 shadow-green-500" },
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
      </div>
    
  );
};

export default MyProfile;
