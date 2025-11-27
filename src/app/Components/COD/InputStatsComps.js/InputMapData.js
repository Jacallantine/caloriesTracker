"use client"
import React from "react"

export default function InputMapData({ placeholder, type, value, onChange, css }) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={`bg-white py-2 px-4 text-black ${css}`}
    />
  )
}
