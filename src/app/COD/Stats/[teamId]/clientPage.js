"use client"
import { motion } from "framer-motion"; // needed for StatCard

export default function ClientPage({teamStats, mapStats, gameModeStats, mapAndModeStats}){

console.log(mapAndModeStats)


    return (
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-white">
            Team Stats – KD:{" "}
            {teamStats.totalDeaths > 0
              ? (teamStats.totalKills / teamStats.totalDeaths).toFixed(2)
              : "N/A"}
          </h2>
    <div className="flex flex-wrap justify-center gap-4 w-full max-w-[1400px] mx-auto ">
          {
            Object.keys(mapStats).map((key, i) => {
              const m = mapStats[key];
              return (
                <StatCard
                  key={i}
                  title={m.mapName}
                  stats={[
                    { label: "KD", value: (m.totalKills / m.totalDeaths).toFixed(2) },
                    { label: "Avg HillTime", value: (m.totalHillTime / m.totalMaps).toFixed(2) },
                    { label: "Total Maps", value: m.totalMaps },
                    { label: "Kills", value: m.totalKills },
                    { label: "Deaths", value: m.totalDeaths },
                    { label: "Hill Time", value: m.totalHillTime },
                    { label: "Uploads", value: m.totalUploads },
                    { label: "Plants", value: m.totalPlants },
                    { label: "Defuses", value: m.totalDefuses },
                  ]}
                />
              );
            })
          }</div>
        </section>
      );
    }
    
    
    
    function StatCard({ title, stats }) {
      return (
        <motion.div
          className=" w-1/3 p-6 rounded-xl bg-gradient-to-br from-gray-950 to-gray-900 text-white 
                     shadow-xl border border-blue-700 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    
          <div className="space-y-2 text-blue-100">
            {stats.map((stat, i) => (
              <p key={i}>
                <span className="font-semibold text-white">{stat.label}:</span>{" "}
                {stat.value}
              </p>
            ))}
          </div>
        </motion.div>
      );
    }
    