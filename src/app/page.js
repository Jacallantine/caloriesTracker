'use client';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-24 gap-12">
        <div className="flex-1 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Track Your <span className="text-blue-600">Call of Duty</span> Stats
          </motion.h1>

          <p className="text-gray-400 text-lg md:w-3/4">
            Get detailed match analytics, KD history, and leaderboard rankings in real time. 
            Dominate every lobby with insights that actually matter.
          </p>

          <div className="flex gap-4">
            <Link href="/COD">
              <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold">
                Launch Tracker
              </button>
            </Link>
            <Link href="/about">
              <button className="border border-gray-600 hover:border-blue-600 transition px-6 py-3 rounded-xl font-semibold">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex-1 flex justify-center"
        >
          <Image
            src="/cod-here.webp"
            alt="Call of Duty Dashboard"
            width={600}
            height={400}
            className="rounded-2xl shadow-lg object-cover"
          />
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-8 md:px-20 py-20 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="text-blue-600">StatCore</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "AI Scoreboard Analysis",
              desc: "Our AI reads match screenshots and extracts player stats automatically — no manual input needed. Just upload, and get your KD, accuracy, and performance metrics in seconds.",
              icon: "🤖",
            },
            {
              title: "Squad Insights",
              desc: "Compare your KD, Hilltime and other stats with your team.",
              icon: "🎯",
            },
            {
              title: "Performance Trends",
              desc: "Visualize your long-term improvements and identify weak points.",
              icon: "🔥",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800 rounded-2xl p-8 text-center shadow-md hover:shadow-blue-800/40 transition"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-gray-800">
        © {new Date().getFullYear()} StatCore — Built for Gamers, by Gamers.
      </footer>
    </motion.main>
  );
}
