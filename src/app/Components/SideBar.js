'use client'
import { useState } from "react"

export default function SideBar({children}) {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div
      className={`border-r border-r-gray-400 transition-all duration-300 fixed top-[84px] flex flex-col items-center w-[300px] h-[90vh] z-10 bg-[#171717] text-white ${
        isOpen ? 'translate-x-0' : '-translate-x-[300px]'
      }`}
    >
      {children}

      <button
        onClick={()=> setIsOpen(!isOpen)} 
        className="cursor-pointer w-20 absolute -right-12 top-1/2 rotate-90 bg-white text-black"
      >
        {isOpen ? 'X' : '^'}
      </button>
    </div>
  )
}
