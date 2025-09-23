import { v4 as uuidv4 } from "uuid";
import { cookies } from "next/headers";
export async function POST(req){
    const cookieStore = cookies()
    let sessionId = await cookieStore.get("session").value
    let user = await prisma.session.findFirstOrThrow({where : {sessionId : sessionId}})
    const {foodId, count, dayId } = await req.json()
    if(!dayId){
        let dayId = uuidv4()
        let insert = insertFoodForDay({foodId, count, dayId, userId : user.userId})
        if(insert === 1){
            return new Response(JSON.stringify({message : "Today was instantiated and now contains calories"}), {status : 200})
        }
        else{
            return new Response(JSON.stringify({message : "Error"}), {status: 500})
        }
    }
    else{
           let insert = insertFoodsForDay([{foodId, count, dayId, userId : user.userId}])
        if(insert === 1){
            return new Response(JSON.stringify({message : "Today was instantiated and now contains calories"}, {status : 200}))
        }
        else{
            return new Response(JSON.stringify({message : "Error"}, {status: 500}))
        }

    }


}

export async function insertFoodForDay(food){
 let newFood = await prisma.dayToFoodBridge.create({data:
    {
        foodId : food.foodId, 
        count : food.count, 
        userId : food.userId,
        dayId : food.dayId
    }
})
        if(newFood.count >= 1){
            return 1
        }
        else{
            return 0
        }

}