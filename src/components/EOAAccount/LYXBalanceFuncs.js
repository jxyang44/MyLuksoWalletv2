//shows account balance of LYX and modal to transfer LYX to another valid account

import React, { useEffect } from "react";
import { web3Provider, LSP6Contract, UniversalProfileContract, MM_PrivateKey } from "../../utils/ERC725Config";
import { BiTransfer } from "react-icons/bi";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import Swal from "sweetalert2";
import swal from "sweetalert";

const LYXBalanceFuncs = () => {
  const { web3Window, currentAccount, isProfileLoaded, useRelay, executeViaKeyManager } = useProfileContext();
  const { accountBalance, setAccountBalance, updateAccountBalance } = useAssetsContext();

  useEffect(() => {
    if (isProfileLoaded || currentAccount) updateAccountBalance(currentAccount);
    else setAccountBalance(0);
  }, [isProfileLoaded, currentAccount]);

  const handleTransfer = () => {
    //fires when transfer icon is pressed
    const transferInputs = async () => {
      //function to guide user through transfer modals
      const getAccountType = async address => {
        //function to check type of account (EOA, UP or Invalid)
        try {
          return await web3Provider.eth.getCode(address).then(res => {
            if (res === "0x") {
              return "EOA";
            } else {
              return "UP";
            }
          });
        } catch {
          return "Invalid";
        }
      };

      const { value: toAddress } = await Swal.fire({
        //modal to get address of recipient
        title: "(FOR TESTNET USE ONLY) Transfer LYX",
        text: " Enter the address to transfer to:",
        input: "text",
        inputPlaceholder: "0x...",
        showCancelButton: true,
        inputValidator: async value => {
          return getAccountType(value).then(res => {
            if (res === "Invalid") return "Invalid address";
          });
        },
      });

      if (toAddress) {
        //if valid address...
        const { value: toAmount } = await Swal.fire({
          //modal to get transfer amount
          title: "Transfer LYX",
          text: " Enter the amount to transfer:",
          input: "number",
          inputPlaceholder: 0,
          showCancelButton: true,
          inputAttributes: {
            min: 0,
            max: accountBalance,
            step: 0.01,
          },
          inputValidator: async value => {
            const valueNum = Number(value);
            console.log("-------- transfer balance -------- (amount to transfer, account balance)", valueNum, Number(accountBalance));
            if (!valueNum) return "No input provided.";
            if (valueNum > Number(accountBalance)) return "Insufficient funds.";
            if (valueNum <= 0) return "You must transfer a positive quantity.";
          },
        });

        if (toAmount && toAddress && Number(toAmount) > 0 && Number(toAmount) <= Number(accountBalance)) {
          //if all inputs are valid, transfer LYX
          transfer(toAddress, toAmount).then(res => {
            if (res) {
              console.log("------------ TRANSFER SUCCESS -------------\n", res);
              updateAccountBalance(currentAccount)
              swal(
                "Congratulations!",
                `${toAmount} LYX was successfully transferred from ${currentAccount} to ${toAddress}. Your remaining balance is ${accountBalance-toAmount} LYX.`,
                "success"
              );
            }
          });
        }
      }
    };
    transferInputs();

    const transfer = async (toAddress, toAmount) => {
      try {
        console.log("------------ transferring LYX------------- (toAddress, toAmount)", toAddress, toAmount);
        swal("Initiating funds transfer...", { button: false, closeOnClickOutside: false });
        
        if (useRelay) {
          const myUP = new web3Provider.eth.Contract(UniversalProfileContract.abi, currentAccount);
          return executeViaKeyManager(myUP.methods.execute(0, toAddress, web3Provider.utils.toWei(toAmount), "0x").encodeABI, "Transferring funds via Key Manager...");
        } else {
          swal("Transferring funds...", { button: false, closeOnClickOutside: false });
          return await web3Window.eth
            .sendTransaction({
              from: currentAccount,
              to: toAddress,
              value:  web3Provider.utils.toWei(toAmount),
              gas: 300_000,
            })
            .on("receipt", receipt => console.log(receipt))
            .once("sending", payload => console.log(JSON.stringify(payload, null, 2)));
        }
      } catch (error) {
        console.log(error)
        swal("Something went wrong", JSON.stringify(error), "warning");
      }
    };
  };

  return (
    <div className="flex flex-row items-center gap-1">
      Account Balance: {accountBalance} LYX
      <button onClick={handleTransfer} className="hover:text-blue-50 text-blue-400 text-sm flex flex-row items-center">
        <BiTransfer /> Transfer
      </button>
    </div>
  );
};

export default LYXBalanceFuncs;
