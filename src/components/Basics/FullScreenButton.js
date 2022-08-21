import React from "react";
import { useStateContext } from "../../contexts/StateContext";
const FullScreenButton = ({text}) => {

  const { setActiveMenu } = useStateContext();

  return (
    <div className="flex flex-col items-center justify-center text-white mt-[20vh]">
      <button
        className="text-xl w-1/4 aspect-square hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 border-2 p-4"
        onClick={() => setActiveMenu(false)}>
        <div className="text-3xl">Explore </div>
        <br></br> {text}
      </button>
    </div>
  );
};

export default FullScreenButton;
