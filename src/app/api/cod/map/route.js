import prisma from "@/app/lib/prisma"
import { findSession } from "@/app/lib/session";
export async function POST(req){
    const body = await req.json()
    console.log(body)
    let session = await findSession();
    const newMap = await prisma.map.create({data:{
        mapName : body.mapName,
        userId : session.userId,
        isHp : body.isHp,
        isControl : body.isControl,
        isSnd : body.isSnd,
        isActive : true
    }})

    return new Response(JSON.stringify({newMap : newMap}, {message : "success"}, {status : 200}))
}

export async function PUT(req){
    let session = await findSession();
    const body = await req.json()
    const updatedMap = await prisma.map.update({where : {mapId : body.mapId, userId : session.userId}, data : {
    mapName : body.mapName,
    isHp : body.isHp,
    isControl : body.isControl,
    isSnd : body.isSnd,
    isActive : body.isActive
}})

    return new Response(JSON.stringify({updatedMap : updatedMap}, {message : "success"}, {status : 200}))

}