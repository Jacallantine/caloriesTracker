import prisma from "@/app/lib/prisma";
import { v4 as uuidv4 } from "uuid";


export async function POST(req){

            const body = await req.json()
            const {taskName, taskTime, taskDesc} = body

            let newTask = await prisma.task.create(
                {
                    data:
                    {
                        taskName : taskName,
                        taskTime : taskTime,
                        taskDesc : taskDesc
                }})

                return new Response(JSON.stringify({message : "Task Created"}, {createdTask : newTask}), {status : 200})


}