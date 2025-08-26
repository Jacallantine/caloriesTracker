'use client'
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import WeekChart from "@/app/Components/Charts/Chart"
import { MonthChart } from "@/app/Components/Charts/Chart"
import SideBar from "@/app/Components/SideBar"
export default function History(){
    //const [dayList, setDayList] = useState([])
    const dayList = [
        {day:"8/1", id : "12322"},
        {day:"8/2", id : "123121"},
        {day:"8/3", id : "12312"},]
  



    
    return (
        <section className="flex">

        <SideBar>
        <div className=" w-full flex flex-col items-center gap-y-8">
        
       

        <h2 className="mt-[100px] text-4xl">Recent Days</h2>

        <div className="flex flex-col w-full">
            {
                
                dayList && dayList.length > 0 ? 
                (dayList.map((day, i ) => <Link className={` mx-auto w-11/12 hover:bg-[rgba(255,255,255,0.3)]  transition-all duration-300 py-3 text-center border-t border-t-[#4f46e5] ${i === dayList.length - 1 ? "border-b border-b-[#4f46e5]" : "test" } `} key={i} href={`/Pages/Day/${day.id}`}>{day.day}</Link>)) 
                : 
                (<div><p>You have no data</p> <Link href={"/Pages/Add"}>Add</Link> </div> )
            } 
        </div>
        
        
        
        </div>
        </SideBar>
                    <div className={`flex flex-col items-center w-full`}> 
                    <h1 className="text-4xl mt-[100px]">Your Past History</h1>
                    
                    <div className="flex mt-[75px] flex-col gap-y-4">
                    <h2 className="text-2xl text-center">Daily Calorie Limit: <span className="italic">1500</span></h2>
                        <div className="flex">
                            <div className="flex flex-col items-center">
                                <h2 className="ml-16 mb-2 text-xl mr-auto">Past 7 Days</h2>
                                <WeekChart/>
                                
                                <h2 className="text-2xl">Daily Avg: <span className="italic">12321</span></h2>
                           
                            </div>
                            <div className="flex flex-col items-center">
                                <h2 className="ml-16 mb-2 text-xl mr-auto">Past 30 Days</h2>
                                <MonthChart/>
                            
                                <h2 className="text-2xl">Daily Avg: <span className="italic">1233</span></h2>
                            
                            </div>
                        </div>
                        


                        <div className="flex justify-between ">
                            
                            

                        
                        </div>

                    
                    
                    </div>
                    
                    </div>
        </section>
        
    )
}