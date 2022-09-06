//shows when the page requires fullscreen mode

import React from "react";
import { useStateContext } from "../../contexts/StateContext";
const FullScreenButton = ({ text }) => {
  const { setActiveMenu } = useStateContext();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <button
        className="aspect-square md:w-1/4 rounded-xl border-2 p-4 text-xl font-semibold hover:bg-slate-200 hover:text-slate-800"
        onClick={() => setActiveMenu(false)}
      >
        <div className="text-3xl">Explore </div>
        <br></br> {text}
      </button>
    </div>
  );
};

export default FullScreenButton;
