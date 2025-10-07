"use client"
import { useState } from "react"
export default function Input({data}){
    const [inputData, setInputData] = useState(data)
    return <input className="bg-white text-black px-4 py-2" value={inputData} onChange={e => setInputData(e.target.value)}/>
    
}