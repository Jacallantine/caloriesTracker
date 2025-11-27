"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"

export default function SubNavBar({ links }) {
  const pathname = usePathname()

  return (
    <div className="bg-gray-600 py-3 relative">
      <div className="w-full max-w-[700px] flex relative m-auto">
        
        <div className="absolute inset-0 flex">
          {links.map((link) => (
            <div key={link.href} className="flex-1 relative">
              {pathname === link.href && (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 bg-gray-700 rounded-xl"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          ))}
        </div>

        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            className={`flex-1 text-center py-2 relative z-10 
              ${pathname === link.href ? "text-white font-semibold" : "text-gray-300 hover:text-white"}
            `}
          >
            {link.label}
          </Link>
        ))}

      </div>
    </div>
  )
}

