import React from 'react';
import { Link, NavLink ,useNavigate} from 'react-router-dom';

import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineWallet} from 'react-icons/ai'

import { links } from '../data/links';
import { useStateContext } from '../contexts/StateContext';
import {Logo, Button_Shadow} from './';

const activeLink = 'flex items-center tracking-tighter gap-2 pl-3 py-3 rounded-lg text-white text-lg ml-2 mr-4 bg-gradient-to-br from-slate-900 to-slate-700';
const inactiveLink = 'flex items-center tracking-tight gap-2 pl-3 py-1 rounded-lg text-md text-slate-300 mr-4 hover:bg-slate-900 ml-2';

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const navigate = useNavigate();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

   {/*Note: Keep "md:"" attributes for future mobile implementation*/}
  return (
    <div className="h-screen sticky top-0 md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-gradient-to-l from-slate-800 via-slate-600 to-slate-500 rounded-b-md rounded-t-sm">
      <div className="flex justify-between items-center ml-2 mt-4">
        <Logo customFunc = {handleCloseSideBar} customProps={"border-2 border-l-0 rounded-l-sm rounded-r-md border-blue-500 py-2"}/>
        <button type="button" onClick={() => setActiveMenu(!activeMenu)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
          <MdOutlineCancel />
        </button> 
      </div>

      <div className="mt-4">
        <Button_Shadow buttonText="View Wallet" buttonFunc={()=>navigate("../MyLuksoWallet")}/>
        {links.map((item) => (
          <div key={item.title}>
            <p className="mx-3 mt-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-tr from-slate-200 to-sky-500">
              {item.title}
            </p>
            {item.links.map((link) => (
              <NavLink
                to={`/${link.page ? link.page : link.name.replaceAll(' ', '-')}`}
                key={link.name}
                onClick={handleCloseSideBar}
               
                className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
              >
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