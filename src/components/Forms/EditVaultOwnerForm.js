//remove a vault

import React, { useState, useEffect } from "react";
import { FormContainer } from "..";
import {
  createErc725Instance,
  LSP10Schema,
  UniversalProfileContract,
} from "../../utils/luksoConfigs";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4";
const inputLabel = "block text-white text-sm font-bold";

const initialFormState = {
  addressFrom: "", //the address of your vault that will be removed from LSP10
};

const EditVaultOwnerForm = () => {
  const {
    web3Window,
    currentAccount,
    accountAddresses,
    fetchAddresses,
    profileJSONMetadata,
    useRelay,
    executeViaKeyManager,
  } = useProfileContext();
  const [formValues, setFormValues] = useState(initialFormState); //stores form input values; see initialFormState for keys
  const [loaded, setLoaded] = useState(false); //true if a valid addressFrom is selected

  const set = (name) => {
    return ({ target }) => {
      setFormValues((current) => ({ ...current, [name]: target.value }));
    };
  };

  useEffect(() => {
    setLoaded(false);
    if (formValues.addressFrom === "") return;
    fetchAddresses(formValues.addressFrom).then((res) => {
      if (res) {
        setLoaded(true);
      }
    });
  }, [formValues.addressFrom]);

  const handleRemoveVault = () => {
    if (!currentAccount) return swal("You are not connected to an account.");

    swal(
      `Please confirm that you want to remove ${
        profileJSONMetadata["MLW_Vault_" + formValues.addressFrom]?.vaultName ??
        "Unnamed Vault"
      } - ${formValues.addressFrom} from your Universal Profile.`,
      {
        buttons: true,
      }
    ).then((value) => {
      if (value) {
        removeVault(value).then((res) => {
          if (res) {
            swal(
              `Congratulations!,
                ${
                  profileJSONMetadata["MLW_Vault_" + formValues.addressFrom]
                    ?.vaultName ?? "Unnamed Vault"
                } - ${
                formValues.addressFrom
              } has been remove from your profile!`,
              "success"
            );
            fetchAddresses(currentAccount); //adds vault to state
          }
        });
      } else {
        swal("No input detected.");
      }
    });
  };

  async function removeVault(vaultAddress) {
    try {
      swal(
        "Removing vault from Universal Profile...",
        `Vault address: ${vaultAddress}`,
        { button: false, closeOnClickOutside: true }
      );

      const web3 = web3Window;

      const erc725 = createErc725Instance(LSP10Schema, currentAccount); //LSP10Vaults[],LSP10VaultsMap:<address>

      // key1: length of LSP10Vaults[]
      const permissionsArray = await erc725.getData("LSP10Vaults[]");
      const addressLengthKey = permissionsArray.key; //0x55482936e01da86729a45d2b87a6b1d3bc582bea0ec00e38bdb340e3af6f9f06
      const currentPermissionsCount = permissionsArray?.value.length ?? 0;
      const newPermissionsCount =
        "0x" +
        ("0".repeat(64 - (currentPermissionsCount + 1).toString().length) +
          (currentPermissionsCount - 1));
      console.log(
        permissionsArray,
        currentPermissionsCount,
        newPermissionsCount,
        addressLengthKey
      );

      // key2: index of vault in LSP10Vaults[]
      const beneficiaryIndexKey =
        addressLengthKey.slice(0, 34) +
        "0000000000000000000000000000000" +
        currentPermissionsCount;
      const beneficiaryAddress = vaultAddress;

      const myUniversalProfile = new web3.eth.Contract(
        UniversalProfileContract.abi,
        currentAccount
      );
      const payloadFunction = await myUniversalProfile.methods[
        "setData(bytes32[],bytes[])"
      ](
        [
          addressLengthKey, // length of LSP10Vaults[]
          beneficiaryIndexKey, // index of vault in LSP10Vaults[]
        ],
        [newPermissionsCount, beneficiaryAddress]
      );

      console.log(payloadFunction);

      if (useRelay) {
        //use key manager
        return executeViaKeyManager(
          payloadFunction.encodeABI,
          "Adding vault to Universal Profile via key manager..."
        );
      } else {
        //pay from account balance
        swal("Preparing transaction. Please confirm...", { button: false });
        return await payloadFunction.send({
          from: currentAccount,
          gasLimit: 300_000,
        });
      }
    } catch (error) {
      console.log(error);
      swal("Something went wrong.", JSON.stringify(error), "warning");
    }
  }

  return (
    <div className="flex flex-col">
      <FormContainer
        title={`Edit Vault Ownership`}
        subtitle={`Transfer, claim or renounce ownership of a vault.`}
        mainOverride={
          "border-orange-500 shadow-orange-500 h-fit rounded-tl-none max-w-2xl"
        }
        textOverride={"text-orange-500"}
      >
        {currentAccount === "" ? (
          <div className="text-white">
            Universal Profile address not detected. Please connect.
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className={inputLabel}>Your Vault Address (required)</div>

              <select
                type="text"
                value={formValues.addressFrom}
                placeholder={"Vault Address"}
                onChange={(e) =>
                  setFormValues((current) => ({
                    ...current,
                    addressFrom: e.target.value,
                  }))
                }
                className={inputStyle}
              >
                <option value="" disabled>
                  Select an Account
                </option>
                {accountAddresses.vaults.map((vault) => {
                  return (
                    <option key={vault} value={vault}>
                      {profileJSONMetadata["MLW_Vault_" + vault]?.vaultName ??
                        "Unnamed Vault"}{" "}
                      - {vault}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700 focus:outline-none"
                onClick={() => setFormValues(initialFormState)}
              >
                Reset
              </button>
              <button
                disabled={!loaded}
                className="focus:shadow-outline rounded bg-orange-500 py-2 px-4 font-bold text-white hover:bg-orange-700 focus:outline-none disabled:bg-orange-300 disabled:text-slate-300"
                onClick={handleRemoveVault}
              >
                Remove Vault
              </button>
            </div>
          </>
        )}
      </FormContainer>
    </div>
  );
};

export default EditVaultOwnerForm;
