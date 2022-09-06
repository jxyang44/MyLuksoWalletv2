import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useStateContext } from "./contexts/StateContext";
import { Navbar, Sidebar, Footer } from "./components";
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

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};

const App = () => {
  const { theme, activeMenu, THEMES } = useStateContext();
  const [background, setBackground] = useState(THEMES.background[theme]);

  useEffect(() => {
    setBackground(THEMES.background[theme]);
  }, [theme]);

  return (
    <div
      className={`-z-20 h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 sm:w-full`}
      style={{ boxShadow: "inset 0 0 15px black" }}
    >
      <div
        className={`fixed inset-0 h-full w-full bg-gradient-to-br ${background} rounded-lg opacity-25 blur`}
      ></div>
      <BrowserRouter>
        <div className="relative flex">
          {activeMenu ? (
            <div className="sticky w-48 md:w-64 transition-all duration-300 ease-in">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 transition-all duration-300">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu ? "min-h-screen w-full" : "flex-2 min-h-screen w-full"
            }
          >
            <div
              className={`fixed top-0 z-10 transition-none ${
                activeMenu ? "w-[calc(100vw-12rem)] md:w-[calc(100vw-16rem)]" : "w-full"
              }`}
            >
              <Navbar />
            </div>
            <div className="min-h-screen w-full">
              <ScrollToTop>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/myluksowallet" element={<MyLuksoWallet />} />
                  <Route path="/getstarted" element={<GetStarted />} />
                  <Route path="/aboutlukso" element={<AboutLukso />} />
                  <Route path="/myuniversalprofile" element={<MyProfile />} />
                  <Route path="/myassets" element={<MyAssets />} />
                  <Route path="/myvaults" element={<MyVaults />} />
                  <Route path="/relayservice" element={<UnderConstruction />} />
                  <Route
                    path="/createtoken"
                    element={<CreateToken LSP="LSP7" />}
                  />
                  <Route
                    path="/createnft"
                    element={<CreateToken LSP="LSP8" />}
                  />
                  <Route path="/createvault" element={<CreateVault />} />
                  <Route path="/profilesearch" element={<UnderConstruction />} />
                  <Route path="/tokensearch" element={<UnderConstruction />} />
                  <Route path="/nftsearch" element={<UnderConstruction />} />
                  <Route path="/vaultsearch" element={<UnderConstruction />} />
                </Routes>
              </ScrollToTop>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
