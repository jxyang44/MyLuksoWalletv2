//standard sidebar with social media links
//data stored in ..utils/links.js

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../utils/links";
import { useStateContext } from "../contexts/StateContext";
import { Logo, Socials } from "./";
import { AiOutlineTwitter, AiOutlineYoutube } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, theme, THEMES } =
    useStateContext();

  //THEMES... is based on theme selection in the "Universal Profile"
  const [sidebarHoverLink, setSidebarHoverLink] = useState(
    THEMES.hoverLink[theme]
  );
  const [sidebarActiveLink, setSidebarActiveLink] = useState(
    THEMES.activeLink[theme]
  );
  const [background, setBackground] = useState(THEMES.background[theme]);
  const navigate = useNavigate();

  useEffect(() => {
    setSidebarHoverLink(THEMES.hoverLink[theme]);
    setBackground(THEMES.background[theme]);
    setSidebarActiveLink(THEMES.activeLink[theme]);
  }, [theme]);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && window.innerWidth <= 768) {
      setActiveMenu(false);
    }
  };

  const activeLink = `flex items-center tracking-tighter gap-2 pl-3 py-3 rounded-lg text-white ml-2 mr-4 bg-gradient-to-br ${sidebarActiveLink}`;
  const inactiveLink = `flex items-center tracking-tight gap-2 pl-3 py-1 rounded-lg text-slate-300 mr-4 ${sidebarHoverLink} hover:bg-slate-900 ml-2`;

  return (
    <div
      className={`sticky top-0 flex h-screen flex-col rounded-b-md rounded-t-sm border-r-[1px] border-r-slate-700 bg-gradient-to-l from-slate-900 via-slate-800 to-slate-800 overflow-x-hidden hover:overflow-y-auto`}
    >
      <div
        className={`absolute inset-0 h-screen bg-gradient-to-br ${background} -z-10 rounded-lg opacity-25 blur`}
      ></div>
      <div className="ml-2 mt-4 flex items-center justify-between">
        <Logo customFunc={handleCloseSideBar} customProps={" py-2 px-1 "} />
        <button
          type="button"
          onClick={() => setActiveMenu(!activeMenu)}
          className="hover:bg-light-gray mt-4 block rounded-full p-3 text-xl md:hidden"
        >
          <MdOutlineCancel />
        </button>
      </div>

      <div className="mt-4 text-xs lg:text-sm xl:text-base">
        <button
          className=" hover:text-slate-white mx-3 w-5/6 rounded border-2 py-1 px-3 text-center text-white hover:bg-slate-900"
          onClick={() => navigate("../MyLuksoWallet")}
        >
          Wallet DApp
        </button>
        {links.map((item) => (
          <div key={item.title}>
            <p className="mx-3 mt-4 bg-gradient-to-tr from-slate-200 to-sky-500 bg-clip-text font-semibold text-transparent">
              {item.title}
            </p>
            {item.links.map((link) => (
              <NavLink
                to={`/${
                  link.page ? link.page : link.name.replaceAll(" ", "-")
                }`}
                key={link.name}
                onClick={handleCloseSideBar}
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                {link.icon}
                <span className="capitalize">{link.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-col items-center gap-4">
        <div className="w-5/6 border-t-[1px] border-t-slate-700"></div>
        <div className="flex w-5/6 flex-wrap justify-center gap-2">
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
    </div>
  );
};

export default Sidebar;
