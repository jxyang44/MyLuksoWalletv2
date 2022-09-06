//component for links at bottom of profile page

import React from "react";
import { Link } from "react-router-dom";

const MyMenuItem = ({ icon, iconColor, linkTo, header }) => {
  return (
    <button className="mb-4 flex w-1/4 items-center justify-end gap-1">
      <div
        className={`flex items-center justify-center rounded-lg p-3 ${iconColor} h-10 w-10 text-white shadow-md shadow-black hover:scale-110`}>
        {linkTo && <Link to={linkTo}>{icon}</Link>}
      </div>
      <p className="text-sm w-28 font-semibold text-left">{header}</p>
    </button>
  );
};

export default MyMenuItem;
