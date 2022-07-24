import React from 'react'
import tokenExample from '../../assets/token_example.png'
import {Link} from 'react-router-dom'

const LSPInfo= {
     LSP7: {
        p1: "LSP7 - Digital Asset (Token)", 
        p2: "Based on ERC20",
        p3: "Functionality: Mint, Transfer, Add/Revoke Operators (**TO-DO** - force EOA, total balance, mint for LYXe)",
        image: tokenExample,
        p4: "LSP7 contracts describe fungible assets, when one token can be exchanged for another identical token.",
        p5: "Fungible assets (LSP7, ERC20) are visually represented by cards in MyLuksoWallet."
    },
    LSP8: {
        p1: "LSP8 - Identifiable Digital Asset (NFT)", 
        p2: "Based on ERC721",
        p3: "Functionality: (**TO-DO**)",
        image: tokenExample,
        p4: "LSP8 contracts describe non-fungible assets, when one asset's metadata differs from another's.",
        p5: "Non-fungible assets (LSP8, ERC721) are visually represented by fiat (e.g. bills, coins) in MyLuksoWallet."
    },
    LSP9: {
        p1: "LSP9 - Vault", 
        p2: "New Lukso Standard",
        p3: "Functionality: (**TO-DO**)",
        image: tokenExample,
        p4: "LSP9 contracts describe vaults, which allows the user to categorize assets and manage permissions around those categorizations.",
        p5: "Vaults are visually represented by wallet flaps in MyLuksoWallet."
    }
}


const AssetCard = ({LSP}) => {
    
    return (
        <div className='flex flex-col w-1/3 h-full'>
            <div className="flex flex-col  border-2 rounded-2xl">
                <div className="p-4 bg-gray-900 rounded-t-2xl">
                    <p className="text-xl">{LSP.p1}</p>
                    <p className="text-lg text-gray-500">{LSP.p2}</p>
                </div>
                <div className='flex flex-col justify-evenly bg-gradient-to-br from-sky-500 py-4'>
                    <img className="rounded-lg mx-8 my-16" src={LSP.image} />
                    <div className="text-md text-white px-4">{LSP.p3}</div>
                </div>
        
                <div className="p-4 bg-gray-900 rounded-b-2xl">
                    <p className="text-md text-white">{LSP.p4}</p>
                </div>
            </div>
            <div className="my-3 text-xl text-white"> {LSP.p5} </div>
        </div>
    )
}


const AssetCards = () => {
    
  return (
    <div className='flex flex-col justify-center w-full px-32'>   
        <div className="text-5xl text-center text-sky-500">
            Visualize Digital Assets with <Link to="/myluksowallet" className="text-blue-500 font-semibold italic hover:text-white">MyLuksoWallet</Link>
        </div>
        <div className="text-2xl mt-2 mb-6 text-center">
            Tokens, NFT 2.0 and Vaults
        </div>
        <div className="flex flex-row gap-20 justify-center">
            <AssetCard LSP={LSPInfo.LSP7}/>
            <AssetCard LSP={LSPInfo.LSP8}/>
            <AssetCard LSP={LSPInfo.LSP9}/>
        </div>

    </div>
  )
}

export default AssetCards