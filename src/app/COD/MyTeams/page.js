import prisma from "@/app/lib/prisma"
import MyTeamClient from "./clientPage";
import SideBar from "@/app/Components/SideBar"


export default async function MyTeams({searchParams}){
   
    const userId = searchParams.userId;
    const myTeams = await prisma.team.findMany({where : {userId : userId}})
    const firstTeam = await prisma.player.findMany({where : {teamId : myTeams[1].teamId}})
   
    return( 
        <section className=" relative">
           
            <MyTeamClient teams = {myTeams} players = {firstTeam}/>


            
        </section>
)
}