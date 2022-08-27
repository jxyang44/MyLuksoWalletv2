//component for links at bottom of profile page

import React from 'react';
import {Link} from 'react-router-dom';

const MyMenuItem = ({ icon, iconColor, linkTo, header }) => {

  return (
    
    <div className="flex gap-1 mb-4 items-center content-center justify-end w-1/3">
      <div className={`flex justify-center items-center text-xl rounded-lg p-3 ${iconColor} w-12 h-12   ${linkTo==="" ? "grayscale":"text-white shadow-md shadow-black hover:scale-110 cursor-pointer"}`}>
        {linkTo && <Link to={linkTo}>{icon}</Link>}
      </div>   
        <p className="font-semibold text-md w-28">{header}</p>
    </div>
  );
};

export default MyMenuItem;