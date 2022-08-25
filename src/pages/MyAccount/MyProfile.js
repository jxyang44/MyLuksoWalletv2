import React, { useState, useEffect } from "react";
import { ProfileThemesForm, FormTabs, ManagePermissionsForm, PermissionTypesCheckbox } from "../../components";

const forms = [
  { name: "Profile Themes", border: "border-sky-400 shadow-sky-400" },
  { name: "Manage Permissions", border: "border-green-500 shadow-green-500" },
];

const MyProfile = () => {
  const [showForm, setShowForm] = useState(forms[0].name);

  return (
    <div className="flex flex-row mx-32 mt-16">
      <div className="flex flex-col w-full items-center">
        <div className="text-sky-500 font-semibold text-2xl">Universal Profile Settings</div>
        <div className="text-3xl mb-4 text-white">Your settings follow your profile</div>
        <div className="">
          <FormTabs forms={forms} showForm={showForm} setShowForm={setShowForm} />
          {showForm === "Profile Themes" && <ProfileThemesForm />}
          {showForm === "Manage Permissions" && <ManagePermissionsForm />}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
