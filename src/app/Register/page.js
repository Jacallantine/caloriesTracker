"use client"

import { useState } from "react"
import { useRouter } from "next/navigation";

export default function RegisterPage(){
const router = useRouter()
const [registerForm, setRegisterForm] = useState({
        email : "", 
        password : "",
        firstName : "",
        lastName : "",
        passwordAgain : ""
    }
    )



const RegisterAccount = async (e) =>{
    e.preventDefault()
    if(registerForm.password !== registerForm.passwordAgain){
        alert("Passwords do not match")
        return
    }
    else{

            let newUser = {email : registerForm.email, 
                password : registerForm.password,
                firstName : registerForm.firstName,
                lastName : registerForm.lastName,
            }
    

    let res = await fetch("/api/register", {
      method : "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body : JSON.stringify(newUser) 
        
    })
    router.push("/Login")
}




}
    return(
        <section className="registerPsuedo flex flex-col items-center bg-[url('/imageOfCampus.webp')] h-[90vh] bg-center bg-cover bg-no-repeat">
                
                <div className="registerWrapper px-6 py-6 relative z-50 mt-[clamp(75px,8vh,135px)] flex flex-col gap-y-6 rounded ">
                    <h1 className="md:text-3xl text-xl text-center">Register Account</h1>
                <form className="registerForm flex flex-col gap-y-4 items-center" onSubmit={RegisterAccount}>
                <input className="w-full" type="email" placeholder="Enter Email" value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email : e.target.value})}/>
                    <div className="flex gap-4 md:flex-row flex-col justify-center items-center ">

                        <input className="w-full " placeholder="Enter First Name" value={registerForm.firstName} onChange={(e)=> setRegisterForm({...registerForm, firstName : e.target.value})}/>
                        <input className ="w-full" placeholder="Enter LastName" value={registerForm.lastName} onChange={(e) => setRegisterForm({...registerForm, lastName : e.target.value})}/>
                
                    </div>
                    <div className="flex gap-4 md:flex-row flex-col justify-center">
                        
                        <input className="w-full" type="password" placeholder="Enter Password" value={registerForm.password} onChange={(e) => setRegisterForm({...registerForm, password : e.target.value})}/>
                        <input className="w-full" type = "password" placeholder="Enter Password Again" value={registerForm.passwordAgain} onChange={(e) => setRegisterForm({...registerForm, passwordAgain : e.target.value})}/>  
                    
                    </div>
                <button>Register</button>

                </form>


                </div>
                
                
                

        </section>
    )
}