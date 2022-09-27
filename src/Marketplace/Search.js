import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
const Search = () => {
  return (
    <div className="flex flex-row justify-center text-white -mb-10 h-10">
      <div className="mb-3 xl:w-[800px]">
        <div className="input-group relative mb-4 flex w-full flex-row items-stretch">
          <input
            type="search"
            className="relative m-0 w-full min-w-0 flex-auto rounded-l-xl border-gray-300 bg-clip-padding bg-slate-100 px-3 py-1.5 text-gray-700 transition ease-in-out focus:border-sky-500 focus:bg-white focus:text-gray-700 focus:outline-none"
            placeholder="Search"
          />
          <button
            className="btn flex items-center rounded-r-xl bg-sky-500 px-6  py-2.5 text-lg text-white shadow-md transition  ease-in-out hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg"
            type="button"
            onClick={() => {}}>
            <AiOutlineSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
