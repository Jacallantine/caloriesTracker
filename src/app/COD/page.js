import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import CodPageClient from "./clientPage";

export default async function COD() {
  // Get cookie store
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value; // or whatever your cookie is called

  if (!token) {
    redirect("/Login");
  }

  let session;

  try {

    session = jwt.verify(token, process.env.JWT_SECRET);

  } catch (err) {
    redirect("/Login");
  }


  // let recentMatches = await prisma.mapInstance.findMany({
  //   where: { userId: session.userId },
  //   distinct: ["mapInstanceId"],
  //   select: {
  //     id: true,
  //     mapInstanceId: true,
  //     isHp: true,
  //     isControl: true,
  //     isSnd: true,
  //     map: {
  //       select: {
  //         mapName: true
  //       }
  //     },
  //     playerInstances: {
  //       select: {
  //         playerInstance: {
  //           select: {
  //             playerInstanceId: true,
  //             playerId: true,
  //             kills: true,
  //             deaths: true,
  //             hillTime: true,
  //             plants: true,
  //             defuses: true,
  //             isAR: true,
  //             isSub: true,
  //             isFlex: true,
  //             controlTicks: true,
  //           }
  //         }
  //       }
  //     }
  //   }
  // });

  return (
    <CodPageClient
      //recentMatches={recentMatches}
      userId={session.userId}
    />
  );
}
