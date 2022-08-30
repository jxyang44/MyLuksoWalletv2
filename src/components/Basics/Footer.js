import React from "react";
import { Logo, Socials } from "../../components";
import { AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-slate-900 w-full mt-32 pt-12">
    <div className="flex flex-col items-center max-w-5xl px-4 pb-8 mx-auto sm:px-6 xl:px-8">
      <div className="flex justify-center text-teal-300 mb-4">
        <Logo />
      </div>

      <div className="flex flex-row gap-48 justify-end items-center">
        <p className="max-w-lg mx-auto mt-6 leading-relaxed text-left text-gray-400">
          © 2022. All rights reserved by <b>MyLuksoWallet</b>.
        </p>
        <p className="max-w-lg mx-auto mt-6 leading-relaxed text-right text-gray-400">
          E-mail Us:{" "}
          <a href="mailto:myluksowallet@gmail.com" className="text-blue-500 hover:text-blue-300">
            MyLuksoWallet@gmail.com
          </a>
        </p>
      </div>

      <div className="flex justify-center items-center gap-6 mt-12 max-w-md md:gap-8">
        <Socials icon={<AiOutlineTwitter />} text={"Twitter"} link={"https://twitter.com/myluksowallet"} />
        <Socials icon={<AiOutlineYoutube />} text={"Youtube"} link={"https://www.youtube.com/channel/UC82THQV7NQHFQgw96DaVuVQ"} />
        <Socials icon={<FaDiscord />} text={"Discord"} link={"https://discord.gg/uZ53kj3k"} />
      </div>
    </div>
  </footer>
);

export default Footer;
