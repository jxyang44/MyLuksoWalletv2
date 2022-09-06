import React from "react";
import { Socials } from "../../components";
import { AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Footer = () => (
  <footer className="w-full bg-slate-900 pt-4">
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 px-4 pb-8 sm:px-6 xl:px-8">
      <div className="flex flex-row items-center justify-end text-xs md:gap-48 md:text-base">
        <p className="mx-auto max-w-lg text-left leading-relaxed text-gray-400">
          © 2022. All rights reserved by <b>MyLuksoWallet</b>.
        </p>
        <p className="mx-auto max-w-lg text-right leading-relaxed text-gray-400">
          E-mail Us:{" "}
          <a
            href="mailto:myluksowallet@gmail.com"
            className="text-blue-500 hover:text-blue-300"
          >
            MyLuksoWallet@gmail.com
          </a>
        </p>
      </div>

      <div className="flex max-w-md items-center justify-center gap-6 md:gap-8">
        <Socials
          icon={<AiOutlineTwitter />}
          text={"Twitter"}
          link={"https://twitter.com/myluksowallet"}
        />
        <Socials
          icon={<AiOutlineYoutube />}
          text={"Youtube"}
          link={"https://www.youtube.com/channel/UC82THQV7NQHFQgw96DaVuVQ"}
        />
        <Socials
          icon={<FaDiscord />}
          text={"Discord"}
          link={"https://discord.gg/uZ53kj3k"}
        />
      </div>
    </div>
  </footer>
);

export default Footer;
