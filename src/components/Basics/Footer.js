import React from "react";
import { Logo, Socials } from "../../components";
import { AiOutlineTwitter, AiOutlineYoutube, AiOutlineGithub } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
const Footer = () => (
  <footer className="bg-gray-900 w-full">
    <div className="flex flex-col items-center max-w-5xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="flex justify-center text-teal-300">
        <Logo />
      </div>

      <p className="max-w-lg mx-auto mt-6 leading-relaxed text-center text-gray-400">
        © July - August 2022. All rights reserved by <b>MyLuksoVault</b>.<br></br>
        <em>LUKSO Build UP! #1 - demonstration purposes only</em>
      </p>

      {/* <nav className="mt-12" aria-labelledby="footer-navigation">
        <h2 className="sr-only" id="footer-navigation">
          Footer navigation
        </h2>

        <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              About
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Careers
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              History
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Services
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Projects
            </a>
          </li>

          <li>
            <a className="text-white transition hover:text-white/75" href="/">
              Blog
            </a>
          </li>
        </ul>
      </nav> */}

      <div className="flex justify-center items-center gap-6 mt-12 max-w-md md:gap-8">
        <Socials icon={<AiOutlineTwitter />} text={"Twitter"} link={"https://twitter.com/myluksowallet"} />
        <Socials icon={<AiOutlineYoutube />} text={"Youtube"} link={"https://www.youtube.com/channel/UC82THQV7NQHFQgw96DaVuVQ"} />
        <Socials icon={<AiOutlineGithub />} text={"Github"} link={"https://github.com/jxyang44/MyLuksoWallet"} />
        <Socials icon={<FaDiscord />} text={"Discord"} link={"https://discord.gg/uZ53kj3k"} />
      </div>
    </div>
  </footer>
);

export default Footer;
