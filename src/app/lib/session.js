import { redirect } from "next/navigation";
import prisma from "./prisma";
import { cookies } from "next/headers";


export async function findSession(){
const cookieStore = await cookies()
const sessionId = cookieStore.get("session")
if(sessionId === undefined){
    redirect("/Login")
}


const session = await prisma.session.findFirstOrThrow({where : {sessionId : sessionId.value}})
return session

}