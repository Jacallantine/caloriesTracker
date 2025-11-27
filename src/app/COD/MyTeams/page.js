import prisma from "@/app/lib/prisma"
import MyTeamClient from "./clientPage";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export default async function MyTeams() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  let userId;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch (err) {
    return <div>Invalid token</div>;
  }

  let myTeamsRaw = await prisma.team.findMany({
    where: { userId: userId }
  });

  let myTeams = JSON.parse(JSON.stringify(myTeamsRaw)); // ✅ FIX

  let firstTeam = null;

  if (myTeams.length > 0) {
    let playersRaw = await prisma.player.findMany({
      where: { teamId: myTeams[0].teamId }
    });

    firstTeam = JSON.parse(JSON.stringify(playersRaw)); // ✅ FIX
  }

  return (
    <section className="relative">
      <MyTeamClient teams={myTeams} players={firstTeam} />
    </section>
  );
}
