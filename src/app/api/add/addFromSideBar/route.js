import prisma from "@/app/lib/prisma";
import date from "@/app/lib/date";
import { findSession } from "@/app/lib/session";

export async function POST(req){
    const session = await findSession()
    const userId = session.userId
    
    const body = await req.json()
    const {foodId, count} = body
    let {dayId} = body

    if(!dayId){
       
        let createDay = await prisma.day.create({data : {
            userId : userId,
            date : date
        }})
        dayId = createDay.dayId
    }




    let addFood = await prisma.dayToFoodBridge.create({data : {
        foodId : foodId,
        dayId : dayId,
        userId : userId,
        count : count
    }})

    if(addFood !== null || undefined){
        return new Response(JSON.stringify({message : "Food added for the day"},{data : addFood} ), {status : 200})
    }
    else{
        return new Response(JSON.stringify({message : "Not added"}), {status : 500})
    }
}