import React from 'react'
import {Button} from '.'

const Banner = ({colorFrom, title, subtitle, buttonText, buttonFunc}) => {
  return (
    <div className={`flex justify-between items-center flex-row p-8 my-10 bg-gradient-to-r from-${colorFrom}`}>
        <div className="flex flex-col text-left text-white">
          <h3 className="text-2xl font-extrabold">{title}</h3>
          <p className="text-s font-medium">{subtitle}</p>
        </div>
        <div className="mr-8">      
            <Button buttonText={buttonText} buttonFunc={buttonFunc}/>
        </div>
    </div>
  )
}

export default Banner