import prisma from "@/app/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { serialize } from "cookie";

export async function POST(req) {
  const { email, password, firstName, lastName } = await req.json();

  const checkExisting = await prisma.user.findFirst({ where: { email } });
  if (checkExisting) {
    return new Response(JSON.stringify({ message: "User already has account" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }

  const addUser = await prisma.user.create({
    data: {
      email,
      password,
      firstName,
      lastName
    }
  });

  let uuid = uuidv4() 
  
  let createSession = await prisma.session.create({data:{userId : user.userId, sessionId : uuid }})


     const cookie = serialize("session", uuid, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",
      maxAge: 1800, 
      path: "/",
    });


     return new Response(JSON.stringify({ message: "Logged in" }), {
      status: 200,
      headers: {
        "Set-Cookie": cookie,
      },
    });

 
}
