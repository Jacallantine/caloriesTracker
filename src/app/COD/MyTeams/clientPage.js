"use client"
import { useState } from "react"
import SideBar from "@/app/Components/SideBar"

export default function MyTeamClient({ players, teams }) {
  const [currentPlayers, setCurrentPlayers] = useState(players)
  const [currentTeam, setCurrentTeam] = useState(teams[0].teamName)

  async function fetchPlayers(team) {
    const res = await fetch(`/api/cod/specificTeam?teamId=${team.teamId}`)
    const data = await res.json()
    setCurrentPlayers(data.players) 
    setCurrentTeam(team.teamName)
  }

  async function deletePlayer(playerId)
  {

  }

  return (
    <section className="relative w-full h-[90vh] flex justify-center">
      <SideBar>
      <h2 className="text-3xl md:text-4xl mt-[80px] mb-[30px]">Your Teams</h2>
        {teams.map((team, i) => (
          <button
            key={team.teamId}
            onClick={() => fetchPlayers(team)}
            className={`[border-top:1px_solid_white] ${i === teams.length - 1 ? "[border-bottom:1px_solid_white]" : ""} block p-2 hover:bg-gray-900 cursor-pointer duration-300 rounded w-full`}
          >
            {team.teamName}
          </button>
        ))}
      </SideBar>

      <div className="p-4">
      <h2 className="text-5xl md:text-6xl">{currentTeam}</h2>
        {currentPlayers.length > 0 ? (
          currentPlayers.map((player) => (
            <h1 key={player.playerId}>{player.playerName}</h1>
          ))
        ) : (
          <p>No players found for this team.</p>
        )}
      </div>
    </section>
  )
}
