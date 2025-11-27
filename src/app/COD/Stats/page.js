import prisma from "@/app/lib/prisma"

import Link from "next/link"
import Redirect from "@/app/Components/Redirect"
import { findSession } from "@/app/lib/session";
export default async function Stats() {

  let session = await findSession();
  
  const teams = await prisma.team.findMany({
    where: { userId: session.userId },
  })

  return (
    <section className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-950 to-gray-900 text-white px-6 py-12">
      <div className="w-full max-w-3xl">
      {

        teams.length > 0 ? ( <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
          Your Teams
        </h1>) : (<h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        You Have No Teams
      </h1>)
      }
       

        {teams.length ? (
          <div className="flex w-full justify-center gap-4">
            {teams.map((team, i) => (
              <Link
                key={i}
                href={`/COD/Stats/${team.teamId}`}
                className="
                  w-full max-w-75 bg-gray-800/80 hover:bg-blue-600 hover:shadow-lg 
                  transition-colors duration-300 rounded-2xl text-center py-6 
                  font-semibold text-lg border border-gray-700 hover:border-blue-500
                  uppercase
                "
              >
                {team.teamName}
              </Link>
            ))}
          </div>
        ) : (
          <Redirect href={"/COD/AddTeam"} title={"Lets Create a Team!"}/>
        )}
      </div>
    </section>
  )
}
