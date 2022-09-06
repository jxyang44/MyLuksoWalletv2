//background for LSP7 coin

import React from "react";
import coinSilver from "../../../assets/MyLuksoWalletVisual/coinSilver.svg";

const Background = ({ assetImage }) => {
  return (
    <>
      <img
        src={coinSilver}
        className="absolute h-full w-full select-none opacity-70"
        style={{ userDrag: "false" }}
        alt="coin front"
      />
      {assetImage !== "" && (
        <div
          className={`absolute top-1/2 flex aspect-square w-[77%] -translate-y-1/2 items-center justify-center rounded-full p-2 opacity-50`}
        >
          {assetImage && (
            <img
              src={assetImage}
              className="aspect-square w-full select-none rounded-full"
              style={{ userDrag: "false" }}
            ></img>
          )}
        </div>
      )}
    </>
  );
};

export default Background;
