//for allowed addresses on a vault
//TO-DO vaults does not work at the moment

import React, { useState, useEffect } from "react";
import { FormContainer, PermissionTypesCheckbox, Loading } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline mb-4";
const inputLabel = "block text-white text-sm font-bold";

const initialFormState = {
  addressFrom: "", //the address of your account (UP or vault) that needs permissions managed
  addressTo: "", //the address of the beneficiary account that permissions should be granted/modified/removed from
  newAddressValid: false, //true if new address user inputs is valid (must not be in existing addresses and must be a valid EOA or ERC725 address)
};

const VaultPermissionsForm = () => {
  const { currentAccount, accountAddresses, fetchAddresses, getAccountType, addNewPermission, updateExistingPermission } = useProfileContext();
  const [formValues, setFormValues] = useState(initialFormState); //stores form input values; see initialFormState for keys
  const [newAddressSelection, setNewAddressSelection] = useState(false); //true if "New Address" is selected; false if "Existing Address" is selected
  const [newAddressMessage, setNewAddressMessage] = useState(""); //message to display
  const [owner, setOwner] = useState(); //owner of contract
  const [permissionedAddress, setPermissionedAddress] = useState(); //AddressPermissions[] associated with formValues.addressFrom
  const [permissions, setPermissions] = useState(); //JSON of allowed permissions
  const [loaded, setLoaded] = useState(false); //true if a valid addressFrom is selected

  const set = name => {
    return ({ target }) => {
      setFormValues(current => ({ ...current, [name]: target.value }));
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleGrantPermissions();
  };

  useEffect(() => {
    setLoaded(false);
    if (formValues.addressFrom === "") return;
    fetchAddresses(formValues.addressFrom).then(res => {
      if (res) {
        setOwner(res[3]); // owner of vault/UP
        setPermissionedAddress(res[0][0].value); /// AddressPermissions[]
        setLoaded(true);
      }
    });
  }, [formValues.addressFrom]);

  useEffect(() => {
    setFormValues(current => ({ ...current, addressTo: "" }));
  }, [newAddressSelection]);

  const handleNewAddress = e => {
    setNewAddressMessage("");
    setFormValues(current => ({ ...current, addressTo: e.target.value, newAddressValid: false }));
    if (permissionedAddress?.includes(e.target.value)) setNewAddressMessage("This Address Already has Permissions");
    else {
      getAccountType(e.target.value).then(res => {
        if (res === "Invalid") setNewAddressMessage("This Address is Not Valid");
        else {
          setNewAddressMessage(`This Address is a Valid ${res} Account`);
          setFormValues(current => ({ ...current, newAddressValid: true }));
        }
      });
    }
  };

  const handleGrantPermissions = () => {
    if (!currentAccount) return swal("You are not connected to an account.");
    if (newAddressSelection && !formValues.newAddressValid) return swal("Address of new permissioned account is not valid.");
    if (formValues.addressFrom === "" || formValues.addressTo === "") return swal("Required fields must be completed.");


    const startPermissions = privateKey => {
      swal(
        "Are you sure you would like to submit these changes to the blockchain?",
        `${JSON.stringify(permissions, null, 1).replaceAll("true", "✅").replaceAll("false", "❌")}`,
        { buttons: true }
      ).then(value => {
        if (value) {
          newAddressSelection
            ? addNewPermission(formValues.addressFrom, formValues.addressTo, permissions, privateKey).then(res => {
                console.log(res);
                if (res)
                  swal(
                    `Congratulations! Permissions have been added for ${formValues.addressTo}.`,
                    `${JSON.stringify(permissions, null, 1).replaceAll("true", "✅").replaceAll("false", "❌")}`,
                    "success"
                  );
              })
            : updateExistingPermission(formValues.addressFrom, formValues.addressTo, permissions, privateKey).then(res => {
                if (res)
                  swal(
                    `Congratulations! Permissions have been modified for ${formValues.addressTo}.`,
                    `${JSON.stringify(permissions, null, 1).replaceAll("true", "✅").replaceAll("false", "❌")}`,
                    "success"
                  );
              });
        }
      });
    };

    if (currentAccount === formValues.addressFrom) startPermissions("");
    else{
      swal("Permission management for vaults has not been implemented yet. 👷");
    }
    // else {
    //   swal(
    //     `Hackathon Note: Manual input of a private key is not safe. \nWe are working to move this feature to the backend. 👷`,
    //     `To update account permissions, you must be the owner of an account that already has permissions to the vault. If you wish to proceed, enter the private key associated with a permissioned account (this is most likely the browser extension private key from the profile that deployed the vault):`,
    //     {
    //       content: "input",
    //       button: true,
    //     }
    //   ).then(value => {
    //     if (value) {
    //       startPermissions(value);
    //     } else {
    //       swal("No input detected.");
    //     }
    //   });
    // }

    
  };


  // const handleManageAddresses = () => {
  //   const manageAddresses = async (myVaultAddress, thirdPartyAddress, privateKey) => {
  //     try {
        
  //       const web3 = web3Window;
  //       const myEOA = web3Window.eth.accounts.wallet.add(privateKey);
        

  //       const myUP = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);
  //       console.log(myUP, thirdPartyAddress);
  //       const allowedAddressesDataKey = constants.ERC725YKeys.LSP6["AddressPermissions:AllowedAddresses"] + thirdPartyAddress.substring(2); // constructing the data key of allowed addresses // of the 3rd party

  //       // the data value holding the addresses that the 3rd party is allowed to interact with
  //       const arrayOfAddresses = web3.eth.abi.encodeParameter("address[]", [myVaultAddress]);
  //       console.log(arrayOfAddresses);
  //       // encode setData payload on the UP
  //       const setDataPayload = await myUP.methods["setData(bytes32,bytes)"](allowedAddressesDataKey, arrayOfAddresses).encodeABI();

  //       // getting the Key Manager address from UP
  //       const myKeyManagerAddress = await myUP.methods.owner().call();

  //       // create an instance of the KeyManager
  //       let myKM = new web3.eth.Contract(LSP6Contract.abi, myKeyManagerAddress);

  //       // execute the setDataPayload on the KM
  //       return await myKM.methods.execute(setDataPayload).send({
  //         from: myEOA.address,
  //         gasLimit: 600_000,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   manageAddresses(myVaultAddress, thirdPartyAddress, privateKey).then(res => console.log(res));
  // }

  return (
    <div className="flex flex-col">
      <FormContainer
        title={`Allowed Addresses`}
        subtitle={`Manage Address Permissions to Your Vaults`}
        mainOverride={"border-green-500 shadow-green-500 h-fit rounded-tl-none max-w-2xl"}
        textOverride={"text-green-500"}>
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
                onChange={e => setFormValues(current => ({ ...current, addressFrom: e.target.value, addressTo: "" }))}
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

              <div className="flex flex-row gap-4 mb-4">
                <button
                  className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    !newAddressSelection ? "bg-green-500 hover:bg-green-700" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setNewAddressSelection(false)}>
                  Existing Address
                </button>
                <button
                  className={`text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    newAddressSelection ? "bg-green-500 hover:bg-green-700" : "hover:bg-gray-700"
                  }`}
                  onClick={() => setNewAddressSelection(true)}>
                  New Address
                </button>
              </div>

              {newAddressSelection ? (
                <>
                  {/* show new address panel if selected  */}
                  {newAddressMessage !== "" && (
                    <div className={`${inputLabel} ${formValues.newAddressValid ? "text-green-500" : "text-red-500"}`}>{newAddressMessage}</div>
                  )}
                  <div className={inputLabel}>New Address for Permissions (required)</div>
                  <input
                    className={inputStyle}
                    type="text"
                    autoComplete="false"
                    value={formValues.addressTo}
                    placeholder={"Address (0x...)"}
                    required
                    onChange={e => handleNewAddress(e)}
                  />
                </>
              ) : (
                // fetch existing addresses
                formValues.addressFrom !== "" &&
                (loaded ? (
                  <>
                    <div className={inputLabel}>Permissioned Account Address (required)</div>
                    <select value={formValues.addressTo} placeholder={"Permissioned Address"} onChange={set("addressTo")} className={inputStyle}>
                      <option value="" disabled>
                        Select an Account
                      </option>
                      <option value={owner}>Owner - {owner}</option>
                      {permissionedAddress &&
                        permissionedAddress.map((address, i) => {
                          return (
                            <option key={address + i} value={address}>
                              {address}
                            </option> //TO-DO add vault name to selection for clarity
                          );
                        })}
                    </select>
                  </>
                ) : (
                  <div className="text-white">
                    <Loading horizontal={true} size={"w-8 h-8"} textOff={true} />
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setFormValues(initialFormState)}>
                Reset
              </button>
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleSubmit}>
                Submit Changes
              </button>
            </div>
          </>
        )}
      </FormContainer>

      {/* show permissions check box */}
      {((!newAddressSelection && formValues.addressTo !== "") || (newAddressSelection && formValues.newAddressValid)) && (
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

export default VaultPermissionsForm;
