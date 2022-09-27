import React from "react";

const FirstOfAKind = () => {
  return (
    <div className="flex h-[500px] w-full items-center justify-center border-t border-b border-gray-700 py-10">
      <div className="flex w-1/2 flex-col items-center text-2xl lg:text-3xl xl:text-4xl ">
        <div className="h-[250px] rounded-2xl border border-gray-800 bg-gradient-to-br from-slate-700 to-slate-800 px-12 py-6 text-lg shadow-xl shadow-sky-500/10  md:text-xl lg:text-2xl xl:text-3xl">
          First of a Kind
        </div>
      </div>
      <div className="flex w-1/2 flex-col">
        MyLuksoWallet is the first fully functional marketplace to include Vaults, NFTs and Universal Profiles.
      </div>
    </div>
  );
};

export default FirstOfAKind;
