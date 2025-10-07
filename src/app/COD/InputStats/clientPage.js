"use client"
import SideBar from "@/app/Components/SideBar"
import CollapsibleContainer from "@/app/Components/CollapsibleContainer"
import { useState, useEffect } from "react"
import GreenButton from "@/app/Components/Buttons/Green"
import InputMapData from "@/app/Components/COD/InputStatsComps.js/InputMapData"
export default function InputStatsClient({maps, teams}){
   const [toggleCollapsible, setToggleCollapsible] = useState(false)
    const [newMap, setNewMap] = useState({
      mapName : "",
      isHp : false,
      isSnd: false,
      isControl : false
    })
    
  const [selectedTeam, setSelectedTeam] = useState(null)
 
  const [selectedMap, setSelectedMap] = useState({})
  const [instanceOfSelectedMap, setInstanceOfSelectedMap] = useState({...selectedMap})
  const [mapList, setMapList] = useState(maps)

  useEffect(()=>{
console.log(selectedTeam)
  }, [selectedTeam])


function handleSelectTeam(team){
  console.log("handle select")
  let copy = {...team}
  let transformedPlayers = team.player.map((player)=>(
    {...player, collapsible : false}
  ))
  
  copy.player = transformedPlayers
  console.log("after map",copy)
  setSelectedTeam(copy)
  

}




function handlePlayerCollapsible(i) {
  setSelectedTeam(prevTeam => {
    const updatedPlayers = prevTeam.player.map((player, index) => {
      if (index === i) {
        return { ...player, collapsible: !player.collapsible };
      }
      return player;
    });
    return { ...prevTeam, player: updatedPlayers };
  });
}


    useEffect(()=>{
      const updatedMap = {...selectedMap, isHp : false, isSnd : false, isControl : false}
      setInstanceOfSelectedMap(updatedMap)
      
    },[selectedMap])

    async function addMap() {

        const res = await fetch(`/api/cod/addMap`,{
           method : "POST",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newMap)
        })
        
        const data = await res.json()
        console.log(data)
        setMapList(prev => ([...prev, data.newMap]))
        
      }
     
      function instanceGamemodeHandler(gamemode){
        
        setInstanceOfSelectedMap(prev => ({...prev, isHp : gamemode === "isHp", isSnd : gamemode === "isSnd", isControl : gamemode === "isControl"}))
        
      }




    


  return (
    <section className="relative w-full h-[90vh] flex justify-center">
      <SideBar css={"gap-y-6"}>
      <h2 className="text-3xl md:text-4xl mt-[80px] mb-[30px]">Your Maps</h2>
      <div className={`${toggleCollapsible === true ?  "hidden" : "flex flex-col w-full h-full max-h-[200px] overflow-y-auto"} `}>
        {mapList.map((map, i) => (
          <button
            key={map.mapId}
            onClick={() => setSelectedMap(map)}
            className={`[border-top:1px_solid_white] ${i === mapList.length - 1 ? "[border-bottom:1px_solid_white]" : ""} block p-2 hover:bg-gray-900 cursor-pointer duration-300 rounded w-full`}
          >
            {map.mapName}
          </button>
        ))}
        </div>


        {/* <button onClick={()=>setToggleCollapsible(!toggleCollapsible)}>{`${toggleCollapsible === true ? "X" : "Add Map?"}`}</button> */}
        <CollapsibleContainer wrapperCss={"gap-y-4"} subCss={"gap-y-4"} title = {"Adding Map"} toggle = {toggleCollapsible}>
        <GreenButton initLabel={"Add Map?"} />
        <div className="flex flex-col gap-y-4 w-full">
        <input className="default-input" placeholder = "Enter map name" value = {newMap.name} onChange={e=> setNewMap(prev => ({...prev, mapName : e.target.value}))}/>
        <p className="text-center">Select gamemodes for this map</p>
        <div className="flex flex-col w-full">
          <button className={`cursor-pointer duration-300 py-2 w-full  ${newMap.isSnd === true ? "bg-[rgba(11,156,49,0.2)] [border-top:1px_solid_green]" :"[border-top:1px_solid_transparent] bg-red-500"}`} onClick={()=>setNewMap(prev => ({...prev, isSnd : !newMap.isSnd}))}>SND</button>
          <button className={`cursor-pointer duration-300 py-2 w-full ${newMap.isHp === true ? "bg-[rgba(11,156,49,0.2)]  [border-top:1px_solid_green]" :"[border-top:1px_solid_transparent] bg-red-500"}`} onClick={()=>setNewMap(prev => ({...prev, isHp : !newMap.isHp}))}>HP</button>
          <button className={`cursor-pointer duration-300 py-2 w-full ${newMap.isControl === true ? "bg-[rgba(11,156,49,0.2)]  [border-top:1px_solid_green] [border-bottom:1px_solid_green]" :"[border-top:1px_solid_transparent] [border-bottom:1px_solid_transparent] bg-red-500"}`} onClick={()=>setNewMap(prev => ({...prev, isControl :!newMap.isControl}))}>Control</button>
        </div>
        <button onClick={()=>addMap()}>Submit</button>
        </div>
        </CollapsibleContainer>
        
       
      </SideBar>


        <div className="flex justify-evenly w-full">
          <div className="mt-[100px] w-1/2 flex flex-col items-center">
            <div className="flex gap-x-4">
              {
                selectedTeam ? (<button onClick={()=>setSelectedTeam(null)}> X </button>) : ""
              }
                
                 <h1 className="capitalize md:text-4xl text-2xl">{`${selectedTeam  ? `${selectedTeam.teamName} Players` : "Your Teams"}`}</h1>
             

            </div>
              <div className="mt-[20px] flex flex-col">
  {
    selectedTeam ? (
      selectedTeam?.player?.map((player, i) => (
        <div key={player.playerId}>
          <button
            onClick={() => handlePlayerCollapsible(i)}
          >
            {player.playerName}
          </button>

          <CollapsibleContainer xCss={"cursor-pointer bg-white text-black p-3 rounded"} toggle={player.collapsible} showButton={false}>
            <p>test</p>
            <InputMapData map={selectedMap}/>
          </CollapsibleContainer>
        </div>
      ))
    ) : (
      teams.map((team, i) => (
        <button key={i} onClick={() => {handleSelectTeam(team);}}>
          {team.teamName}
        </button>
      ))
    )
  }
</div>


          </div>
          
            <div className="mt-[100px] w-1/2 flex flex-col items-center">
              <h1 className="md:text-4xl text-2xl">Selected Map</h1>
                {
                  instanceOfSelectedMap.mapId !== undefined || null ? (<div className="flex flex-col w-full max-w-[300px]">
                    <h2 className="mt-[50px] md:text-2xl text-xl uppercase italic text-center">{instanceOfSelectedMap.mapName}</h2>
                    <div className="w-full mt-[20px] flex flex-col">



                    {
                      selectedMap.isHp === true ? (<button
                        className={`cursor-pointer duration-300 py-2 w-full  ${instanceOfSelectedMap.isHp === true ? "bg-[rgba(11,156,49,0.2)] [border:1px_solid_green]" :"[border:1px_solid_transparent] bg-red-500"}`} 
                        onClick={()=>instanceGamemodeHandler("isHp")}
                        >HP</button>) : ("")
                    }
                    {
                      selectedMap.isSnd === true ? (<button 
                        className={`cursor-pointer duration-300 py-2 w-full  ${instanceOfSelectedMap.isSnd === true ? "bg-[rgba(11,156,49,0.2)] [border:1px_solid_green]" :"[border:1px_solid_transparent] bg-red-500"}`}
                        onClick={()=>instanceGamemodeHandler("isSnd")}>SND</button>) : ("")
                    }
                    {
                      selectedMap.isControl === true ? (<button 
                        className={`cursor-pointer duration-300 py-2 w-full  ${instanceOfSelectedMap.isControl === true ? "bg-[rgba(11,156,49,0.2)] [border:1px_solid_green]" :"[border:1px_solid_transparent] bg-red-500"}`}
                        onClick={()=>instanceGamemodeHandler("isControl")}>CONTROL</button>) : ("")
                      
                    }

                    </div>
                    </div>
                    ) : (<p>You have not selected a map</p>)

                }
            </div>
        

        </div>
     
    </section>
  )
}

        