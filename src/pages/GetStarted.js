import React from 'react'
import {Banner} from '../components'

const GetStarted = () => {
  
  const handleStep1 = () =>{
    window.open("https://docs.lukso.tech/guides/browser-extension/install-browser-extension");
  }

  const handleStep2 = () =>{
    console.log("step 2")
  }
  const handleStep3 = () =>{
    console.log("step 3")
  }
  const handleStep4 = () =>{
    console.log("step 4")
  }
    return (
    <div>
        <Banner 
            colorFrom = {"indigo-500"} 
            title = {"Step 1"} 
            subtitle = {"Download and install the Universal Profile (UP) Extension."}
            buttonText = {"Instructions"}
            buttonFunc = {handleStep1}
        />

        <Banner 
            colorFrom = {"indigo-600"}
            title = {"Step 2"} 
            subtitle = {"Create a Universal Profile."}
            buttonText = {"Create Profile"}
            buttonFunc = {handleStep2}
        />

        <Banner 
            colorFrom = {"indigo-700"} 
            title = {"Step 3"} 
            subtitle = {"Fund your account with LYXe (or with our native token MLV)."}
            buttonText = {"Fund Account"}
            buttonFunc = {handleStep3}
        />

        <Banner 
            colorFrom = {"indigo-800"} 
            title = {"Step 4"} 
            subtitle = {"Set up your vaults."}
            buttonText = {"Set up Vault"}
            buttonFunc = {handleStep4}
        />


    </div>
  )
}

export default GetStarted