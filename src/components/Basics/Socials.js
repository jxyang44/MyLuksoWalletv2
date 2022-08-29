//social media button component

import React from "react";

const Socials = ({ icon, text, link }) => {
  return (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      className="flex flex-row w-[45%] gap-1 items-center justify-between text-slate-300 hover:text-white hover:bg-slate-900 text-sm border rounded border-white px-2 py-1 ">
      <div className="xl:text-base text-sm">{icon}</div>
      <div className="xl:text-sm text-xs text-right">{text}</div>
    </a>
  );
};

export default Socials;
