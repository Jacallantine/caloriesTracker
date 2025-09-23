import prisma from "@/app/lib/prisma"
import { cookies } from "next/headers";
import { findSession } from "@/app/lib/session";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

   const currentDate = `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year.toString()}`
  try {
    const food = await prisma.food.findMany({where:{isActive : true, userId : userId}})
    const currentFoodForDay = await prisma.dayToFoodBridge.findMany({
  where: {
    day: { date: currentDate, userId: userId }
  },
  include: {
    food: true,
    day : true
  }
});
    return Response.json({food, currentFoodForDay})
  } catch (err) {
    console.error("Error fetching food:", err)
    return Response.json({ error: "Failed to fetch food" }, { status: 500 })
  }
}


export async function POST(req){
    const body = await req.json();
    const {foodName, calories, type, foodId, userId} = body;
   const session = await findSession()
  if(!session){
    return new Response(JSON.stringify({message : "Please log back in"}), {status : 500})
  }
  if(type === "postFood"){
    const newFood = await prisma.food.create({

        data:{
            foodName,
            calories : Number(calories),
            userId : session.userId,
            brand : "test"
        }

    })
     return new Response(JSON.stringify(newFood), { status: 201 });
  }

  if(type === "deleteFood")
    {
     
      const deleteFood = await prisma.food.update({where :{foodId : foodId}, data:{isActive: false}})
      return new Response(JSON.stringify({message : `Deleted ${foodId}`},{status : 200}))
    }


  
    
   

}