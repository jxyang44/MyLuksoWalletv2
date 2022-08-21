import React from "react";

import { FaUserLock } from "react-icons/fa";
import { LSP6Schema, createErc725Instance } from "../../utils/ERC725Config";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const GetPermissions = ({ address, addressOf, children }) => {
  const { currentAccount } = useProfileContext();
  
  const checkPermissions = () => {
    if (!addressOf) addressOf = currentAccount;
    swal("Please wait. Checking permissions...");
    async function getPermissionedAddresses() {
      const erc725 = createErc725Instance(LSP6Schema, addressOf);
      const addressPermission = await erc725.getData({
        keyName: "AddressPermissions:Permissions:<address>",
        dynamicKeyParts: address,
      });
      const decodedPermission = erc725.decodePermissions(addressPermission.value);
      swal(
        `Permissions for ${address} on ${addressOf}: `,
        JSON.stringify(decodedPermission, null, 1).replaceAll("true", "✅").replaceAll("false", "❌")
      );
    }
    getPermissionedAddresses();
  };

  return (
    <button className="text-blue-400 flex flex-row items-center gap-1 hover:text-blue-50" onClick={() => checkPermissions()}>
      {children}
      <FaUserLock />
      <div class="opacity-0 hover:opacity-100 transition duration-300 w-fit absolute hover:translate-x-3 hover:translate-y-5 text-white z-10 text-xs">
        Permissions
      </div>
    </button>
  );
};

export default GetPermissions;
