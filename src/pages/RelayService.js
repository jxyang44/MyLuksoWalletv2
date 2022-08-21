import React, { useState, useEffect } from "react";
import { Banner, ButtonShadow, GrantPermissions } from "../components";
import { web3Provider, MM_PublicKey, createLSPFactoryPrivateKeyInstance } from "../utils/ERC725Config.js";
import swal from "sweetalert";
import { AiOutlineCopy } from "react-icons/ai";

//add feature for user to create from own EOA
const CreateProfile = () => {
  const [MLWbalance, setMLWbalance] = useState(0);
  const [expandKMText, setExpandKMText] = useState(false);
  const web3 = web3Provider;

  useEffect(() => {
    async function getBalance() {
      const balance = web3Provider.utils.fromWei(await web3Provider.eth.getBalance(MM_PublicKey), "ether");
      setMLWbalance(balance);
    }
    getBalance();
  }, []);

  const handleCreateProfile = () => {
    const myEOA = web3.eth.accounts.create();
    console.log(myEOA.privateKey, myEOA.address);
    web3.eth.accounts.wallet.add(myEOA.privateKey);
    //add template to make new profile metadata

    async function createUniversalProfile() {
      swal("Please wait. Creating a new Universal Profile account...","","")
      const lspFactory = createLSPFactoryPrivateKeyInstance();
      const deployedContracts = await lspFactory.UniversalProfile.deploy(
        {
          controllerAddresses: [MM_PublicKey, myEOA.address],
          lsp3Profile: {
            name: "My Universal Profile",
            description:
              "This profile was created through MyLuksoWallet. Gas on L16 testnet is currently paid for by through MyLuksoWallet's transaction relay service.",
            tags: ["MyLuksoWallet"],
            links: [
              {
                title: "MyLuksoWallet",
                url: "https://www.myluksowallet.com",
              },
            ],
          },
        },
        {
          //ipfsGateway: 'https://ipfs.infura.io',
          onDeployEvents: {
            next: deploymentEvent => {
              console.log(deploymentEvent);
              swal(
                "Please wait. Deploying your Universal Profile...",
                `Deployment type: ${deploymentEvent?.type}
                  \n Contract name: ${deploymentEvent?.contractName}
                  \n Function name:  ${deploymentEvent?.functionName}
                  \n Status:  ${deploymentEvent?.status}
                  \n Contract Address:  ${deploymentEvent?.contractAddress}
                  `,
                { button: false, closeOnClickOutside: false }
              );
            },
            error: error => {
              console.error(error);
            },
            complete: contracts => {
              swal(
                "Congratulations! You may begin using your Universal Profile :)",
                `Please keep track of the following contract addresses:
                  \n Universal Profile Address: ${contracts.LSP0ERC725Account.address}
                  \n Your EOA Controller Address: ${myEOA.address}
                  \n Your EOA Private Key: ${myEOA.privateKey}
                  \n MLW Controller Address: ${MM_PublicKey}
                  `
              );
              console.log("Universal Profile deployment completed");
              console.log(contracts);
            },
          },
        }
      );

      return deployedContracts;
    }

    createUniversalProfile();
  };

  return (
    <div className="text-white">
      <Banner
        colorFrom={"from-sky-500"}
        title={"Transaction Relay Service"}
        subtitle={`We pay for all your gas, while funds last! BALANCE: ${Math.round(MLWbalance * 100) / 100} LYX`}
        buttonText={""}
      />
      <div className="flex flex-row mx-20 gap-20">
        <div className="flex flex-col w-1/2 gap-2">
          <p className="italic text-slate-300">
            For the duration of the Hackathon, MyLuksoWallet will fund all gas fees for your Universal Profile if you create a <b>Free Account</b>{" "}
            with us. This feature is only possible through Lukso's relay transaction service.{" "}
            <button className="text-blue-500 hover:text-blue-300 font-semibold" onClick={() => setExpandKMText(curr => !curr)}>
              CLICK HERE to learn more about Key Managers and relay transactions.
            </button>
          </p>

          {expandKMText && (
            <>
              <div className="text-2xl font-semibold">Key Managers (LSP6)</div>
              <p>
                Gas fees are a necessity for any blockchain to operate effectively. Gas is paid to validators (e.g. stakers) for legitimately
                verifying and adding new blocks of information to the blockchain.
              </p>
              <p>
                <a href="https://ethereum.org/en/developers/docs/gas/" className="text-blue-500 hover:text-blue-300" target="_blank" rel="noreferrer">
                  CLICK HERE to learn more about gas.
                </a>
              </p>
              <p>
                Most blockchains ecosystems operate using Externally Owned Accounts (EOAs). Through this protocol, the EOA owner pays for the gas
                directly through an account balance. For example, in MetaMask, your EOA is controlled by a public/private pair. Fees to pay for
                approved transactions are then deducted from your EOA account balance whenever you make a transaction.
              </p>
              <p>
                The process of creating an exchange account, funding it, buying cryptocurrency (to pay for gas), installing MetaMask, and correctly
                transferring coins from an exchange to MetaMask are all significant barriers in onboarding newcomers to blockchain technology. In
                order for mainstream adoption to occur, a simpler process must be developed.
              </p>
              <p>
                Lukso provides a secure solution to simplify the onboarding process by introducing the concept of&nbsp;
                <a
                  href="https://docs.lukso.tech/standards/universal-profile/lsp6-key-manager"
                  className="text-blue-500 hover:text-blue-300"
                  target="_blank" rel="noreferrer">
                  Key Managers and relay transactions.
                </a>
                &nbsp;A Key Manager enables permissioned accounts (controllers) to execute transactions on the Universal Profile's behalf. Gas for the
                transaction is then paid for by a designated controller account.
              </p>
              <p>
                By creating a <b>Free Account</b> with MyLuksoWallet, we will be designated as a controller for your account, and pay for all
                transaction fees through a relay service. This is currently only available on the L16 testnet, since funds are not backed by real
                money. In the future, MyLuksoWallet will integrate more advanced relay protocols, such as subscription services, ad revenue, or a
                variety of other innovations to pay for blockchain operations.
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col w-1/2 gap-1">
          <div className="text-2xl underline">Enable Relay Service</div>
          <GrantPermissions />
          You must first enable MyLuksoWallet as a permissioned account before using our relay service.
          <div className="mt-8 text-2xl underline">Create Account with MyLuksoWallet</div>
          <div className="text-red-500">
            (WARNING: Use only if you do not intend to use your Universal Profile outside of MyLuksoWallet. This feature does not import your profile into the extension.)
          </div>
          <ButtonShadow
            buttonText={"Create Free Account"}
            buttonFunc={handleCreateProfile}
            buttonColor={"bg-green-500"}
            buttonTextColor={"text-green-800"}
          />
          <p>
            This option is completely <b>FREE</b> and is <em>only available for L16 testnet</em>. MyLuksoWallet will create a Universal Profile for
            you and pay for all your gas fees. Since you not are deploying a profile through the extension, you will need to manually keep track of
            your keys. Once your profile is deployed, log-in by pasting your UP address using the "UP Address Login" button found in the upper right
            corner of this screen.
          </p>
          <p>
            <br></br> If the relay address is depleted, please help us replenish the wallet&nbsp;
            <a href="https://faucet.l16.lukso.network/" className="text-blue-500 hover:text-blue-300 font-semibold" target="_blank" rel="noreferrer">
              using the L16 faucet.
            </a>
          </p>
          <p>
            Relayer Contract Address:{" "}
            <button
              className="text-blue-600 font-semibold hover:text-blue-300 flex-inline"
              onClick={() => navigator.clipboard.writeText(MM_PublicKey)}>
              <div className="flex flex-row items-center">
                {MM_PublicKey} <AiOutlineCopy />
              </div>
            </button>
          </p>
          <p>
            Remaining Balance: <span className={`font-semibold  ${MLWbalance < 10 ? "text-red-500" : "text-green-500"}`}>{MLWbalance}</span> LYX{" "}
            {MLWbalance > 100 ? "🤑" : MLWbalance > 10 ? "😁" : MLWbalance > 5 ? "😰" : "😞"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
