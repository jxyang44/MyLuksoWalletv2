//component for list of permissions that appears as a branch of the ManagePermissionsForm.js

import React, { useState, useEffect } from "react";
import { Address, Loading } from "../../components";
import { useProfileContext } from "../../contexts/ProfileContext";

// const permissionsList = {
//   CHANGEOWNER: false,
//   CHANGEPERMISSIONS: false,
//   ADDPERMISSIONS: false,
//   SETDATA: false,
//   CALL: false,
//   STATICCALL: false,
//   DELEGATECALL: false,
//   DEPLOY: false,
//   TRANSFERVALUE: false,
//   SIGN: false,
//   SUPER_SETDATA: false,
//   SUPER_TRANSFERVALUE: false,
//   SUPER_CALL: false,
//   SUPER_STATICCALL: false,
//   SUPER_DELEGATECALL: false,
// };

const PermissionTypesCheckbox = ({
  addressFrom,
  addressTo,
  permissions,
  setPermissions,
}) => {
  const [loaded, setLoaded] = useState(false);
  const { getPermissionsOfAddresses, profileJSONMetadata,currentAccount } =
    useProfileContext();
  const [originalPermissions, setOriginalPermissions] = useState();
  // {originalPermissions[key] === permissions[key] && "DEFAULT"}
  useEffect(() => {
    setLoaded(false);
    getPermissionsOfAddresses(addressTo, addressFrom).then((res) => {
      setOriginalPermissions(res);
      setPermissions(res);
      setLoaded(true);
    });
  }, [addressTo]);

  const handleChange = (key) => {
    setPermissions((curr) => ({ ...curr, [key]: !permissions[key] }));
  };

  return (
    <>
      {loaded ? (
        <div
          className={`mb-4 max-w-2xl sm:w-[90vw] rounded-lg border-2 border-green-500 bg-slate-800 px-8 pt-2 pb-8 text-white shadow-md shadow-green-500`}
        >
          <div className=" mb-5 border-b-4 border-white pb-1">
            <div className={`text-2xl font-semibold text-green-500`}>
              Permissions
            </div>
            <div className="flex flex-wrap gap-1 text-white">
              Permissions for <Address address={addressTo} left={4} right={6} />{" "}
              on{" "}
              {addressFrom === currentAccount ? "Universal Profile": profileJSONMetadata["MLW_Vault_" + addressFrom]?.vaultName ??
                "Unnamed Vault"}{" "}
              - <Address address={addressFrom} left={4} right={6} />.
            </div>
          </div>
          <div className=" grid grid-cols-2 sm:grid-cols-1">
            {Object.keys(permissions).map((key, index) => {
              return (
                <div className="flex flex-row items-center gap-1" key={index}>
                  <input
                    type="checkbox"
                    value={permissions[key]}
                    checked={permissions[key]}
                    onChange={() => handleChange(key)}
                  />
                  {key}{" "}
                  {originalPermissions[key] !== permissions[key] && (
                    <div className="font-semibold text-red-500">
                      {" "}
                      - MODIFIED
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default PermissionTypesCheckbox;
