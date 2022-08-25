import React from "react";

import { IconContext } from "react-icons";
import { ImArrowRight2 } from "react-icons/im";

import emptyUP from "../assets/empty-up.png";

import { Banner } from "../components";
import { Introduction, Socials, LSPs} from "./Lukso";

const criteriaData = [
  {
    title: "Potential Contribution",
    subtitle: "How will this project contribute to the growth of the LUKSO ecosystem?",
    text: "yes bring users in by providing a comprehensive and step-by-step breakdown of what lukso has to offer, including example use cases",
  },
  {
    title: "Originality & Creativity",
    subtitle: "How novel and innovative is the idea?",
    text: "original bc the first vault blah blah blah blah blah blah. MyLuksoVault will be the de facto vault interface",
  },
  {
    title: "Technical Excellence",
    subtitle: "Is the code well-written, well-documented, and/or technically innovative?",
    text: "yes code is clean and well-documented - see readme and comments throughout. TO-DO: how technically innovative?? first of its kind (consider allowing multi-wallet [metamask also] connection)",
  },
  {
    title: "User Experience & Design",
    subtitle: "Does the design of the project make the user experience easy?",
    text: "yes, simple and understandable - UI for LSP9; includes example use LSP7 and LSP8 use cases",
  },
  {
    title: "Usage of LUKSO’s new standards and tools",
    subtitle: "To what extent are the available standards and tools leveraged?",
    text: "yes, utilizes ERC725, LSP0, LSP1, LSP2, LSP3, LSP4, LSP7, LSP8, LSP9, LSP10, erc725.js, lsp-factory.js",
  },
];



const Criterion = ({ title, subtitle, text }) => (
  <div className="w-full flex justify-between items-center flex-row m-2">
    <div className="max-w-lg border-2 border-slate-200 rounded p-2 w-full">
      <h1 className="font-primary font-extrabold text-lg text-white">{title}</h1>
      <p className="pl-1 font-secondary text-sm text-white">{subtitle}</p>
    </div>
    <IconContext.Provider value={{ color: "white", size: "2rem" }}>
      <div className="mx-4">
        <ImArrowRight2 />
      </div>
    </IconContext.Provider>
    <div className="max-w-xl">
      <p className="font-medium text-sm text-white">{text}</p>
    </div>
  </div>
);

const AboutLukso = () => {


  return (
    <>
    <div className="flex flex-col text-white">
    {/* <img className="w-84 opacity-50 absolute bottom-2 right-8 -z-10" src={emptyUP} alt="empty-up" /> */}
    <Banner
      colorFrom={"from-sky-500"}
      title={`About Lukso`}
      subtitle={"Hackathon submission."}
      buttonText={"Hackathon info"}
      buttonFunc={() =>
        window.open("https://lukso.network/hackathon?utm_source=docs&utm_medium=docs&utm_campaign=banner")
      }
    />
   
      {/* <div className="flex justify-start items-center flex-col mr-10">
        {criteriaData.map((item, index) => (
          <Criterion title={item.title} subtitle={item.subtitle} text={item.text} key={item.title + index} />
        ))}
      </div> */}

    
  </div>
    
  

      <div className="flex w-full justify-center items-center my-10">
        <div className="flex  justify-start items-start flex-col">
          

        </div>

      
      </div>
      <Introduction />
      {/* <LSPs /> */}
      <Socials/>
      whitepaper, 
      <div>
        <ol className="pl-4 text-white">
          <li>created by...</li>
          <li>building blocks (LSPs)</li>
          <li>learn more: links</li>
          <li>plug socials</li>
          <li>https://lukso.network/faq</li>
        </ol>
      </div>
    
    </>
  );
};

export default AboutLukso;
