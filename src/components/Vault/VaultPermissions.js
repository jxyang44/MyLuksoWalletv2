import React from "react";
import { useProfileContext } from "../../contexts/ProfileContext";
import { ButtonShadow,DeployVault } from "../../components/";
import {
  web3Provider,
  LSP6Contract,
 
  UniversalProfileContract,
  MM_PrivateKey,
  constants,
} from "../../utils/ERC725Config";


const VaultPermissions = () => {
  const { web3Window, currentAccount, useRelay } = useProfileContext();


  const myEOA = web3Provider.eth.accounts.wallet.add(MM_PrivateKey);
  const web3 = useRelay ? web3Provider : web3Window; //determines web3 provider based on relay status (web3Provider is RPC; web3 is window.ethereum)
  const addressUsed = useRelay ? myEOA.address : currentAccount; //determines account to use to pay for gas
  

  const handleManageAddresses = () => {
    const manageAddresses = async (myVaultAddress, thirdPartyAddress) => {
      try {
      
        const myUP = new web3.eth.Contract(UniversalProfileContract.abi, currentAccount);

        const allowedAddressesDataKey = constants.ERC725YKeys.LSP6["AddressPermissions:AllowedAddresses"] + thirdPartyAddress.substring(2); // constructing the data key of allowed addresses // of the 3rd party

        // the data value holding the addresses that the 3rd party is allowed to interact with
        const arrayOfAddresses = web3.eth.abi.encodeParameter("address[]", [myVaultAddress]);

        // encode setData payload on the UP
        const setDataPayload = await myUP.methods["setData(bytes32,bytes)"](allowedAddressesDataKey, arrayOfAddresses).encodeABI();

        // getting the Key Manager address from UP
        const myKeyManagerAddress = await myUP.methods.owner().call();

        // create an instance of the KeyManager
        let myKM = new web3.eth.Contract(LSP6Contract.abi, myKeyManagerAddress);

        // execute the setDataPayload on the KM
        await myKM.methods.execute(setDataPayload).send({
          from: myEOA.address,
          gasLimit: 600_000,
        });
      } catch (err) {
        console.log(err);
      }
    };
  };

  return (
    <ButtonShadow
    buttonText={"Manage Vault Addresses"}
    buttonFunc={handleManageAddresses}
    buttonColor={"bg-green-500"}
    buttonTextColor={"text-sky-800"}
  />
  )
}

export default VaultPermissions