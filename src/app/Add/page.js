import ClientFoods from "./clientPage"
import { cookies } from "next/headers";
import prisma from "../lib/prisma";
import { redirect } from "next/navigation";


export default async function AddPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session")?.value;
    if(!sessionId){
      redirect("/Login")
    }
  const user = await prisma.session.findUnique({where:{sessionId : sessionId}})
  const res = await fetch(`http://localhost:3000/api/add?userId=${user.userId}`, { cache: "no-store" })
  const foods = await res.json()
  

  return (
  <ClientFoods foods = {foods} userId = {user.userId}/>  
  )

  }
