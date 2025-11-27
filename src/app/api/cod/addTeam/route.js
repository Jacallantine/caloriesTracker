import prisma from "@/app/lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  // 1. Await cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  // 2. Decode JWT to get userId
  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
  }

  console.log("USER ID", userId)

  // 3. Parse body
  const body = await req.json();
  const { teamName, players } = body;

  if (!teamName || !players || !Array.isArray(players) || players.length === 0) {
    return new Response(JSON.stringify({ message: "Invalid data" }), { status: 400 });
  }



  const createTeam = await prisma.team.create({
    data: {
      teamId: uuidv4(),
      teamName: teamName,
      userId: userId // ✅ must be a valid User.id
    }
  });

  // 6. Create players
  await Promise.all(
    players.map(player =>
      prisma.player.create({
        data: {
          playerId: uuidv4(),
          playerName: player.playerName,
          userId: userId,
          teamId: createTeam.teamId, // match Prisma field name
        }
      })
    )
  );

  return new Response(JSON.stringify({ message: "success" }), { status: 200 });
}
