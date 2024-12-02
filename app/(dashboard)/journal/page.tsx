import { prisma } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs/server"

export default async function Page(){
    
    const user = await prisma.user.findMany()
    console.log(user)
    return <div>Journal</div>
}