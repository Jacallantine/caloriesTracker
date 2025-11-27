import ClientMap from "./clientPage"
import prisma from "@/app/lib/prisma"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import { findSession } from "@/app/lib/session";


export default async function Maps(){
  
let session = await findSession();



const maps = await prisma.map.findMany({where : {isActive : true, userId : session.userId }})


  return(
<ClientMap maps = {maps}/>
  )
}

