//button component to disconnect profile and show modals

import React from "react";
import swal from "sweetalert";
import { ButtonShadow } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";

const DisconnectProfile = () => {
  const { setActiveProfile } = useStateContext();
  const { disconnectUPExtension, profileJSONMetadata, pendingProfileJSONMetadata } = useProfileContext();
  const handleDisconnect = () => {
    if (JSON.stringify(pendingProfileJSONMetadata) !== JSON.stringify(profileJSONMetadata)) { //check that user doesn't have pending changes before disconnecting
      swal({
        title: "You have unsaved edits to your Universal Profile. Are you sure you want to disconnect?",
        buttons: [true, "Yes"],
        dangerMode: true,
      }).then(value => {
        if (value) {
          disconnectUPExtension();
          setActiveProfile(false);
          swal({ title: "Goodbye👋", text: "You have disconnected from MyLuksoWallet.", timer: 500 });
        }
      });
    } else {
      disconnectUPExtension();
      setActiveProfile(false);
      swal({
        title: "Goodbye👋",
        text: "You have disconnected from MyLuksoWallet.",
        buttons: false,
        timer: 500,
      });
    }
  };
  return (
    <ButtonShadow buttonText={"Disconnect Profile"} buttonFunc={handleDisconnect} buttonColor={"bg-slate-500"} buttonTextColor={"text-red-500"} />
  );
};

export default DisconnectProfile;
