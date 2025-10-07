import SideBar from "@/app/Components/SideBar";
import InputStatsClient from "./clientPage";
import { findSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import prisma from "@/app/lib/prisma";

export default async function InputStats(){
const session = await findSession()
    if(!session){
        redirect('/Login')
    }
const maps = await prisma.map.findMany({where : {isActive : true }})
const teams = await prisma.team.findMany({where : {userId : session.userId}, include : {player : true}})
console.log(maps)

    return(
       <InputStatsClient teams = {teams} maps = {maps}/>
    )
}