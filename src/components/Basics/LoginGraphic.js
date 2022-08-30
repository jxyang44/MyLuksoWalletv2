//shows when user is not connected to a universal profile
//provides options to connect, go to instructions, or proceed with sample account

import React from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { ButtonShadow } from "..";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../contexts/ProfileContext";
import { petOwner } from "../../utils/sampleAccounts";
import swal from "sweetalert";

const LoginGraphic = () => {
  const { connectProfile, connectProfileUsingUPAddress } = useProfileContext();
  let navigate = useNavigate();

  const handleSampleAccount = () => {
    swal("A note on the sample account:", "This account is for demonstration purposes only. You will be able to READ data from the blockchain, but you will not be able to WRITE any data to the blockchain. \n\nTo create an account with WRITE permissions, please connect your profile to the browser extension.").then(res => {
      if (res) connectProfileUsingUPAddress(petOwner);
    });
  };

  return (
    <div className="flex flex-col items-center gap-8 m-20 mt-[10vh]">
      <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 ">
        No Universal Profile detected.
      </div>
      <div className="flex justify-center items-center animate-pulse-slow text-9xl text-blue-500 border-sky-300 bg-gradient-to-tr from-pink-200 to-pink-100 border-8 rounded-full p-12 shadow-sky-300 shadow-lg">
        <RiUserSearchLine />
      </div>
      <div className="text-green-500">Please connect a Universal Profile to view your assets.</div>
      <div className="flex flex-row gap-6">
        <ButtonShadow //TO-DO
          buttonText={"View Example Account (Pet Owner)"}
          buttonFunc={handleSampleAccount}
          buttonColor={"bg-slate-500"}
          buttonTextColor={"text-black"}
        />
        <ButtonShadow buttonText={"Connect Profile"} buttonFunc={() => connectProfile()} buttonColor={"bg-blue-500"} buttonTextColor={"text-black"} />
        <ButtonShadow
          buttonText={"Instructions"}
          buttonFunc={() => navigate("../getstarted")}
          buttonColor={"bg-slate-500"}
          buttonTextColor={"text-black"}
        />
      </div>
    </div>
  );
};

export default LoginGraphic;
