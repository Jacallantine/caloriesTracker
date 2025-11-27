import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";
import { serialize } from "cookie";

export async function POST(req) {
  const { email, password } = await req.json();

  // 1. Find user
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }), {
      status: 400,
    });
  }

  // 2. Check password (you should use hashing later)
  if (user.password !== password) {
    return new Response(JSON.stringify({ message: "Invalid credentials" }), {
      status: 400,
    });
  }

  // 3. Generate JWT
  const token = jwt.sign(
    { userId: user.userId },                  // payload
    process.env.JWT_SECRET,               // secret
    { expiresIn: "7d" }                   // expiration
  );

  // 4. Set cookie
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // 5. Response
  return new Response(JSON.stringify({ message: "Logged in" }), {
    status: 200,
    headers: { "Set-Cookie": cookie },
  });
}
