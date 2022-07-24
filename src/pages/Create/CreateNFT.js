import React from 'react'
import {Banner, MintForm} from '../../components'
import {web3, chainId} from '../../utils/ERC725Config.js'
const { LSPFactory } = require("@lukso/lsp-factory.js");

const CreateNFT = () => {
  
  
  const handleCreateNFT = () => {


    const myEOA = web3.eth.accounts.create();
    const myAddress = myEOA.address;
    const myPrivateKey = myEOA.privateKey;
    console.log(myAddress, myPrivateKey)
    const lspFactory = new LSPFactory("https://rpc.l16.lukso.network", {
      deployKey: myPrivateKey,
      chainId: chainId,
    });
    console.log(lspFactory)
    const createNFT = async() => {
      return await lspFactory.LSP8IdentifiableDigitalAsset.deploy({
        controllerAddresses:  [myAddress], 
        name: 'MYTOKEN',
        symbol: 'DEMO',
        },
        {
          onDeployEvents: {
            next: (deploymentEvent) => {
              console.log(deploymentEvent);
            },
            error: (error) => {
              console.error(error);
            },
            complete: (contracts) => {
              console.log('Universal Profile deployment completed');
              console.log(contracts);
            },
          }
      });
    }
    createNFT().then(res=>console.log(res));
  }
  return (
    
   

    <div>
        <Banner 
            colorFrom = {"from-green-500"} 
            title = {"LSP8 - Identifiable Digital Asset (Based on ERC721)"} 
            subtitle = {"Use when assets are unique and have their own metadata. \n For example, an avatar collection where all tokens have a different appearance."}
            buttonText = {"Create NFT 2.0"}
            buttonFunc = {handleCreateNFT}
            buttonColor = {"bg-green-500"}
        />
        <div className="text-white">
           
        </div>
    </div>
  )
}

export default CreateNFT