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

const PermissionTypesCheckbox = ({ addressFrom, addressTo, permissions, setPermissions }) => {
  const [loaded, setLoaded] = useState(false);
  const { getPermissionsOfAddresses } = useProfileContext();
  const [originalPermissions, setOriginalPermissions] = useState();
  // {originalPermissions[key] === permissions[key] && "DEFAULT"}
  useEffect(() => {
    setLoaded(false);
    getPermissionsOfAddresses(addressTo, addressFrom).then(res => {
      setOriginalPermissions(res);
      setPermissions(res);
      setLoaded(true);
    });
  }, [addressTo]);

  const handleChange = key => {
    setPermissions(curr => ({ ...curr, [key]: !permissions[key] }));
  };

  return (
    <>
      {loaded ? (
        <div className={`max-w-2xl text-white border-2 shadow-md rounded-lg px-8 pt-2 pb-8 mb-4 bg-slate-800 border-green-500 shadow-green-500`}>
          <div className=" pb-1 mb-5 border-b-4 border-white">
            <div className={`font-semibold text-2xl text-green-500`}>Permissions</div>
            <div className="text-white flex flex-row gap-1">
              Permissions for <Address address={addressTo} left={10} right={6} /> on <Address address={addressFrom} left={10} right={6} />.
            </div>
          </div>
          <div className=" grid grid-cols-2">
            {Object.keys(permissions).map((key, index) => {
              return (
                <div className="flex flex-row items-center gap-1" key={index}>
                  <input type="checkbox" value={permissions[key]} checked={permissions[key]} onChange={() => handleChange(key)} />
                  {key} {originalPermissions[key] !== permissions[key] && <div className="font-semibold text-red-500"> - MODIFIED</div>}
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
