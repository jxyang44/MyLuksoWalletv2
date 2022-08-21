import React, { useState, useEffect } from "react";
import { Banner, LSP7TokenCoin, CreateLSP7Form, MintLSP7Form } from "../../components";

const initialFormState = {
  tokenName: "",
  tokenSymbol: "",
  tokenDescription: "",
  tokenIcon: "",
  tokenIconURL: "",
  tokenImageFront: "",
  tokenImageFrontURL: "",
  tokenImageBack: "",
  tokenImageBackURL: "",
  mintAmount: 1,
  backgroundColor: "#000000",
  textColor: "#FFFFFF",
  isCreator: true,
  isNotDivisible: false,
  tokenSupply: "",
};

const initialFormState2 = {
  tokenAddress: "",
  mintAmount: "",
};

const CreateToken = () => {
  const [formValues, setFormValues] = useState(initialFormState);
  const [formValues2, setFormValues2] = useState(initialFormState2);
  const [recentLSP7Address, setRecentLSP7Address] = useState(""); //stores the most recent address of the deployed token (will override with each deployment)

  //add separate mint form for token creation
  useEffect(() => {
    setFormValues2({ ...formValues, tokenAddress: recentLSP7Address });
  }, [recentLSP7Address]);

  return (
    <div>
      {/* <Banner colorFrom={"from-green-500"} title={""} subtitle={""} buttonText={""} /> */}
      <div className="flex flex-row ml-4">
        <div className="flex flex-col w-1/2 text-white items-left text-left">
          <div className="text-sky-500 font-semibold text-2xl">LSP7 - Digital Asset (Based on ERC20)</div>
          <div className="text-3xl">Deploy a LS7 Token with Lukso's LSP7Mintable Contract</div>

          <div className="flex flex-row mr-8 gap-2 mt-16">
            <CreateLSP7Form
              formValues={formValues}
              setFormValues={setFormValues}
              initialFormState={initialFormState}
              setRecentLSP7Address={setRecentLSP7Address}
            />
            <div className="flex flex-col items-center justify-center">
              <MintLSP7Form
                formValues={formValues2}
                setFormValues={setFormValues2}
                initialFormState={initialFormState2}
                LSP={"LSP7"}
              />
              <div className="my-2">
                Most recently deployed LSP7 token contract (from local storage):{" "}
                <span className="text-green-500 font-bold">{localStorage.getItem("recentLSP7Address") ?? "N/A"} </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex items-end">
          <LSP7TokenCoin createToken={formValues} />
        </div>
      </div>
    </div>
  );
};
export default CreateToken;

// manually deploy - if needed later
// const myToken = new web3.eth.Contract(LSP7MintableContract.abi, {
//   gas: 5_000_000,
//   gasPrice: "1000000000",
// });

// swal("Deploying token...", { button: false, closeOnClickOutside: false });
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

// swal("Setting token metadata...", { button: false, closeOnClickOutside: false });
//   const LSP4Metadata = {
//     description: formValues.tokenDescription,

//   }
