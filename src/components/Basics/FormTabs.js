//selections tab right above forms

import React from "react";

//@param forms array of {name, border} for each tab
//@param showForm/setShowForm used to toggle active form state
const FormTabs = ({ forms, showForm, setShowForm }) => {
  return (
    <div className="flex flex-row gap-2 text-lg">
      {forms.map((form, i) => {
        return (
          <button
            key={i + form}
            className={` 3/12 rounded-t border-b-0 px-2 py-1 text-sm text-slate-300 shadow-md hover:bg-slate-700  hover:text-white xl:text-base  ${
              showForm === form.name &&
              `border-2 bg-transparent text-base font-semibold text-white xl:text-lg ${form.border}`
            }`}
            onClick={() => setShowForm(form.name)}
          >
            {form.name}
          </button>
        );
      })}
    </div>
  );
};

export default FormTabs;
