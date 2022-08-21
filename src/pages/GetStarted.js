import React from "react";
import { Banner, StepLeft, StepRight } from "../components";
import { useProfileContext } from "../contexts/ProfileContext";
const GetStarted = () => {
  const { currentAccount, connectProfile, loginWithKey } = useProfileContext();

  const handleStep4 = () => {
    console.log("step 4");
  };
  return (
    <div>
      <Banner
        colorFrom={"from-green-500"}
        title={"Get Started with MyLuksoWallet"}
        subtitle={
          "Learn about Lukso and manage your digital identity with MyLuksoWallet!"
        }
        buttonText={""}
      />

      <div className="flex flex-col ml-20">
        <StepLeft
          title={"Step 1"}
          subtitle={"Download and install the UP Browser Extension"}
          text={[
            "The Universal Profile (UP) Browser Extension is an internet browser (e.g. Chrome) add-on that stays with you across different websites and DApps.",
            "The extension allows you to access your profile and to interact with any Lukso DApp.",
            "**IMPORTANT** Your Universal Profile settings are tied to a smart contract on the blockchain, not to the browser extension itself. As long as you retain your private key, you will have access to your smart contract account. Lukso utilizes blockchain technology to ensure that your information is truly your own. More on decentralization later!"
          ]}
          buttonText={"Instructions"}
          buttonColor={"bg-green-500"}
          buttonFunc={() => window.open("https://docs.lukso.tech/guides/browser-extension/install-browser-extension")}
        />

        <StepRight
          title={"Step 2"}
          subtitle={"Create a Universal Profile"}
          text={[
            "For L16 testnet (and the hackathon), we recommend you create a Universal Profile using the extension.",
            'You can also create a profile with MyLuksoWallet (MLW). However, if you decide to create a profile with MLW, you will currently not be able to connect the created profile directly to the extension.',
            "Remember, regardless of where you create your account, your Universal Profile stays with you across all DApps as long as you have your private key!",
          ]}
          buttonText={"Instructions"}
          buttonColor={"bg-green-500"}
          buttonFunc={() => window.open("https://docs.lukso.tech/guides/browser-extension/create-a-universal-profile")}
          button2Text={"Create with MLW"}
          button2TextColor={"text-slate-700"}
          button2Func={() => window.open("/relayservice")}
          button2Color={"bg-blue-500"}
        />

        <StepLeft
          title={"Step 3"}
          subtitle={"Connect your Universal Profile to MyLuksoWallet"}
          text={[
            "Press 'Connect Profile' to begin using MyLuksoWallet with the UP Browser Extension.",
            "Alternatively, 'Connect with UP Address' will allow you to log-in if your account was not created using the UP Browser Extension.",
            "Once connected, you will have access to all our features, including the MLW Dapp, asset management tools, a mini-marketplace and more!",
          ]}
          buttonText={"Connect Profile"}
          buttonColor={"bg-green-500"}
          buttonFunc={() => connectProfile()}
          button2Text={"Connect with UP Address"}
          button2TextColor={"text-slate-700"}
          button2Func={() => loginWithKey("UP Address")}
          button2Color={"bg-blue-500"}
        />

        {/* TO-DO link to video submission once created*/}
        <StepRight
          title={"Step 4"}
          subtitle={"Edit Your Profile with MyLuksoWallet"}
          text={["We recommend using MLW's interface to edit your UP!",
          'The button at the top-right corner of this window will open your profile. Updating your profile is as simple as clicking and editing the attributes.', 
          'Customize your profile however you like - change your name, description, banner, profile picture, tags, and links. More to come!',
           "Once you're satisfied with your changes, press 'Upload Edits' to commit your changes to the blockchain!",
          ]}
          buttonText={"Learn More"}
          buttonFunc={handleStep4}
          buttonColor={"bg-green-500"}
        />
  
   <StepLeft
          title={"Step 5"}
          subtitle={"Enable MyLuksoWallet Relay Service"}
          text={[`MyLuksoWallet's relay service utilizes the "faucet model." We will pay for all your transactions as long as the faucet has funds. 😂`,
          'If the relay address is depleted, please help us replenish the wallet using the L16 faucet.',
          'This model will not be carried over into mainnet.'
          ]}
          buttonText={"Grant Permissions"}
          buttonFunc={() => window.open("/relayservice")}
          buttonColor={"bg-green-500"}

        />



        <div className="mt-10 mb-16 font-semibold italic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">
          Congratulations, you have just created your very first Universal Profile!
          <br></br> Now let's mint some FREE tokens and NFTs!
        </div>
        <StepLeft
          title={"Step 5"}
          subtitle={"Mint Some Tokens!"}
          text={[
            "Customize and mint your very own MyLuksoWallet tokens for free. The possibilities are endless!",
            "Mint a MyLuksoWallet token by clicking the button below.",
          ]}
          buttonText={"Mint Token (LSP7)"}
          buttonColor={"bg-green-500"}
          buttonFunc={() => connectProfile()}
          button2Text={"Mint NFT 2.0 (LSP8)"}
          button2Color={"bg-green-500"}
          button2Func={() => connectProfile()}
        />

        <div>
          <ol className="pl-4 text-white">
            <li>5: search - split into more detail?</li>
            <li>6: donate, share, plugs, etc.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
