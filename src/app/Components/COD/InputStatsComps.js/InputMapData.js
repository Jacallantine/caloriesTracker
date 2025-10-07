"use client"
import { useEffect, useState } from "react"
import Input from "../../Inputs/input"

export default function InputMapData({map}){
if(Object.keys(map).length === 0 ) return <p>Select a map</p>
    const [kills, setKills] = useState(0)
    const [deaths, setDeaths] = useState(0)
    const [hillTime, setHillTime] = useState(0)
    useEffect(()=>{console.log(kills)},[kills])
    return (<div>

        
        {
            map.isHp ?  (<Input data={kills}/>) : ("")
        }

        {
            map.isSnd ? ("Has Snd") : ("")
        }

        {
            map.isControl ? ("Has Control") : ("")
         }
    </div>

    )
}