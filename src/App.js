import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./contexts/StateContext";
import { Navbar, Footer, Sidebar } from "./components";
import {
  Home,
  MyLuksoWallet,
  AboutLukso,
  GetStarted,
  MyProfile,
  MyAssets,
  RelayService,
  CreateToken,
  CreateNFT,
  CreateVault,
  ProfileSearch,
} from "./pages";

const App = () => {
  const { theme, activeMenu, THEMES } = useStateContext();
  const [background, setBackground] = useState(THEMES.background[theme]);

  useEffect(() => {
    setBackground(THEMES.background[theme]);
  }, [theme]);

  return (
    <div className={`bg-gradient-to-br  from-slate-900 via-slate-800 to-slate-800 -z-20 contrast-100`} style={{ boxShadow: "inset 0 0 15px black" }}>
      <div className={`absolute inset-0 bg-gradient-to-br ${background} rounded-lg blur opacity-25`}></div>
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
                <Route path="/relayservice" element={<RelayService />} />
                <Route path="/createtoken" element={<CreateToken />} />
                <Route path="/createnft" element={<CreateNFT />} />
                <Route path="/createvault" element={<CreateVault />} />
                <Route path="/profilesearch" element={<ProfileSearch />} />
              </Routes>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
