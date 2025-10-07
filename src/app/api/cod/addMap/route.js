import prisma from "@/app/lib/prisma"
import { findSession } from "@/app/lib/session"
export async function POST(req){
    const body = await req.json()
    const session = await findSession()
    const userId = session.userId
    console.log(userId)
    const newMap = await prisma.map.create({data:{
        mapName : body.mapName,
        // userId : userId,
        isHp : body.isHp,
        isControl : body.isControl,
        isSnd : body.isSnd,
        isActive : true
    }})

    return new Response(JSON.stringify({newMap : newMap}, {message : "success"}, {status : 200}))
}