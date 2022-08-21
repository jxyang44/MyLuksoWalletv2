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


const VaultTransfer = () => {
  const { web3Window, currentAccount, useRelay } = useProfileContext();


  const myEOA = web3Provider.eth.accounts.wallet.add(MM_PrivateKey);
  const web3 = useRelay ? web3Provider : web3Window; //determines web3 provider based on relay status (web3Provider is RPC; web3 is window.ethereum)
  const addressUsed = useRelay ? myEOA.address : currentAccount; //determines account to use to pay for gas
  

 

  const handleContractInteraction = () => {
    // const contractInteraction = async () => {
    //   const myEOA = web3.eth.accounts.wallet.add(MM_PrivateKey);
    //   const myUniversalProfileAddress = "0xC7d7315A1DDBbf92aBD068588bBA1e864F20F0f5";
    //   const myVaultAddress = "0x59c441345d47dd1592dd486bABBF335136341f3E";
    //   const targetPayload = targetContract.methods // update
    //     .myCoolfunction('dummyParameter')
    //     .encodeABI();
    //   const executePayloadVault = await myVault.methods.execute(
    //       0,
    //       targetContract.address,
    //       0,
    //       targetPayload
    //       )
    //       .encodeABI();
    //   const executePayloadUP = await myUP.methods.execute(
    //       0, // OPERATION CALL
    //       myVaultAddress,
    //       0, // value to transfer
    //       executePayloadVault
    //       )
    //       .encodeABI();
    //   // getting the Key Manager address from UP
    //   const myKeyManagerAddress = await myUP.methods.owner().call()
    //   // create an instance of the KeyManager
    //   const myKM = new web3.eth.Contract(LSP6KeyManager.abi, myKeyManagerAddress);
    //   // executing the executePayloadUP on the KM
    //   await myKM.methods.execute(executePayloadUP).send({
    //       from: myEOA.address,
    //       gasLimit: 600_000,
    //       });
    // }
    // contractInteraction();
  };

  return (
    <ButtonShadow
    buttonText={"Handle Interactions"}
    buttonFunc={handleContractInteraction}
    buttonColor={"bg-green-500"}
    buttonTextColor={"text-sky-800"}
  />
  )
}

export default VaultTransfer