
import prisma from "@/app/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { findSession } from "@/app/lib/session";
export async function POST(req){

    const body = await req.json()

    if(!body.players || !body.teamName)
    {
        return new Response({status : 500})
    }
    const session = await findSession()
    const createTeam = await prisma.team.create({data : {teamName : body.teamName, userId : session.userId}})
    
    
    await Promise.all(
    body.players.map(player =>
      prisma.player.create({
        data: {
          playerId: uuidv4(),
          playerName: player.playerName,
          userId: session.userId,
          teamId: createTeam.teamId, 
        },
      })
    )
  );

  return new Response(JSON.stringify({message:"success"}), {status : 200})

}