import prisma from "@/app/lib/prisma";

import ClientPage from "./clientPage";
export default async function TeamStats({ params }) {
  const { teamId } = await params;

  const playerInstances = await prisma.playerInstance.findMany({
    where: { teamId },
    include: { map: true }
  });

  let teamStats = {
    totalKills: 0,
    totalDeaths: 0,
    totalHillTime: 0,
    totalUploads: 0,
    totalPlants: 0,
    totalDefuses: 0,
  };

  
  

  let mapStats = {};

  let hpInstances = playerInstances.filter((player => player.isHp === true))
  console.log(hpInstances)

  let gameModes = {
    isHp : "Hp",
    isSnd : "Snd",
    isOverload : "Overload",
    isControl : "Control",
  }
let gameModeStats = {
    Hp: { kills: 0, deaths: 0, hillTime: 0, totalMaps : 0 },
    Snd: { kills: 0, deaths: 0, plants: 0, defuses: 0, totalMaps : 0 },
    Overload: { kills: 0, deaths: 0, uploads: 0 , totalMaps : 0},
    Control: { kills: 0, deaths: 0, totalMaps : 0 },
  };

  let mapAndModeStats = {};

  playerInstances.forEach(player => {
    const mapName = player.map.mapName;
    const mode = getGameMode(player);
  
    if (!mapAndModeStats[mapName]) {
      mapAndModeStats[mapName] = {};
    }
  
    if (!mapAndModeStats[mapName][mode]) {
      mapAndModeStats[mapName][mode] = {
        totalKills: 0,
        totalDeaths: 0,
        totalHillTime: 0,
        totalPlants: 0,
        totalDefuses: 0,
        totalUploads: 0,
        totalControlTicks: 0,
      };
    }
  
    const stats = mapAndModeStats[mapName][mode];
  
    // universal stats
    stats.totalKills += player.kills;
    stats.totalDeaths += player.deaths;
  
    // mode-specific stats
    if (player.isHp) stats.totalHillTime += player.hillTime;
    if (player.isSnd) {
      stats.totalPlants += player.plants;
      stats.totalDefuses += player.defuses;
    }
    if (player.isOverload) stats.totalUploads += player.uploads;
    if (player.isControl) stats.totalControlTicks += player.controlTicks;
  });
  


  function getGameMode(player) {
    if (player.isHp) return "Hp";
    if (player.isSnd) return "Snd";
    if (player.isOverload) return "Overload";
    if (player.isControl) return "Control";
    return "Unknown";
  }
  

  playerInstances.forEach(player => {
    for (const flag in gameModes) {
      if (player[flag]) {
        const mode = gameModes[flag];
        const stats = gameModeStats[mode];
  
        stats.kills += player.kills;
        stats.deaths += player.deaths;
        stats.totalMaps += 1;
        if (mode === "Hp") {
          stats.hillTime += player.hillTime;
        }
        if (mode === "Snd") {
          stats.plants += player.plants;
          stats.defuses += player.defuses;
        }
        if (mode === "Overload") {
          stats.uploads += player.uploads;
        }
      }
    }
  });
  





  playerInstances.forEach(player => {
    teamStats.totalKills += player.kills;
    teamStats.totalDeaths += player.deaths;

    let mapName = player.map.mapName;

    if (!mapStats[mapName]) {
      mapStats[mapName] = {
        mapName,
        totalKills: player.kills,
        totalDeaths: player.deaths,
        totalHillTime: player.hillTime,
        totalUploads: player.uploads,
        totalPlants: player.plants,
        totalDefuses: player.defuses,
        totalMaps : 1
      };
    } else {
      mapStats[mapName].totalKills += player.kills;
      mapStats[mapName].totalDeaths += player.deaths;
      mapStats[mapName].totalHillTime += player.hillTime;
      mapStats[mapName].totalUploads += player.uploads;
      mapStats[mapName].totalPlants += player.plants;
      mapStats[mapName].totalDefuses += player.defuses;
      mapStats[mapName].totalMaps += 1;
      

    }





  });





  return (
   <ClientPage teamStats={teamStats} mapStats={mapStats} gameModeStats={gameModeStats} mapAndModeStats = {mapAndModeStats}/>
  );
}




