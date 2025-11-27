
import InputStatsClient from "./clientPage";
import { findSession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";

export default async function InputStats(){
    

let session = await findSession();
const maps = await prisma.map.findMany({where : {isActive : true, userId : session.userId }})
const teams = await prisma.team.findMany({where : {userId : session.userId}, include : {player : true}})
console.log(teams)

    return(
       <InputStatsClient teams = {teams} maps = {maps}/>
    )
}