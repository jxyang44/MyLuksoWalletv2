import React from "react";
import { useNavigate } from "react-router-dom";
import {ButtonClean} from "../../components"

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="w-3/4 flex flex-col justify-center items-center gap-4 text-center my-32">
      <div className="text-sky-500 font-semibold lg:text-3xl text-2xl">
        Powered by Universal Profiles and Lukso Standard Proposals
      </div>
      <div className="lg:text-5xl text-4xl">
        A Visual Representation of <br></br>Universal Profiles, Tokens, NFTs and Vaults
      </div>
      <div className="lg:text-2xl text-xl mt-2 mb-6">Build Your Digital Identity With MyLuksoWallet</div>
      <button
        className="text-xl w-1/4 aspect-square hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 border-2 p-4"
        onClick={() => navigate("/myluksowallet")}>
        Get Started
      </button>
      <div className="flex flex-row w-2/3 gap-6 mt-2 justify-center">
       <ButtonClean buttonText={"Hackathon"} buttonFunc={() => navigate("/hackathon")} customStyle={"w-1/3 p-4 text-center"}/>
       <ButtonClean buttonText={"Instructions"} buttonFunc={() => navigate("/getstarted")} customStyle={"w-1/3 p-4 text-center"}/>
       <ButtonClean buttonText={"About Lukso"} buttonFunc={() => navigate("/about")} customStyle={"w-1/3 p-4 text-center"}/>
        {/* <button
          className="w-1/3 text-xl hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 border-2 p-4"
          onClick={() => navigate("/hackathon")}>
          Hackathon
        </button>
        <button
          className=" w-1/3 text-xl hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 border-2 p-4"
        onClick={() => navigate("/getstarted")}>
         Instructions
        </button>
        <button
          className="w-1/3 text-xl hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 border-2 p-4"
          onClick={() => navigate("/about")}>
          About Lukso
        </button> */}
      </div>
    </div>
  );
};

export default Welcome;
