//gives MLW permissions to a connected Universal Profile
//requires user to input private key
//TO-DO redo this without manual input from user (isvalidsignature)

import React from "react";
import { LSP6Schema, LSP6Contract, UniversalProfileContract, MM_PublicKey, createErc725Instance, web3Provider } from "../../utils/ERC725Config";
import { ButtonClean } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const GrantPermissions = () => {
  const { currentAccount, addNewPermission } = useProfileContext();

  //https://docs.lukso.tech/guides/key-manager/give-permissions
  //grant permissions to a new account

  const handleGrantPermissions = () => {
    swal(
      `Grant permissions to MLW?`,
      "warning",
      {
       
        button: true,
      }
    )
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
      <ButtonClean buttonText={"Grant Permissions"} buttonFunc={handleGrantPermissions}/>
    </div>
  );
};

export default GrantPermissions;

// const payload = await myUniversalProfile.methods["setData(bytes32[],bytes[])"](
//   [
//     "0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3",
//     "0xdf30dba06db6a30e65354d9a64c6098600000000000000000000000000000000",
//     "0xdf30dba06db6a30e65354d9a64c6098600000000000000000000000000000001",
//     "0xdf30dba06db6a30e65354d9a64c6098600000000000000000000000000000002",
//   ],
//   ["0x0000000000000000000000000000000000000000000000000000000000000003", "0x22716e9FbB0f9ab2DbD440762dAF27f28f7b4c45", "0x2cA6C7E6178C210e9f3705f48b5a7a5Cf6365413", beneficiaryAddress]
// ).encodeABI();

//   const payload = myUniversalProfile.methods["setData(bytes32,bytes)"](
//     "0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3", // length of AddressPermissions[]
// "0x0000000000000000000000000000000000000000000000000000000000000003"

// ).encodeABI();
