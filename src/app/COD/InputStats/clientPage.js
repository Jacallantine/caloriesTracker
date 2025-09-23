"use client"
import SideBar from "@/app/Components/SideBar"
import { useState } from "react"
export default function InputStatsClient(maps){
    const [isHp, setIsHp] = useState(false)
    const [isSnd, setIsSnd] = useState(false)
    const [isControl, setIsControl] = useState(false)
    const [mapList, setMapList] = useState(maps)
    async function addMap(team) {
        const res = await fetch(`/api/cod/addMap`)
        const data = await res.json()
        setCurrentPlayers(data.players) 
        setCurrentTeam(team.teamName)
      }

      console.log(mapList)


  return (
    <section className="relative w-full h-[90vh] flex justify-center">
      <SideBar>
      <h2 className="text-3xl md:text-4xl mt-[80px] mb-[30px]">Your Maps</h2>
        {mapList.maps.map((map, i) => (
          <button
            key={map.mapId}
            onClick={() => addMap(team)}
            className={`[border-top:1px_solid_white] ${i === mapList.maps.length - 1 ? "[border-bottom:1px_solid_white]" : ""} block p-2 hover:bg-gray-900 cursor-pointer duration-300 rounded w-full`}
          >
            {map.mapName}
          </button>
        ))}
      </SideBar>

     
    </section>
  )
}

        