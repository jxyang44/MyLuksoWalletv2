//updates vault metadata (stored on UP)

import React, { useState, useEffect } from "react";
import { FormContainer, UpdateProfile } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4";
const inputLabel = "block text-white text-sm font-bold";

//settings are visualized in the MyLuksoWallet DApp
const initialFormState = {
  vaultAddress: "", //the address of your account (vault)
  vaultName: "", //nickname for vault
  vaultDescription: "", //description for vault
  vaultColor: "", //color for vault
};

const ManagePermissionsForm = () => {
  const { currentAccount, accountAddresses, profileJSONMetadata, setPendingProfileJSONMetadata } = useProfileContext();
  const [formValues, setFormValues] = useState(initialFormState); //initial form input values


  const set = name => {
    return ({ target }) => {
      setFormValues(current => ({ ...current, [name]: target.value }));
    };
  };

  useEffect(() => {
    const vaultMetadata = { [`MLW_Vault_${formValues.vaultAddress}`]: { ...formValues } };
    formValues.vaultAddress && setPendingProfileJSONMetadata(curr => ({ ...curr, ...vaultMetadata }));
  }, [formValues]);

  //updates form values with UP metadata
  useEffect(() => {
    if (formValues.vaultAddress === "") return;
    const vaultKey = `MLW_Vault_${formValues.vaultAddress}`;
    setFormValues(curr => ({
      ...curr,
      vaultName: profileJSONMetadata[vaultKey]?.vaultName ?? "",
      vaultDescription: profileJSONMetadata[vaultKey]?.vaultDescription ?? "",
      vaultColor: profileJSONMetadata[vaultKey]?.vaultColor ?? "",
    }));
  }, [formValues.vaultAddress]);

  return (
    <div className="relative flex flex-row">
      <FormContainer
        title={`Vault Metadata`}
        subtitle={`Edit Vault Metadata (currently stored with your UP, more options pending 👷)`}
        mainOverride={"border-sky-400 shadow-sky-400 h-fit rounded-tl-none max-w-2xl"}
        textOverride={"text-sky-400"}>
        {currentAccount === "" ? (
          <div className="text-white">Universal Profile address not detected. Please connect.</div>
        ) : (
          <>
            <div className="mb-4">
              <div className={inputLabel}>Your Vault Address (required)</div>

              <select type="text" value={formValues.vaultAddress} placeholder={"Vault Address"} onChange={set("vaultAddress")} className={inputStyle}>
                <option value="" disabled>
                  Select an Account
                </option>
                {accountAddresses.vaults.map(vault => {
                  return (
                    <option key={vault} value={vault}>
                      Vault - {vault}
                    </option>
                  );
                })}
              </select>

              <div className={inputLabel}>Set Vault Name</div>
              <input
                className={inputStyle}
                type="text"
                value={formValues.vaultName}
                placeholder={"My Vault Name..."}
                required
                onChange={set("vaultName")}
              />

              <div className={inputLabel}>Set Vault Description</div>
              <input
                className={inputStyle}
                type="text"
                value={formValues.vaultDescription}
                placeholder={"My Vault Description..."}
                required
                onChange={set("vaultDescription")}
              />

              <div className="flex flex-row items-center mb-4 justify-between h-8">
                <div className=" text-white font-semibold">Vault Color</div>
                <input type="color" value={formValues.vaultColor} onChange={set("vaultColor")} className="h-9 w-20 rounded bg-transparent"></input>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setFormValues(initialFormState)}>
                Reset
              </button>

              <UpdateProfile />
            </div>
          </>
        )}
      </FormContainer>
    </div>
  );
};

export default ManagePermissionsForm;
