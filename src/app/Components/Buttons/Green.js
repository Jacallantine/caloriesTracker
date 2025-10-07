"use client"
import React from "react"

export default function GreenButton({ initLabel, initCss = "", initFunc }) {
  return (
    <button 
      onClick={initFunc}
      className={`bg-green-500 px-6 py-2 rounded ${initCss}`}
    >
      {initLabel}
    </button>
  )
}
