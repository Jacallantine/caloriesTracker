"use client"
import React from "react"

export default function WhiteButton({ initLabel, initCss = "", onClick }) {
  return (
    <button
    onClick={onClick}
      className={`cursor-pointer w-full py-2 hover:bg-white hover:text-black duration-300 ${initCss}`}
    >
      {initLabel}
    </button>
  )
}
