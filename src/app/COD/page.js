
import { redirect } from "next/dist/server/api-utils"
import { findSession } from "../lib/session"
import SideBar from "../Components/SideBar"
import Link from "next/link"
export default async function COD(){
    let session = await findSession()
    if(!session)
    {
        redirect('/Login')
    }


    return ( 
        <section className="relative">
        <SideBar>
            <Link href={`/COD/MyTeams?userId=${session.userId}`}>My Teams</Link>
            
        </SideBar>

        </section>
    )
}