import React from 'react'

const Button = ({buttonText, buttonFunc}) => {
  return (
    buttonText !== "" && 
    <button className="px-3 py-2 tracking-tighter text-sky-100 text-lg font-semibold rounded-lg transition-colors duration-300
        border-2 border-black bg-gradient-to-r from-sky-700  to-sky-500  hover:from-teal-500  hover:to-teal-700 
        hover:shadow-xl hover:border-white hover:text-white" onClick={buttonFunc}>
            {buttonText}
    </button>
  )
}

export default Button;