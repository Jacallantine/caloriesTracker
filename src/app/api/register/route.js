import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken"; // ✅ import JWT
import { serialize } from "cookie";

export async function POST(req) {
  const { email, password, firstName, lastName } = await req.json();

  // 1. Check if user exists
  const checkExisting = await prisma.user.findFirst({ where: { email } });
  if (checkExisting) {
    return new Response(
      JSON.stringify({ message: "User already has account" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. Create user
  const addUser = await prisma.user.create({
    data: {
      email,
      password, // TODO: hash this
      firstName,
      lastName
    }
  });

  // 3. Assign default permission (make sure it exists in enum)
  const addUserPermission = await prisma.userPermission.create({
    data: {
      userId: addUser.userId,
      permission: "default" // or "AI" / "PRO" etc., must match enum
    }
  });

  // 4. Generate JWT
  const token = jwt.sign(
    { userId: addUser.userId }, // ✅ use addUser.id
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // 5. Set cookie
  const cookie = serialize("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  // 6. Return response
  return new Response(
    JSON.stringify({ message: "Logged in" }),
    { status: 200, headers: { "Set-Cookie": cookie, "Content-Type": "application/json" } }
  );
}
