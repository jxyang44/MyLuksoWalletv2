import { LSP6Schema, LSP6Contract, UniversalProfileContract, MM_PublicKey, createErc725Instance, web3Provider } from "../../utils/ERC725Config";

import React from "react";
import { ButtonShadow } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const GrantPermissions = () => {
  const { web3Window, currentAccount } = useProfileContext();

  //https://docs.lukso.tech/guides/key-manager/give-permissions
  const handleGrantPermissions = () => {
    if (!currentAccount) return swal("You are not connected to an account.");
    async function grant(privateKey) {
      //must update 3 keys when granting permissions
      try {
        swal("Granting Permissions...", { button: false, closeOnClickOutside: true });
        const myEOA = web3Provider.eth.accounts.wallet.add(privateKey);
        const erc725 = createErc725Instance(LSP6Schema, currentAccount);

        // key1: length of AddressPermissions[]
        const permissionsArray = await erc725.getData("AddressPermissions[]");
        const addressLengthKey = permissionsArray.key; //0xdf30dba06db6a30e65354d9a64c609861f089545ca58c6b4dbe31a5f338cb0e3
        const currentPermissionsCount = permissionsArray?.value.length ?? 0;
        const newPermissionsCount = "0x" + ("0".repeat(64 - (currentPermissionsCount + 1).toString().length) + (currentPermissionsCount + 1));

        // key2: index of beneficiary in AddressPermissions[]
        const beneficiaryIndexKey = addressLengthKey.slice(0, 34) + "0000000000000000000000000000000" + currentPermissionsCount;
        const beneficiaryAddress = MM_PublicKey; // jxyang metamask dev account

        //console.log(permissionsArray, currentPermissionsCount, newPermissionsCount, addressLengthKey);

        // key3: permissions of the beneficiary
        swal("Encoding permissions...", { button: false, closeOnClickOutside: false });
        const beneficiaryPermissions = erc725.encodePermissions({ SETDATA: true, TRANSFERVALUE: true, DEPLOY: true, CALL: true, SIGN: true });
        const data = erc725.encodeData({
          keyName: "AddressPermissions:Permissions:<address>",
          dynamicKeyParts: beneficiaryAddress,
          value: beneficiaryPermissions,
        });

        //encode payload
        const myUniversalProfile = new web3Provider.eth.Contract(UniversalProfileContract.abi, currentAccount);
        const payload = myUniversalProfile.methods["setData(bytes32[],bytes[])"](
          [
            addressLengthKey, // length of AddressPermissions[]
            beneficiaryIndexKey, // index of beneficiary in AddressPermissions[]
            data.keys[0], // permissions of the beneficiary
          ],
          [newPermissionsCount, beneficiaryAddress, data.values[0]]
        ).encodeABI();
        console.log(payload);

        swal("Fetching key manager address...", { button: false, closeOnClickOutside: false });
        const keyManagerAddress = await myUniversalProfile.methods.owner().call();
        const myKeyManager = new web3Provider.eth.Contract(LSP6Contract.abi, keyManagerAddress);

        swal("Setting permissions...", { button: false, closeOnClickOutside: false });
        await myKeyManager.methods.execute(payload).send({ from: myEOA.address, gasLimit: 300_000 }); //how to do this without prompting for private key?
        const result = await myUniversalProfile.methods["getData(bytes32)"](data.keys[0]).call();

        swal(
          `The beneficiary address ${beneficiaryAddress} now has the following permissions:`,
          JSON.stringify(erc725.decodePermissions(result)).replaceAll(",", "\n")
        );
        console.log(`The beneficiary address ${beneficiaryAddress} now has the following permissions:`, erc725.decodePermissions(result));
      } catch (error) {
        console.log(error);
        swal("Something went wrong.", JSON.stringify(error), "warning");
      }
    }
    swal(
      `WARNING! Granting permissions to MLW will allow MLW access to your profile and funds. DO NOT proceed if your account is funded by real money.`,
      `If you would still like to proceed, please enter your private key to grant permissions to MLW:`,
      "warning",
      {
        // is this safe?
        content: "input",
        button: true,
      }
    )
      .then(value => {
        if (value) {
          grant(value);
        } else {
          swal("No input detected.");
        }
      })
      .catch(() => {
        swal("Something went wrong.", "Please try again later.", "warning");
      });
  };

  return (
    <div>
      <ButtonShadow
        buttonText={"Grant Permissions"}
        buttonFunc={handleGrantPermissions}
        buttonColor={"bg-green-500"}
        buttonTextColor={"text-green-800"}
      />
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
