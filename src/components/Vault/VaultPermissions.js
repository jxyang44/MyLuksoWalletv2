import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { ButtonShadow, DeployVault } from "../../components/";
import { web3Provider, LSP6Contract, UniversalProfileContract, MM_PrivateKey, constants } from "../../utils/ERC725Config";
import swal from "sweetalert";

const VaultPermissions = () => {
  const { web3Window, currentAccount, useRelay } = useProfileContext();

  const handleManageAddresses = () => {
    const manageAddresses = async (myVaultAddress, thirdPartyAddress) => {
      try {
        const myEOA = web3Provider.eth.accounts.wallet.add(MM_PrivateKey);
        const web3 = useRelay ? web3Provider : web3Window; 
        const addressUsed = useRelay ? myEOA.address : currentAccount; //determines account to use to pay for gas

        const myUP = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);
console.log(myUP, thirdPartyAddress)
        const allowedAddressesDataKey = constants.ERC725YKeys.LSP6["AddressPermissions:AllowedAddresses"] + thirdPartyAddress.substring(2); // constructing the data key of allowed addresses // of the 3rd party

        // the data value holding the addresses that the 3rd party is allowed to interact with
        const arrayOfAddresses = web3.eth.abi.encodeParameter("address[]", [myVaultAddress]);
console.log(arrayOfAddresses)
        // encode setData payload on the UP
        const setDataPayload = await myUP.methods["setData(bytes32,bytes)"](allowedAddressesDataKey, arrayOfAddresses).encodeABI();

        // getting the Key Manager address from UP
        const myKeyManagerAddress = await myUP.methods.owner().call();

        // create an instance of the KeyManager
        let myKM = new web3.eth.Contract(LSP6Contract.abi, myKeyManagerAddress);

        // execute the setDataPayload on the KM
        return await myKM.methods.execute(setDataPayload).send({
          from: myEOA.address,
          gasLimit: 600_000,
        });
      } catch (err) {
        console.log(err);
      }
    };
    manageAddresses("0x59c441345d47dd1592dd486bABBF335136341f3E", "0x1c76B6AF7a1E0068e0dFBAeF2b80B95a3b8b60A1").then(res => console.log(res));
   
    // swal("Enter vault address:", { content: "input" }).then(myVaultAddress => {
    //   //check valid
    //   if (myVaultAddress)
    //     swal("Enter 3rd party address:", { content: "input" }).then(thirdPartyAddress => {
    //       manageAddresses(myVaultAddress, thirdPartyAddress).then(res => console.log(res));
    //     });
    // });
  };

  return (
    <ButtonShadow
      buttonText={"Manage Vault Addresses"}
      buttonFunc={handleManageAddresses}
      buttonColor={"bg-green-500"}
      buttonTextColor={"text-sky-800"}
    />
  );
};

export default VaultPermissions;
