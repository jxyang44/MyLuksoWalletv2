import React from 'react'

const FormTabs = ({forms, showForm, setShowForm}) => {
  return (
    <div className="flex flex-row text-lg gap-2">
    {forms.map((form,i) => {
      return (
        <button key={i+form}
          className={` px-2 py-1 rounded-t lg:w-2/12 w-4/12 border-b-0 shadow-md lg:text-base text-sm text-slate-300  hover:text-white hover:bg-slate-700  ${
            showForm === form.name && `border-2 bg-transparent font-semibold lg:text-lg text-base text-white ${form.border}`
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