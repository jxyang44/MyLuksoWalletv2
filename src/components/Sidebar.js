import React, {useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { links } from "../utils/links";
import { useStateContext } from "../contexts/StateContext";
import { Logo } from "./";


const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize, theme, THEMES} = useStateContext();

  const [sidebarHoverLink, setSidebarHoverLink] = useState(THEMES.hoverLink[theme]);
  const [sidebarActiveLink, setSidebarActiveLink] = useState(THEMES.activeLink[theme]);
  const [sidebarBackground, setSidebarBackground] = useState(THEMES.sidebarBackground[theme]);
  const navigate = useNavigate();

  useEffect(() => {
    setSidebarHoverLink(THEMES.hoverLink[theme]);
    setSidebarBackground(THEMES.sidebarBackground[theme]);
    setSidebarActiveLink(THEMES.activeLink[theme]);
  }, [theme]);

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  

  const activeLink =
    `flex items-center tracking-tighter gap-2 pl-3 py-3 rounded-lg text-white text-lg ml-2 mr-4 bg-gradient-to-br ${sidebarActiveLink}`;
  const inactiveLink =
    `flex items-center tracking-tight gap-2 pl-3 py-1 rounded-lg text-slate-300 text-md mr-4 ${sidebarHoverLink} hover:bg-slate-900 ml-2`;
  

  {
    /*Note: Keep "md:"" attributes for future mobile implementation*/
  }
  return (
    <div className={`h-screen sticky top-0 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-gradient-to-l from-slate-800 via-slate-600 to-slate-500 rounded-b-md rounded-t-sm`}>
       <div className={`absolute inset-0 bg-gradient-to-br ${sidebarBackground} rounded-lg blur opacity-25 -z-10`} ></div>
      <div className="flex justify-between items-center ml-2 mt-4 ">
        <Logo
          customFunc={handleCloseSideBar}
          customProps={"border-2 border-l-0 rounded-md border-blue-500 py-2 px-1 bg-slate-700"}
        />
        <button
          type="button"
          onClick={() => setActiveMenu(!activeMenu)}
          className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
          <MdOutlineCancel />
        </button>
      </div>

      <div className="mt-4">
        <button
          className=" text-white text-center font-semibold text-xl w-5/6 h-16 border-2 bg-slate-700 shadow-inner  mx-4 hover:text-slate-800  rounded-xl hover:bg-slate-200 "
          onClick={() => navigate("../MyLuksoWallet")}>
          Explore MLW DApp
        </button>
        {links.map(item => (
          <div key={item.title}>
            <p className="mx-3 mt-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-slate-200 to-sky-500">
              {item.title}
            </p>
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
    </div>
  );
};

export default Sidebar;
