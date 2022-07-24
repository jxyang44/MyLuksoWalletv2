import React from 'react'
import keyhole from '../../assets/keyhole.png'
const WhatisMyLuksoWallet = () => {
  return (
    <div className = "flex flex-row justify-between h-[calc(100vmin-100px)] w-full gap-10 relative px-32 metal-bg">
        <div className="absolute inset-0 bg-gradient-to-bl from-black via-sky-500 to-black rounded-lg blur-xl opacity-25 -z-10"></div>
        <div className='flex justify-center items-center w-1/2'>
            <img src = {keyhole} alt="Keyhole" />
        </div>
        <div className='flex flex-col justify-center gap-2 w-1/2 ml-24 '>
            <div className="text-sky-200 text-5xl font-semibold">
            What is MyLuksoWallet
            </div>
            
            <div className="text-xl mt-8 text-left tracking-wide">
                <p>
                    <span className='italic text-blue-400 font-semibold'>MyLuksoWallet</span> utilizes LSPs to create a user-friendly experience for <b><em>YOU.</em></b> We abstract away the hassle of needing to
                    purchase cryptocurrency on an exchange, funding your account with gas fees, or managing your private keys, so that your transition into Web3 is smooth and seamless.
                </p><br></br>
                <p>What is MyLuksoWallet? MyLuksoWallet provides a visual representation of Lukso digital assets, focused around tokens, NFT 2.0, and vaults.
                    Our services include the ability to view, transfer, and mint tokens and NFTs, to create collection your own collections, and more!
                </p>
                
                <p>
                   Etc. 
                </p>
            </div>
        </div>
        
       
    </div>
  )
}

export default WhatisMyLuksoWallet