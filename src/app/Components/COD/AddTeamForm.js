"use client"

import { useEffect, useState } from "react"
import Input from "../Inputs/input"

export default function AddTeamForm(){
    const [teamName, setTeamName] = useState("")
    const [inputCount, setInputCount] = useState([{input : 1, playerName : ""}, {input : 2, playerName : ""}, {input : 3, playerName : ""},{input : 4, playerName : ""}])
    
    function inputHandler(i, char){
        setInputCount((prev) => {
            let updated = [...prev]
            updated[i] = {...updated[i], playerName : char}
            return updated
        })
    }
    async function createTeam(){

        

           let res = await fetch("/api/cod/addTeam", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body : JSON.stringify({teamName : teamName, players : inputCount})
    })
    }
    return (
        <form onSubmit={createTeam} className="flex flex-col items-center mx-auto md:mt-[100px] bg-white w-full max-w-[600px] text-black py-6 rounded">
            <h1 className="mb-6 md:text-4xl text-2xl italic">Create New Team</h1>
            <div className="flex flex-col gap-y-2">
          
            <input className="w-full max-w-[440px] mx-auto border-1 px-2 py-2 rounded" value = {teamName} onChange={e => setTeamName(e.target.value)} placeholder="Enter Team Name" required/>
                <div className="flex flex-wrap justify-center gap-2 mb-6 w-full max-w-[450px]">
                
                
                    {
                        inputCount.map((input, i) =>(
                                <input className={`${inputCount.length % 2 === 1 && inputCount.length - 1 === i ? "w-[440px]" : "w-[216px]"} border 1px rounded px-2 py-2`} key={i} value={inputCount.playerName} onChange={(e) => inputHandler(i, e.target.value)} placeholder={`Player ${input.input}`} required/>
                        ))
                        
                    }
                </div>
            </div>
            <div className="flex w-full justify-center mb-4">
            <button className="cursor-pointer duration-300 border-2 border-transparent bg-blue-600 text-white w-full max-w-[216px] py-1 text-lg hover:text-blue-600 hover:bg-white hover:border-blue-600" onClick={(e)=> {e.preventDefault(); setInputCount((prev) => [...prev, {input : prev.length + 1, playerName : ""}]);}}>+</button>
            <button className="cursor-pointer duration-300 border-2 border-transparent  bg-red-600 text-white w-full max-w-[216px] py-1 text-lg hover:text-red-500 hover:bg-white hover:border-red-600" onClick={(e)=> {e.preventDefault(); setInputCount((prev) => { 
              let newArray = [...prev]
              let last = inputCount.length - 1
              newArray.splice(last, 1)
              return newArray

            } );}}>-</button>
            </div>
            <button className="bg-blue-600 text-white hover:bg-white hover:text-blue-600 duration-300 w-full max-w-[216px] py-2 text-lg" type="submit">Create</button>
        </form> 

    )
}