import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { collection, getDocs, query, where } from "firebase/firestore"

import { db } from "@/libs/firebase";

export default async function MyChats(){
    let redirectToRoom = ""
    const session = await getServerSession()
    const usersRef =  collection(db, "users");

    if(session){
        const q = query(usersRef, where("email", "==", session.user?.email))

        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty){
            redirect('/public-rooms')    
        }

        querySnapshot.forEach((doc) => {
            const user = doc.data()

            redirectToRoom = user.rooms[0]
        })
  
        redirect(`/my-chats/${redirectToRoom}`)
    }

    redirect('/login')
}