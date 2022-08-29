import React from "react";
import { useNavigate } from "react-router-dom";
import {ButtonClean} from "../../components"
import {petOwner} from "../../utils/sampleAccounts";
import { useProfileContext } from "../../contexts/ProfileContext";
import swal from "sweetalert";

const Welcome = () => {
  const navigate = useNavigate();
  const { connectProfileUsingUPAddress } = useProfileContext();

  const handleSampleAccount = () => {
    swal("Viewing sample account...", "This account is for demonstration purposes only. You will be able to READ data from the blockchain, but you will not be able to WRITE any data to the blockchain. To create an account with WRITE permissions, please connect your profile to the browser extension.").then(res => {
      if (res) connectProfileUsingUPAddress(petOwner);
    });
  };

  return (
    <div className="w-3/4 flex flex-col justify-center items-center gap-4 text-center mb-32 xl:my-32" id="welcome" >
      <div className="text-sky-500 font-semibold xl:text-3xl text-2xl">
        Powered by Universal Profiles and Lukso Standard Proposals
      </div>
      <div className="xl:text-5xl text-4xl">
        A Visual Representation of <br></br>Universal Profiles, Tokens, NFTs and Vaults
      </div>
      <div className="xl:text-2xl text-xl mt-2 mb-6">Build Your Digital Identity With MyLuksoWallet</div>
      <button
        className="text-xl xl:w-1/4 w-5/12 aspect-square hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 border-2 p-4"
        onClick={() => navigate("/myluksowallet")}>
        Get Started
      </button>
      <div className="flex flex-row xl:w-2/3 w-11/12 gap-6 mt-2 justify-center">
     
       <ButtonClean buttonText={"View Example Account \n(Pet Owner)"} buttonFunc={handleSampleAccount} customStyle={"w-1/3 p-4 text-center"}/>
       <ButtonClean buttonText={"Instructions"} buttonFunc={() => navigate("/getstarted")} customStyle={"w-1/3 p-4 text-center"}/>
       <ButtonClean buttonText={"About Lukso"} buttonFunc={() => navigate("/aboutlukso")} customStyle={"w-1/3 p-4 text-center"}/>
      </div>
    </div>
  );
};

export default Welcome;
