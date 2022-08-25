import React from 'react'

const ButtonClean = ({buttonText, buttonFunc, customStyle}) => {
  return (
    <button
    className={`lg:text-xl md:text-base text-base hover:text-slate-800 font-semibold rounded-xl hover:bg-slate-200 border-2 text-white lg:p-4 p-2 ${customStyle}`}
    onClick={buttonFunc}>
    {buttonText}
  </button>
  )
}

export default ButtonClean