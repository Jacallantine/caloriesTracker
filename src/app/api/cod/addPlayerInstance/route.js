import prisma from "@/app/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    const { player } = body;

    if(player.isHp)
      {
        player.plants = 0;
        player.defuses = 0;
        player.controlTicks = 0;
        player.uploads = 0;
      }

      if(player.isSnd)
      {
        player.hillTime = 0;
        player.controlTicks = 0;
      }

      



    // 1. Create PlayerInstance
    const newPlayerInstance = await prisma.playerInstance.upsert({
      where: {
        playerInstanceId : player.playerInstanceId,  
      },
      create: {
        playerInstanceId : player.playerInstanceId,
        userId: player.userId,
        teamId: player.teamId,
        playerId: player.playerId,
        mapId: player.mapId ?? mapInstance.mapId,
        kills: player.kills,
        deaths: player.deaths,
        isAR: player.isAR,
        isSub: player.isSub,
        isFlex: player.isFlex,
        controlTicks: player.controlTicks ?? 0,
        hillTime: player.hillTime ?? 0,
        plants: player.plants ?? 0,
        defuses: player.defuses ?? 0,
        isHp: player.isHp,
        isSnd: player.isSnd,
        isControl: player.isControl,
        isOverload: player.isOverload,
        uploads : player.uploads,
      },
      update: {
        kills: player.kills,
        deaths: player.deaths,
        isAR: player.isAR,
        isSub: player.isSub,
        isFlex: player.isFlex,
        controlTicks: player.controlTicks ?? 0,
        hillTime: player.hillTime ?? 0,
        plants: player.plants ?? 0,
        defuses: player.defuses ?? 0,
        isHp: player.isHp,
        isSnd: player.isSnd,
        isControl: player.isControl,
        isOverload: player.isOverload,
        mapId: player.mapId ?? mapInstance.mapId,
        uploads : player.uploads,
      },
    });
    


    return new Response(
      JSON.stringify({
        playerInstance: newPlayerInstance,}),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response("Failed to create instances", { status: 500 });
  }
}
