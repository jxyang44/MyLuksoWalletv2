import React from 'react'
import {Banner, Button_Shadow} from '../../components'
import {useProfileContext} from '../../contexts/ProfileContext';
import {web3, lspFactoryInstance, options, LSP7MintableContract} from '../../utils/ERC725Config.js'

const PRIVATE_KEY = process.env.REACT_APP_METAMASK_MY_DEV_PRIVATE_KEY; //jxyang metamask private key - dev account
const myEOA = web3.eth.accounts.wallet.add(PRIVATE_KEY);

const CreateToken = () => {
  const {currentAccount} = useProfileContext();

 
  
  const mintToken = () => {
  
  }

  const handleCreateTokenContract = () => {
    
    const createTokenContract = async () => {
      
      const LSP4MetaData = {
        description: "description",
        icon: [],
        links: [],
        images: [],
        assets: [],
      };

      const tokenParams = {
        name: "test_name",
        symbol: "test_symbol",
        controllerAddresses: [currentAccount], // the "issuer" of the asset, that is allowed to change meta data
        creators: [currentAccount], // Array of ERC725Account addresses that define the creators of the digital asset.
        isNFT: false, // Token decimals set to 18
        digitalAssetMetadata: LSP4MetaData,
      }
     



      try {
        const myToken = new web3.eth.Contract(LSP7MintableContract.abi, {
          gas: 5_000_000,
          gasPrice: '1000000000',
        });
  
  
        console.log(myToken)
        const deployedToken = await myToken.deploy({
          data: LSP7MintableContract.bytecode,
          arguments: [
            'My LSP7 Token', // token name
            'LSP7', // token symbol
            myEOA.address, // new owner, who will mint later
            false, // isNFT = TRUE, means NOT divisble, decimals = 0)
          ],

        }).send({from: myEOA.address});
      
       console.log(deployedToken.options.address, currentAccount);
       const myToken2 = new web3.eth.Contract(LSP7MintableContract.abi, deployedToken.options.address);
       console.log(myToken2)
       const owner2 = await myToken2.methods.owner().call();
       console.log(owner2)
        return await deployedToken.methods.mint(currentAccount, 100, false, '0x').send({
          from: myEOA.address, gasLimit: 300_000
        });
      

      } catch (err) {
        console.warn(err.message);
        return;
      }
    }


    createTokenContract().then( res => {console.log(res)
      
    
    })
  }

  const transferToken = () => {
    const transfer = async () => {
      // const tokenPayload = myToken.methods
      //   .transfer(currentAccount, currentAccount, 15, false, '0x')
      //   .encodeABI();

      // // 2. generate payload for Universal Profile to execute the token transfer on the token contract
      // const upPayload = myUniversalProfile.methods
      //   .execute(
      //     0, // operation 0 CALL
      //     myToken._address,
      //     0, // 0  LYX sent
      //     tokenPayload
      //     )
      //   .encodeABI();

      // // 3. execute via the KeyManager
      // await myKeyManager.methods.execute(upPayload).send({
      //   from: myEOA,
      //   gas: 5_000_000,
      //   gasPrice: '1000000000',
      // });
    }
  transfer();
  }

  return (
    <div>
      <Banner 
          colorFrom = {"from-green-500"} 
          title = {"LSP7 - Digital Asset (Based on ERC20)"} 
          subtitle = {"Use when all assets have the same metadata.\nFor example, a fungible token or a collection of digital clothing items."}
          buttonText = {""}
      />
      <Button_Shadow buttonText={"Create LSP7 Contract"} buttonFunc={handleCreateTokenContract} buttonColor={"bg-green-500"} buttonTextColor ={"text-sky-800"} />
      <Button_Shadow buttonText={"Mint Token"} buttonFunc={mintToken} buttonColor={"bg-green-500"} buttonTextColor ={"text-sky-800"} />
      <Button_Shadow buttonText={"Transfer Token"} buttonFunc={transferToken} buttonColor={"bg-green-500"} buttonTextColor ={"text-sky-800"} />
  </div>
  )
}

export default CreateToken

  // const contracts = await lspFactoryInstance.LSP7DigitalAsset.deploy(
        //   {
        //     name: "test_name",
        //     symbol: "test_symbol",
        //     controllerAddresses: [currentAccount], // the "issuer" of the asset, that is allowed to change meta data
        //     creators: [currentAccount], // Array of ERC725Account addresses that define the creators of the digital asset.
        //     isNFT: false, // Token decimals set to 18
        //     digitalAssetMetadata: LSP4MetaData,
        //   },
        //   options
        // );