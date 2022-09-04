import React, {useState, useEffect, useRef} from 'react'
import fingerprint from '../../assets/Home/fingerprint.png'
import { useStateContext } from '../../contexts/StateContext'
import { animateOnEntry } from '../../utils/animations'
const DigitalIdentity = () => {
    const { scrollHeight } = useStateContext()
    const imgRef = useRef(null)
    const [persAnimation, setPersAnimation] = useState(false)

    useEffect(() => {
        animateOnEntry(imgRef, setPersAnimation, 0.5); 
    }, [scrollHeight])
    
    return (
    <div className = "flex flex-row justify-between h-[calc(100vmin-100px)] w-full gap-10 relative px-32" id="digitalidentity">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-sky-500 to-black rounded-lg blur-xl opacity-25 -z-5"></div>
        <div className='flex flex-col justify-center gap-2 w-1/2 z-10'>
            <div className="text-sky-500 xl:text-5xl text-4xl font-semibold">
            Digital Identity
            </div>
            
            <div className="xl:text-xl md:text-base xl:mr-24 md:mr-12 mt-8 tracking-wide">
            <p>As technology advances, the eventual dematerialization of plastic IDs, leather wallets, paper contracts and other physical vessels for digitizable information is inevitable.
                In the coming years, we ought to consider the protocols that can best represent our digital identity in a trusted, decentralized, interoperable, secure, accessible, and easy-to-use manner.
                This is where <a className="font-semibold italic text-blue-500 hover:text-blue-300" href='https://lukso.network/faq' rel="noreferrer" target="_blank"> Lukso </a> comes in.
            </p>
            <br></br>
            <p>Using next generation EVM blockchain technology, Lukso provides developers, downstream creators, and consumers with the building blocks necessary to standardize digital identity and asset representation.
                These building blocks are known as Lukso Standard Proposals (LSPs).
            </p>
            </div>
        </div>
        
        <div ref={imgRef} className={`flex justify-center items-center w-1/2 perspective-l ${persAnimation && "perspective-l-animation"}`}>
            <img className = "py-10 px-2 " src = {fingerprint} alt="Digital Fingerprint"/>
        </div>
    </div>
  )
}

export default DigitalIdentity