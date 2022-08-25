import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../utils/links";
import { useStateContext } from "../contexts/StateContext";
import { Logo, Socials } from "./";
import { AiOutlineTwitter, AiOutlineYoutube, AiOutlineGithub } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, theme, THEMES } = useStateContext();

  const [sidebarHoverLink, setSidebarHoverLink] = useState(THEMES.hoverLink[theme]);
  const [sidebarActiveLink, setSidebarActiveLink] = useState(THEMES.activeLink[theme]);
  const [background, setBackground] = useState(THEMES.background[theme]);
  const navigate = useNavigate();

  useEffect(() => {
    setSidebarHoverLink(THEMES.hoverLink[theme]);
    setBackground(THEMES.background[theme]);
    setSidebarActiveLink(THEMES.activeLink[theme]);
  }, [theme]);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink = `flex items-center tracking-tighter gap-2 pl-3 py-3 rounded-lg text-white ml-2 mr-4 bg-gradient-to-br ${sidebarActiveLink}`;
  const inactiveLink = `flex items-center tracking-tight gap-2 pl-3 py-1 rounded-lg text-slate-300 mr-4 ${sidebarHoverLink} hover:bg-slate-900 ml-2`;

  {
    /*Note: Keep "md:"" attributes for future mobile implementation*/
  }
  return (
    <div
      className={`flex flex-col h-screen sticky top-0 border-r-[1px] border-r-slate-700  overflow-auto md:overflow-x-hidden md:hover:overflow-auto bg-gradient-to-l from-slate-900 via-slate-800 to-slate-800 rounded-b-md rounded-t-sm`}>
      <div className={`absolute inset-0 h-screen bg-gradient-to-br ${background} rounded-lg blur opacity-25 -z-10`}></div>
      <div className="flex justify-between items-center ml-2 mt-4">
        <Logo customFunc={handleCloseSideBar} customProps={" py-2 px-1 "} />
        <button
          type="button"
          onClick={() => setActiveMenu(!activeMenu)}
          className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
          <MdOutlineCancel />
        </button>
      </div>

      <div className="mt-4">
        <button
          className=" text-white text-center w-5/6 py-1 px-3 border-2 hover:bg-slate-900 mx-3 hover:text-slate-white rounded"
          onClick={() => navigate("../MyLuksoWallet")}>
          Wallet DApp
        </button>
        {links.map(item => (
          <div key={item.title}>
            <p className="mx-3 mt-4 font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-slate-200 to-sky-500">{item.title}</p>
            {item.links.map(link => (
              <NavLink
                to={`/${link.page ? link.page : link.name.replaceAll(" ", "-")}`}
                key={link.name}
                onClick={handleCloseSideBar}
                className={({ isActive }) => (isActive ? activeLink : inactiveLink)}>
                {link.icon}
                <span className="capitalize">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-4 mt-3">
        <div className="border-t-[1px] border-t-slate-700 w-5/6"></div>
        <div className="flex flex-wrap w-5/6 gap-2 justify-center">
          <Socials icon={<AiOutlineTwitter />} text={"Twitter"} link={"https://twitter.com/myluksowallet"} />
          <Socials icon={<AiOutlineYoutube />} text={"Youtube"} link={"https://www.youtube.com/channel/UC82THQV7NQHFQgw96DaVuVQ"} />
          <Socials icon={<AiOutlineGithub />} text={"Github"} link={"https://github.com/jxyang44/MyLuksoWallet"} />
          <Socials icon={<FaDiscord />} text={"Discord"} link={"https://discord.gg/uZ53kj3k"} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
