"use client";

import SideBar from "@/app/Components/SideBar";
import CollapsibleContainer from "@/app/Components/CollapsibleContainer";
import { useState, useEffect } from "react";
import GreenButton from "@/app/Components/Buttons/Green";
import InputMapData from "@/app/Components/COD/InputStatsComps.js/InputMapData";
import { v4 as uuidv4 } from "uuid";
import WhiteButton from "@/app/Components/Buttons/White";
import { motion } from "framer-motion";
import SubNavBar from "@/app/Components/SubNavBar";
import Redirect from "@/app/Components/Redirect";

import { AnimatePresence } from "framer-motion";

export default function InputStatsClient({ maps, teams }) {
  const [newMap, setNewMap] = useState({
    mapId: uuidv4(),
    mapName: "",
    isControl: false,
    isHp: false,
    isSnd: false,
    isCollapsible : false
  });

  const [mapList, setMapList] = useState(maps);
  const [teamList, setTeamList] = useState(teams);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [selectedMap, setSelectedMap] = useState(null);
  const [addMapLoading, setAddMapLoading] = useState(false);
  const [modalAlert, setModalAlert] = useState(false)
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
  };
  
  const collapsible = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.25 } },
    open: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
  };

  useEffect(() => {


   console.log(selectedTeam)

  }, [selectedTeam]);


   useEffect(() => {
     if(modalAlert){
       setTimeout(() => {
         setModalAlert(false)
       }, 1500);
     }



  },[modalAlert])

  function handlePlayerCollapsible(i) {
    const newArray = selectedTeam.map((player, index) => {
      if (index === i) {
        return { ...player, isCollapsible: !player.isCollapsible };
      }
      return player;
    });
    setSelectedTeam(newArray);
  }

  function handleMapCollapsible(i) {
    const newArray = mapList.map((map, index) => {
      if (index === i) {
        return { ...map, isCollapsible: !map.isCollapsible };
      }
      else{
        return { ...map, isCollapsible: false };
      }
    });

    let newSelectedMap = {...newArray[i], isOverload : false, isSnd : false, isHp : false, isControl : false}
    setSelectedMap(newSelectedMap);
    setMapList(newArray);
  }












  function handleSelectedTeam(i) {
    const team = teamList[i];
  
    // Already manipulated → select as-is
    if (team.isManipulated === true) {
      setSelectedTeam(team.player);
      setSelectedTeamName(team.teamName);
      return;
    }
  
    // Create updated teamList immutably
    const newTeamList = teamList.map((t, index) => {
      if (index !== i) return t;
  
      const updatedPlayers = t.player.map((player) => ({
        ...player,
        isCollapsible: false,
        isAR: false,
        isSub: false,
        isFlex: false,
        playerInstanceId: uuidv4(),
      }));
  
      return {
        ...t,
        isManipulated: true,
        player: updatedPlayers, // <-- proper replacement
      };
    });
  
    setTeamList(newTeamList);
    setSelectedTeam(newTeamList[i].player);
    setSelectedTeamName(newTeamList[i].teamName);
  }
  










  function handlePlayerStatChange(i, field, value) {
    setSelectedTeam((prev) =>
      prev.map((player, index) => {
        if (index !== i) return player;
        if (["isAR", "isSub", "isFlex"].includes(field)) {
          return {
            ...player,
            isAR: field === "isAR" ? value : false,
            isSub: field === "isSub" ? value : false,
            isFlex: field === "isFlex" ? value : false,
          };
        }
        return { ...player, [field]: value };
      })
    );
  }


  function handleSelectedMapGamemode(field, value) {
    console.log(field)
    console.log(value)
    setSelectedMap({...selectedMap, isOverload : false, isHp : false, isSnd: false, isControl : false, [field]: value}
    );
  }


  async function addMap() {  
    const res = await fetch(`/api/cod/addMap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMap),
    });
    setAddMapLoading(true);
    if(res.ok){
      const data = await res.json();
      setMapList((prev) => [...prev, data.newMap]);
      setAddMapLoading(false);
    }
    else{
      setAddMapLoading(false);
    }
    
    
  }

  async function AddPlayerInstance(player){

    if(!selectedMap) return alert("select a map and mode")
      if(!selectedMap.isHp && !selectedMap.isSnd && !selectedMap.isControl && !selectedMap.isOverload) return alert("select a map and mode")
    player.kills = parseInt(player.kills);
    player.deaths = parseInt(player.deaths);
    player.uploads = parseInt(player.uploads);

  


    let payload = {player, mapInstance : selectedMap}
    player.mapId = selectedMap.mapId;
    player.isHp = selectedMap.isHp;
    player.isSnd = selectedMap.isSnd;
    player.isOverload = selectedMap.isOverload;
    player.isControl = selectedMap.isControl;

     const res = await fetch(`/api/cod/addPlayerInstance`, {
       method: "POST",
       headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload),
    });
     const data = await res.json();
    

     if(res.ok){
      setModalAlert(true)

     }

    
  }
  return (
    <section className=" gap-y-6 min-h-screen bg-gradient-to-br md:flex-row flex-col from-gray-950 to-gray-900 text-white flex md:justify-center py-16 px-4">

{
 
    <AnimatePresence>
    {modalAlert && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.35 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg"
      >
        Upload Success
      </motion.div>
    )}
  </AnimatePresence>
  
}

    {/* Map Section */}
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="flex h-fit md:w-1/2 flex-col gap-y-6"
    >
      <motion.div
        className="w-full  mx-auto md:max-w-[800px] bg-gray-800/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl max-w-[500px] border border-gray-700/40"
        whileHover={{ scale: 1.01 }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-semibold text-blue-400  text-center tracking-wide"
        >
          Map & Mode
        </motion.h2>
  
        {mapList.length > 0 ? (
          <motion.div
            className=" max-w-2/3 mx-auto flex flex-col gap-3 md:h-[500px] h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pr-2"
            initial="hidden"
            animate="show"
          >
            {mapList.map((map, i) => (
              <div key={i} className="w-full">
                
                {/* Map Button */}
                <motion.button
                  onClick={() => handleMapCollapsible(i)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-2 px-3 rounded-md text-left font-medium transition ${
                    selectedMap?.mapId === map.mapId
                      ? "bg-blue-700 text-white shadow-md shadow-blue-600/20"
                      : "bg-gray-700/80 hover:bg-blue-700 text-gray-300"
                  }`}
                >
                  {map.mapName || "Unnamed Map"}
                </motion.button>
  
                {/* Collapsible Gamemodes */}
                <motion.div
                  variants={collapsible}
                  initial="closed"
                  animate={map.isCollapsible ? "open" : "closed"}
                  className={`${map.isCollapsible ? "mt-4 mb-4" : ""} overflow-hidden flex flex-col gap-3`}
                >
                  {map.isHp && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`py-2 rounded-lg transition-all ${
                        selectedMap?.isHp ? "bg-green-700 shadow-lg shadow-green-600/20" : "bg-gray-700/70"
                      }`}
                      onClick={() => handleSelectedMapGamemode("isHp", !selectedMap.isHp)}
                    >
                      Hardpoint
                    </motion.button>
                  )}
                  {map.isOverload && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`py-2 rounded-lg transition-all ${
                        selectedMap?.isOverload ? "bg-green-700 shadow-lg shadow-green-600/20" : "bg-gray-700/70"
                      }`}
                      onClick={() => handleSelectedMapGamemode("isOverload", !selectedMap.isOverload)}
                    >
                      Overload
                    </motion.button>
                  )}
  
                  {map.isSnd && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`py-2 rounded-lg transition-all ${
                        selectedMap?.isSnd ? "bg-green-700 shadow-lg shadow-green-600/20" : "bg-gray-700/70"
                      }`}
                      onClick={() => handleSelectedMapGamemode("isSnd", !selectedMap.isSnd)}
                    >
                      Search & Destroy
                    </motion.button>
                  )}
  
                  {map.isControl && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className={`py-2 rounded-lg transition-all ${
                        selectedMap?.isControl ? "bg-green-700 shadow-lg shadow-green-600/20" : "bg-gray-700/70"
                      }`}
                      onClick={() => handleSelectedMapGamemode("isControl", !selectedMap.isControl)}
                    >
                      Control
                    </motion.button>
                  )}
                </motion.div>
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-gray-400 text-center italic">No maps available</p>
        )}
      </motion.div>
    </motion.div>
  
    {/* Team Section */}
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="show"
      className="p-6 mx-auto h-[600px]  w-full flex overflow-y-scroll md:w-1/2 md:max-w-[800px] max-w-[500px] justify-center flex-col gap-y-4 bg-gray-800/60 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-700/40"
    >
      {teamList.length > 0 ? (
        <>
          <motion.h2
            className="uppercase text-center text-blue-400 text-2xl font-semibold"
          >
            {selectedTeamName || "Select a Team"}
          </motion.h2>
  
          {/* Team Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-3">
            {teams.map((team, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gray-700/80 hover:bg-blue-700 transition rounded-md px-4 py-2 font-semibold shadow"
                onClick={() => handleSelectedTeam(i)}
              >
                {team.teamName}
              </motion.button>
            ))}
          </div>
  
          {/* Player Stats */}
          {selectedTeam &&
            selectedTeam.map((player, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-700/80 p-4 rounded-xl shadow-lg flex flex-col"
              >
                {/* Player Header */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className={` ${player.isCollapsible ? "mb-[15px]" : "mb-0"} uppercase h-fit text-center text-lg font-semibold text-blue-400`}
                  onClick={() => handlePlayerCollapsible(i)}
                >
                  {player.playerName}
                </motion.button>
  
                {/* Player Collapse */}
                <motion.div
                  variants={collapsible}
                  initial="closed"
                  animate={player.isCollapsible ? "open" : "closed"}
                  className="overflow-hidden flex flex-col gap-4"
                >
                  {/* K/D Inputs */}
                  <div className="flex gap-3">
                    <input
                      className="bg-gray-800 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-600"
                      placeholder="Kills"
                      type="number"
                      value={player.kills}
                      onChange={(e) => handlePlayerStatChange(i, "kills", parseInt(e.target.value))}
                    />
                    <input
                      className="bg-gray-800 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-600"
                      placeholder="Deaths"
                      type="number"
                      value={player.deaths}
                      onChange={(e) => handlePlayerStatChange(i, "deaths", parseInt(e.target.value))}
                    />

                    {
                      selectedMap?.isHp && (
                        <input
                      className="bg-gray-800 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-600"
                      placeholder="HillTime"
                      type="number"
                      value={player.hillTime}
                      onChange={(e) => handlePlayerStatChange(i, "hillTime", parseInt(e.target.value))}
                    />
                    )
                    }


                    {
                      selectedMap?.isOverload && (
                        <input
                      className="bg-gray-800 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-600"
                      placeholder="Uploads"
                      type="number"
                      value={player.uploads}
                      onChange={(e) => handlePlayerStatChange(i, "uploads", parseInt(e.target.value))}
                    />
                    )
                    }
                    

                    
                  </div>
  
                  {/* Roles */}
                  <div className="flex gap-3">
                    {["AR", "Sub", "Flex"].map((role) => (
                      <motion.button
                        key={role}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex-1 py-2 rounded-md font-semibold transition ${
                          player[`is${role}`]
                            ? "bg-blue-700 shadow shadow-blue-600/30"
                            : "bg-gray-800 hover:bg-blue-700"
                        }`}
                        onClick={() =>
                          handlePlayerStatChange(i, `is${role}`, !player[`is${role}`])
                        }
                      >
                        {role}
                      </motion.button>
                    ))}
                  </div>

                  <button className="bg-gray-800 py-2 hover:bg-blue-600 duration-300" onClick={()=>AddPlayerInstance(player)}>Submit</button>
                </motion.div>
              </motion.div>
            ))}
        </>
      ) : (
        <Redirect title="You Have No Teams" href="/COD/MyTeams" />
      )}
    </motion.div>
  </section>
  
  );
}
