import { db } from "@/libs/firebase";
import { collection, where, query, getDocs, updateDoc, arrayRemove } from "firebase/firestore";

type reqBody = {
    roomId: string
    email: string
}

export async function POST(req: Request) {
    const body: reqBody = await req.json()

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", body.email))

    try{
        const querySnapshot = await getDocs(q)

        if(querySnapshot.empty){
            throw new Error('User not found!')
        }

        querySnapshot.forEach(async (user) => {          
            await updateDoc(user.ref, {
                rooms: arrayRemove(body.roomId)
            })
        })

        return new Response('Room removed successfully', {
            status: 200
        })
    }
    catch(err){
        return new Response(JSON.stringify(err), {
            status: 500
        })
    }
}