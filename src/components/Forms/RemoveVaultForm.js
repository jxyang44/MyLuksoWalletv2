//remove a vault

import React, { useState, useEffect } from "react";
import { FormContainer, PermissionTypesCheckbox, Loading } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4";
const inputLabel = "block text-white text-sm font-bold";

const initialFormState = {
  addressFrom: "", //the address of your vault that will be removed from LSP10
};

const RemoveVaultForm = () => {
  const { currentAccount, accountAddresses, fetchAddresses } = useProfileContext();
  const [formValues, setFormValues] = useState(initialFormState); //stores form input values; see initialFormState for keys
  const [loaded, setLoaded] = useState(false); //true if a valid addressFrom is selected

  const set = name => {
    return ({ target }) => {
      setFormValues(current => ({ ...current, [name]: target.value }));
    };
  };


  useEffect(() => {
    setLoaded(false);
    if (formValues.addressFrom === "") return;
    fetchAddresses(formValues.addressFrom).then(res => {
      if (res) {
        setLoaded(true);
      }
    });
  }, [formValues.addressFrom]);


  const handleRemoveVault = () =>{
    swal("This feature is pending implementation.")
  }


  return (
    <div className="flex flex-col">
      <FormContainer
        title={`Detach a Vault from Your Universal Profile`}
        subtitle={`The vault will still exist on the blockchain, but it will no longer be linked to your UP. You can add it back at any time if you know the address.`}
        mainOverride={"border-orange-500 shadow-orange-500 h-fit rounded-tl-none max-w-2xl"}
        textOverride={"text-orange-500"}>
        {currentAccount === "" ? (
          <div className="text-white">Universal Profile address not detected. Please connect.</div>
        ) : (
          <>
            <div className="mb-4">
              <div className={inputLabel}>Your Vault Address (required)</div>

              <select
                type="text"
                value={formValues.addressFrom}
                placeholder={"Vault Address"}
                onChange={e => setFormValues(current => ({ ...current, addressFrom: e.target.value }))}
                className={inputStyle}>
                <option value="" disabled>
                  Select an Account
                </option>
                {accountAddresses.vaults.map(vault => {
                  return (
                    <option key={vault} value={vault}>
                      Vault - {vault}
                    </option> //TO-DO add vault name to selection for clarity
                  );
                })}
              </select>            
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setFormValues(initialFormState)}>
                Reset
              </button>
              <button disabled={!loaded}
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none disabled:bg-orange-300 disabled:text-slate-300 focus:shadow-outline"
                onClick={handleRemoveVault}>
                Remove Vault
              </button>
            </div>
          </>
        )}
      </FormContainer>

     
    </div>
  );
};

export default RemoveVaultForm;
