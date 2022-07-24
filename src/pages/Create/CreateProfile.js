import React from 'react'
import {Banner} from '../../components'
import {web3, chainId, LSP0ERC725Account, lspFactoryInstance} from '../../utils/ERC725Config.js'
import swal from 'sweetalert';
const { LSPFactory } = require("@lukso/lsp-factory.js");

//add feature for user to create from own EOA
const CreateProfile = () => {

    const handleCreateProfile = () => { 
        // const myEOA = web3.eth.accounts.create();
        // const myAddress = myEOA.address;

        const myAddress = process.env.REACT_APP_MLW_CONTROLLER_ADDRESS;
       
          async function createUniversalProfile() {
            const deployedContracts = await lspFactoryInstance.UniversalProfile.deploy({
              controllerAddresses: [myAddress], 
              lsp3Profile: {
                name: "My Universal Profile",
                description: "My Cool Universal Profile",
                tags: ["Public Profile"],
                links: [
                  {
                    title: "My Website",
                    url: "https://my-website.com",
                  },
                ],
              },
            },
            {
              ipfsGateway: 'https://ipfs.infura.io',
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
            } 
           );
          
            const myUPAddress = deployedContracts.LSP0ERC725Account.address;
            console.log("my Universal Profile address: ", myUPAddress);
          
            return deployedContracts;
          }
          
          createUniversalProfile();          


    }

    return (
        <div>
            <Banner 
                colorFrom = {"from-sky-500"} 
                title = {"Create a Universal Profile"} 
                subtitle = {"Get started with LUKSO."}
                buttonText = {"Create Profile"}
                buttonFunc = {handleCreateProfile}
                buttonColor = {"bg-sky-500"}
            />
            <div className="text-white">
                Hello
            </div>
        </div>
    )
}

export default CreateProfile