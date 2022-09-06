//deploy or mint token contract page
//used for both LSP7 and LSP8 tokens

import React, { useState, useEffect } from "react";
import { FormTabs, Address, LSP7TokenCoin, LSP8NFTCard, CreateLSPForm, MintLSPForm, FullScreenButton, ContainerWithHeader } from "../../components";
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
      isCreator: true, //is creator of token
      isNotDivisible: false, //for LSP7 only
      tokenSupply: "", //total supply of the token
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

    setMintForm(curr => ({
      ...curr,
      tokenAddress: localStorage.getItem(`recent${LSP}Address`),
      mintToAddress: currentAccount,
    }));
  }, [LSP]);

  return (
    <>
      {activeMenu ? (
        <FullScreenButton text={`Deploy or Mint ${LSP} Assets`} />
      ) : (
        <ContainerWithHeader
          title={LSPValues[LSP].description}
          subtitle={`Deploy a ${LSP} ${LSPValues[LSP].type} with Lukso's ${LSP}Mintable
        Contract`}>
          <div className="mb-8 flex flex-wrap justify-center gap-1 text-sm text-white xl:text-base">
            Most recently deployed {LSP} contract from this browser:
            <span className="font-bold">
              <Address address={localStorage.getItem(`recent${LSP}Address`) ?? "N/A"} />
            </span>
          </div>
         
            <div className="flex flex-col md:flex-row justify-between min-h-[85vh]">
              <div className="md:w-1/2">
                <FormTabs forms={LSPValues[LSP].forms} showForm={showForm} setShowForm={setShowForm} />

                <div className="flex w-full flex-row gap-2">
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
                <div className="flex md:w-1/2 flex-col justify-center">
                  <LSP7TokenCoin createToken={formValues} />
                </div>
              )}

              {LSP === "LSP8" && (
                <div className="flex md:ml-12 md:w-[45vmax] flex-col justify-center">
                  <LSP8NFTCard createToken={formValues} />
                </div>
              )}
        
          </div>
        </ContainerWithHeader>
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
