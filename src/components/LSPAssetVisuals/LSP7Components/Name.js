//rounded text around LSP7 coin
import React from 'react'

const Name = ({assetName, rotationOffset}) => {
  return (
    <div className={`font-['Lora_Sans'] italic font-bold xl:text-5xl lg:text-4xl md:text-4xl sm:text-2xl text-center uppercase`}>
    {assetName?.split("").map((char, i) => (
      <div
        className="absolute top-[1.5vmax] left-[50%] w-[2vmax] text-center"
        key={i}
        style={{
          transform: `rotate(${6 * i - assetName.length * 3-rotationOffset}deg)`,
          transformOrigin: `0 18vmax`,
        }}>
        {char}
      </div>
    ))}

    {assetName?.split("").map((char, i) => (
      <div
        className="absolute bottom-[1.5vmax] left-[50%] w-[2vmax] text-center"
        key={i}
        style={{
          transform: `rotate(${3 * assetName.length - 6 * i-rotationOffset*.7}deg)`,
          transformOrigin: `0 -16vmax`,
        }}>
        {char}
      </div>
    ))}
  </div>
  )
}

export default Name