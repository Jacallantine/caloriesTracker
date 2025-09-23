"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";
export default function Login()
{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    async function Login(){
        let login = { email, password}

    let res = await fetch("/api/login", {
        method : "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body : JSON.stringify(login)
    })
    if(res.ok){
        router.push("/Add")
        
    }
    else{
        alert("failed")
    }
    }
    return (
        <section>
        <input value={email} placeholder="Input email" onChange={e=>setEmail(e.target.value)}/>
        <input value = {password} placeholder="Input password" onChange={e=>setPassword(e.target.value)}/>
        <button onClick={Login}>Login</button>
    </section>)
}