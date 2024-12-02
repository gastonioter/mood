import { syncUserWithClerk } from "@/data/user"
import { redirect } from "next/navigation";

export default async function Page(){
    const syncSuccess = await syncUserWithClerk()
    console.log(syncSuccess)
    if(syncSuccess){
        redirect('journal')
    }else{
        redirect('/')
    }
    return <div>New user</div>
}