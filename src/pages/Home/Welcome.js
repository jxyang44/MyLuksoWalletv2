import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonClean } from "../../components";
import { petOwner } from "../../utils/sampleAccounts";
import { useProfileContext } from "../../contexts/ProfileContext";
import petProfile from "../../assets/Home/MLWPetProfile.svg";
import welcomeBg from "../../assets/Home/welcomebg.png";
import vault from "../../assets/Home/vault.png";
import swal from "sweetalert";

const Welcome = () => {
  const navigate = useNavigate();
  const { connectProfileUsingUPAddress, connectProfile } = useProfileContext();
  const [viewSamples, setViewSamples] = useState();
  const handleSampleAccount = () => {
    swal(
      "A note on the sample account:",
      "This account is for demonstration purposes only. You will be able to READ data from the blockchain, but you will not be able to WRITE any data to the blockchain. \n\nTo create an account with WRITE permissions, please connect your profile to the browser extension."
    ).then(res => {
      if (res) {
        connectProfileUsingUPAddress(petOwner);
        navigate("/MyLuksoWallet");
      }
    });
  };

  return (
    <div className="bg-no-repeat bg-cover bg-right-bottom" style={{ backgroundImage: `url(${welcomeBg})` }} id="welcome">
      <div className="w-full min-h-screen flex flex-wrap justify-between items-center gap-4 backdrop-brightness-50 xl:px-48 px-8">
        <div className="xl:w-1/2 flex flex-col">
          <div className="xl:text-5xl text-4xl">
            An Innovative Token & NFT <br></br>Vault Management System
          </div>
          <div className="xl:text-2xl text-xl mt-2 mb-6 text-sky-500">Build Your Digital Identity With MyLuksoWallet</div>
          <div className="flex flex-col text-xl font-semibold rounded-xl py-3 px-6 text-left text-slate-800 bg-gradient-to-br from-sky-400 via-sky-200 to-sky-300 mt-4 w-5/6 shadow-lg shadow-sky-500/50 animate-fadeInLeft">
            Get Started - Select from a Sample Account
            <div className="h-0.5 bg-white"></div>
            <div className="grid grid-cols-4 gap-2 m-2 text-center mx-4">
              <div>
                <button
                  className=" hover:text-slate-800 hover:bg-slate-200 border-2 rounded border-neutral-200 m-2 bg-sky-500 hover:scale-110 transition"
                  onClick={handleSampleAccount}>
                  <img src={petProfile} alt="pet profile" className=" opacity-50" />
                </button>
                Pet Owner
              </div>
              <div>
                <button
                  className=" hover:text-slate-800 hover:bg-slate-200 border-2 rounded border-neutral-200 m-2 bg-sky-500 hover:scale-110 transition"
                  onClick={handleSampleAccount}>
                  <img src={petProfile} alt="pet profile" className=" opacity-50" />
                </button>
                Pet Owner
              </div>
              <div>
                <button
                  className=" hover:text-slate-800 hover:bg-slate-200 border-2 rounded border-neutral-200 m-2 bg-sky-500 hover:scale-110 transition"
                  onClick={handleSampleAccount}>
                  <img src={petProfile} alt="pet profile" className=" opacity-50" />
                </button>
                Pet Owner
              </div>
              <div>
                <button
                  className=" hover:text-slate-800 hover:bg-slate-200 border-2 rounded border-neutral-200 m-2 bg-sky-500 hover:scale-110 transition"
                  onClick={handleSampleAccount}>
                  <img src={petProfile} alt="pet profile" className=" opacity-50" />
                </button>
                Pet Owner
              </div>
            </div>
          </div>
        </div>
        <div>
          <img src={vault} alt="Vault" className="w-[50vh] aspect-square perspective-vault" />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
