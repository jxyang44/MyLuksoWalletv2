import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "./contexts/StateContext";
import { Navbar, Footer, Sidebar } from "./components";
import {
  Home,
  MyLuksoWallet,
  Hackathon,
  About,
  GetStarted,
  MyProfile,
  MyAssets,
  CreateProfile,
  CreateToken,
  CreateNFT,
  CreateVault,
} from "./pages";

const App = () => {
  const { activeMenu } = useStateContext();

  return (
    <div
      className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-800 -z-20 contrast-100"
      style={{ boxShadow: "inset 0 0 15px black" }}>
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
                <Route path="/" element={<MyLuksoWallet />} />
                <Route path="/home" element={<Home />} />
                <Route path="/myluksowallet" element={<MyLuksoWallet />} />
                <Route path="/hackathon" element={<Hackathon />} />
                <Route path="/getstarted" element={<GetStarted />} />
                <Route path="/about" element={<About />} />
                <Route path="/myuniversalprofile" element={<MyProfile />} />
                <Route path="/mytokens" element={<MyAssets LSP_7_8_or_9="LSP7" LSP_5_10_or_12="LSP5" />} />
                <Route path="/myNFTs" element={<MyAssets LSP_7_8_or_9="LSP8" LSP_5_10_or_12="LSP5" />} />
                <Route path="/myvaults" element={<MyAssets LSP_7_8_or_9="LSP9" LSP_5_10_or_12="LSP5" />} />
                <Route path="/createprofile" element={<CreateProfile />} />
                <Route path="/createtoken" element={<CreateToken />} />
                <Route path="/createnft" element={<CreateNFT />} />
                <Route path="/createvault" element={<CreateVault />} />
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
