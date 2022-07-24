import React, {useEffect} from 'react'
import originalwallet from '../assets/wallet/original.png'
import {BsChevronCompactLeft, BsChevronCompactRight} from 'react-icons/bs'
import {WalletTokenCard, WalletProfile} from '../components';
import './MyLuksoWallet.css';
import { useStateContext } from '../contexts/StateContext';
import { useAssetsContext } from '../contexts/AssetsContext';
import { useProfileContext } from '../contexts/ProfileContext';

const MyLuksoWallet = () => {
    const {setActiveMenu} = useStateContext();
    const {isProfileLoaded} = useProfileContext();

    useEffect(() => {
      setActiveMenu(false);
    } ,[]);

    const binderContainer =
    `box-border opacity-100 w-1/2 from-slate-700 to-slate-500
    border-8  border-dashed border-slate-900 
    ring-slate-800 ring-8 ring-offset-slate-700 ring-offset-[2vmin]
    flex flex-col items-center justify-center p-4`
    const leftBinder = `border-r-0 rounded-l-3xl mr-6 rounded-r-sm bg-gradient-to-tr`
    const rightBinder = `border-l-0 rounded-r-3xl ml-6 rounded-l-sm bg-gradient-to-bl`
    const profileContainer = 
        "mt-6 w-5/6 h-1/2 rounded-xl border-slate-800 border-4 bg-gray-500 flex"
    const tokenPurse = `m-[5%] w-[90%] h-[90%] bg-slate-600 border-4 border-slate-500 rounded-b-3xl shadow-lg envelope`

    return (
    <>
        {/* <img src={originalwallet} alt="originalwallet" className="absolute w-[1500px] -top-[280px] left-[340px] -z-20"/> */}
        
        <div className = "opacity-100 absolute w-[1410px] h-[600px] left-96 top-[260px] border-8 border-slate-400 flex flex-row">
            <div className={binderContainer+leftBinder}>
                <WalletTokenCard/>
                <WalletTokenCard assetAddress={"0x7cf1e07F395BD61D6e609633D34a2063234a6aAD"}/>
                <div className={profileContainer}>
                    <div className="w-full m-2 bg-white border-black border-2 flex flex-row justify-center items-center relative">
                        {!isProfileLoaded && <div class="absolute inset-0 glassmorphism blur-lg bg-white grayscale opacity-100"></div>}
                        <BsChevronCompactLeft/>
                        <WalletProfile/>
                        <BsChevronCompactRight/>
                    </div>
                </div>
            </div>
            <div className="h-[106%] -translate-y-4 w-8 bg-slate-600 contrast-75 border-slate-800 border-4 rounded-sm flex justify-center -z-10">
               <div className= "h-full w-3 bg-slate-700"></div> 
            </div>
            
            <div className={binderContainer+rightBinder}>
                <WalletTokenCard/>
                <WalletTokenCard/>
                <div className={tokenPurse}>

                </div>

            </div>
            
            
        </div>
        
    </>
  )
}

export default MyLuksoWallet