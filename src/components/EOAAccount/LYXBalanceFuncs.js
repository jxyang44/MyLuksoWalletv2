//shows account balance of LYX and modal to transfer LYX to another valid account

import React, {useEffect} from 'react'
import {web3, LSP6Contract, UniversalProfileContract} from '../../utils/ERC725Config';
import {BiTransfer} from 'react-icons/bi';
import { useProfileContext } from '../../contexts/ProfileContext';
import { useAssetsContext } from '../../contexts/AssetsContext';
import Swal from 'sweetalert2';
import swal from 'sweetalert';
const PRIVATE_KEY = process.env.REACT_APP_METAMASK_MY_DEV_PRIVATE_KEY; //jxyang metamask private key - dev account

const LYXBalanceFuncs = () => {
    const {currentAccount, isProfileLoaded} = useProfileContext();
    const {accountBalance, setAccountBalance, updateAccountBalance} = useAssetsContext();
   
    useEffect(() => {
        if(isProfileLoaded || currentAccount) updateAccountBalance(currentAccount);
        else setAccountBalance(0);
      },[isProfileLoaded, currentAccount])

    
    const handleTransfer = () => { //fires when transfer icon is pressed  
        const transferInputs = async () => { //async function to guide user through transfer modals
            
            const getAccountType = async (address) => { //function to check type of account (EOA, UP or Invalid)
                try{
                    return await web3.eth.getCode(address).then(res => {   
                        if(res === "0x"){
                            return 'EOA';
                        }
                        else{
                            return 'UP';
                        }
                    });
                } catch {
                    return 'Invalid';
                }
            }

            const { value: toAddress } = await Swal.fire({ //modal to get address of recipient
              title: '(FOR TESTNET USE ONLY) Transfer LYX',
              text: ' Enter the address to transfer to:',
              input: 'text',
              inputPlaceholder: "0x...",
              showCancelButton: true,
              inputValidator: async (value) => {
                return getAccountType(value).then(res => {
                    if(res === 'Invalid') return 'Invalid address';
                });
              }
            })
            
            if (toAddress) {
                const { value: toAmount } = await Swal.fire({ //modal to get transfer amount
                    title: '(FOR TESTNET USE ONLY) Transfer LYX',
                    text: ' Enter the amount to transfer:',
                    input: 'number',
                    inputPlaceholder: 0,
                    showCancelButton: true,
                    inputAttributes:{
                        min: 0,
                        max: accountBalance,
                        step: 0.000000000001 //TO-DO set decimals
                    },
                    inputValidator: (value) => {
                        if (!value) return "No input provided."
                        if(value > accountBalance) return "Insufficient funds.";
                        if(value <= 0) return "You must transfer a positive quantity.";
                    }
                })

                if(toAmount && toAddress && toAmount > 0 && toAmount <= accountBalance) { //if all inputs are valid, transfer LYX
                    transfer(toAddress, toAmount).then( (res) => {
                        console.log(res)    
                        if(res===undefined)
                            swal("","Something went wrong.","warning");
                        else
                        {   updateAccountBalance(currentAccount)
                            swal("Congratulations!",`${toAmount} LYX was successfully transferred from ${currentAccount} to ${toAddress}. Your remaining balance is ${accountBalance}.`,"success")
                        }
                        }
                    );
                }
            }          
        }
        transferInputs();
        
        //TO-DO check permissions to transfer LYX
        //TO-DO add option for key manager or direct (EOA) transfer
        const transfer = async (toAddress, toAmount) => {
            try{
                const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);
                const myUP = window.web3.eth.Contract(UniversalProfileContract.abi, currentAccount);
                
                swal("Fetching key manager address...", {button: false, closeOnClickOutside: false});
                const owner = await myUP.methods.owner().call();
                const myKM = new web3.eth.Contract(LSP6Contract.abi, owner);
                const OPERATION_CALL = 0;
                const recipient = toAddress;
                const amount = web3.utils.toWei(toAmount);
                const data = '0x';

                swal("Encoding data...", {button: false, closeOnClickOutside: false});
                const transferLYXPayload = await myUP.methods.execute(OPERATION_CALL, recipient, amount, data).encodeABI();
                await myUP.methods.owner().call();
                console.log(transferLYXPayload)
                swal(`Transferring funds...`, {button: false, closeOnClickOutside: false});
                return await myKM.methods.execute(transferLYXPayload).send({from: myEOA.address, gasLimit: 300_000});
            } catch (error) {
                swal("Something went wrong.",`${error}`,"warning");
            }
       }
    }

    return (
        <div className="flex flex-row items-center gap-1">
            Account Balance: {accountBalance} LYX
            <button onClick={handleTransfer} className= "hover:text-blue-300 text-blue-600 text-lg">
                <BiTransfer/>
            </button>
        </div>
    
    )
}

export default LYXBalanceFuncs