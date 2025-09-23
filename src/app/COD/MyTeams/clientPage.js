"use client"
import { useState } from "react"
import SideBar from "@/app/Components/SideBar"

export default function MyTeamClient({ players, teams }) {
  const [currentPlayers, setCurrentPlayers] = useState(players)

  async function fetchPlayers(teamId) {
    const res = await fetch(`/api/cod/specificTeam?teamId=${teamId}`)
    const data = await res.json()
    setCurrentPlayers(data.players) 
  }

  async function deletePlayer(playerId)
  {

  }

  return (
    <section className="relative w-full h-[90vh] flex justify-center">
      <SideBar>
        {teams.map((team) => (
          <button
            key={team.teamId}
            onClick={() => fetchPlayers(team.teamId)}
            className="block p-2 hover:bg-gray-200 rounded"
          >
            {team.teamName}
          </button>
        ))}
      </SideBar>

      <div className="p-4">
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
