import React from 'react'
import { IconContext } from "react-icons";
import {ImArrowRight2} from 'react-icons/im';
import {Banner} from '../components';
import emptyUP from '../assets/empty-up.png';
const criteriaData = [
    {
        title: 'Potential Contribution',
        subtitle: 'How will this project contribute to the growth of the LUKSO ecosystem?',
        text: 'yes bring users in by providing a comprehensive and step-by-step breakdown of what lukso has to offer, including example use cases',
    },
    {
        title: 'Originality & Creativity',
        subtitle: 'How novel and innovative is the idea?',
        text: 'original bc the first vault blah blah blah blah blah blah. MyLuksoVault will be the de facto vault interface',
    },
    {
        title: 'Technical Excellence',
        subtitle: 'Is the code well-written, well-documented, and/or technically innovative?',
        text: 'yes code is clean and well-documented - see readme and comments throughout. TO-DO: how technically innovative?? first of its kind (consider allowing multi-wallet [metamask also] connection)',
    },
    {
        title: 'User Experience & Design',
        subtitle: 'Does the design of the project make the user experience easy?',
        text: 'yes, simple and understandable - UI for LSP9; includes example use LSP7 and LSP8 use cases',
    },
    {
        title: 'Usage of LUKSO’s new standards and tools',
        subtitle: 'To what extent are the available standards and tools leveraged?',
        text: 'yes, utilizes ERC725, LSP0, LSP1, LSP2, LSP3, LSP4, LSP7, LSP8, LSP9, LSP10, erc725.js, lsp-factory.js',
    },
];

const Criterion = ({ title, subtitle, text }) => (
<div className="w-full flex justify-between items-center flex-row m-2">

    <div className="max-w-lg border-2 border-slate-200 rounded p-2 w-full">
        <h1 className="font-primary font-extrabold text-lg text-black">{title}</h1>
        <p className="pl-1 font-secondary text-sm text-white">{subtitle}</p>
    </div>
    <IconContext.Provider value={{ color: "white", size:"2rem" }}>
        <div className='mx-4'>
            <ImArrowRight2/>
        </div>
    </IconContext.Provider>
    <div className="max-w-xl">
        <p className="font-medium text-sm text-white">{text}</p>
    </div>
</div>
);

const Hackathon = () => {
  return (
    <div className="flex flex-col w-full text-white">
        <img className="w-84 opacity-50 absolute bottom-2 right-8 -z-10" src={emptyUP} alt="empty-up" />
        <Banner 
             colorFrom = {"from-sky-500"} 
             title = {`LUKSO Build UP! Hackathon`} 
             subtitle = {"Hackathon submission."}
             buttonText = {"Hackathon info"}
             buttonFunc = {() => window.open("https://lukso.network/hackathon?utm_source=docs&utm_medium=docs&utm_campaign=banner")}
        />
        <div className="w-full flex justify-between flex-row">
            <div className="flex justify-start items-start flex-col text-left pl-12 max-w-sm">
                <h1 className="font-secondary text-4xl text-gradient-colored">Judging Criteria</h1>
                <div className="mt-8 p-4 border-4 rounded border-violet-300 ring-4 ring-offset-2 ring-sky-300">
                <p className="text-base leading-7 font-medium">Five judging criteria were provided as part of the LUKSO Build UP! hackathon.
                </p>
                </div>
            </div>
            <div className="flex justify-start items-center flex-col mr-10">
            {criteriaData.map((item, index) => (
                
                <Criterion title={item.title} subtitle={item.subtitle} text={item.text} key={item.title + index} />
            ))}
            </div>
        </div>
        OUTLINE
        <ol className='pl-4'>
            <li>introduction</li>
            <li>about MLW - features offered, continue project after submission, next steps</li>
            <li>judging criteria</li>
            <li>connection to future networks & disclaimer</li>
            <li>to-dos (if some features not finished/robust) (overlap w next steps?)</li>
            <li>bio/contact</li>
        </ol>
    </div>
  )
}

export default Hackathon