import React from "react";
import { Banner, StepLeft, Footer } from "../components";
import { useProfileContext } from "../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
const GetStarted = () => {
  const navigate = useNavigate();
  const { currentAccount, connectProfile, loginWithKey, setUseRelay } = useProfileContext();

  const handleStep4 = () => {
    console.log("step 4");
  };
  return (
    <div>
      <Banner colorFrom={"from-sky-500"} title={"Get Started with MyLuksoWallet"} subtitle={""} buttonText={""} />

      <div className="flex flex-col lg:mx-32 mx-8 gap-14">
        <StepLeft
          title={"Step 1"}
          subtitle={"Download and install the UP Browser Extension"}
          text={[
            "The Universal Profile (UP) Browser Extension is an internet browser (e.g. Chrome) add-on that stays with you across different websites and DApps.",
            "The extension allows you to access your profile and to interact with any Lukso DApp.",
            "**IMPORTANT** Your Universal Profile settings are tied to a smart contract on the blockchain, not to the browser extension itself. As long as you retain your private key, you will have access to your smart contract account. Lukso utilizes blockchain technology to ensure that your information is truly your own.",
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
            "You can also create a profile with MyLuksoWallet (MLW). However, if you decide to create a profile with MLW, you will not be able to connect the created profile directly to the extension yet.",
            "Remember, regardless of where you create your account, your Universal Profile stays with you across all DApps as long as you have your private key!",
          ]}
          buttonText={"Instructions"}
          buttonFunc={() => window.open("https://docs.lukso.tech/guides/browser-extension/create-a-universal-profile")}
          button2Text={"Create with MLW"}
          button2Func={() => window.open("/relayservice")}
          customStyle1={"ml-5"}
        />

        <StepLeft
          title={"Step 3"}
          subtitle={"Connect your Universal Profile to MyLuksoWallet"}
          text={[
            "Press 'Connect Profile' to begin using MyLuksoWallet with the UP Browser Extension. Once connected, you will have access to all our features, including the MLW Dapp, asset management tools, and more!",
            "Alternatively, 'Connect with UP Address' will allow you to log-in manually with a public key. This can be used if your UP address is not in the extension. Unless you have given MLW permissions to your account, logging in manually will not allow you to write new data to your profile.",
          ]}
          buttonText={"Connect Profile"}
          buttonFunc={() => connectProfile()}
          button2Text={"Connect with UP Address"}
          button2Func={() => loginWithKey("UP Address")}
          customStyle1={"ml-6"}
        />

        {/* TO-DO link to video submission once created*/}
        <StepLeft
          title={"Step 4"}
          subtitle={"Edit Your Profile with MyLuksoWallet"}
          text={[
            "Now let's get starting editing your Universal Profile.",
            "The button at the top-right most corner of this webpage will open your profile. Updating your profile is as simple as clicking and editing the attributes.",
            "Customize your profile and settings however you like - change your name, description, profile picture, theme settings, anml-4",
            "Once you're satisfied with your changes, press 'Upload Edits' to commit your changes to the blockchain!",
          ]}
          buttonText={"Learn More"}
          buttonFunc={handleStep4}
          customStyle1={"ml-7"}
        />

        {/* TO-DO user needs to input UP address and browser address */}
        <StepLeft
          title={"Step 5"}
          subtitle={"Fund your Account"}
          text={[
            "The logic to manage your UP, assets, vaults, and other data will primarily be dictated by smart contracts. Any action that mutates the state of your smart contract data incurs a transaction (gas) fee. In order to interact with the blockchain, your account will need to be funded with LYX to pay for transaction fees.",
            "Lukso introduces the concept of relay services, which circumvents the need to pay gas by delegating payment to an external account. This is further explained in Step 6. MLW is currently working on a relay service before mainnet launch 👷.",
            "For now let's fund your account with LYX so you have enough to pay for transactions.",
          ]}
          buttonText={"Enable Relay Service"}
          buttonFunc={() => setUseRelay(true)}
          customStyle1={"ml-8"}
        />

        {/* TO-DO need to re-write this */}
        <StepLeft
          title={"Step 6"}
          subtitle={"Relay Service and Permissions"}
          text={[
            `MyLuksoWallet's relay service utilizes the "faucet model." We will pay for all your transactions as long as the testnet faucet has funds.`,
            "Plese help us replenish the relayer address if it is depleted, so that you may continue to use our services for free.",
            "Unfortunately, this model cannot be used for mainnet, since a mainnet faucet does not exist.",
          ]}
          buttonText={"Enable Relay Service"}
          buttonFunc={() => setUseRelay(true)}
          customStyle1={"ml-9"}
        />

        <div className="mt-10 mb-16 font-semibold italic text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-white">
          Congratulations, you have just created your very first Universal Profile!
          <br></br> Now let's mint some FREE tokens and NFTs!
        </div>
        <StepLeft
          title={"Step 7"}
          subtitle={"Deploy a Smart Contract"}
          text={[
            "Now let's deploy your very own LSP7 token contract by clicking the link.",
            "Use the blue 'Create LSP7 Token' form to customize your token settings. Be crml-4",
            "After you deploy a contract, you will be able to use the green 'Mint LSP7 Token' form to mint tokens from the contract.",
          ]}
          buttonText={"Create Token Contract"}
          buttonFunc={() => navigate("../createtoken")}
          customStyle1={"ml-10"}
        />

        <StepLeft
          title={"Step 8"}
          subtitle={"Deploy a Vault"}
          text={[
            "Now let's get starting editing your Universal Profile.",
            "The button at the top-right most corner of this webpage will open your profile. Updating your profile is as simple as clicking and editing the attributes.",
            "Customize your profile and settings however you like - change your name, description, profile picture, theme settings, anml-4",
            "Once you're satisfied with your changes, press 'Upload Edits' to commit your changes to the blockchain!",
          ]}
          buttonText={"Learn More"}
          buttonFunc={handleStep4}
          customStyle1={"ml-11"}
        />

        <StepLeft
          title={"Step 9"}
          subtitle={"Transfer Asset to Vault"}
          text={[
            "Now let's get starting editing your Universal Profile.",
            "The button at the top-right most corner of this webpage will open your profile. Updating your profile is as simple as clicking and editing the attributes.",
            "Customize your profile and settings however you like - change your name, description, profile picture, theme settings, anml-4",
            "Once you're satisfied with your changes, press 'Upload Edits' to commit your changes to the blockchain!",
          ]}
          buttonText={"Learn More"}
          buttonFunc={handleStep4}
          customStyle1={"ml-12"}
        />

        <StepLeft
          title={"Step 10"}
          subtitle={"Check out the Marketplace"}
          text={["Coming soon."]}
          buttonText={"Learn More"}
          buttonFunc={handleStep4}
          customStyle1={"ml-14"}
        />
      </div>
      <Footer/>
    </div>
  );
};

export default GetStarted;
