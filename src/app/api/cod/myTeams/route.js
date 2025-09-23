import prisma from "@/app/lib/prisma"
import { findSession } from "@/app/lib/session"
export async function GET(){
    const session = await findSession()
    const teams = await prisma.teams.findMany({where : {userId : session.userId}}) 
    return new Response(JSON.stringify({message : "success"}, {teams}), {status : 200})
}