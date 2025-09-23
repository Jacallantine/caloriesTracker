import prisma from "@/app/lib/prisma"
import { findSession } from "@/app/lib/session"
export async function GET(req){
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get("teamId");
    
    const players = await prisma.player.findMany({where : {teamId : teamId}}) 
  console.log(players)
    return new Response(JSON.stringify({players}), {status : 200})
}