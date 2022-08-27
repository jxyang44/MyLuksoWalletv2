import React from "react";

import { AiOutlineTwitter, AiFillHome, AiFillQuestionCircle } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { BsFillFileCodeFill } from "react-icons/bs";
const Link = ({ href, title, icon }) => {
  return (
    <a
      className="px-4 py-3 border border-gray-100 flex flex-row justify-between gap-4 items-center shadow-sm rounded-xl focus:outline-none focus:ring hover:border-gray-200 hover:ring-1 hover:ring-gray-200"
      href={href}
      rel="noreferrer"
      target="_blank">
      <div className="inline-block p-2 rounded-lg bg-sky-600 border border-white">{icon}</div>

      <h6 className="mt-2 font-bold text-right">{title}</h6>
    </a>
  );
};

const Introduction = () => {
  return (
    <div className="max-w-screen-2xl px-20 py-8 border-4 rounded-xl border-sky-500 shadow-md shadow-sky-500 lg:mt-16 mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-16 lg:items-center">
        <div className="max-w-lg mx-auto text-center lg:text-left lg:mx-0">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Lukso Resources</h2>

          <p className="mt-4 text-xl">Feel free to check out these links to learn more about Lukso.</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Link href={"https://lukso.network/"} title={"Homepage"} icon={<AiFillHome />} />
          <Link href={"https://twitter.com/lukso_io"} title={"Twitter"} icon={<AiOutlineTwitter />} />
          <Link href={"https://discord.gg/MADeUN5Q"} title={"Discord"} icon={<FaDiscord />} />
          <Link href={"https://lukso.network/faq"} title={"Lukso FAQs"} icon={<AiFillQuestionCircle />} />
          <Link
            href={"https://uploads-ssl.webflow.com/629f44560745074760731ba4/62b200bfe0af12186845519a_LUKSO_Whitepaper_V1-1.pdf"}
            title={"Whitepaper"}
            icon={<IoDocumentSharp />}
          />
          <Link href={"https://docs.lukso.tech/faq/lukso/"} title={"Tech FAQs"} icon={<BsFillFileCodeFill />} />
        </div>
      </div>
    </div>
  );
};

export default Introduction;
