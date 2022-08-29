//deploy or mint token contract page
//used for both LSP7 and LSP8 tokens

import React, { useState, useEffect } from "react";
import { FormTabs, Address, LSP7TokenCoin, LSP8NFTCard, CreateLSPForm, MintLSPForm, FullScreenButton } from "../../components";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";

const LSPValues = {
  LSP7: {
    description: "LSP7 - Digital Asset (Based on ERC20)",
    type: "Token",
    forms: [
      //header data for form ribbons
      { name: "Deploy / View", border: "border-sky-400 shadow-sky-400" },
      { name: "Mint", border: "border-green-500 shadow-green-500" },
    ],
    initialDeployState: {
      //initial metadata
      tokenName: "", //token name
      tokenSymbol: "", //token symbol
      tokenDescription: "", //token description
      tokenIcon: "", //token icon
      tokenIconURL: "", //token icon url for previewing
      imageFront: "", //token image front of coin
      imageFrontURL: "", //token image front of coin url for previewing
      imageBack: "", //token image back of coin
      imageBackURL: "", //token image back of coin url for previewing
      mintAmount: 1, //amount to mint
      backgroundColor: "#000000", //background color of coin
      textColor: "#FFFFFF", //text color of coin
      isCreator: true, //is creator of token -- TO-DO currently does not save to blockchain
      isNotDivisible: false,
      tokenSupply: "",
    },
    initialMintState: {
      tokenAddress: localStorage.getItem(`recentLSP7Address`) ?? "",
      mintAmount: "",
      mintToAddress: "",
    },
  },
  LSP8: {
    description: "LSP8 - Identifiable Digital Asset (Based on ERC721)",
    type: "NFT",
    forms: [
      { name: "Deploy / View", border: "border-sky-400 shadow-sky-400" },
      { name: "Mint", border: "border-green-500 shadow-green-500" },
    ],
    initialDeployState: {
      tokenName: "",
      tokenSymbol: "",
      tokenDescription: "",
      tokenIcon: "",
      tokenIconURL: "",
      imageFront: "",
      imageFrontURL: "",
      imageBack: "",
      imageBackURL: "",
      tokenID: 1,
      backgroundColor: "#CCCCCC",
      textColor: "#000000",
      isCreator: true,
      tokenSupply: "",
    },
    initialMintState: {
      tokenAddress: localStorage.getItem(`recentLSP8Address`) ?? "",
      tokenID: "",
      mintToAddress: "",
    },
  },
};

const CreateToken = ({ LSP }) => {
  const { currentAccount } = useProfileContext();
  const { activeMenu, setActiveMenu } = useStateContext();
  const [formValues, setFormValues] = useState(LSPValues[LSP].initialDeployState);
  const [mintForm, setMintForm] = useState(LSPValues[LSP].initialMintState);
  const [showForm, setShowForm] = useState(LSPValues[LSP].forms[0].name);

  useEffect(() => {
    setActiveMenu(false);

    setMintForm(curr => ({ ...curr, tokenAddress: localStorage.getItem(`recent${LSP}Address`), mintToAddress: currentAccount }));
  }, [LSP]);

  return (
    <>
      {activeMenu ? (
        <FullScreenButton text={`Deploy or Mint ${LSP} Assets`} />
      ) : (
        <div className="xl:mx-16 ml-8">
          <div className="flex flex-col text-white items-left text-left min-h-[85vh]">
            <div className="text-sky-500 font-semibold xl:text-2xl text-lg">{LSPValues[LSP].description}</div>
            <div className="xl:text-3xl text-xl mb-3 text-white">
              Deploy a {LSP} {LSPValues[LSP].type} with Lukso's {LSP}Mintable Contract
            </div>

            <div className="my-2 flex flex-row gap-1 xl:text-base text-sm">
              Most recently deployed {LSP} contract from your browser:
              <span className="font-bold">
                <Address address={localStorage.getItem(`recent${LSP}Address`) ?? "N/A"} />
              </span>
            </div>
            <div className="flex flex-row ml-4 justify-between">
              <div>
                <FormTabs forms={LSPValues[LSP].forms} showForm={showForm} setShowForm={setShowForm} />

                <div className="flex flex-row w-full mr-8 gap-2">
                  {showForm === "Deploy / View" && (
                    <CreateLSPForm
                      formValues={formValues}
                      setFormValues={setFormValues}
                      initialDeployState={LSPValues[LSP].initialDeployState}
                      LSP={LSP}
                    />
                  )}
                  {showForm === "Mint" && (
                    <div className="flex flex-col justify-center">
                      <MintLSPForm formValues={mintForm} setFormValues={setMintForm} initialMintState={LSPValues[LSP].initialMintState} LSP={LSP} />
                    </div>
                  )}
                </div>
              </div>
              {LSP === "LSP7" && (
                <div className="flex flex-col justify-center w-1/2 ">
                  <LSP7TokenCoin createToken={formValues} />
                </div>
              )}

              {LSP === "LSP8" && (
                <div className="flex flex-col justify-center w-1/2">
                  <LSP8NFTCard createToken={formValues} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default CreateToken;

// manually deploy - if needed later
// const myToken = new web3.eth.Contract(LSP7MintableContract.abi, {
//   gas: 5_000_000,
//   gasPrice: "1000000000",
// });

// swal("Deploying token...", { button: false});
// const deployedToken = await myToken
//   .deploy({
//     data: LSP7MintableContract.bytecode,
//     arguments: [
//       formValues.tokenName, // token name
//       formValues.tokenSymbol, // token symbol
//       currentAccount, // new owner, who will mint later
//       formValues.isNotDivisible, // isNFT = TRUE, means NOT divisible, decimals = 0
//     ],
//   })
//   .send({ from: currentAccount, gasLimit: 5_000_000 });

// swal("Setting token metadata...", { button: false});
//   const LSP4Metadata = {
//     description: formValues.tokenDescription,

//   }
