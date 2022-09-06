//social media button component

import React from "react";

const Socials = ({ icon, text, link }) => {
  return (
    <a
      href={link}
      rel="noreferrer"
      target="_blank"
      className="flex w-[45%] flex-row items-center justify-between gap-1 rounded border border-white px-2 py-1 text-sm text-slate-300 hover:bg-slate-900 hover:text-white "
    >
      <div className="text-sm xl:text-base">{icon}</div>
      <div className="text-right text-xs xl:text-sm">{text}</div>
    </a>
  );
};

export default Socials;
