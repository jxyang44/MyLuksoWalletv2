import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./contexts/StateContext";
import { Navbar, Sidebar } from "./components";
import {
  Home,
  MyLuksoWallet,
  AboutLukso,
  GetStarted,
  MyProfile,
  MyAssets,
  RelayService,
  CreateToken,
  CreateVault,
  ProfileSearch,
  MyVaults,
  UnderConstruction,
} from "./pages";


const App = () => {
  const { theme, activeMenu, THEMES } = useStateContext();
  const [background, setBackground] = useState(THEMES.background[theme]);

  useEffect(() => {
    setBackground(THEMES.background[theme]);
  }, [theme]);

  return (
    <div className={`bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 -z-20 h-full w-full`} style={{ boxShadow: "inset 0 0 15px black" }}>
      <div className={`fixed inset-0 w-full h-full bg-gradient-to-br ${background} rounded-lg blur opacity-25`}></div>
      <BrowserRouter>
        <div className="flex relative">
          {activeMenu ? (
            <div className="w-72 transition-all duration-300 sticky ease-in">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 transition-all duration-300">
              <Sidebar />
            </div>
          )}
          <div className={activeMenu ? "min-h-screen w-full" : "w-full min-h-screen flex-2"}>
            <div className="sticky w-full top-0 z-10">
              <Navbar />
            </div>
            <div>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/myluksowallet" element={<MyLuksoWallet />} />
                <Route path="/getstarted" element={<GetStarted />} />
                <Route path="/aboutlukso" element={<AboutLukso />} />
                <Route path="/myuniversalprofile" element={<MyProfile />} />
                <Route path="/myassets" element={<MyAssets />} />
                <Route path="/myvaults" element={<MyVaults />} />
                <Route path="/relayservice" element={<RelayService />} />
                <Route path="/createtoken" element={<CreateToken LSP="LSP7" />} />
                <Route path="/createnft" element={<CreateToken LSP="LSP8" />} />
                <Route path="/createvault" element={<CreateVault />} />
                <Route path="/profilesearch" element={<ProfileSearch />} />
                <Route path="/tokensearch" element={<UnderConstruction />} />
                <Route path="/nftsearch" element={<UnderConstruction />} />
                <Route path="/vaultsearch" element={<UnderConstruction />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
