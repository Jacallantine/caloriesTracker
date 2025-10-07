import { serialize } from "cookie";
import { v4 as uuidv4 } from "uuid";
import prisma from "@/app/lib/prisma"
export async function POST(req){
const body = await req.json()
const {email, password} = body

const user = await prisma.user.findFirst({where : {email : email}})
if(user.password !== password){
    return error()
}
if(!user)
{
    return error()
}

if(user.password === password)
{
let uuid = uuidv4() 
let createSession = await prisma.session.create({data:{userId : user.userId, sessionId : uuid }})


     const cookie = serialize("session", uuid, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 3600, 
      path: "/",
    });


     return new Response(JSON.stringify({ message: "Logged in" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    });
    
}

function error(){
    return Response(JSON.stringify({message: "Please try again later"}, {status:500}))
}
}