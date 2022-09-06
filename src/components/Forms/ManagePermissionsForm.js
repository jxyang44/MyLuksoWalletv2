//manage permissions to a connected Universal Profile or vault

import React, { useState, useEffect } from "react";
import { FormContainer, PermissionTypesCheckbox, Loading } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const inputStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4";
const inputLabel = "block text-white text-sm font-bold";

const initialFormState = {
  addressFrom: "", //the address of your account (UP or vault) that needs permissions managed
  addressTo: "", //the address of the beneficiary account that permissions should be granted/modified/removed from
  newAddressValid: false, //true if new address user inputs is valid (must not be in existing addresses and must be a valid EOA or ERC725 address)
};

const ManagePermissionsForm = () => {
  const {
    currentAccount,
    accountAddresses,
    fetchAddresses,
    getAccountType,
    addNewPermission,
    updateExistingPermission,
    profileJSONMetadata,
  } = useProfileContext();
  const [formValues, setFormValues] = useState(initialFormState); //stores form input values; see initialFormState for keys
  const [newAddressSelection, setNewAddressSelection] = useState(false); //true if "New Address" is selected; false if "Existing Address" is selected
  const [newAddressMessage, setNewAddressMessage] = useState(""); //message to display
  const [owner, setOwner] = useState(); //owner of contract
  const [permissionedAddress, setPermissionedAddress] = useState(); //AddressPermissions[] associated with formValues.addressFrom
  const [permissions, setPermissions] = useState(); //JSON of allowed permissions
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
        setOwner(res[3]); // owner of vault/UP
        setPermissionedAddress(res[0][0].value); /// AddressPermissions[]
        setLoaded(true); //boolean to load form after addresses are successfully fetched
      }
    });
  }, [formValues.addressFrom]);

  useEffect(() => {
    setFormValues((current) => ({ ...current, addressTo: "" }));
  }, [newAddressSelection]);

  //updates error messages and form values when new address input is changed
  const handleNewAddress = (e) => {
    setNewAddressMessage("");
    setFormValues((current) => ({
      ...current,
      addressTo: e.target.value,
      newAddressValid: false,
    }));
    if (permissionedAddress?.includes(e.target.value))
      setNewAddressMessage("This Address Already has Permissions");
    else {
      getAccountType(e.target.value).then((res) => {
        if (res === "Invalid")
          setNewAddressMessage("This Address is Not Valid");
        else {
          setNewAddressMessage(`This Address is a Valid ${res} Account`);
          setFormValues((current) => ({ ...current, newAddressValid: true }));
        }
      });
    }
  };

  //called on "Submit Changes"
  const handleGrantPermissions = (e) => {
    e.preventDefault();
    if (!currentAccount) return swal("You are not connected to an account.");
    if (newAddressSelection && !formValues.newAddressValid)
      return swal("Address of new permissioned account is not valid.");
    if (formValues.addressFrom === "" || formValues.addressTo === "")
      return swal("Required fields must be completed.");

    swal(
      "Are you sure you would like to submit these changes to the blockchain?",
      `${JSON.stringify(permissions, null, 1)
        .replaceAll("true", "✅")
        .replaceAll("false", "❌")}`,
      { buttons: true }
    ).then((value) => {
      if (value) {
        newAddressSelection
          ? addNewPermission(
              formValues.addressFrom,
              formValues.addressTo,
              permissions
            ).then((res) => {
              console.log(res);
              if (res)
                swal(
                  `Congratulations! Permissions have been added for ${formValues.addressTo}.`,
                  `${JSON.stringify(permissions, null, 1)
                    .replaceAll("true", "✅")
                    .replaceAll("false", "❌")}`,
                  "success"
                );
            })
          : updateExistingPermission(
              formValues.addressFrom,
              formValues.addressTo,
              permissions
            ).then((res) => {
              if (res)
                swal(
                  `Congratulations! Permissions have been modified for ${formValues.addressTo}.`,
                  `${JSON.stringify(permissions, null, 1)
                    .replaceAll("true", "✅")
                    .replaceAll("false", "❌")}`,
                  "success"
                );
            });
      }
    });
  };

  return (
    <div className="flex flex-col">
      <FormContainer
        title={`Manage Permissions`}
        subtitle={`Manage Address Permissions to Your Universal Profile & Vaults`}
        mainOverride={
          "border-green-500 shadow-green-500 h-fit rounded-tl-none max-w-2xl"
        }
        textOverride={"text-green-500"}
      >
        {currentAccount === "" ? (
          <div className="text-white">
            Universal Profile address not detected. Please connect.
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className={inputLabel}>
                Your Profile or Vault Address (required)
              </div>

              <select
                type="text"
                value={formValues.addressFrom}
                placeholder={"Profile or Vault Address"}
                onChange={(e) =>
                  setFormValues((current) => ({
                    ...current,
                    addressFrom: e.target.value,
                    addressTo: "",
                  }))
                }
                className={inputStyle}
              >
                <option value="" disabled>
                  Select an Account
                </option>
                <option value={currentAccount}>
                  Universal Profile - {currentAccount}
                </option>
                {accountAddresses.vaults.map((vault, i) => {
                  return (
                    <option key={vault + i} value={vault}>
                      {profileJSONMetadata["MLW_Vault_" + vault]?.vaultName ??
                        "Unnamed Vault"}{" "}
                      - {vault}
                    </option>
                  );
                })}
              </select>

              <div className="mb-4 flex flex-row gap-4">
                <button
                  className={`focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none ${
                    !newAddressSelection
                      ? "bg-green-500 hover:bg-green-700"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setNewAddressSelection(false)}
                >
                  Existing Address
                </button>
                <button
                  className={`focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none ${
                    newAddressSelection
                      ? "bg-green-500 hover:bg-green-700"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setNewAddressSelection(true)}
                >
                  New Address
                </button>
              </div>

              {newAddressSelection ? (
                <>
                  {/* show new address panel if selected  */}
                  {newAddressMessage !== "" && (
                    <div
                      className={`${inputLabel} ${
                        formValues.newAddressValid
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {newAddressMessage}
                    </div>
                  )}
                  <div className={inputLabel}>
                    New Address for Permissions (required)
                  </div>
                  <input
                    className={inputStyle}
                    type="text"
                    autoComplete="false"
                    value={formValues.addressTo}
                    placeholder={"Address (0x...)"}
                    required
                    onChange={(e) => handleNewAddress(e)}
                  />
                </>
              ) : (
                // fetch existing addresses
                formValues.addressFrom !== "" &&
                (loaded ? (
                  <>
                    <div className={inputLabel}>
                      Permissioned Account Address (required)
                    </div>
                    <select
                      value={formValues.addressTo}
                      placeholder={"Permissioned Address"}
                      onChange={set("addressTo")}
                      className={inputStyle}
                    >
                      <option value="" disabled>
                        Select an Account
                      </option>
                      <option value={owner}>Owner - {owner}</option>
                      {permissionedAddress &&
                        permissionedAddress.map((address, i) => {
                          return (
                            <option key={address + i} value={address}>
                              {address}
                            </option>
                          );
                        })}
                    </select>
                  </>
                ) : (
                  <div className="text-white">
                    <Loading
                      horizontal={true}
                      size={"w-8 h-8"}
                      textOff={true}
                    />
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="focus:shadow-outline rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-700 focus:outline-none"
                onClick={() => setFormValues(initialFormState)}
              >
                Reset
              </button>
              <button
                className="focus:shadow-outline rounded bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700 focus:outline-none"
                onClick={handleGrantPermissions}
              >
                Submit Changes
              </button>
            </div>
          </>
        )}
      </FormContainer>

      {/* show permissions check box */}
      {((!newAddressSelection && formValues.addressTo !== "") ||
        (newAddressSelection && formValues.newAddressValid)) && (
        <div>
          <PermissionTypesCheckbox
            addressFrom={formValues.addressFrom}
            addressTo={formValues.addressTo}
            permissions={permissions}
            setPermissions={setPermissions}
          />
        </div>
      )}
    </div>
  );
};

export default ManagePermissionsForm;
