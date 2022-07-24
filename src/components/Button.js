import React from 'react'

const Button = ({buttonText, buttonFunc}) => {
  return (
    buttonText !== "" && 
    <button type="button" className="px-8 py-2 text-white font-bold text-lg rounded-lg cursor-pointer 
        border-2 border-black bg-gradient-to-r from-rose-500 to-yellow-500
        hover:shadow-xl hover:to-violet-500 hover:from-violet-900 hover:border-white" onClick={buttonFunc}>
            {buttonText}
    </button>
  )
}

export default Button;