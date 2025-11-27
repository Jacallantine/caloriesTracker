import { findSession } from "@/app/lib/session";
import ClientPage from "./clientPage";

export default async function PlayerStats({ params }) {
    const { playerId } = await params;
    let session = await findSession();
    const playerInstances = await prisma.playerInstance.findMany({
      where: { playerId }});
    
    const maps = await prisma.map.findMany({where : {userId : session.userId, isActive : true}})

    const playerName = await prisma.player.findUnique({where : {playerId : playerId}})
    


    const groups = {
      hp: {
        totalMaps: 0,
        totalKills: 0,
        totalDeaths: 0,
        totalHillTime: 0,
        avgKd: 0,
        avgHillTime: 0,
      },
      snd: {
        totalMaps: 0,
        totalKills: 0,
        totalDeaths: 0,
        avgKd: 0,
      },
      control: {
        totalMaps: 0,
        totalKills: 0,
        totalDeaths: 0,
        avgKd: 0,
      },
      overload: {
        totalMaps: 0,
        totalKills: 0,
        totalDeaths: 0,
        avgKd: 0,
        avgUploads : 0,
        uploads : 0,
      },
    };
  
    playerInstances.forEach((pi) => {
    if (pi.isHp) 
    {
        groups.hp.totalMaps += 1
        groups.hp.totalKills += pi.kills
        groups.hp.totalDeaths += pi.deaths
        groups.hp.totalHillTime += pi.hillTime

        groups.hp.avgKd = groups.hp.totalKills / groups.hp.totalDeaths
        groups.hp.avgHillTime = groups.hp.totalHillTime / groups.hp.totalMaps
    }



    if (pi.isOverload) 
      {
          groups.overload.totalMaps += 1
          groups.overload.totalKills += pi.kills
          groups.overload.totalDeaths += pi.deaths
          groups.overload.totalHillTime += pi.hillTime
          groups.overload.uploads += pi.uploads
          groups.overload.avgUploads = groups.overload.uploads / groups.overload.totalMaps
          groups.overload.avgKd = groups.overload.totalKills / groups.overload.totalDeaths
      }

    if (pi.isSnd) {groups.push(pi.kills)}
    });





  
    return <ClientPage groups ={groups}  maps={maps} playerName = {playerName.playerName} />;
  };
  