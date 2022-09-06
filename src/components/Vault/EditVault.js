//redirects user to vault settings page, since vault is now part of profile

import React from "react";
import { VaultStep } from ".";
import { useNavigate } from "react-router-dom";
const EditVault = () => {
  const navigate = useNavigate();
  return (
    <VaultStep
      buttonText="5. Modify your Vault Settings"
      buttonFunc={() => navigate("../myvaults")}
    />
  );
};

export default EditVault;
