import prisma from "@/app/lib/prisma"

export async function GET() {
  try {
    const food = await prisma.food.findMany()
    return Response.json(food)
  } catch (err) {
    console.error("Error fetching food:", err)
    return Response.json({ error: "Failed to fetch food" }, { status: 500 })
  }
}


export async function POST(req){
    const body = await req.json();
    console.log(body)
    const {foodName, calories} = body;


    const newFood = await prisma.food.create({

        data:{
            foodName,
            calories : Number(calories),
            userId : "3c41f7d6-17b0-45a6-bf6a-4ef0fbc27e1a",
            brand : "test"
        }

    })
    return new Response(JSON.stringify(newFood), { status: 201 });

}