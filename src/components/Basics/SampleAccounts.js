import React from "react";
import { useNavigate } from "react-router-dom";
import petProfile from "../../assets/Home/MLWPetProfile.svg";
import sportsProfile from "../../assets/Home/MLWSportsProfile.png";
import swal from "sweetalert";
import { petOwner, sportsFan } from "../../utils/sampleAccounts";
import { useProfileContext } from "../../contexts/ProfileContext";

const SampleAccounts = () => {
  const navigate = useNavigate();
  const { connectProfileUsingUPAddress } = useProfileContext();

  const handleSampleAccount = sampleAddress => {
    swal(
      "A note on the sample account:",
      "This account is for demonstration purposes only. You will be able to READ data from the blockchain, but you will not be able to WRITE any data to the blockchain. \n\nTo create an account with WRITE permissions, please connect your profile to the browser extension."
    ).then(res => {
      if (res) {
        connectProfileUsingUPAddress(sampleAddress);
        navigate("/MyLuksoWallet");
      }
    });
  };


  return (
    <div className="mt-4 flex w-5/6 animate-fadeInLeft flex-col rounded-xl bg-gradient-to-br from-sky-400 via-sky-200 to-sky-300 py-3 px-6 text-center text-xl font-semibold text-sky-700 shadow-lg  shadow-sky-500/50 md:text-left">
      Get Started with a Sample Account
      <div className="mt-1 h-0.5 bg-white"></div>
      <div className="m-2 mx-4 grid grid-cols-2 gap-2 text-center text-base font-normal text-gray-700 md:grid-cols-3">
        <div>
          <button
            className="m-2 rounded-2xl border-2 border-neutral-200 bg-[#8AACF0] transition hover:scale-110 hover:brightness-125"
            onClick={() => handleSampleAccount(petOwner)}>
            <img src={petProfile} alt="Pet Lover" className=" opacity-50" />
          </button>
          Pet Owner
        </div>
        <div>
          <button
            className="m-2 rounded-2xl border-2 border-neutral-200 bg-[#D2945B] transition hover:scale-110 hover:brightness-125"
            onClick={() => handleSampleAccount(sportsFan)}>
            <img src={sportsProfile} alt="Sports Fan" className=" opacity-50" />
          </button>
          Sports Fan
        </div>
      </div>
    </div>
  );
};

export default SampleAccounts;
