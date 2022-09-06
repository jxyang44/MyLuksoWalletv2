import React from "react";

import {
  AiOutlineTwitter,
  AiFillHome,
  AiFillQuestionCircle,
} from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import { IoDocumentSharp } from "react-icons/io5";
import { BsFillFileCodeFill } from "react-icons/bs";

const Link = ({ href, title, icon }) => {
  return (
    <a
      className="flex flex-row items-center justify-between gap-4 rounded-xl border border-gray-100 px-4 py-3 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <div className="inline-block rounded-lg border border-white bg-sky-600 p-2">
        {icon}
      </div>

      <div className="mt-2 text-right lg:text-sm xl:text-base">{title}</div>
    </a>
  );
};

const Resources = () => {
  return (
    <div className="mx-8 mt-24 max-w-screen-2xl rounded-xl border-4 border-sky-500 p-8 shadow-md shadow-sky-500 xl:mt-16">
      <div className="grid grid-cols-1 gap-y-8 xl:grid-cols-2 xl:items-center xl:gap-x-16">
        <div className="mx-auto max-w-lg text-center xl:mx-0 xl:text-left">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Lukso Resources
          </h2>

          <p className="mt-4 text-xl">
            Feel free to check out these links to learn more about Lukso.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Link
            href={"https://lukso.network/"}
            title={"Homepage"}
            icon={<AiFillHome />}
          />
          <Link
            href={"https://twitter.com/lukso_io"}
            title={"Twitter"}
            icon={<AiOutlineTwitter />}
          />
          <Link
            href={"https://discord.gg/MADeUN5Q"}
            title={"Discord"}
            icon={<FaDiscord />}
          />
          <Link
            href={"https://lukso.network/faq"}
            title={"Lukso FAQs"}
            icon={<AiFillQuestionCircle />}
          />
          <Link
            href={
              "https://uploads-ssl.webflow.com/629f44560745074760731ba4/62b200bfe0af12186845519a_LUKSO_Whitepaper_V1-1.pdf"
            }
            title={"Whitepaper"}
            icon={<IoDocumentSharp />}
          />
          <Link
            href={"https://docs.lukso.tech/faq/lukso/"}
            title={"Tech FAQs"}
            icon={<BsFillFileCodeFill />}
          />
        </div>
      </div>
    </div>
  );
};

export default Resources;
