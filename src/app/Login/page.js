"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"


export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill in all fields.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (res.ok) {
        router.push("/COD")
      } else {
        const error = await res.text()
        alert(error || "Login failed. Check your credentials.")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">Login</h1>

        <div className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="px-4 py-2 text-white placeholder-gray-400 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="px-4 py-2 text-white placeholder-gray-400 bg-white/10 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-2 font-semibold rounded-lg transition-all duration-200 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 cursor-pointer hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>


          <Link href={"/Register"} className="text-center text-sm hover:underline">Not Registered? Register Here.</Link>
        </div>
      </div>
    </div>
  )
}
