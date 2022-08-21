import React, { useEffect } from "react";
import { FormContainer } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { createLSPFactoryPrivateKeyInstance, createLSPFactoryWindowInstance, LSP7MintableContract } from "../../utils/ERC725Config.js";
import { test } from "../../assets/MyLuksoWalletVisual/Coin/";
import swal from "sweetalert";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline";
const inputLabel = "block text-white text-sm font-bold";
const imageLabel = " text-xs text-center cursor-pointer font-semibold text-white";

// const PreSelectedIcon = ({ imageType, imageLabel, customFunc, paths = { paths } }) => {
//   return (
//     <div>
//       <div className={inputLabel}>{imageLabel}</div>
//       <select onChange={customFunc} className={`rounded border-2 border-white bg-black text-center h-11 capitalize text-white`}>
//         {paths.map(path => {
//           return (
//             <option className="" value={path}>
//               {path}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };

const CreateLSP7Form = ({ formValues, setFormValues, initialFormState,setRecentLSP7Address }) => {
  const { currentAccount, useRelay } = useProfileContext();
  const { mintToken } = useAssetsContext();

  const reqSvgs = require.context("../../assets/MyLuksoWalletVisual/Coin/", true, /\.svg$/);
  const paths = reqSvgs.keys();
  const svgs = paths.map(path => reqSvgs(path));
  useEffect(() => {
    console.log(paths);

    console.log(svgs);
  }, []);

  const handleCreateTokenContract = () => {
    const createTokenContract = async () => {
      try {
        console.log("------------ deploying new token contract ------------");
        swal("Please wait. Deploying your LSP7Mintable token contract...", { button: false, closeOnClickOutside: false });

        const lspFactory = useRelay ? createLSPFactoryPrivateKeyInstance() : createLSPFactoryWindowInstance(); // TO-DO window instance isnt working

        // const {ethereum} = window;
        // await ethereum.request({ method: 'eth_requestAccounts', params: [] });

        // const lspFactory = new LSPFactory(ethereum, {
        //   chainId: 2828,
        // });

        return await lspFactory.LSP7DigitalAsset.deploy(
          {
            name: formValues.tokenName,
            symbol: formValues.tokenSymbol,
            controllerAddress: currentAccount,
            creators: [formValues && currentAccount],
            isNFT: formValues.isNotDivisible,
            digitalAssetMetadata: {
              description: formValues.description,
              icon: formValues.tokenIcon,
              images: [formValues.tokenPicture],
              backgroundColor: formValues.backgroundColor,
              textColor: formValues.textColor,
            },
          },
          {
            // ipfsGateway: IPFS_GATEWAY_INFURA,
            onDeployEvents: {
              next: deploymentEvent => {
                console.log(deploymentEvent);
                swal(
                  "Please wait. Deploying your LSP7Mintable token contract...",
                  `Deployment type: ${deploymentEvent?.type}
                     Contract name: ${deploymentEvent?.contractName}
                     Function name:  ${deploymentEvent?.functionName}
                     Status:  ${deploymentEvent?.status}
                     Contract Address:  ${deploymentEvent?.contractAddress}
                    `,
                  { button: false, closeOnClickOutside: false }
                );
              },
              error: error => {
                console.log(error);
              },
              complete: async contracts => {
                const newAddress = contracts.LSP7DigitalAsset.address;
                swal(
                  "Congratulations! You created a new LSP7Mintable contract on the blockchain :)",
                  `Please keep track of the following contract addresses:
                    \n LSP7 Digital Asset: ${newAddress}
                    `
                );
                setRecentLSP7Address(newAddress);
                localStorage.setItem("recentLSP7Address", newAddress);
                console.log("Deployment Complete");
                console.log(contracts);
              },
            },
          }
        );
      } catch (err) {
        console.warn(err.message);
        return;
      }
    };

    currentAccount
      ? createTokenContract().then(res => {
          console.log(res.LSP7DigitalAsset.address);
          formValues.mintAmount > 0 && mintToken(res.LSP7DigitalAsset.address, formValues.mintAmount, currentAccount, LSP7MintableContract);
        })
      : swal("A profile must be connected before deploying a contract.");
  };

  const set = name => {
    return ({ target }) => {
      setFormValues(current => ({ ...current, [name]: target.value }));
    };
  };

  const handleUpdateFile = name => {
    return ({ target }) => {
   
      target.files.length &&
        setFormValues(current => ({ ...current, [name]: target.files[0], [name + "URL"]: URL.createObjectURL(target.files[0]) }));
    };
  };

//   const handleSelectFromFile = (e,name) => {
//     console.log(e,name)
//     function dataURLtoFile(dataurl, filename) {
//       var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//       while(n--){
//       u8arr[n] = bstr.charCodeAt(n);
//       }
//     return new File([u8arr], filename, {type:mime});
//    }

//     const imageLink = reqSvgs(e.target.value);
// console.log(imageLink)
//     const newFile = dataURLtoFile(imageLink, name);
//     console.log(newFile)
//     setFormValues(current => ({ ...current, [name]: newFile.files[0], [name + "URL"]: URL.createObjectURL(newFile.files[0]) }));
//   };

  const handleSubmit = e => {
    e.preventDefault();
    if (formValues.tokenName && formValues.tokenSymbol) handleCreateTokenContract();
    else swal("Please fill out all required fields.");
  };

  return (
    <FormContainer title={"Create LSP7 Token"} subtitle={"Your token will be deployed on the blockchain"}>
      <div className="mb-4">
        <div className={inputLabel}>Token Name (required)</div>
        <input
          className={inputStyle}
          type="text"
          value={formValues.tokenName}
          placeholder="Token Name"
          maxLength="30"
          required
          onChange={set("tokenName")}
        />
      </div>
      <div className="mb-4">
        <div className={inputLabel}>Token Symbol (required)</div>
        <input
          className={inputStyle}
          type="text"
          value={formValues.tokenSymbol}
          placeholder="Token Symbol"
          maxLength="6"
          required
          onChange={set("tokenSymbol")}
        />
      </div>
      <div className="mb-4">
        <div className={inputLabel}>Initial Mint Amount</div>
        <input
          className={inputStyle}
          type="number"
          value={formValues.mintAmount}
          placeholder={1}
          onChange={set("mintAmount")}
          min={0}
          max={1000000}
        />
      </div>
      <div className="mb-4">
        <div className={inputLabel}>Token Description</div>
        <textarea className={inputStyle} value={formValues.description} placeholder="Token Description" onChange={set("tokenDescription")} />
      </div>
      <div className="flex flex-row justify-between mb-4 gap-2">
        <label htmlFor="tokenIcon" className={inputStyle + imageLabel}>
          Upload Icon
        </label>
        <input id="tokenIcon" className="hidden" type="file" onChange={handleUpdateFile("tokenIcon")} />
        <label htmlFor="imageFront" className={inputStyle + imageLabel}>
          Upload Front Image
        </label>
        <input id="imageFront" className="hidden" type="file" onChange={handleUpdateFile("tokenImageFront")} />
        <label htmlFor="imageBack" className={inputStyle + imageLabel}>
          Upload Back Image
        </label>
        <input id="imageBack" className="hidden" type="file" onChange={handleUpdateFile("tokenImageBack")} />
      </div>
      {/* <div className="flex flex-row justify-between mb-4 gap-2">
        <PreSelectedIcon imageType={"tokenIcon"} imageLabel={"Pre-Selected Icon"} customFunc={(e)=>handleSelectFromFile(e,"tokenIcon")} paths={paths} />
      </div> */}
      <div className="flex flex-row items-center mb-4 justify-between h-8">
        <div className="text-white font-semibold">Token Color</div>
        <input type="color" value={formValues.backgroundColor} onChange={set("backgroundColor")} className="h-8 w-8 rounded "></input>
        <div className="text-white font-semibold ml-16">Text Color</div>
        <input type="color" value={formValues.textColor} onChange={set("textColor")} className="h-8 w-8 rounded "></input>
      </div>
      <div className="flex flex-row mb-4">
        <input
          type="checkbox"
          name="isCreator"
          checked={formValues.isCreator}
          onChange={e => setFormValues(current => ({ ...current, isCreator: e.target.checked }))}
        />
        <div className={inputLabel + " ml-1"}>Set My UP Address as Creator</div>
      </div>
      <div className="flex flex-row mb-4">
        <input
          type="checkbox"
          name="isNotDivisible"
          checked={formValues.isNotDivisible}
          onChange={e => setFormValues(current => ({ ...current, isNotDivisible: e.target.checked }))}
        />
        <div className={inputLabel + " ml-1"}>Integer Token Supply (not used ATM)</div>
      </div>
      {/* <div className="mb-4 opacity-70">
              <div className={inputLabel}>Token Supply (disabled)</div>
              <input className={inputStyle} type="text" placeholder="Token Supply (disabled)" disabled onChange={set("tokenSupply")} />
            </div> */}

      <div className="flex items-center justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setFormValues(initialFormState)}>
          Reset
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}>
          Create Token
        </button>
      </div>
    </FormContainer>
  );
};

export default CreateLSP7Form;
