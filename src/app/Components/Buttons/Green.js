"use client"
import React from "react"

export default function GreenButton({ initLabel, initCss = "", onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`bg-blue-600 px-6 py-2 rounded hover:bg-white hover:text-blue-600 duration-300 cursor-pointer ${initCss}`}
    >
      {initLabel}
    </button>
  )
}
