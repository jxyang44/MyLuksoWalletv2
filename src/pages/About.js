import React from "react";

import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { Banner } from "../components";

const About = () => {
  const adjectiveStyles =
    "min-h-[69px] flex justify-center items-center border border-violet-400 text-lg text-violet-900 hover:shadow-xl";

  const ServiceCard = ({ color, title, icon, subtitle }) => (
    <div className="flex flex-row justify-start items-center white-glassmorphism p-3 m-2 hover:shadow-xl w-5/6">
      <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>{icon}</div>
      <div className="ml-5 flex flex-col flex-1">
        <h3 className="mt-2 text-white text-lg">{title}</h3>
        <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <div className="mt-4">
      <Banner colorFrom={"from-cyan-500"} title={"About LUKSO"} subtitle={""} buttonText={""} />

      <div className="flex w-full justify-center items-center mx-4 my-10">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-4xl text-white py-1">What are Lukso Standard Proposals (LSPs)?</h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Designed using the Lukso Standard Proposal 9 (LSP9)
          </p>

          <div className="grid sm:grid-cols-2 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${adjectiveStyles}`}>Secure</div>
            <div className={`sm:rounded-tr-2xl ${adjectiveStyles}`}>Vaulted</div>
            <div className={`sm:rounded-bl-2xl ${adjectiveStyles}`}>User-Friendly</div>
            <div className={`rounded-br-2xl ${adjectiveStyles}`}>Organized</div>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard
            color="bg-[#F84550]"
            title="The Next Step in Blockchain Evolution"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="yayyyy. words"
          />
          <ServiceCard
            color="bg-[#2952E3]"
            title="Securely organize Your Assets"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="LSP9 allows for segmentation of smart contract assets. blah blah blah blah blah blah blah blah blah "
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Customize Access"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Restrict access to specific vaults. Only allowed accounts are permitted to access your vault."
          />
        </div>
      </div>
      <div>
        <ol className="pl-4 text-white">
          <li>created by...</li>
          <li>building blocks (LSPs)</li>
          <li>learn more: links</li>
          <li>https://lukso.network/faq</li>
        </ol>
      </div>
    </div>
  );
};

export default About;
