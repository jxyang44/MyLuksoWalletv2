import React, { useState, useEffect } from "react";
import { FormContainer } from "..";
import { useProfileContext } from "../../contexts/ProfileContext";
import { useAssetsContext } from "../../contexts/AssetsContext";
import { LSP7MintableContract, LSP8MintableContract, LSPMapping } from "../../utils/ERC725Config.js";

import swal from "sweetalert";

const inputStyle = "shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline";
const inputLabel = "block text-white text-sm font-bold";

const LSPMap = {
  LSP7: { contract: LSP7MintableContract },
  LSP8: { contract: LSP8MintableContract },
};

const MintLSP7Form = ({ formValues, setFormValues, initialFormState, LSP }) => {
  const { currentAccount } = useProfileContext();
  const { mintToken, supportsInterface } = useAssetsContext();
  const [supportsInterfaceState, setSupportsInterfaceState] = useState(false);

  useEffect(() => {
    console.log(supportsInterfaceState);
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
    if (!supportsInterfaceState) return swal(`This address does not support the ${LSP} interface.`);
    if (!(formValues.mintAmount && formValues.tokenAddress)) return swal(`Please fill out all required fields.`);
    if (formValues.mintAmount <= 0) return swal(`Please enter a positive amount.`);

    mintToken(formValues.tokenAddress, formValues.mintAmount, currentAccount, LSPMap[LSP].contract);
  };

  return (
    <FormContainer
      title={`Mint ${LSP} Token`}
      subtitle={`The contract must be deployed and must support ${LSP}`}
      mainOverride={"border-green-500 shadow-green-500 h-fit"}
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

      <div className="flex items-center justify-between">
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => setFormValues(initialFormState)}>
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

export default MintLSP7Form;
