import React from 'react'
import {Banner, StepLeft, StepRight} from '../components'
import {useProfileContext} from '../contexts/ProfileContext'
const GetStarted = () => {
  const {currentAccount, connectProfile, connectProfileUsingPrivateKey} = useProfileContext();
  
  const handleStep4 = () =>{
    console.log("step 4")
  }
    return (
      <div>
        <Banner 
          colorFrom = {"from-green-500"} 
          title = {"Get Started with MyLuksoWallet"} 
          subtitle = {"Follow the instructions below to get started! Use the buttons as you work your way through the steps."}
          buttonText = {""}
        />

        <div className='flex flex-col ml-20'>
          <StepLeft 
              title = {"Step 1"} 
              subtitle = {"Download and install the UP Browser Extension"}
              text = {["The Universal Profile (UP) Browser Extension is an add-on that functions similarly to MetaMask.", "Use it to interact with any Lukso DApp!"]}
              buttonText = {"Instructions"}
              buttonColor = {"bg-green-500"}
              buttonFunc = {()=>window.open("https://docs.lukso.tech/guides/browser-extension/install-browser-extension")}
          />

          <StepRight 
              title = {"Step 2"} 
              subtitle = {"Create a Universal Profile"}
              text = {["For the hackathon, we recommend you create a Universal Profile using the extension.",
              "You can also create a profile with MyLuksoWallet (MLW). Please be aware that the current version of the UP Browser Extension cannot import your account address. So if you decide to create a profile with MLW, you will not be able to interact directly with the extension.",
              "Regardless of where you create your account, your Universal Profile stays with you across all DApps as long as you save your private key!"]}
              buttonText = {"Instructions"}
              buttonColor = {"bg-green-500"}
              buttonFunc = {()=>window.open("https://docs.lukso.tech/guides/browser-extension/create-a-universal-profile")}
              button2Text = {"Create with MLW"}
              button2TextColor = {"text-slate-700"}
              button2Func = {()=>window.open("/createprofile")}
              button2Color = {"bg-blue-500"}
          />

          <StepLeft 
              title = {"Step 3"} 
              subtitle = {"Connect your Universal Profile to MyLuksoWallet"}
              text = {['"Connect Profile" to begin using MyLuksoWallet with the UP Browser Extension!', 
                        "Alternatively, you can also connect to MLW using your private key if your account is not in the UP Browser Extension."]}
              buttonText = {"Connect Profile"}
              buttonColor = {"bg-green-500"}
              buttonFunc = {()=>connectProfile()}
              button2Text = {"Login with Private Key"}
              button2TextColor = {"text-slate-700"}
              button2Func = {()=>connectProfileUsingPrivateKey()}
              button2Color = {"bg-blue-500"}
          />

          {/* link to instructions doc*/}
          <StepRight 
              title = {"Step 4"} 
              subtitle = {"Edit Your Profile with MyLuksoWallet"}
              text = {["We recommend you edit your profile with MyLuksoWallet!", 
              ]}
              buttonText = {"Learn More"}
              buttonFunc = {handleStep4}
              buttonColor = {"bg-green-500"}
          />
          <div className='mt-10 mb-16 font-semibold italic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white'>
          Congratulations, you have just created your very first Universal Profile!
          <br></br> Now let's mint some FREE tokens and NFTs!
          </div>
          <StepLeft 
              title = {"Step 5"} 
              subtitle = {"Mint Some Tokens!"}
              text = {["Customize and mint your very own MyLuksoWallet tokens for free. The possibilities are endless!",
                      "Mint a MyLuksoWallet token by clicking the button below." 
                        ]}
              buttonText = {"Mint Token (LSP7)"}
              buttonColor = {"bg-green-500"}
              buttonFunc = {()=>connectProfile()}
              button2Text = {"Mint NFT 2.0 (LSP8)"}
              button2Color = {"bg-green-500"}
              button2Func = {()=>connectProfile()}
          />


          <div>
           
            <ol className='pl-4 text-white'>
                <li>5: search - split into more detail?</li>
                <li>6: donate, share, plugs, etc.</li>
            </ol>
          </div>
        </div>
      </div>
  )
}

export default GetStarted