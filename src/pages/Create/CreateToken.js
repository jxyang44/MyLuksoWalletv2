import React, { useState, useEffect } from "react";
import { FormTabs, Address, LSP7TokenCoin, LSP8NFTCard, CreateLSPForm, MintLSPForm, FullScreenButton } from "../../components";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useStateContext } from "../../contexts/StateContext";

const LSPValues = {
  LSP7: {
    description: "LSP7 - Digital Asset (Based on ERC20)",
    type: "Token",
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
      mintAmount: 1,
      backgroundColor: "#000000",
      textColor: "#FFFFFF",
      isCreator: true,
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
        <div className="lg:mx-32 mx-8 ">
          <div className="flex flex-row">
            <div className="flex flex-col w-1/2 text-white items-left text-left">
              <div className="text-sky-500 font-semibold lg:text-2xl text-lg">{LSPValues[LSP].description}</div>
              <div className="lg:text-3xl text-xl mb-3 text-white">
                Deploy a {LSP} {LSPValues[LSP].type} with Lukso's {LSP}Mintable Contract
              </div>
              <div className="my-2 flex flex-row gap-1 lg:text-base text-sm">
                Most recently deployed {LSP} contract from your browser:
                <span className="font-bold">
                  <Address address={localStorage.getItem(`recent${LSP}Address`) ?? "N/A"} />
                </span>
              </div>
              <div>
                <FormTabs forms={LSPValues[LSP].forms} showForm={showForm} setShowForm={setShowForm} />

                <div className="flex flex-row mr-8 gap-2">
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
            </div>
            {LSP === "LSP7" && (
              <div className="relative w-1/2">
                <div className="absolute top-10 right-10">
                  <LSP7TokenCoin createToken={formValues} />
                </div>
              </div>
            )}

            {LSP === "LSP8" && (
              <div className="flex flex-col justify-center w-1/2">
                <LSP8NFTCard createToken={formValues} />
              </div>
            )}
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
