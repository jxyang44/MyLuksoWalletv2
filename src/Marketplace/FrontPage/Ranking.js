import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const formTabs = [
  //header data for form ribbons
  { name: "Top Profiles" },
  { name: "Top Vaults" },
];

const TopProfiles = () => {
  return (
    <motion.div
      className="flex h-[500px] w-full flex-row gap-2 rounded-2xl bg-gradient-to-tl from-slate-700 to-slate-800"
      key="topProfiles"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 1.0,
      }}>
      <div></div>
    </motion.div>
  );
};

const Ranking = () => {
  const [showForm, setShowForm] = useState(formTabs[0].name);

  return (
    <div className="flex min-h-[85vh] w-full flex-col items-start justify-start">
      <div className="mb-4 flex flex-row gap-2 text-slate-500">
        {formTabs.map((form, i) => {
          return (
            <button
              key={i + form}
              className={`w-[250px] rounded-2xl border-b-0 px-2 py-4 text-xl transition xl:text-3xl ${
                showForm === form.name
                  ? `border-2 border-sky-500/10  text-base font-semibold  text-white shadow-xl shadow-sky-500/10`
                  : "bg-gradient-to-tl from-slate-700 to-slate-800 shadow-md hover:border-sky-500/10 hover:bg-gradient-to-br hover:shadow-sky-500/10"
              }`}
              onClick={() => setShowForm(form.name)}>
              {form.name}
            </button>
          );
        })}
      </div>

      <AnimatePresence>{showForm === "Top Profiles" && <TopProfiles />}</AnimatePresence>
    </div>
  );
};

export default Ranking;
