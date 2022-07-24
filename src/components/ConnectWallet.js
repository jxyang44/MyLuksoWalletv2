import React, {useContext, useState, useEffect} from 'react';
import {Button, Banner} from '.';
import {shortenAddress} from '../utils/shortenAddress';
import {useTransactionContext} from '../contexts/TransactionContext';



const ConnectWallet = () => {
    const {currentAccount, connectWallet, getProfile, getProfileData} = useTransactionContext();
 
//  useEffect(() => {
    
//     isWalletConnected();
//  }, []);


    const handleConnect = () => {
        connectWallet();
        // getProfile();
        // getProfileData();
    }
  

    return(
        <>
            {currentAccount ?
             <Banner 
             colorFrom = {"blue-500"} 
             title = {`You are now connected to ${shortenAddress(currentAccount)}.`} 
             subtitle = {"Welcome to Web3!"}
             buttonText = {""}
            />
            :
            <Banner 
                colorFrom = {"indigo-500"} 
                title = {"Connect Wallet to Get Started"} 
                subtitle = {"Safely view your assets with MyLuksoVault."}
                buttonText = {"Connect Wallet"}
                buttonFunc = {handleConnect}
            />
            }
        </>
    )
};

export default ConnectWallet;