//Context to manage global state variables related to website navigation
//Manage pop-ups (sidebar, universal profile dropdown)
//Manages screen size (for future mobile implementation)

import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();

const themeDefaults = {
  theme: "slate",
  UPColor: "#FFFFFF",
  UPTextColor: "#000000",
};
export const StateProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [activeMenu, setActiveMenu] = useState(true);
  const [activeProfile, setActiveProfile] = useState(false);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [theme, setTheme] = useState(themeDefaults.theme);
  const [UPColor, setUPColor] = useState(themeDefaults.UPColor);
  const [UPTextColor, setUPTextColor] = useState(themeDefaults.UPTextColor);


  const setThemeDefaults = () => {
    setTheme(themeDefaults.theme);
    setUPColor(themeDefaults.UPColor);
    setUPTextColor(themeDefaults.UPTextColor);
  }

  const THEMES = {
    sidebarBackground: {
      slate: `from-slate-800 via-slate-600 to-slate-500`,
      gray: "from-gray-800 via-gray-600 to-gray-500",
      zinc: "from-zinc-800 via-zinc-600 to-zinc-500",
      neutral: "from-neutral-800 via-neutral-600 to-neutral-500",
      stone: "from-stone-800 via-stone-600 to-stone-500",
      red: "from-red-800 via-red-600 to-red-500",
      orange: "from-orange-800 via-orange-600 to-orange-500",
      amber: "from-amber-800 via-amber-600 to-amber-500",
      yellow: "from-yellow-800 via-yellow-600 to-yellow-500",
      lime: "from-lime-800 via-lime-600 to-lime-500",
      green: "from-green-800 via-green-600 to-green-500",
      emerald: "from-emerald-800 via-emerald-600 to-emerald-500",
      teal: "from-teal-800 via-teal-600 to-teal-500",
      cyan: "from-cyan-800 via-cyan-600 to-cyan-500",
      sky: "from-sky-800 via-sky-600 to-sky-500",
      indigo: "from-indigo-800 via-indigo-600 to-indigo-500",
      violet: "from-violet-800 via-violet-600 to-violet-500",
      purple: "from-purple-800 via-purple-600 to-purple-500",
      pink: "from-pink-800 via-pink-600 to-pink-500",
      rose: "from-rose-800 via-rose-600 to-rose-500",
    },
    background: {
      slate: `from-slate-900 via-slate-800 to-slate-800`,
      gray: "from-gray-900 via-gray-800 to-gray-800",
      zinc: "from-zinc-900 via-zinc-800 to-zinc-800",
      neutral: "from-neutral-900 via-neutral-800 to-neutral-800",
      stone: "from-stone-900 via-stone-800 to-stone-800",
      red: "from-red-900 via-red-800 to-red-800",
      orange: "from-orange-900 via-orange-800 to-orange-800",
      amber: "from-amber-900 via-amber-800 to-amber-800",
      yellow: "from-yellow-900 via-yellow-800 to-yellow-800",
      lime: "from-lime-900 via-lime-800 to-lime-800",
      green: "from-green-900 via-green-800 to-green-800",
      emerald: "from-emerald-900 via-emerald-800 to-emerald-800",
      teal: "from-teal-900 via-teal-800 to-teal-800",
      cyan: "from-cyan-900 via-cyan-800 to-cyan-800",
      sky: "from-sky-900 via-sky-800 to-sky-800",
      indigo: "from-indigo-900 via-indigo-800 to-indigo-800",
      violet: "from-violet-900 via-violet-800 to-violet-800",
      purple: "from-purple-900 via-purple-800 to-purple-800",
      pink: "from-pink-900 via-pink-800 to-pink-800",
      rose: "from-rose-900 via-rose-800 to-rose-800",
    },
    hoverLink: {
      slate: "hover:bg-slate-900",
      gray: "hover:bg-gray-900",
      zinc: "hover:bg-zinc-900",
      neutral: "hover:bg-neutral-900",
      stone: "hover:bg-stone-900",
      red: "hover:bg-red-900",
      orange: "hover:bg-orange-900",
      amber: "hover:bg-amber-900",
      yellow: "hover:bg-yellow-900",
      lime: "hover:bg-lime-900",
      green: "hover:bg-green-900",
      emerald: "hover:bg-emerald-900",
      teal: "hover:bg-teal-900",
      cyan: "hover:bg-cyan-900",
      sky: "hover:bg-sky-900",
      indigo: "hover:bg-indigo-900",
      violet: "hover:bg-violet-900",
      purple: "hover:bg-purple-900",
      pink: "hover:bg-pink-900",
      rose: "hover:bg-rose-900",
    },
    activeLink: {
      slate: "from-slate-700 to-slate-900",
      gray: "from-gray-700 to-gray-900",
      zinc: "from-zinc-700 to-zinc-900",
      neutral: "from-neutral-700 to-neutral-900",
      stone: "from-stone-700 to-stone-900",
      red: "from-red-700 to-red-900",
      orange: "from-orange-700 to-orange-900",
      amber: "from-amber-700 to-amber-900",
      yellow: "from-yellow-700 to-yellow-900",
      lime: "from-lime-700 to-lime-900",
      green: "from-green-700 to-green-900",
      emerald: "from-emerald-700 to-emerald-900",
      teal: "from-teal-700 to-teal-900",
      cyan: "from-cyan-700 to-cyan-900",
      sky: "from-sky-700 to-sky-900",
      indigo: "from-indigo-700 to-indigo-900",
      violet: "from-violet-700 to-violet-900",
      purple: "from-purple-700 to-purple-900",
      pink: "from-pink-700 to-pink-900",
      rose: "from-rose-700 to-rose-900",
    },
  };


  // const THEMES = {
  //   background: `from-${theme}-900 via-${theme}-800 to-${theme}-800`,
  //   sidebarBackground: `from-${theme}-800 via-${theme}-600 to-${theme}-500`,
  //   hoverLink: `hover:bg-${theme}-900`,
  //   activeLink: `from-${theme}-700 to-${theme}-900`,
  // };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        screenSize,
        setScreenSize,
        scrollHeight,
        setScrollHeight,
        setActiveMenu,
        activeProfile,
        setActiveProfile,
        theme,
        setTheme,
        UPColor,
        setUPColor,
        UPTextColor,
        setUPTextColor,
        THEMES,
        setThemeDefaults
      }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
