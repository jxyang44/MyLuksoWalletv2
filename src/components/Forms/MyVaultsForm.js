//updates vault metadata (stored on UP)
//TO-DO only update on "upload edits" - currently uploading pending edits on every change
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
  const { currentAccount, accountAddresses, profileJSONMetadata, pendingProfileJSONMetadata, setPendingProfileJSONMetadata } = useProfileContext();
  const [formValues, setFormValues] = useState(initialFormState); //initial form input values

  const set = name => {
    return ({ target }) => {
      setFormValues(current => ({ ...current, [name]: target.value }));
    };
  };

  useEffect(() => {
    const vaultMetadata = {
      [`MLW_Vault_${formValues.vaultAddress}`]: { ...formValues },
    };
    formValues.vaultAddress && setPendingProfileJSONMetadata(curr => ({ ...curr, ...vaultMetadata }));
  }, [formValues]);

  //updates form values with UP metadata
  useEffect(() => {
    if (formValues.vaultAddress === "") return;
    const vaultKey = `MLW_Vault_${formValues.vaultAddress}`;
    setFormValues(curr => ({
      ...curr,
      vaultName: pendingProfileJSONMetadata[vaultKey]?.vaultName,
      vaultDescription: pendingProfileJSONMetadata[vaultKey]?.vaultDescription,
      vaultColor: pendingProfileJSONMetadata[vaultKey]?.vaultColor,
    }));
  }, [formValues.vaultAddress]);

  useEffect(() => {
    return () => {
      setPendingProfileJSONMetadata(profileJSONMetadata);
    };
  }, []);

  const handleReset = () => {
    setFormValues(initialFormState);
    setPendingProfileJSONMetadata(profileJSONMetadata);
  };

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
                      {pendingProfileJSONMetadata["MLW_Vault_" + vault]?.vaultName ?? "Unnamed Vault"} - {vault}
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

              <div className="mb-4 flex h-8 flex-row items-center justify-between">
                <div className=" font-semibold text-white">Vault Color</div>
                <input type="color" value={formValues.vaultColor} onChange={set("vaultColor")} className="h-9 w-20 rounded bg-transparent"></input>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700 focus:outline-none"
                onClick={handleReset}>
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
