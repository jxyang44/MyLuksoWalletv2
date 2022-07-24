//Context to manage global state variables related to website navigation
//Manage pop-ups (sidebar, universal profile dropdown)
//Manages screen size (for future mobile implementation)

import React, { createContext, useContext, useState } from 'react';
const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [activeProfile, setActiveProfile] = useState(false);
  return (
    <StateContext.Provider value={{ activeMenu, screenSize, setScreenSize, setActiveMenu,activeProfile, setActiveProfile }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);