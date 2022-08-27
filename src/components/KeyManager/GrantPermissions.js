//gives MLW permissions to a connected Universal Profile on the "payment Relay Service" page

import React from "react";
import { MM_PublicKey } from "../../utils/luksoConfigs";
import { ButtonClean } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const GrantPermissions = () => {
  const { currentAccount, addNewPermission } = useProfileContext();

  const handleGrantPermissions = () => {
    swal(`Grant permissions to MLW?`, "warning", {
      button: true,
    })
      .then(value => {
        if (value) {
          addNewPermission(currentAccount, MM_PublicKey, { SETDATA: true, TRANSFERVALUE: true, DEPLOY: true, CALL: true, SIGN: true });
        }
      })
      .catch(() => {
        swal("Something went wrong.", "Please try again later.", "warning");
      });
  };

  return (
    <div>
      <ButtonClean buttonText={"Grant Permissions"} buttonFunc={handleGrantPermissions} />
    </div>
  );
};

export default GrantPermissions;
