import { database, db } from "@/libs/firebase"
import { get, ref } from "firebase/database"

import { redirect } from "next/navigation"
import { collection, where, query, getDocs, doc, updateDoc, arrayUnion } from "firebase/firestore"


export async function POST(req: Request) {
    const body = await req.json()
    const usersRef = collection(db, "users")

    const q = query(usersRef, where("email", "==", body.email))

    const snapshot = await get(ref(database, "/rooms/" + body.chatID))

    const room = snapshot.val()

    let error

    if(room !== null){
        if(room['room-password'] === body.password){
            try{
                const querySnapshot = await getDocs(q)
            
                if(querySnapshot.empty){
                    throw new Error('User not found')
                }

                querySnapshot.forEach(async (user) => {
                    const usersDocRef = doc(db, "users", user.id)
                    
                    const userRooms = user.data().rooms

                    //If user never entered a chat, create the rooms array
                    if(userRooms === undefined){
                        await updateDoc(usersDocRef, {
                            rooms: [ body.chatID ]
                        })
                    }

                    //Add Room to user
                    await updateDoc(usersDocRef, {
                        rooms: arrayUnion(body.chatID)
                    })
                })
            }
        
            catch(err){
                error = err
            }
        }
        else{
            error = new Error('Password does not match')
        }
    }
    
    if(error){
        return new Response('Password not match')
    }

    return new Response('OK')
}