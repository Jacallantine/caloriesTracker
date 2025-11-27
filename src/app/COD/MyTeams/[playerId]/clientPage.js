"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ClientPage({ maps, groups, playerName }) {
  return (
    <div className="p-8 space-y-10">

      {/* Title */}
      <motion.h1
        className="text-4xl font-bold text-blue-300 capitalize"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {playerName}'s Stats
      </motion.h1>

      <div className="flex w-full justify-center gap-4 flex-wrap" >
      <StatCard
        title="Hardpoint"
        stats={[
          { label: "Avg KD", value: groups.hp.avgKd.toFixed(2) },
          { label: "Avg Hill Time", value: `${Math.round(groups.hp.avgHillTime)}s` },
          { label: "Maps Played", value: groups.hp.totalMaps },
        ]}
      />

      <StatCard
        title="Search & Destroy"
        stats={[
          { label: "Avg KD", value: groups.snd.avgKd.toFixed(2) },
          { label: "Plants", value: groups.snd.totalPlants },
          { label: "Defuses", value: groups.snd.totalDefuses },
          { label: "Maps Played", value: groups.snd.totalMaps },
        ]}
      />

      <StatCard
        title="Overload"
        stats={[
          { label: "Avg KD", value: groups.overload.avgKd.toFixed(2) },
          { label: "Total Kills", value: groups.overload.totalKills },
          { label: "Avg Uploads", value: groups.overload.avgUploads },
          { label: "Total Deaths", value: groups.overload.totalDeaths },
          { label: "Maps Played", value: groups.overload.totalMaps },
        ]}
      />

     </div>
      <motion.h2
        className="text-2xl font-bold text-blue-300 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Maps
      </motion.h2>

      <div className="flex ">
        {maps.map((map, i) => (
          <motion.div className="flex flex-1"
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            <Link
              href={`/stats/${map.mapId}`}
              className="flex flex-1  justify-center w-full px-5 py-3 bg-blue-900 text-blue-100  shadow-md border border-blue-700 hover:bg-blue-800 transition"
            >
              {map.mapName}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------- REUSABLE STAT CARD (BLUE THEME) ---------------------- */
function StatCard({ title, stats }) {
  return (
    <motion.div
      className=" flex-1 p-6 rounded-xl bg-gradient-to-br from-gray-950 to-gray-900 text-white shadow-xl border border-blue-700 max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-white">
        {title}
      </h2>

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
