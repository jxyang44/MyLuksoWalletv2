import React from "react";
import { RiUserSearchLine } from "react-icons/ri";
import { Button_Shadow } from "..";
import { useNavigate } from "react-router-dom";

const LoginGraphic = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-8 m-20">
      <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-500 ">
        No Universal Profile detected.
      </div>
      <div className="flex justify-center items-center animate-pulse-slow text-9xl text-blue-500 border-sky-300 bg-gradient-to-tr from-pink-200 to-pink-100 border-8 rounded-full p-12 shadow-sky-300 shadow-lg">
        <RiUserSearchLine />
      </div>
      <div className="text-green-500">Please connect a Universal Profile to view your assets.</div>
      <Button_Shadow
        buttonText={"Instructions"}
        buttonFunc={() => navigate("../getstarted")}
        buttonColor={"bg-slate-500"}
        buttonTextColor={"text-black"}
      />
    </div>
  );
};

export default LoginGraphic;
