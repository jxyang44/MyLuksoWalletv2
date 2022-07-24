import React from 'react'
import fingerprint from '../../assets/fingerprint.png'

const DigitalIdentity = () => {
  return (
    <div className = "flex flex-row justify-between h-[calc(100vmin-100px)] w-full gap-10 relative px-32">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-600 to-black rounded-lg blur-xl opacity-25 -z-10"></div>
        <div className='flex flex-col justify-center gap-2 w-1/2'>
            <div className="text-sky-500 text-5xl font-semibold">
            Digital Identity
            </div>
            
            <div className="text-xl mr-24 mt-8 tracking-wide">
            <p>As we progress away from a world of plastic IDs, leather wallets, and paper receipts,
                we ought to consider the protocols that best represent our digital identity in a trusted, decentralized, interoperable, secure, accessible, and easy-to-use manner.
                This is where <a className="font-semibold italic text-blue-500 hover:text-blue-300" href='https://lukso.network/faq' rel="noreferrer" target="_blank"> Lukso </a> comes in.
            </p><br></br>
            <p>Using next generation EVM blockchain technology, Lukso provides developers, and downstream creatives and consumers, with the building blocks necessary to standardize digital identity and asset representation.
                These building blocks are known as Lukso Standard Proposals (LSPs).
            </p>
            </div>
        </div>
        
        <div className='flex justify-center items-center w-1/2'>
            <img className = "py-10 px-2 " src = {fingerprint} alt="Digital Fingerprint"/>
        </div>
    </div>
  )
}

export default DigitalIdentity