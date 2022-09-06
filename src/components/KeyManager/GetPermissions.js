//displays a pop-up permissions modal associated with an account

import React from "react";
import { FaUserLock } from "react-icons/fa";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

//@param address target account to get permissions from
//@param addressOf optional parameter if permissioned account is not connected account (e.g. vault) - (defaults to connected account if blank)
const GetPermissions = ({ address, addressOf, children }) => {
  const { getPermissionsOfAddresses } = useProfileContext();

  const checkPermissions = () => {
    getPermissionsOfAddresses(address, addressOf).then((res) =>
      swal(
        `Permissions for ${address} on ${addressOf ?? "Universal Profile"}: `,
        JSON.stringify(res, null, 1)
          .replaceAll("true", "✅")
          .replaceAll("false", "❌")
      )
    );
  };

  return (
    <button
      className="flex flex-row items-center gap-1 text-blue-400 hover:text-blue-50"
      onClick={() => checkPermissions()}
    >
      {children}
      <FaUserLock />
      <div className="absolute z-10 w-fit text-xs text-white opacity-0 transition duration-300 hover:translate-x-3 hover:translate-y-5 hover:opacity-100">
        Permissions
      </div>
    </button>
  );
};

export default GetPermissions;
