import React, {useEffect, useState, createContext, useContext} from "react";
import {ethers} from "ethers";
import {contractABI, contractAddress} from "../utils/contracts"; //make these dynamic
// import { ERC725 } from '@erc725/erc725.js';
// import Web3 from 'web3';
// require('isomorphic-fetch');

// // Our static variables
// const SAMPLE_PROFILE_ADDRESS = '0x0C03fBa782b07bCf810DEb3b7f0595024A444F4e';
// const RPC_ENDPOINT = 'https://rpc.l16.lukso.network';
// const IPFS_GATEWAY = 'https://2eff.lukso.dev/ipfs/';

// // // Parameters for ERC725 Instance
// const erc725schema = require('@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json');
// const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
// const config = { ipfsGateway: IPFS_GATEWAY };



const TransactionContext = createContext();

const {ethereum} = window;

//checked; returns contract
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);
  return transactionsContract;
};



export const TransactionsProvider = ({ children }) => {
  const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions = await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map((transaction) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / (10 ** 18)
        }));

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  //checked
  const isWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Wallet not detected.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        // setCurrentAccount(accounts[0]);
        // getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //checked
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Wallet not detected.");
      const accounts = await ethereum.request({ method:"eth_requestAccounts"});
      const etherProvider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await etherProvider.getSigner();
      await signer.getAddress();
     
      console.log(accounts, signer)
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };


  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount = await transactionsContract.getTransactionCount();
        window.localStorage.setItem("transactionCount", currentTransactionCount);
      }
    } catch (error) {
      console.log(error);
    }
  };



  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [{
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

        const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount = await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  // useEffect(() => {
  //   isWalletConnected();
  //   checkIfTransactionsExists();
  // }, [transactionCount]);

// // LUKSO
//   async function fetchProfile(address) {
//     try {
//       const profile = new ERC725(erc725schema, address, provider, config);
//       return await profile.fetchData();
//     } catch (error) {
//         return console.log('This is not an ERC725 Contract');
//     }
//   }

//   async function fetchProfileData(address) {
//     try {
//       const profile = new ERC725(erc725schema, address, provider, config);
//       return await profile.fetchData('LSP3Profile');
//     } catch (error) {
//         return console.log('This is not an ERC725 Contract');
//     }
//   }
  
//   const getProfile = () =>{
//     console.log("getting profile...")
//     fetchProfile(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
//       console.log(JSON.stringify(profileData, undefined, 2)),
//     );
//   }
  
//   const getProfileData = () =>{
//     console.log("getting profile data...")
//     fetchProfileData(SAMPLE_PROFILE_ADDRESS).then((profileData) =>
//       console.log(JSON.stringify(profileData, undefined, 2)),
//     );
//   }




  return (
    <TransactionContext.Provider
      value={{
        isWalletConnected,
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        // getProfile,
        // getProfileData
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};


export const useTransactionContext = () => useContext(TransactionContext);