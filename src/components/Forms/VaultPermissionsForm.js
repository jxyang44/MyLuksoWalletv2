//for viewing and setting allowed addresses on a vault

import React, { useState, useEffect } from "react";
import { FormContainer, Loading } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4";
const inputLabel = "block text-white text-sm font-bold";

const initialFormState = {
  thirdPartyAddress: "", //the address of the beneficiary account that will be allowed to access the vault
  vaultAddresses: "", //array of vault addresses that the beneficiary account will be allowed to access
};

const VaultPermissionsForm = () => {
  const { currentAccount, accountAddresses, getAllowedAddresses, setAllowedAddresses, profileJSONMetadata } = useProfileContext();
  const [formValues, setFormValues] = useState(initialFormState); //stores form input values; see initialFormState for keys
  const [allVaults, setAllVaults] = useState(accountAddresses.vaults); //ReceivedVaults[] owned by currentAccount
  const [originalAllowedVaults, setOriginalAllowedVaults] = useState([]); //ReceivedVaults[] owned by currentAccount - before submitting changes
  const [allowedVaults, setAllowedVaults] = useState([]); //ReceivedVaults[] owned by currentAccount - before submitting changes
  const [permissionedAddress, setPermissionedAddress] = useState(accountAddresses.permissions); //AddressPermissions[] associated with currentAccount
  const [loaded, setLoaded] = useState(false); //true if a valid addressFrom is selected

  const set = name => {
    return ({ target }) => {
      setFormValues(current => ({ ...current, [name]: target.value }));
    };
  };

  useEffect(() => {
    setLoaded(false);
    getAllowedAddresses(formValues.thirdPartyAddress).then(res => {
      if (res) {
        setOriginalAllowedVaults(res);
        setAllowedVaults(res);
      } else {
        setOriginalAllowedVaults([]);
        setAllowedVaults([]);
      }
      setLoaded(true);
    });
  }, [formValues.thirdPartyAddress]);

  const handleSubmit = () => {
    swal(
      "Please confirm:",
      `Grant ${formValues.thirdPartyAddress} allowed access to the following vaults: ${allowedVaults}? Please make sure that the address already has the CALL permission before confirming.`,
      { button: true }
    ).then(value => {
      if (value)
        setAllowedAddresses(formValues.thirdPartyAddress, allowedVaults).then(res => {
          if (res)
            swal("Congratulations!", `${formValues.thirdPartyAddress} is now allowed to access the following vaults: ${allowedVaults}`, "success");
        });
    });
  };

  const handleCheck = key => {
    console.log(key, allowedVaults.includes(key), originalAllowedVaults.includes(key));
    if (allowedVaults.includes(key)) {
      setAllowedVaults(curr => curr.filter(vault => vault !== key));
    } else {
      setAllowedVaults(curr => [...curr, key]);
    }
  };

  return (
    <div className="flex flex-col">
      <FormContainer
        title={`Allowed Addresses`}
        subtitle={`Manage Address Permissions to Your Vaults - Selected Accounts are Current`}
        mainOverride={"border-violet-500 shadow-violet-500 h-fit rounded-tl-none max-w-2xl"}
        textOverride={"text-violet-500"}>
        {currentAccount === "" ? (
          <div className="text-white">Universal Profile address not detected. Please connect.</div>
        ) : (
          <>
            <div className="mb-4">
              <div className={inputLabel}>Permissioned Account Address (required) - Must Have "Call" Permission Enabled</div>
              <select
                value={formValues.thirdPartyAddress}
                placeholder={"Permissioned Address"}
                onChange={set("thirdPartyAddress")}
                className={inputStyle}>
                <option value="" disabled>
                  Select an Account
                </option>
                {permissionedAddress &&
                  permissionedAddress.map((address, i) => {
                    return (
                      <option key={address + i} value={address}>
                        {address}
                      </option> //TO-DO add vault name to selection for clarity
                    );
                  })}
              </select>
              <div className={inputLabel}>Vaults to Permission (required)</div>
              {loaded ? (
                <div className="text-white">
                  {allVaults.map((vault, index) => {
                    return (
                      <div className="flex flex-row items-center gap-1" key={index}>
                        <input
                          type="checkbox"
                          value={allowedVaults.includes(vault)}
                          checked={allowedVaults.includes(vault)}
                          onChange={() => handleCheck(vault)}
                        />
                        {profileJSONMetadata["MLW_Vault_" + vault]?.vaultName ?? "Unnamed Vault"} - {vault}
                        {allowedVaults.includes(vault) !== originalAllowedVaults.includes(vault) && (
                          <div className="font-semibold text-red-500"> MODIFIED</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <Loading />
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setFormValues(initialFormState)}>
                Reset
              </button>
              <button
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}>
                Submit Changes
              </button>
            </div>
          </>
        )}
      </FormContainer>
    </div>
  );
};

export default VaultPermissionsForm;
