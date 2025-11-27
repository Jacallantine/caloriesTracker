"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import SideBar from "../Components/SideBar"

export default function CodPageClient({ recentMatches, userId }) {

    console.log(recentMatches)
  return (
    <section className="relative bg-gradient-to-br from-gray-950 to-gray-900 text-white h-[90vh] flex">
      
     

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" font-bold tracking-wide py-24"
        >
          Call of Duty Dashboard
        </motion.h1>

        <div className="w-full bg-white py-12 px-24 text-black">
        
        <h2>Recent Matches</h2>
        
        
        </div>

        <div>
        
        
        
        </div>



      </div>

    </section>
  )
}
