//component for the "Get Started" page

import React from "react";
import { Banner, StepLeft } from "../components";
import { useProfileContext } from "../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import stepsBg from "../assets/Home/stepsbg.png";
const GetStarted = () => {
  const navigate = useNavigate();
  const { connectProfile } = useProfileContext();

  return (
    <div className="bg-fixed bg-blend-multiply bg-slate-800" style={{ backgroundImage: `url(${stepsBg})` }}>
      <Banner
        colorFrom={"from-sky-500"}
        title={"Get Started with MyLuksoWallet"}
        subtitle={"Currently Customized for the Hackathon Submission"}
        buttonText={""}
      />

      <div className="flex flex-col xl:mx-32 mx-8 gap-14 pb-32">
        <div className=" border-y-gray-500 border-y my-10 py-10 text-center flex flex-col gap-4 text-white">
          <p className="font-bold text-lg"> *** Hackathon Note *** </p>
          <p>- These instructions, including the videos, are a work in progress and will be improved over time. -</p>
        </div>
        <StepLeft
          title={"Step 1"}
          subtitle={"Download and install the UP Browser Extension"}
          text={[
            "The Universal Profile (UP) Browser Extension is an internet browser (e.g. Chrome) add-on that stays with you across different websites and DApps.",
            "The extension allows you to access your profile and to interact with any Lukso DApp.",
            "**IMPORTANT** Your Universal Profile settings are tied to a smart contract on the blockchain, not to the browser extension itself. As long as you retain your private key, you will have access to your smart contract account. Lukso utilizes blockchain technology to ensure that your information is not governed by a centralized entity.",
          ]}
          buttonText={"Instructions"}
          buttonFunc={() => window.open("https://docs.lukso.tech/guides/browser-extension/install-browser-extension")}
          customStyle1={"ml-4"}
        />

        <StepLeft
          title={"Step 2"}
          subtitle={"Create a Universal Profile"}
          text={[
            "For L16 testnet (and the hackathon), we recommend you create a Universal Profile using the extension.",
            "TEMPORARILY DISABLED - You can also create a profile with MyLuksoWallet (MLW). However, if you decide to create a profile with MLW, you will not be able to connect the created profile directly to the extension yet.",
            "Remember, regardless of where you create your account, your Universal Profile stays with you across all DApps as long as you have your private key!",
          ]}
          buttonText={"Video Tutorial"}
          buttonFunc={() => window.open("https://youtu.be/Fcii2svh6KY")}
          customStyle1={"ml-5"}
        />

        <StepLeft
          title={"Step 3"}
          subtitle={"Connect your Universal Profile to MyLuksoWallet"}
          text={[
            "Press 'Connect Profile' to begin using MyLuksoWallet with the UP Browser Extension. Once connected, you will have access to all our features, including the MLW Dapp, asset management tools, and more.",
            "Alternatively, 'UP Address Login' (the button under 'Connect Profile' in the upper-right part of your screen) will allow you to manually input a UP address. This can be used if your UP address is not in the extension. Logging in manually will not allow you to write new data, since securely uploading new data to the blockchain requires a private key confirmation.",
          ]}
          buttonText={"Video Tutorial"}
          buttonFunc={() => window.open("https://youtu.be/Fcii2svh6KY?t=32")}
          button2Text={"Connect Profile"}
          button2Func={() => connectProfile()}
          customStyle1={"ml-6"}
        />

        <StepLeft
          title={"Step 4"}
          subtitle={"Edit Your Profile with MyLuksoWallet"}
          text={[
            "Now let's get starting editing your Universal Profile.",
            "The button at the top-right most corner of this webpage will open your profile. Updating your profile is as simple as clicking and editing the attributes.",
            "Customize your profile and settings however you like - change your name, description, profile picture, theme settings, and more!",
            "Once you're satisfied with your changes, press 'Upload Edits' to commit your changes to the blockchain!",
          ]}
          buttonText={"Video Tutorial"}
          buttonFunc={() => window.open("https://youtu.be/Fcii2svh6KY?t=50")}
          customStyle1={"ml-7"}
        />

        {/* TO-DO user needs to input UP address and browser address */}
        <StepLeft
          title={"Step 5"}
          subtitle={"Fund your Account"}
          text={[
            "The logic to manage your blockchain interactions will primarily be dictated by smart contracts. Any action that mutates the state of your smart contract data incurs a transaction (gas) fee. In order to interact with the blockchain, your account will need to be funded with LYXt/(e) (i.e. native coins) to pay for transaction fees. On the L16 testnet, Lukso provides your account with some initial funds, but this amount will run out at some point.",

            "For now let's fund your account with native coins so you have enough to pay for transactions. If you don't have any initial funds, you may request some from the faucet. Gas is used from the address found under 'This Browser Extension.' A more detailed explanation is provided in the video tutorial.",
          ]}
          buttonText={"Video Tutorial"}
          buttonFunc={() => window.open("https://youtu.be/22FyeiZps-M?t=155")}
          button2Text={"Request Funds"}
          button2Func={() => window.open("https://faucet.l16.lukso.network/")}
          customStyle1={"ml-8"}
        />

        {/* TO-DO re-write this after relayer implementation */}
        {/* <StepLeft
          title={"Step 6"}
          subtitle={"Relay Service and Permissions"}
          text={[
            "Lukso introduces the concept of relay services, which circumvents the need to pay gas by delegating payment to an external account. MLW is currently working on a relay service before mainnet launch 👷.",
            `MyLuksoWallet's relay service utilizes the "faucet model." We will pay for all your transactions as long as the testnet faucet has funds.`,
            "Plese help us replenish the relayer address if it is depleted, so that you may continue to use our services for free.",
            "Unfortunately, this model cannot be used for mainnet, since a mainnet faucet does not exist.",
          ]}
          buttonText={"Enable Relay Service"}
          buttonFunc={() => setUseRelay(true)}
          customStyle1={"ml-9"}
        /> */}

        <div className="mt-8 text-xl text-gray-300 xl:max-w-7xl max-w-5xl py-16 border-y border-y-gray-300 border-dashed text-center">
          <p className="text-white text-2xl font-semibold">
            🥳 Congratulations, you have just created a Universal Profile and connected to MyLuksoWallet! 🥳
          </p>
          <br></br>Feel free to explore the website on your own now. You can also follow the additional steps below if you would like to continue with
          a guided tour.
        </div>

        <StepLeft
          title={"Explore the MLW Dapp"}
          subtitle={""}
          text={[
            "Enter the DApp by clicking the 'Wallet DApp' button at the top of the sidebar. The video tutorial provides a sample of some of the features.",
          ]}
          buttonText={"Video Tutorial"}
          buttonFunc={() => window.open("https://youtu.be/nronIM7Lgxc?t=53")}
        />

        <StepLeft
          title={"Deploy a Smart Contract and Mint Tokens"}
          subtitle={""}
          text={[
            "Now let's deploy your very own LSP7 token contract by clicking the link.",
            "Use the blue 'Create LSP7 Token' form to customize your token settings.",
            "After you deploy a contract, you will be able to use the green 'Mint LSP7 Token' form to mint tokens from the contract.",
          ]}
          buttonText={"Create Token Contract"}
          buttonFunc={() => navigate("../createtoken")}
        />

        <StepLeft
          title={"Set-up a Vault"}
          subtitle={""}
          text={["The video tutorial provides more detailed instruction."]}
          buttonText={"Video Tutorial"}
          buttonFunc={() => window.open("https://youtu.be/22FyeiZps-M")}
        />

        <StepLeft
          title={"Manage Permissions"}
          subtitle={""}
          text={["The video tutorial provides more detailed instruction."]}
          buttonText={"Video Tutorial"}
          buttonFunc={() => window.open("https://youtu.be/g3nO7Vq6h5E")}
        />
      </div>
    </div>
  );
};

export default GetStarted;
