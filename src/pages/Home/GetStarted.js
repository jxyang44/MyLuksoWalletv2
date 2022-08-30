import React from "react";
import getstarted from "../../assets/Home/getstarted.png";
import { useNavigate } from "react-router-dom";
const GetStarted = () => {
  const navigate = useNavigate();
  return (
    <div className="overflow-hidden sm:grid sm:grid-cols-2 sm:items-center bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 my-32">
      <div className="p-8 md:p-12 lg:px-16 lg:py-24 xl:py-32">
        <div className="max-w-xl mx-auto text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white md:text-4xl">Get Started with MyLuksoWallet</h2>

          <p className="hidden text-white md:mt-4 md:block">
            Follow our guided tutorials to learn about LSPs and to begin using MyLuksoWallet.
            <br></br>
            <br></br> Set up an account with the browser extension, edit your Universal Profile, mint tokens & NFTs, create vaults, and more.
          </p>

          <div className="mt-4 md:mt-8">
            <button
              onClick={() => navigate("../getstarted")}
              className="inline-block px-12 py-3 text-xl text-white rounded transition bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring focus:ring-white">
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      <img
        alt="Get Started"
        src={getstarted}
        className="object-cover w-full h-full sm:h-[calc(100%_-_2rem)] md:h-[calc(100%_-_4rem)] sm:rounded-tl-[30px] md:rounded-tl-[60px] sm:self-end"
      />
    </div>
  );
};

export default GetStarted;
