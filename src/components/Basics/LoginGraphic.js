//shows when user is not connected to a universal profile
//provides options to connect, go to instructions, or proceed with sample account

import React from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { ButtonShadow, SampleAccounts } from "..";
import { useNavigate } from "react-router-dom";
import { useProfileContext } from "../../contexts/ProfileContext";

const LoginGraphic = () => {
  const { connectProfile } = useProfileContext();
  let navigate = useNavigate();

  return (
    <div className="mt-24 flex min-h-screen w-3/4 flex-col items-center justify-center gap-8 md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-xl font-bold text-transparent ">
        No Universal Profile detected.
      </div>
      <div className="flex animate-pulse-slow items-center justify-center rounded-full border-8 border-sky-300 bg-gradient-to-tr from-pink-200 to-pink-100 p-12 text-9xl text-blue-500 shadow-lg shadow-sky-300">
        <RiUserSearchLine />
      </div>
      <div className="text-center text-green-500">Please connect a Universal Profile to view your assets.</div>
      <div className="flex justify-center gap-6">
        <ButtonShadow buttonText={"Connect Profile"} buttonFunc={() => connectProfile()} buttonColor={"bg-blue-500"} buttonTextColor={"text-black"} />
        <ButtonShadow
          buttonText={"Instructions"}
          buttonFunc={() => navigate("../getstarted")}
          buttonColor={"bg-slate-500"}
          buttonTextColor={"text-black"}
        />
      </div>
      <SampleAccounts />
    </div>
  );
};

export default LoginGraphic;
