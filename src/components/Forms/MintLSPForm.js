//form to mint a LSP7 or LSP8 token based on user inputs
//TO-DO add guardrail for check contract owner and mint permissions before allowing submission
import React, { useState, useEffect } from "react";
import { FormContainer } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { LSP7MintableContract, LSP8MintableContract, LSPMapping } from "../../utils/luksoConfigs.js";

import swal from "sweetalert";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline";
const inputLabel = "block text-white text-sm font-bold";

//@param formValues - object of form values
//@param setFormValues - sets formValues
//@param initialMintState - states for resetting form
//@param LSP either "LSP7" or "LSP8"
const MintLSPForm = ({ formValues, setFormValues, initialMintState, LSP }) => {
  const { getAccountType } = useProfileContext();
  const { mintLSP7, mintLSP8, supportsInterface } = useAssetsContext();
  const [supportsInterfaceState, setSupportsInterfaceState] = useState(false);
  const [mintToMessage, setMintToMessage] = useState("");
  useEffect(() => {
    //double-checks whether address supports the interface - should return true if "LSP" prop matches address interface
    supportsInterface(formValues.tokenAddress, LSPMapping[LSP].contract).then(result => {
      if (result) setSupportsInterfaceState(true);
      else {
        setSupportsInterfaceState(false);
      }
    });
  }, [formValues.tokenAddress]);

  const set = name => {
    return ({ target }) => {
      setFormValues(current => ({ ...current, [name]: target.value }));
    };
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!supportsInterfaceState) return swal(`Could not detect a ${LSP} interface for this asset.`);

    if (LSP === "LSP7") {
      if (!(formValues.mintAmount && formValues.mintToAddress && formValues.tokenAddress)) return swal(`Please fill out all required fields.`);
      if (formValues.mintAmount <= 0) return swal(`Please enter a positive amount.`);
      mintLSP7(formValues.tokenAddress, formValues.mintAmount, formValues.mintToAddress, LSP7MintableContract);
    } else if (LSP === "LSP8") {
      if (!(formValues.tokenID && formValues.mintToAddress && formValues.tokenAddress)) return swal(`Please fill out all required fields.`);
      if (mintToMessage !== `This Address is a Valid ERC725 Account`) return swal(`You cannot mint to this account.`);
      if (formValues.tokenID <= 0) return swal(`TokenID is already taken.`);
      mintLSP8(formValues.tokenAddress, formValues.tokenID, formValues.mintToAddress, LSP8MintableContract);
    }
  };

  useEffect(() => {
    setMintToMessage("");
    getAccountType(formValues.mintToAddress).then(res => {
      if (res === "Invalid") setMintToMessage("This Address is Not Valid");
      else if (res === "EOA") setMintToMessage("This Address is an EOA Account (minting to an EOA is not recommended or supported at this time)");
      //TO-DO handle set force to true in the future
      else {
        setMintToMessage(`This Address is a Valid ERC725 Account`);
      }
    });
  }, [formValues.mintToAddress]);

  return (
    <FormContainer
      title={`Mint ${LSP} Token`}
      subtitle={`The contract must already be deployed and must support ${LSP}. Please make sure you have permissions to mint this token. ${
        LSP === "LSP8" ? "(The current implementation of mints identical properties to new token IDs. This will be updated in the future.)" :""
      }`}
      mainOverride={"border-green-500 shadow-green-500 h-fit rounded-tl-none"}
      textOverride={"text-green-500"}>
      <div className="mb-4">
        {formValues.tokenAddress !== "" && (
          <>
            {supportsInterfaceState ? (
              <div className={`${inputLabel} text-green-500`}>{`Valid ${LSP} address`}</div>
            ) : (
              <div className={`${inputLabel} text-red-500`}>{`Invalid ${LSP} address`}</div>
            )}
          </>
        )}
        <div className={inputLabel}>Token Address (required)</div>
        <input
          className={inputStyle}
          type="text"
          value={formValues.tokenAddress}
          placeholder={"Token Address"}
          required
          onChange={set("tokenAddress")}
        />
      </div>

      <div className={`${inputLabel} ${mintToMessage === "This Address is a Valid ERC725 Account" ? "text-green-500" : "text-red-500"}`}>
        {mintToMessage}
      </div>
      <div className="mb-4">
        <div className={inputLabel}>Mint to Address (required)</div>
        <input
          className={inputStyle}
          type="text"
          value={formValues.mintToAddress}
          placeholder={"Mint to Address"}
          required
          onChange={set("mintToAddress")}
        />
      </div>

      {LSP === "LSP7" && (
        <div className="mb-4">
          <div className={inputLabel}>Mint Amount (required)</div>
          <input
            className={inputStyle}
            type="number"
            value={formValues.mintAmount}
            placeholder={0}
            onChange={set("mintAmount")}
            required
            min={0}
            max={1000000}
          />
        </div>
      )}
      {LSP === "LSP8" && (
        <div className="mb-4">
          <div className={inputLabel}>Token ID (required)</div>
          <input className={inputStyle} type="text" value={formValues.tokenID} onChange={set("tokenID")} required />
        </div>
      )}

      <div className="flex items-center justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setFormValues(initialMintState)}>
          Reset
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmit}>
          Create Token
        </button>
      </div>
    </FormContainer>
  );
};

export default MintLSPForm;
