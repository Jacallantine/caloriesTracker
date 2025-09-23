"use client"

import { useEffect, useState } from "react"

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
        <form onSubmit={createTeam}>

            <input value = {teamName} onChange={e => setTeamName(e.target.value)} placeholder="Enter Team Name" required/>
            {
                inputCount.map((input, i) =>(
                        <input key={i} value={inputCount.playerName} onChange={(e) => inputHandler(i, e.target.value)} placeholder={`Player ${input.input}`} required/>
                ))
                
            }
            <button onClick={(e)=> {e.preventDefault(); setInputCount((prev) => [...prev, {input : prev.length + 1, playerName : ""}]);}}>+</button>
            <button type="submit">Create</button>
        </form> 

    )
}