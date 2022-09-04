//component for the "My Universal Profile" page

import React, { useState } from "react";
import { ProfileThemesForm, FormTabs, ManagePermissionsForm } from "../../components";
import { useStateContext } from "../../contexts/StateContext";
const forms = [
  { name: "Profile Themes", border: "border-sky-400 shadow-sky-400 shadow-sm" },
  { name: "Manage Permissions", border: "border-green-500 shadow-green-500" },
];

const MyProfile = () => {
  const [showForm, setShowForm] = useState(forms[0].name);
  const { activeProfile } = useStateContext();
  return (
    <div className="flex flex-row mx-32 mt-8">
      <div className={`flex flex-col w-full items-center`}>
        <div className="text-sky-500 font-semibold text-4xl">Universal Profile Manager</div>
        <div className="text-2xl mb-4 text-white">Universal Profile Settings</div>

        <div className={`mt-4 ${activeProfile ? "self-start" : "self-center"}`}>
          <FormTabs forms={forms} showForm={showForm} setShowForm={setShowForm} />
          {showForm === "Profile Themes" && <ProfileThemesForm />}
          {showForm === "Manage Permissions" && <ManagePermissionsForm />}
        </div>

        {showForm === "Profile Themes" && (
          <div className="xl:text-3xl text-xl text-sky-500 max-w-5xl mt-12 border-2 p-6 rounded-xl border-white bg-slate-700">
            "Styling" Metadata
            <div className="text-white text-left xl:text-base text-sm flex flex-col gap-1 mt-2">
              <p>
                In addition to the standard LSP3 Metadata included in your profile (e.g. "description", "tags"), MyLuksoWallet provides the option to
                add additional stylistic elements to your UP. This creates an engaging environment that can personalize your journey across any DApps
                that implement Universal Profiles. Examples include theme colors, font families, text colors, and a variety of other basic styles.
                These settings are intentionally generic so that they can carry over from one DApp to another.
              </p>
              <p>It is still early for Lukso developers, so now is the ideal time to share and implement this feature!</p>
              <p>In its current iteration MyLuksoWallet provides a few basic color theming options.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
