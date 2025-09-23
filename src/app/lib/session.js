import prisma from "./prisma";
import { cookies } from "next/headers";


export async function findSession(){
const cookieStore = await cookies()
const sessionId = cookieStore.get("session").value
const session = await prisma.session.findFirstOrThrow({where : {sessionId : sessionId}})
return session

}