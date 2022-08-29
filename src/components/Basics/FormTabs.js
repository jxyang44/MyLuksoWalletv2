//selections tab right above forms

import React from 'react'

//@param forms array of {name, border} for each tab
//@param showForm/setShowForm used to toggle active form state
const FormTabs = ({forms, showForm, setShowForm}) => {
  return (
    <div className="flex flex-row text-lg gap-2">
    {forms.map((form,i) => {
      return (
        <button key={i+form}
          className={` px-2 py-1 rounded-t 3/12 border-b-0 shadow-md xl:text-base text-sm text-slate-300  hover:text-white hover:bg-slate-700  ${
            showForm === form.name && `border-2 bg-transparent font-semibold xl:text-lg text-base text-white ${form.border}`
          }`}
          onClick={() => setShowForm(form.name)}>
          {form.name}
        </button>
      );
    })}
  </div>
  )
}

export default FormTabs